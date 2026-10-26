/* adaptive.js — saf, deterministik seviye motoru; profil quizzes kayıtlarından türetilir.
   Aynı kayıtlar yedekleme/eşitleme/öğrenme haritasında kullanılır; ikinci state yoktur.
   Zorluklar soru yazarının etiketidir, kalibre edilmiş IRT parametresi değildir. */
(function () {
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  function initial(history, key) {
    const recent = history.filter((q) => q.key === key && q.total > 0)
      .sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 5);
    let sum = 0, weights = 0;
    recent.forEach((q, i) => {
      const weight = 1 / (i + 1);
      const saved = q.adaptive && q.adaptive.endAbility;
      const ability = Number.isFinite(saved) ? saved : 1 + 2 * clamp(q.correct / q.total, 0, 1);
      sum += clamp(ability, 1, 3) * weight; weights += weight;
    });
    return weights ? sum / weights : 2;
  }
  const level = (ability) => clamp(Math.round(ability), 1, 3);
  function update(ability, difficulty, correct) {
    const expected = 1 / (1 + Math.exp(difficulty - ability));
    return clamp(ability + 0.8 * ((correct ? 1 : 0) - expected), 1, 3);
  }
  function pick(pool, used, ability) {
    const target = level(ability);
    return pool.map((q, i) => ({ q, i })).filter((x) => !used.has(x.i))
      .sort((a, b) => Math.abs(a.q.difficulty - target) - Math.abs(b.q.difficulty - target))[0];
  }
  function result(questions, answers, startAbility) {
    let ability = startAbility, earned = 0, weight = 0;
    const path = questions.map((q, i) => {
      const correct = answers[i] === q.answer;
      ability = update(ability, q.difficulty, correct);
      weight += q.difficulty;
      if (correct) earned += q.difficulty;
      return { difficulty: q.difficulty, correct, ability: Math.round(ability * 100) / 100 };
    });
    return { version: 1, startAbility, endAbility: ability, level: level(ability),
      score: weight ? Math.round(100 * earned / weight) : 0, path };
  }
  App.adaptive = { initial, level, update, pick, result };
})();
