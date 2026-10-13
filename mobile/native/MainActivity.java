package com.dersasistani.app;

import android.os.Build;
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
import java.util.Locale;

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
 */
public class MainActivity extends BridgeActivity {
    private WebView webView;
    private volatile String insetsJson = "{}";
    private static final boolean EDGE = Build.VERSION.SDK_INT >= 35;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getBridge() == null) return;
        webView = getBridge().getWebView();
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
            webView.evaluateJavascript("window.__nativeInsets&&window.__nativeInsets(" + insetsJson + ")", null);
            return WindowInsetsCompat.CONSUMED;
        });
        ViewCompat.requestApplyInsets(webView);
    }

    /** Sayfadan çağrılır: window.KampusNative */
    public class NativeBridge {
        @JavascriptInterface
        public String insets() {
            return insetsJson;
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
