(function () {
  const { esc } = App.utils,
    T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const guides = {
    reviews: {
      title: ["Öğretmen gerekçe değerlendirmesi", "Teacher reasoning review"],
      steps: [
        [
          "Öğrenci normal testini bitirir; sonuç ekranından öğretmen değerlendirmesi için paylaşır.",
          "The student completes a quiz and shares a review request from its results.",
        ],
        [
          "Öğrenci anonim bir katılımcı kodu kullanır; değerlendirme isteğini QR, kod veya JSON dosyasıyla öğretmene verir.",
          "Use a pseudonymous participant code and transfer the request by QR, code or JSON.",
        ],
        [
          "Öğretmen bu ekranda İçe aktar veya QR tara seçer. Her soruyu açıp kavram, gerekçe bağlantısı ve açıklık ölçütlerini 0–2 arasında puanlar.",
          "Import or scan here. Expand each question and score concept, reasoning link and clarity from 0 to 2.",
        ],
        [
          "Tüm gerekli ölçütleri doldurup Kaydet seçer; geri bildirim kodunu öğrenciye gönderir. Öğrenci aynı aktarım ekranından geri alır.",
          "Complete all criteria, save, and return the feedback code. The student imports it through the same transfer screen.",
        ],
        [
          "Özgün cevap değişmez. Araştırma sonuçları ayrı kalır; puanlama öğretmen yorumudur.",
          "Original answers remain unchanged. Research results stay separate; ratings represent teacher judgment.",
        ],
      ],
    },
    research: {
      title: ["Araştırma modu", "Research mode"],
      steps: [
        [
          "Yeni deney oluştur; bir kazanım ve yalnız bir değişken (ipucu veya adaptif akış) seç.",
          "Create a session, choose an outcome and one variable: hints or adaptive flow.",
        ],
        [
          "10–30 soruluk, gerekçe seçenekleri ve üç ipucu içeren bankayı hazırla. Soruları kontrol edip inceleme onayını işaretle.",
          "Prepare 10–30 questions with reasoning options and three hints. Review the questions before marking them reviewed.",
        ],
        [
          "Oturum QR/kod/JSON paketini öğrencilere aktar. Her öğrenci anonim ve benzersiz kodla katılır; A/B ataması tekrar üretilebilir.",
          "Share the session by QR/code/JSON. Students join with unique pseudonymous codes; A/B assignment is reproducible.",
        ],
        [
          "Öğrenci testi bitirip sonuç paketini araştırmacıya verir. Çok parçalı QR varsa tüm kareleri aktar.",
          "After the test students return their result packets. Transfer every frame of multi-part QR packages.",
        ],
        [
          "Araştırmacı sonuçları içe aktarır, A/B özetini ve örneklem sayılarını karşılaştırır, JSON dışa aktarır. Bu fark tek başına nedensel etki kanıtı değildir.",
          "Import results, compare A/B summaries and sample sizes, then export JSON. A difference alone does not prove a causal effect.",
        ],
      ],
    },
    classroom: {
      title: ["Çevrimdışı sınıf modu", "Offline class mode"],
      steps: [
        [
          "Öğretmen Yeni ödev hazırla seçer; sınıf, ders ve kazanımları belirler.",
          "The teacher selects New assignment and chooses grade, subject and outcomes.",
        ],
        [
          "Kayıtlı, elle girilen veya AI ile üretilen soruları kontrol ederek ödevi oluşturur.",
          "Review saved, manually entered or AI-generated questions and create the assignment.",
        ],
        [
          "Ödev QR karelerini gösterir veya aktarım kodunu paylaşır. Öğrenci Ödev QR’ını okut seçer; kamera yerine kod yapıştırma da kullanılabilir.",
          "Share the assignment QR frames or code. Students scan the assignment; code pasting is available as a camera fallback.",
        ],
        [
          "Öğrenci soruları çözer, anonim öğrenci kodunu girer ve sonuç QR’ını öğretmene gösterir.",
          "Students answer the questions, enter a pseudonymous code and show their result QR to the teacher.",
        ],
        [
          "Öğretmen ilgili ödevi açar, sonuçları toplar; kazanım bazındaki sınıf tablosunu inceler ve CSV olarak dışa aktarır.",
          "Open the assignment, collect results, review the outcome table and export CSV.",
        ],
      ],
    },
  };
  function help(view, kind, skipped = 0) {
    const page = view.querySelector(".page");
    if (!page) return;
    const d = guides[kind],
      el = document.createElement("details");
    el.className = "card module-help";
    el.innerHTML =
      "<summary>" +
      esc(T("Adım adım kullanım", "Step-by-step guide")) +
      "</summary><ol>" +
      d.steps.map((s) => "<li>" + esc(T(...s)) + "</li>").join("") +
      "</ol>";
    page.insertBefore(
      el,
      page.querySelector(".page-head")?.nextSibling || page.firstChild,
    );
    if (skipped) {
      const p = document.createElement("p");
      p.className = "record-warning";
      p.setAttribute("role", "status");
      p.textContent = T(
        skipped +
          " geçersiz kayıt görüntülenmedi. Kayıtlar silinmedi; Ayarlar’dan yedek alıp aktarım paketini kontrol et.",
        skipped +
          " invalid records were not displayed. They were not deleted; back up your data and check the transfer packet.",
      );
      el.after(p);
    }
  }
  function mount(view, fn) {
    const scope = document.createElement("div");
    scope.className = "module-scope";
    view.replaceChildren(scope);
    return fn(scope);
  }
  App.moduleSafety = { help, mount, guides };
})();
