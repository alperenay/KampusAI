package com.dersasistani.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.widget.RemoteViews;
import java.util.Calendar;
import java.util.Locale;
import org.json.JSONArray;
import org.json.JSONObject;

/*
 * Ana ekran widget'ı (v1.21): YKS'ye kalan gün, bugünün görevleri,
 * tekrar bekleyen yanlış / kart sayısı ve günün motivasyon notu.
 *
 * Veriyi uygulama yazar (js/modules/widget.js → KampusNative.widgetUpdate):
 *   { exam: "2027-06-19", examLabel, tasks: [yapılan, toplam], mis, cards, streak,
 *     notes: { "2026-10-18": "…", … }, lang, labels: { … } }
 * Kalan gün ve günün notu widget tarafından her güncellemede yeniden hesaplanır;
 * böylece uygulama açılmasa da gece yarısından sonra doğru gün görünür
 * (updatePeriodMillis: 30 dk).
 * Widget'a dokununca uygulama "Bugün" sayfasında açılır.
 */
public class KampusWidget extends AppWidgetProvider {
    static final String PREFS = "kampus_widget";

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) render(ctx, mgr, id);
    }

    /** Uygulamadan çağrılır: bütün widget'ları yenile */
    static void updateAll(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, KampusWidget.class));
        for (int id : ids) render(ctx, mgr, id);
    }

    static String dayKey(Calendar c) {
        return String.format(Locale.US, "%04d-%02d-%02d", c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1, c.get(Calendar.DAY_OF_MONTH));
    }

    /** "YYYY-MM-DD" tarihine kalan gün (bugün = 0); okunamazsa -9999 */
    static int daysLeft(String iso) {
        try {
            String[] p = iso.split("-");
            Calendar exam = Calendar.getInstance();
            exam.clear();
            exam.set(Integer.parseInt(p[0]), Integer.parseInt(p[1]) - 1, Integer.parseInt(p[2]), 12, 0, 0);
            Calendar now = Calendar.getInstance();
            Calendar today = Calendar.getInstance();
            today.clear();
            today.set(now.get(Calendar.YEAR), now.get(Calendar.MONTH), now.get(Calendar.DAY_OF_MONTH), 12, 0, 0);
            return (int) Math.round((exam.getTimeInMillis() - today.getTimeInMillis()) / 86400000.0);
        } catch (Exception e) {
            return -9999;
        }
    }

    static String lbl(JSONObject labels, String key, String def) {
        return labels != null ? labels.optString(key, def) : def;
    }

    static void render(Context ctx, AppWidgetManager mgr, int id) {
        RemoteViews v = new RemoteViews(ctx.getPackageName(), R.layout.widget_kampus);
        SharedPreferences sp = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String raw = sp.getString("data", null);
        boolean en = false;
        String days = "–", daysLbl = "YKS", line = "KampüsAI'yi açıp verileri yükle", note = "";
        try {
            if (raw != null) {
                JSONObject d = new JSONObject(raw);
                en = "en".equals(d.optString("lang"));
                JSONObject L = d.optJSONObject("labels");
                int n = daysLeft(d.optString("exam", ""));
                String exam = d.optString("examLabel", "YKS");
                if (n > 0) { days = String.valueOf(n); daysLbl = lbl(L, "daysLeft", en ? "days to %s" : "%s'ye gün").replace("%s", exam); }
                else if (n == 0) { days = "🎯"; daysLbl = lbl(L, "examToday", en ? "Exam day — good luck!" : "Sınav günü — başarılar!"); }
                else { days = "✓"; daysLbl = exam; }

                // Görev satırı: yalnızca bugün yazılmışsa göster (dünkü sayılar yanıltmasın)
                String today = dayKey(Calendar.getInstance());
                StringBuilder sb = new StringBuilder();
                if (today.equals(d.optString("day"))) {
                    JSONArray t = d.optJSONArray("tasks");
                    if (t != null && t.length() == 2 && t.optInt(1) > 0)
                        sb.append(lbl(L, "tasks", en ? "Today %1$d/%2$d" : "Bugün %1$d/%2$d görev").replace("%1$d", String.valueOf(t.optInt(0))).replace("%2$d", String.valueOf(t.optInt(1))));
                    int mis = d.optInt("mis", 0), cards = d.optInt("cards", 0);
                    if (mis > 0) { if (sb.length() > 0) sb.append(" · "); sb.append(lbl(L, "mis", en ? "%d mistakes" : "%d yanlış").replace("%d", String.valueOf(mis))); }
                    if (cards > 0) { if (sb.length() > 0) sb.append(" · "); sb.append(lbl(L, "cards", en ? "%d cards" : "%d kart").replace("%d", String.valueOf(cards))); }
                } else {
                    sb.append(lbl(L, "open", en ? "Open the app to plan today" : "Bugünün planı için uygulamayı aç"));
                }
                int streak = d.optInt("streak", 0);
                if (streak > 1) { sb.append(sb.length() > 0 ? " · " : "").append("🔥").append(streak); }
                line = sb.toString();

                JSONObject notes = d.optJSONObject("notes");
                if (notes != null) {
                    note = notes.optString(today, "");
                    if (note.isEmpty() && notes.length() > 0) {
                        // Uygulama uzun süre açılmadıysa: elde kalan notlardan güne göre birini seç
                        JSONArray names = notes.names();
                        int i = Calendar.getInstance().get(Calendar.DAY_OF_YEAR) % names.length();
                        note = notes.optString(names.optString(i), "");
                    }
                }
            }
        } catch (Exception e) {
            /* bozuk veri: varsayılan metinler */
        }
        v.setTextViewText(R.id.w_days, days);
        v.setTextViewText(R.id.w_days_lbl, daysLbl);
        v.setTextViewText(R.id.w_line, line);
        v.setTextViewText(R.id.w_note, note);

        Intent open = new Intent(ctx, MainActivity.class);
        open.putExtra("kampus_route", "bugun");
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= 23) flags |= PendingIntent.FLAG_IMMUTABLE;
        v.setOnClickPendingIntent(R.id.w_root, PendingIntent.getActivity(ctx, 7301, open, flags));
        mgr.updateAppWidget(id, v);
    }
}
