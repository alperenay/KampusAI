/* =========================================================
   elements.js — ilk 36 elementin temel verileri
   (kimya deneyleri ve periyodik tablo oyunu kullanır)
   r: kovalent yarıçap (pm, Cordero 2008) · ie: 1. iyonlaşma enerjisi (kJ/mol)
   en: Pauling elektronegatifliği (soygazlarda çoğu tanımsız) · m: atom kütlesi
   cat: alkali | toprak | gecis | metal | yarimetal | ametal | halojen | soygaz
   ========================================================= */
(function () {
  const rows = [
    // Z, sembol, ad (tr), ad (en), grup, periyot, kategori, r, ie, en, m
    [1, "H", "Hidrojen", "Hydrogen", 1, 1, "ametal", 31, 1312, 2.20, 1.008],
    [2, "He", "Helyum", "Helium", 18, 1, "soygaz", 28, 2372, null, 4.003],
    [3, "Li", "Lityum", "Lithium", 1, 2, "alkali", 128, 520, 0.98, 6.94],
    [4, "Be", "Berilyum", "Beryllium", 2, 2, "toprak", 96, 900, 1.57, 9.012],
    [5, "B", "Bor", "Boron", 13, 2, "yarimetal", 84, 801, 2.04, 10.81],
    [6, "C", "Karbon", "Carbon", 14, 2, "ametal", 76, 1086, 2.55, 12.01],
    [7, "N", "Azot", "Nitrogen", 15, 2, "ametal", 71, 1402, 3.04, 14.01],
    [8, "O", "Oksijen", "Oxygen", 16, 2, "ametal", 66, 1314, 3.44, 16.00],
    [9, "F", "Flor", "Fluorine", 17, 2, "halojen", 57, 1681, 3.98, 19.00],
    [10, "Ne", "Neon", "Neon", 18, 2, "soygaz", 58, 2081, null, 20.18],
    [11, "Na", "Sodyum", "Sodium", 1, 3, "alkali", 166, 496, 0.93, 22.99],
    [12, "Mg", "Magnezyum", "Magnesium", 2, 3, "toprak", 141, 738, 1.31, 24.31],
    [13, "Al", "Alüminyum", "Aluminium", 13, 3, "metal", 121, 578, 1.61, 26.98],
    [14, "Si", "Silisyum", "Silicon", 14, 3, "yarimetal", 111, 787, 1.90, 28.09],
    [15, "P", "Fosfor", "Phosphorus", 15, 3, "ametal", 107, 1012, 2.19, 30.97],
    [16, "S", "Kükürt", "Sulfur", 16, 3, "ametal", 105, 1000, 2.58, 32.06],
    [17, "Cl", "Klor", "Chlorine", 17, 3, "halojen", 102, 1251, 3.16, 35.45],
    [18, "Ar", "Argon", "Argon", 18, 3, "soygaz", 106, 1521, null, 39.95],
    [19, "K", "Potasyum", "Potassium", 1, 4, "alkali", 203, 419, 0.82, 39.10],
    [20, "Ca", "Kalsiyum", "Calcium", 2, 4, "toprak", 176, 590, 1.00, 40.08],
    [21, "Sc", "Skandiyum", "Scandium", 3, 4, "gecis", 170, 633, 1.36, 44.96],
    [22, "Ti", "Titanyum", "Titanium", 4, 4, "gecis", 160, 659, 1.54, 47.87],
    [23, "V", "Vanadyum", "Vanadium", 5, 4, "gecis", 153, 651, 1.63, 50.94],
    [24, "Cr", "Krom", "Chromium", 6, 4, "gecis", 139, 653, 1.66, 52.00],
    [25, "Mn", "Mangan", "Manganese", 7, 4, "gecis", 139, 717, 1.55, 54.94],
    [26, "Fe", "Demir", "Iron", 8, 4, "gecis", 132, 762, 1.83, 55.85],
    [27, "Co", "Kobalt", "Cobalt", 9, 4, "gecis", 126, 760, 1.88, 58.93],
    [28, "Ni", "Nikel", "Nickel", 10, 4, "gecis", 124, 737, 1.91, 58.69],
    [29, "Cu", "Bakır", "Copper", 11, 4, "gecis", 132, 745, 1.90, 63.55],
    [30, "Zn", "Çinko", "Zinc", 12, 4, "gecis", 122, 906, 1.65, 65.38],
    [31, "Ga", "Galyum", "Gallium", 13, 4, "metal", 122, 579, 1.81, 69.72],
    [32, "Ge", "Germanyum", "Germanium", 14, 4, "yarimetal", 120, 762, 2.01, 72.63],
    [33, "As", "Arsenik", "Arsenic", 15, 4, "yarimetal", 119, 947, 2.18, 74.92],
    [34, "Se", "Selenyum", "Selenium", 16, 4, "ametal", 120, 941, 2.55, 78.97],
    [35, "Br", "Brom", "Bromine", 17, 4, "halojen", 120, 1140, 2.96, 79.90],
    [36, "Kr", "Kripton", "Krypton", 18, 4, "soygaz", 116, 1351, 3.00, 83.80]
  ];
  const list = rows.map(([z, sym, tr, en, group, period, cat, r, ie, eneg, m]) => ({ z, sym, name: { tr, en }, group, period, cat, r, ie, en: eneg, m }));
  const CAT = {
    alkali: { tr: "Alkali metal", en: "Alkali metal", color: "#ff8f6b" },
    toprak: { tr: "Toprak alkali metal", en: "Alkaline earth metal", color: "#ffc061" },
    gecis: { tr: "Geçiş metali", en: "Transition metal", color: "#e7a6ff" },
    metal: { tr: "Metal (p bloku)", en: "Post-transition metal", color: "#9fc3ff" },
    yarimetal: { tr: "Yarı metal", en: "Metalloid", color: "#7fd6c2" },
    ametal: { tr: "Ametal", en: "Nonmetal", color: "#a6e07a" },
    halojen: { tr: "Halojen", en: "Halogen", color: "#5fe0e0" },
    soygaz: { tr: "Soygaz", en: "Noble gas", color: "#b5b9ff" }
  };
  App.data = App.data || {};
  App.data.elements = { list, byZ: (z) => list[z - 1], bySym: (s) => list.find((x) => x.sym === s), CAT };
})();
