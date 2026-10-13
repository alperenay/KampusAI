package com.dersasistani.app;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

/*
 * Klavye düzeltmesi.
 * Android 15 ve sonrası uygulamaları kenardan kenara (edge-to-edge) çizer; bu kipte pencere
 * ekran klavyesi açılınca küçülmez. Capacitor'ın kenar boşluğu ayarı yalnızca durum/gezinme
 * çubuklarını hesaba katıyordu, bu yüzden yazı kutusu klavyenin altında kalıyordu.
 * Burada WebView'in alt boşluğu "gezinme çubuğu" ile "klavye"den büyük olana göre ayarlanır;
 * böylece sayfa klavyenin üstünde kalan alana sığar.
 * Daha eski Android sürümlerinde pencere klavyeye göre kendiliğinden küçülür (adjustResize).
 */
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT < 35 || getBridge() == null) return;
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        View webView = getBridge().getWebView();
        ViewCompat.setOnApplyWindowInsetsListener(webView, (v, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            ViewGroup.MarginLayoutParams lp = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
            lp.leftMargin = bars.left;
            lp.topMargin = bars.top;
            lp.rightMargin = bars.right;
            lp.bottomMargin = Math.max(bars.bottom, ime.bottom);
            v.setLayoutParams(lp);
            return WindowInsetsCompat.CONSUMED;
        });
        ViewCompat.requestApplyInsets(webView);
    }
}
