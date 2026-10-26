// Yalnızca otomatik sınamalar için; eğitimsel doğrulama iddiası taşımaz.
export function researchBank(size = 10) {
  return Array.from({ length: size }, (_, i) => ({
    q: "Kontrol sorusu " + (i + 1) + ": $x + 1 = 2$ ise $x$ kaçtır?",
    options: ["1", "2", "3", "4", "5"], answer: 0, difficulty: 1 + i % 3,
    explain: "İki taraftan bir çıkarılır: $x=1$.",
    reasonOptions: ["Eşitliğin iki tarafından aynı sayı çıkarılır.", "Eşitliğin yalnızca sol tarafına bir eklenir.", "Bilinmeyen her zaman ikiye eşittir."],
    reasonAnswer: 0,
    hints: ["Eşitlik korunurken iki tarafa da aynı işlem uygulanır.", "Bilinmeyeni yalnız bırakmak için toplamanın ters işlemini düşün.", "Eşitliğin her iki tarafından bir çıkararak başla; son işlemi kendin tamamla."]
  }));
}
