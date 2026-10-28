package com.dersasistani.app;

import android.Manifest;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.util.Log;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import org.json.JSONObject;

/*
 * Ekran yerleşimi ve klavye.
 *
 * Android 15 ve sonrası uygulamaları kenardan kenara (edge-to-edge) çizer; bu kipte pencere
 * ekran klavyesi açılınca küçülmez. Capacitor'ın kenar boşluğu ayarı yalnızca sistem
 * çubuklarını hesaba kattığı için yazı kutusu klavyenin altında kalıyordu.
 *
 * Burada:
 *  • Klavye açıkken WebView'in alt kenarı klavyenin üstüne çekilir (sayfa kalan alana sığar).
 *  • Durum çubuğu ve gezinme çubuğu boşlukları sayfaya CSS değişkeni olarak verilir
 *    (--nt, --nb, --nl, --nr); uygulamanın arka planı çubukların arkasına kadar uzanır,
 *    beyaz şeritler kalmaz.
 *  • Sayfa temaya göre çubuk simgelerinin rengini seçer (KampusNative.setLightBars).
 *
 * Daha eski Android sürümlerinde sistem çubukları ayrıdır ve pencere klavyeye göre
 * kendiliğinden küçülür (AndroidManifest: adjustResize).
 *
 * Ses (v1.7): Android WebView'de tarayıcının ses tanıma ve sesli okuma arayüzleri yok.
 *  • Konuşma → yazı (sesli Feynman): telefonun SpeechRecognizer motoru; önce cihazdaki
 *    dil paketi denenir (internetsiz), olmazsa çevrim içi tanımaya geçilir.
 *  • Sesli okuma (erişilebilirlik): TextToSpeech.
 * Olaylar sayfaya window.__nativeSpeech({ kind: "stt"|"tts", type, … }) ile gönderilir (speech.js).
 */
public class MainActivity extends BridgeActivity {
    private WebView webView;
    private volatile String insetsJson = "{}";
    private static final boolean EDGE = Build.VERSION.SDK_INT >= 35;

    /* Ses */
    private SpeechRecognizer recognizer;
    private ActivityResultLauncher<String> micPermission;
    private String pendingLang = null;
    private String sttSessionId = "legacy";
    private boolean micPermissionPending = false;
    private long recognitionEpoch = 0;
    private boolean offlineFailed = false;
    private String lastLang = "tr-TR";
    private long lastRms = 0;
    private TextToSpeech tts;
    private boolean ttsReady = false;
    private boolean ttsInit = false;
    private final List<Runnable> ttsQueue = new ArrayList<>();

    /* Telefona indirilen yapay zeka (DeviceAi.java) */
    private DeviceAi ai;

    /* Widget'a ya da bildirime dokununca açılacak sayfa (ör. "bugun") */
    private volatile String pendingRoute = null;

    private static String routeOf(Intent it) {
        if (it == null) return null;
        String r = it.getStringExtra("kampus_route");
        return r != null && r.matches("[a-z0-9/-]{1,40}") ? r : null;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        pendingRoute = routeOf(getIntent());
        micPermission = registerForActivityResult(new ActivityResultContracts.RequestPermission(), granted -> {
            micPermissionPending = false;
            String lang = pendingLang;
            pendingLang = null;
            if (lang == null) return; // a closed session must not restart after a late permission grant
            if (granted) startRecognition(lang);
            else emitStt(ev("stt", "error", "permission"), sttSessionId, recognitionEpoch);
        });
        if (getBridge() == null) return;
        webView = getBridge().getWebView();
        new Thread(() -> {
            try {
                java.io.File root = new java.io.File(getFilesDir(), "sayisal-model");
                String expected = getFilesDir().getCanonicalPath() + java.io.File.separator + "sayisal-model";
                if (root.getCanonicalPath().equals(expected)) removeRetiredModel(root, expected);
            } catch (Exception e) { Log.w("KampusAI", "retired model cleanup", e); }
        }, "retired-model-cleanup").start();
        ai = new DeviceAi(this, st -> {
            if (webView == null) return;
            final String js = "window.__nativeAi&&window.__nativeAi(" + st.toString() + ")";
            runOnUiThread(() -> webView.evaluateJavascript(js, null));
        });
        webView.addJavascriptInterface(new NativeBridge(), "KampusNative");
        if (!EDGE) return;

        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        ViewCompat.setOnApplyWindowInsetsListener(webView, (v, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            boolean keyboard = ime.bottom > bars.bottom;
            ViewGroup.MarginLayoutParams lp = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
            lp.leftMargin = 0;
            lp.topMargin = 0;
            lp.rightMargin = 0;
            lp.bottomMargin = keyboard ? ime.bottom : 0;
            v.setLayoutParams(lp);

            float d = getResources().getDisplayMetrics().density;
            insetsJson = String.format(Locale.US, "{\"top\":%.1f,\"right\":%.1f,\"bottom\":%.1f,\"left\":%.1f,\"keyboard\":%s}",
                bars.top / d, bars.right / d, keyboard ? 0f : bars.bottom / d, bars.left / d, keyboard ? "true" : "false");
            Log.d("KampusAI", "insets " + insetsJson);
            webView.evaluateJavascript("window.__nativeInsets&&window.__nativeInsets(" + insetsJson + ")", null);
            return WindowInsetsCompat.CONSUMED;
        });
        ViewCompat.requestApplyInsets(webView);
    }

    /* ---------------- Ses: olaylar ---------------- */
    private JSONObject ev(String kind, String type, String code) {
        JSONObject o = new JSONObject();
        try {
            o.put("kind", kind);
            o.put("type", type);
            if (code != null) o.put("code", code);
        } catch (Exception e) { /* yok say */ }
        return o;
    }

    private void emit(JSONObject o) {
        if (webView == null) return;
        final String js = "window.__nativeSpeech&&window.__nativeSpeech(" + o.toString() + ")";
        runOnUiThread(() -> webView.evaluateJavascript(js, null));
    }

    /* ---------------- Konuşma → yazı ---------------- */
    private RecognitionListener listenerFor(final String sid, final long epoch) {
      return new RecognitionListener() {
        @Override public void onReadyForSpeech(Bundle b) { emitStt(ev("stt", "ready", null), sid, epoch); }
        @Override public void onBeginningOfSpeech() { }
        @Override public void onRmsChanged(float v) {
            long now = System.currentTimeMillis();
            if (now - lastRms < 90) return;
            lastRms = now;
            JSONObject o = ev("stt", "rms", null);
            try { o.put("v", (double) v); } catch (Exception e) { /* yok say */ }
            emitStt(o, sid, epoch);
        }
        @Override public void onBufferReceived(byte[] b) { }
        @Override public void onEndOfSpeech() { }
        @Override public void onError(int code) {
            if (epoch != recognitionEpoch) return;
            String c;
            switch (code) {
                case SpeechRecognizer.ERROR_NO_MATCH: c = "no-match"; break;
                case SpeechRecognizer.ERROR_SPEECH_TIMEOUT: c = "timeout"; break;
                case SpeechRecognizer.ERROR_RECOGNIZER_BUSY: c = "busy"; break;
                case SpeechRecognizer.ERROR_CLIENT: c = "client"; break;
                case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS: c = "permission"; break;
                case SpeechRecognizer.ERROR_NETWORK:
                case SpeechRecognizer.ERROR_NETWORK_TIMEOUT:
                case SpeechRecognizer.ERROR_SERVER: c = "network"; break;
                case 12: case 13: c = "lang"; break;   // ERROR_LANGUAGE_NOT_SUPPORTED / ERROR_LANGUAGE_UNAVAILABLE (API 31)
                default: c = "error";
            }
            // Cihazda dil paketi yoksa bir kez çevrim içi tanımayla dene
            if (("lang".equals(c) || "network".equals(c)) && !offlineFailed) {
                offlineFailed = true;
                Log.d("KampusAI", "stt: offline failed (" + code + "), retry online");
                runOnUiThread(() -> { if (epoch == recognitionEpoch) startRecognition(lastLang); });
                return;
            }
            emitStt(ev("stt", "error", c), sid, epoch);
        }
        @Override public void onResults(Bundle r) {
            ArrayList<String> list = r.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            JSONObject o = ev("stt", "final", null);
            try { o.put("text", list != null && !list.isEmpty() ? list.get(0) : ""); } catch (Exception e) { /* yok say */ }
            emitStt(o, sid, epoch);
            emitStt(ev("stt", "end", null), sid, epoch);
        }
        @Override public void onPartialResults(Bundle r) {
            ArrayList<String> list = r.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            if (list == null || list.isEmpty()) return;
            JSONObject o = ev("stt", "partial", null);
            try { o.put("text", list.get(0)); } catch (Exception e) { /* yok say */ }
            emitStt(o, sid, epoch);
        }
        @Override public void onEvent(int type, Bundle b) { }
      };
    }

    private void emitStt(JSONObject event, String sid, long epoch) {
        if (epoch != recognitionEpoch || sid == null || !sid.equals(sttSessionId)) return;
        try { event.put("sid", sid); } catch (Exception e) { /* unchanged payload */ }
        emit(event);
    }

    private void cancelRecognition() {
        pendingLang = null;
        recognitionEpoch++;
        if (recognizer != null) { try { recognizer.cancel(); recognizer.destroy(); } catch (Exception e) { /* already stopped */ } recognizer = null; }
    }

    private void startRecognition(String lang) {
        lastLang = lang;
        final String sid = sttSessionId;
        final long epoch = ++recognitionEpoch;
        try {
            if (recognizer != null) { try { recognizer.cancel(); recognizer.destroy(); } catch (Exception e) { /* replace previous recognizer */ } }
            recognizer = SpeechRecognizer.createSpeechRecognizer(this);
            recognizer.setRecognitionListener(listenerFor(sid, epoch));
            Intent it = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            it.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            it.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
            it.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            it.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            it.putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, !offlineFailed);
            it.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 3000L);
            it.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 3000L);
            recognizer.startListening(it);
        } catch (Exception e) {
            Log.w("KampusAI", "stt start failed", e);
            emitStt(ev("stt", "error", "error"), sid, epoch);
        }
    }

    /* ---------------- Sesli okuma ---------------- */
    private final UtteranceProgressListener ttsListener = new UtteranceProgressListener() {
        @Override public void onStart(String id) { emitTts(id, "start", null); }
        /** Konuşulan sözcüğün başlangıcı (Android 8+): hologram öğretmenin ağzı ve podcast metni için */
        @Override public void onRangeStart(String id, int start, int end, int frame) {
            JSONObject o = ev("tts", "word", null);
            try { o.put("id", id); o.put("start", start); } catch (Exception e) { /* yok say */ }
            emit(o);
        }
        @Override public void onDone(String id) { emitTts(id, "done", null); }
        @Override public void onError(String id) { emitTts(id, "error", "tts"); }
        @Override public void onStop(String id, boolean interrupted) { emitTts(id, "stop", null); }
    };

    private void emitTts(String id, String type, String code) {
        JSONObject o = ev("tts", type, code);
        try { o.put("id", id); } catch (Exception e) { /* yok say */ }
        emit(o);
    }

    private void speakNow(String id, String text, String lang, float rate, float pitch) {
        if (!ttsReady || tts == null) { emitTts(id, "error", "init"); return; }
        try {
            int languageStatus = tts.setLanguage(Locale.forLanguageTag(lang));
            if (languageStatus == TextToSpeech.LANG_MISSING_DATA || languageStatus == TextToSpeech.LANG_NOT_SUPPORTED) {
                emitTts(id, "error", "language");
                return;
            }
            tts.setSpeechRate(rate > 0 ? rate : 1f);
            tts.setPitch(pitch > 0 ? pitch : 1f);
            int max = TextToSpeech.getMaxSpeechInputLength();
            String s = text.length() > max ? text.substring(0, max) : text;
            if (tts.speak(s, TextToSpeech.QUEUE_FLUSH, new Bundle(), id) != TextToSpeech.SUCCESS) emitTts(id, "error", "speak");
        } catch (Exception e) {
            emitTts(id, "error", "speak");
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        final String r = routeOf(intent);
        if (r == null) return;
        if (webView == null) { pendingRoute = r; return; }
        runOnUiThread(() -> webView.evaluateJavascript("window.__nativeRoute&&window.__nativeRoute('" + r + "')", null));
    }

    @Override
    public void onPause() {
        super.onPause();
        if (tts != null) tts.stop();
    }

    private void removeRetiredModel(java.io.File file, String root) throws java.io.IOException {
        String canonical = file.getCanonicalPath();
        if (!canonical.equals(root) && !canonical.startsWith(root + java.io.File.separator)) return;
        java.io.File[] children = file.listFiles();
        if (children != null) for (java.io.File child : children) removeRetiredModel(child, root);
        if (file.exists() && !file.delete()) Log.w("KampusAI", "retired model file could not be removed");
    }

    @Override
    public void onDestroy() {
        if (recognizer != null) { try { recognizer.destroy(); } catch (Exception e) { /* yok say */ } recognizer = null; }
        if (tts != null) { try { tts.shutdown(); } catch (Exception e) { /* yok say */ } tts = null; }
        if (ai != null && isFinishing()) ai.stop();
        super.onDestroy();
    }

    /** Sayfadan çağrılır: window.KampusNative */
    public class NativeBridge {
        @JavascriptInterface
        public String insets() {
            return insetsJson;
        }

        /** Telefonda ses tanıma motoru var mı */
        @JavascriptInterface
        public boolean speechAvailable() {
            return SpeechRecognizer.isRecognitionAvailable(MainActivity.this);
        }

        /** Dinlemeyi başlat (gerekirse önce mikrofon izni istenir) */
        @JavascriptInterface
        public void speechStart(final String lang) { speechStartSession(lang, "legacy"); }

        @JavascriptInterface
        public void speechStartSession(final String lang, final String sessionId) {
            final String safeSession = sessionId == null ? "legacy" : sessionId.substring(0, Math.min(80, sessionId.length()));
            runOnUiThread(() -> {
                if (!safeSession.equals(sttSessionId)) { cancelRecognition(); offlineFailed = false; }
                sttSessionId = safeSession;
                if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
                    pendingLang = lang;
                    if (!micPermissionPending) { micPermissionPending = true; micPermission.launch(Manifest.permission.RECORD_AUDIO); }
                    return;
                }
                startRecognition(lang);
            });
        }

        @JavascriptInterface
        public void speechCancel() { runOnUiThread(() -> cancelRecognition()); }

        @JavascriptInterface
        public void speechStop() {
            runOnUiThread(() -> {
                pendingLang = null;
                if (recognizer != null) {
                    try { recognizer.stopListening(); } catch (Exception e) { /* yok say */ }
                }
            });
        }

        /** Sesli oku: id ile bitince "done" olayı gelir */
        @JavascriptInterface
        public void ttsSpeak(final String id, final String text, final String lang, final float rate) {
            ttsSpeak2(id, text, lang, rate, 1f);
        }

        /** Sesli oku, ses tonuyla (podcast'te iki farklı konuşmacı) */
        @JavascriptInterface
        public void ttsSpeak2(final String id, final String text, final String lang, final float rate, final float pitch) {
            runOnUiThread(() -> {
                Runnable r = () -> speakNow(id, text, lang, rate, pitch);
                if (ttsReady) { r.run(); return; }
                ttsQueue.add(r);
                if (ttsInit) return;
                ttsInit = true;
                tts = new TextToSpeech(MainActivity.this, status -> runOnUiThread(() -> {
                    ttsReady = status == TextToSpeech.SUCCESS;
                    if (ttsReady) tts.setOnUtteranceProgressListener(ttsListener);
                    else ttsInit = false;
                    List<Runnable> q = new ArrayList<>(ttsQueue);
                    ttsQueue.clear();
                    for (Runnable x : q) x.run();
                }));
            });
        }

        @JavascriptInterface
        public void ttsStop() {
            runOnUiThread(() -> {
                ttsQueue.clear();
                if (tts != null) tts.stop();
            });
        }

        /* ---- Yapay zekayı bu telefona indir ---- */
        @JavascriptInterface public String aiStatus() { return ai == null ? "{}" : ai.status().toString(); }
        @JavascriptInterface public void aiDownload() { if (ai != null) ai.download(null); }
        /** "tam" (Gemma 4 E4B) ya da "hafif" (Gemma 4 E2B) */
        @JavascriptInterface public void aiDownloadVariant(String v) { if (ai != null) ai.download(v); }
        @JavascriptInterface public void aiCancel() { if (ai != null) ai.cancel(); }
        @JavascriptInterface public void aiStart() { if (ai != null) ai.startAsync(); }
        @JavascriptInterface public void aiRemove() { if (ai != null) new Thread(ai::remove, "ai-remove").start(); }

        /* ---- Ana ekran widget'ı (KampusWidget.java) ---- */
        @JavascriptInterface
        public void widgetUpdate(String json) {
            if (json == null || json.length() > 20000) return;
            getSharedPreferences(KampusWidget.PREFS, MODE_PRIVATE).edit().putString("data", json).apply();
            try { KampusWidget.updateAll(MainActivity.this); } catch (Exception e) { Log.w("KampusAI", "widget", e); }
        }

        /** Ana ekranda kaç widget var */
        @JavascriptInterface
        public int widgetCount() {
            try {
                return AppWidgetManager.getInstance(MainActivity.this).getAppWidgetIds(new ComponentName(MainActivity.this, KampusWidget.class)).length;
            } catch (Exception e) { return 0; }
        }

        /** "Ana ekrana ekle" (Android 8+ destekleyen başlatıcılarda sistem penceresi açılır) */
        @JavascriptInterface
        public boolean widgetPin() {
            if (Build.VERSION.SDK_INT < 26) return false;
            try {
                AppWidgetManager m = getSystemService(AppWidgetManager.class);
                if (m == null || !m.isRequestPinAppWidgetSupported()) return false;
                return m.requestPinAppWidget(new ComponentName(MainActivity.this, KampusWidget.class), null, null);
            } catch (Exception e) { return false; }
        }

        /** Uygulama widget'tan açıldıysa gidilecek sayfa (bir kez) */
        @JavascriptInterface
        public String takeRoute() {
            String r = pendingRoute;
            pendingRoute = null;
            return r == null ? "" : r;
        }

        /** Açık temada koyu simgeler, koyu temada açık simgeler */
        @JavascriptInterface
        public void setLightBars(final boolean light) {
            if (!EDGE) return;
            runOnUiThread(() -> {
                WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
                c.setAppearanceLightStatusBars(light);
                c.setAppearanceLightNavigationBars(light);
            });
        }
    }
}
