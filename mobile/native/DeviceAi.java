package com.dersasistani.app;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Build;
import android.util.Log;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.net.HttpURLConnection;
import java.net.ServerSocket;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;

/*
 * "Yapay zekayı bu telefona indir" — internetsiz yapay zeka (Ollama gerekmez).
 *
 *  • Motor: llama.cpp'nin llama-server'ı uygulamanın içinde gelir (jniLibs/libllama-server.so,
 *    GitHub Actions'ta derlenir: tools/llama-android.sh).
 *  • Model: Gemma 4, iki seçenek (Apache 2.0, Hugging Face'teki resmi ggml-org dosyaları, bir kez indirilir):
 *      tam   : E4B (5,2 GB) — 8 GB ve üstü bellekli telefonlar, daha doğru
 *      hafif : E2B (3,4 GB) — 6 GB bellekli telefonlarda da çalışır, yaklaşık iki kat hızlı
 *    Seçim bellek miktarına göre önerilir; kullanıcı değiştirebilir (secim.txt).
 *    Telefonda hafıza araması kelime eşleştirmesiyle yapılır (ek model indirilmez).
 *  • Yerel sunucu yalnızca 127.0.0.1'de dinler; sayfa ona doğrudan bağlanır.
 *  • İndirme kesilirse kaldığı yerden devam eder (.part).
 * Durum sayfaya window.__nativeAi({...}) olayıyla bildirilir (js/ai/engine.js).
 */
public class DeviceAi {
    private static final String TAG = "KampusAI";
    private static final String HF = "https://huggingface.co/ggml-org/";
    /* { dosya, bayt, depo } — ilk dosya model, ikincisi fotoğraf okuma eki */
    private static final String[][] TAM = {
        { "gemma-4-E4B-it-Q4_0.gguf", "4590807392", "gemma-4-E4B-it-GGUF" },
        { "mmproj-gemma-4-E4B-it-Q8_0.gguf", "559874816", "gemma-4-E4B-it-GGUF" }
    };
    private static final String[][] HAFIF = {
        { "gemma-4-E2B-it-Q4_0.gguf", "2841481184", "gemma-4-E2B-it-GGUF" },
        { "mmproj-gemma-4-E2B-it-Q8_0.gguf", "557368064", "gemma-4-E2B-it-GGUF" }
    };
    private static final long HAFIF_SINIR = 7_400_000_000L;   // bundan az bellekli telefona hafif önerilir

    public interface Emitter { void emit(JSONObject state); }

    private final boolean stem;
    private static final String STEM_FILE = "KampusAI-STEM-3B-v2-Q8_0.gguf";
    private static final String STEM_SHA = "8861e20cc8906167d73d777fe118108009c750ce9f97eb9a7b5cbd19b243e91a";
    private static final String[][] STEM_FILES = {
        { "KampusAI-STEM-3B-v2-Q8_0.gguf.part01","1700000000","https://github.com/alperenay/ders-asistani/releases/download/v1.39.0/KampusAI-STEM-3B-v2-Q8_0.gguf.part01","720134ac37a8c4cc48850f8899d6eee7b12d1be7b0c43c204a6ff6f1a7d99350" },
        { "KampusAI-STEM-3B-v2-Q8_0.gguf.part02","1585475872","https://github.com/alperenay/ders-asistani/releases/download/v1.39.0/KampusAI-STEM-3B-v2-Q8_0.gguf.part02","2f5a1150616dc4f3756efe01cb44b543766ba15e75c0635c3cde72fde38fbda8" }
    };
    private final Context ctx;
    private final Emitter emitter;
    private final File dir;
    private volatile String stage;          // yok | kurulu | iniyor | hazirlaniyor | hazir | hata
    private volatile long done = 0, total = 0;
    private volatile String file = "", error = "";
    private volatile boolean cancel = false;
    private volatile Thread worker = null;
    private volatile Process proc = null;
    private volatile int port = 0;
    private final StringBuilder tail = new StringBuilder();
    private long lastEmit = 0;
    private volatile String variant;        // tam | hafif

    public DeviceAi(Context ctx, Emitter emitter) { this(ctx, emitter, false); }
    public DeviceAi(Context ctx, Emitter emitter, boolean stem) {
        this.stem = stem;
        this.ctx = ctx.getApplicationContext();
        this.emitter = emitter;
        this.dir = new File(this.ctx.getFilesDir(), stem ? "sayisal-model" : "yapay-zeka");
        this.variant = readVariant();
        this.stage = installed() ? "kurulu" : "yok";
    }

    private static String[][] filesOf(String v) { return "hafif".equals(v) ? HAFIF : TAM; }
    private String[][] files() { return stem ? STEM_FILES : filesOf(variant); }
    private File modelFile() { return stem ? new File(dir, STEM_FILE) : f(0); }
    private File f(int i) { return new File(dir, files()[i][0]); }

    private long totalMem() {
        try {
            ActivityManager.MemoryInfo mi = new ActivityManager.MemoryInfo();
            ((ActivityManager) ctx.getSystemService(Context.ACTIVITY_SERVICE)).getMemoryInfo(mi);
            return mi.totalMem;
        } catch (Exception e) { return 0; }
    }
    private String suggested() { if (stem) return "stem"; long m = totalMem(); return m > 0 && m < HAFIF_SINIR ? "hafif" : "tam"; }

    private String readVariant() {
        if (stem) return "stem";
        try {
            File sf = new File(dir, "secim.txt");
            if (sf.exists()) {
                byte[] buf = new byte[16];
                int n;
                try (java.io.FileInputStream in = new java.io.FileInputStream(sf)) { n = in.read(buf); }
                String v = n > 0 ? new String(buf, 0, n, "UTF-8").trim() : "";
                if ("tam".equals(v) || "hafif".equals(v)) return v;
            }
        } catch (Exception e) { /* yok say */ }
        if (new File(dir, TAM[0][0]).exists()) return "tam";
        if (new File(dir, HAFIF[0][0]).exists()) return "hafif";
        return suggested();
    }

    private void saveVariant(String v) {
        try {
            dir.mkdirs();
            try (FileOutputStream out = new FileOutputStream(new File(dir, "secim.txt"))) { out.write(v.getBytes("UTF-8")); }
        } catch (Exception e) { /* yok say */ }
    }

    /** Seçili olmayan modelin dosyalarını sil (yer açılsın) */
    private void removeOthers() {
        if (stem) return;
        java.util.Set<String> keep = new java.util.HashSet<>();
        for (String[] x : files()) keep.add(x[0]);
        File[] all = dir.listFiles();
        if (all == null) return;
        for (File x : all) {
            String n = x.getName();
            if ((n.endsWith(".gguf") || n.endsWith(".gguf.part")) && !keep.contains(n.replace(".part", ""))) x.delete();
        }
    }
    private File exe() { return new File(ctx.getApplicationInfo().nativeLibraryDir, "libllama-server.so"); }

    public boolean supported() { return Build.VERSION.SDK_INT >= 28 && exe().exists(); }

    public boolean installed() {
        if (stem) {
            try { byte[] marker=new byte[64]; int n;try(InputStream in=new java.io.FileInputStream(new File(dir,"verified.sha256"))) { n=in.read(marker); } return modelFile().length()==3285475872L && n==64 && STEM_SHA.equals(new String(marker,"UTF-8")); }
            catch(Exception e) { return false; }
        }
        for (int i = 0; i < files().length; i++) if (!f(i).exists()) return false;
        return true;
    }

    private static long sizeOf(String v) {
        long s = 0;
        for (String[] x : filesOf(v)) s += Long.parseLong(x[1]);
        return s;
    }
    private long size() { return stem ? 3285475872L : sizeOf(variant); }

    public synchronized JSONObject status() {
        JSONObject o = new JSONObject();
        try {
            o.put("asama", stage);
            o.put("kurulu", installed());
            o.put("destek", supported());
            o.put("indirilen", done);
            o.put("toplam", total);
            o.put("dosya", file);
            o.put("hata", error);
            o.put("boyut", size());
            o.put("calisiyor", "hazir".equals(stage));
            o.put("bellek", totalMem());
            o.put("secim", variant);
            o.put("oneri", suggested());
            JSONObject sec = new JSONObject();
            sec.put("tam", new JSONObject().put("ad", "Gemma 4 E4B").put("boyut", sizeOf("tam")));
            sec.put("hafif", new JSONObject().put("ad", "Gemma 4 E2B").put("boyut", sizeOf("hafif")));
            if (stem) { sec = new JSONObject(); sec.put("stem", new JSONObject().put("ad", "Sayısal Asistan (deneysel)").put("boyut", size())); }
            o.put("secenekler", sec);
            dir.mkdirs();
            o.put("bosAlan", dir.getUsableSpace());
            JSONObject a = new JSONObject();
            if (port > 0 && "hazir".equals(stage)) a.put("sohbet", "http://127.0.0.1:" + port);
            o.put("adresler", a);
        } catch (Exception e) { /* yok say */ }
        return o;
    }

    private void emit(boolean force) {
        long now = System.currentTimeMillis();
        if (!force && now - lastEmit < 400) return;
        lastEmit = now;
        emitter.emit(status());
    }

    private void set(String s, String err) {
        stage = s;
        error = err == null ? "" : err;
        emit(true);
    }

    /* ---------------- İndirme ---------------- */
    /** v: "tam" | "hafif" | null (seçili olan) */
    public synchronized void download(String v) {
        if (worker != null) return;
        if (!stem && ("tam".equals(v) || "hafif".equals(v)) && !v.equals(variant)) {
            stop();                                   // eski model çalışıyorsa kapat
            variant = v;
            saveVariant(v);
            stage = installed() ? "kurulu" : "yok";
        }
        cancel = false;
        worker = new Thread(() -> {
            try {
                dir.mkdirs();
                if (stem && installed()) { start(); return; }
                long need = stem ? size() : 0;
                String[][] fs = files();
                for (int i = 0; i < fs.length; i++) {
                    if (f(i).exists()) continue;
                    File part = new File(dir, fs[i][0] + ".part");
                    need += Long.parseLong(fs[i][1]) - (part.exists() ? part.length() : 0);
                }
                if (need > dir.getUsableSpace() - 200_000_000L) {
                    set("hata", "Telefonda yeterli boş yer yok (yaklaşık " + (need / 1_000_000_000L + 1) + " GB gerekir).");
                    return;
                }
                total = size();
                done = 0;
                for (int i = 0; i < fs.length; i++) if (f(i).exists()) done += f(i).length();
                set("iniyor", null);
                for (int i = 0; i < fs.length; i++) {
                    if (f(i).exists()) continue;
                    file = fs[i][0];
                    fetch(stem ? fs[i][2] : HF + fs[i][2] + "/resolve/main/" + fs[i][0], f(i), Long.parseLong(fs[i][1]));
                    if (cancel) { set(installed() ? "kurulu" : "yok", null); return; }
                }
                if (stem) assembleStem();
                removeOthers();
                if (stem) set("kurulu", null); else start();
            } catch (Exception e) {
                Log.w(TAG, "ai download", e);
                String m = String.valueOf(e.getMessage());
                if (e instanceof java.io.IOException && !(m.contains("eksik") || m.contains("HTTP"))) {
                    m = "İnternet bağlantısı kesildi. Tekrar \"İndir\"e basın; kaldığı yerden devam eder.";
                }
                set(cancel ? (installed() ? "kurulu" : "yok") : "hata", cancel ? null : m);
            } finally {
                worker = null;
            }
        }, "ai-download");
        worker.start();
    }

    private void fetch(String url, File target, long expected) throws Exception {
        File part = new File(target.getPath() + ".part");
        long have = part.exists() ? part.length() : 0;
        long base = done;
        HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
        c.setConnectTimeout(20000);
        c.setReadTimeout(60000);
        c.setInstanceFollowRedirects(true);
        if (have > 0) c.setRequestProperty("Range", "bytes=" + have + "-");
        int code = c.getResponseCode();
        if (code == 416) { /* zaten tamam */ }
        else if (code != 200 && code != 206) throw new java.io.IOException("İndirme hatası HTTP " + code);
        if (code == 200) have = 0;          // sunucu devam desteklemiyor: baştan
        if (code != 416) {
            try (InputStream in = c.getInputStream(); FileOutputStream out = new FileOutputStream(part, have > 0)) {
                byte[] buf = new byte[1 << 16];
                long n = have;
                int r;
                while ((r = in.read(buf)) > 0) {
                    if (cancel) break;
                    out.write(buf, 0, r);
                    n += r;
                    done = base + n;
                    emit(false);
                }
            } finally {
                c.disconnect();
            }
        }
        if (cancel) return;
        if (part.length() != expected) throw new java.io.IOException("Dosya eksik indi (" + part.length() + " / " + expected + "). Tekrar deneyin.");
        if (stem && !sha(part).equals(files()[fileIndex(target)][3])) { part.delete(); throw new java.io.IOException("Model parçası SHA256 hatası; tekrar indir."); }
        if (!part.renameTo(target)) throw new java.io.IOException("Dosya kaydedilemedi");
        done = base + expected;
    }

    private int fileIndex(File target) {
        for (int i=0;i<files().length;i++) if (f(i).equals(target)) return i;
        throw new IllegalArgumentException("Unknown model part");
    }
    private String sha(File file) throws Exception {
        java.security.MessageDigest hash=java.security.MessageDigest.getInstance("SHA-256");
        try (InputStream in=new java.io.FileInputStream(file)) { byte[] buf=new byte[1024*1024]; int n; while((n=in.read(buf))>0) { if(cancel) throw new java.io.IOException("İndirme durduruldu"); hash.update(buf,0,n); } }
        StringBuilder out=new StringBuilder();for(byte b:hash.digest()) out.append(String.format("%02x",b&255));return out.toString();
    }
    private void assembleStem() throws Exception {
        set("hazirlaniyor", "Model doğrulanıyor...");
        File joined=new File(dir,STEM_FILE+".joining");
        try {
            try(FileOutputStream out=new FileOutputStream(joined)) {
                byte[] buf=new byte[1024*1024];
                for(int i=0;i<files().length;i++) {
                    if(!sha(f(i)).equals(files()[i][3])) { f(i).delete(); throw new java.io.IOException("Model parçası SHA256 hatası"); }
                    try(InputStream in=new java.io.FileInputStream(f(i))) { int n;while((n=in.read(buf))>0) { if(cancel) throw new java.io.IOException("İndirme durduruldu");out.write(buf,0,n); } }
                }
            }
            if(!sha(joined).equals(STEM_SHA)) throw new java.io.IOException("Birleşik model SHA256 hatası");
            if(!joined.renameTo(modelFile())) throw new java.io.IOException("Model kaydedilemedi");
            try(FileOutputStream out=new FileOutputStream(new File(dir,"verified.sha256"))) { out.write(STEM_SHA.getBytes("UTF-8")); }
            for(int i=0;i<files().length;i++) f(i).delete();
        } finally { joined.delete(); }
    }
    public void cancel() {
        cancel = true;
    }

    /* ---------------- Yerel sunucu ---------------- */
    public synchronized void startAsync() {
        if (worker != null || proc != null || !installed()) { emit(true); return; }
        // Durum hemen "hazırlanıyor" olsun: sayfa önceki denemeden kalan "hata"yı yeni deneme sanmasın
        if (supported()) { stage = "hazirlaniyor"; error = ""; }
        worker = new Thread(() -> {
            try { start(); } finally { worker = null; }
        }, "ai-start");
        worker.start();
    }

    private void start() {
        if (!supported()) { set("hata", "Bu telefonda yerel yapay zeka çalışmıyor (Android 9 ve üstü gerekir)."); return; }
        set("hazirlaniyor", null);
        try {
            int p;
            try (ServerSocket s = new ServerSocket(0)) { p = s.getLocalPort(); }
            int threads = Math.max(2, Math.min(6, Runtime.getRuntime().availableProcessors() - 2));
            List<String> cmd = new ArrayList<>();
            String[] args = { exe().getPath(), "-m", modelFile().getPath(),
                "--host", "127.0.0.1", "--port", String.valueOf(p), "-c", "4096", "-np", "1", "-t", String.valueOf(threads),
                "--jinja" };
            for (String a : args) cmd.add(a);
            if (!stem) { cmd.add("--mmproj"); cmd.add(f(1).getPath()); }
            else { cmd.add("--alias"); cmd.add("kampusai-stem-v2"); }
            ProcessBuilder pb = new ProcessBuilder(cmd).directory(dir).redirectErrorStream(true);
            Process pr = pb.start();
            proc = pr;
            new Thread(() -> {
                try (BufferedReader rd = new BufferedReader(new InputStreamReader(pr.getInputStream()))) {
                    String line;
                    while ((line = rd.readLine()) != null) {
                        synchronized (tail) {
                            tail.append(line).append('\n');
                            if (tail.length() > 4000) tail.delete(0, tail.length() - 4000);
                        }
                    }
                } catch (Exception e) { /* süreç kapandı */ }
                int code = -1;
                try { code = pr.waitFor(); } catch (Exception e) { /* yok say */ }
                if (proc == pr) {
                    proc = null;
                    port = 0;
                    Log.w(TAG, "llama-server exit " + code + "\n" + lastLines(6));
                    set("hata", "Yapay zeka motoru kapandı (telefonun belleği yetmemiş olabilir). " + lastLines(2));
                }
            }, "ai-log").start();
            long until = System.currentTimeMillis() + 240_000;
            while (System.currentTimeMillis() < until && proc == pr) {
                if (health(p)) { port = p; set("hazir", null); return; }
                Thread.sleep(700);
            }
            if (proc == pr) { stop(); set("hata", "Yapay zeka motoru açılamadı. " + lastLines(3)); }
        } catch (Exception e) {
            Log.w(TAG, "ai start", e);
            stop();
            set("hata", "Yapay zeka motoru açılamadı: " + e.getMessage());
        }
    }

    private String lastLines(int n) {
        synchronized (tail) {
            String[] l = tail.toString().trim().split("\n");
            StringBuilder b = new StringBuilder();
            for (int i = Math.max(0, l.length - n); i < l.length; i++) b.append(l[i]).append(' ');
            return b.toString().trim();
        }
    }

    private boolean health(int p) {
        try {
            HttpURLConnection c = (HttpURLConnection) new URL("http://127.0.0.1:" + p + "/health").openConnection();
            c.setConnectTimeout(1000);
            c.setReadTimeout(2000);
            int code = c.getResponseCode();
            c.disconnect();
            return code == 200;
        } catch (Exception e) {
            return false;
        }
    }

    public synchronized void stop() {
        Process pr = proc;
        proc = null;
        port = 0;
        if (pr != null) pr.destroy();
        if ("hazir".equals(stage)) set(installed() ? "kurulu" : "yok", null);
    }

    public void remove() {
        cancel = true;
        stop();
        File[] all = dir.listFiles();
        if (all != null) for (File x : all) x.delete();
        dir.delete();
        done = 0;
        total = 0;
        set("yok", null);
    }
}
