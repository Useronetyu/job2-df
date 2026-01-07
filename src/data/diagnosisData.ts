export interface Symptom {
  id: string;
  label: string;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  severity: 'Ringan' | 'Sedang' | 'Parah';
  symptoms: string[];
  recommendations: string[];
}

export const symptoms: Symptom[] = [
  { id: 'gusi_bengkak', label: 'Gusi bengkak' },
  { id: 'gusi_nyeri', label: 'Gusi nyeri' },
  { id: 'gigi_sakit_terus', label: 'Gigi sakit terus menerus' },
  { id: 'gusi_keunguan', label: 'Gusi memerah / keunguan' },
  { id: 'gigi_ngilu', label: 'Gigi ngilu' },
  { id: 'gusi_bernanah', label: 'Gusi bernanah' },
  { id: 'gigi_kuning', label: 'Gigi tampak kuning' },
  { id: 'nyeri_mengunyah', label: 'Nyeri saat mengunyah' },
  { id: 'bau_mulut', label: 'Bau mulut tak sedap' },
  { id: 'gigi_goyang', label: 'Gigi goyang' },
  { id: 'radang_gusi', label: 'Radang gusi' },
  { id: 'mulut_kering', label: 'Mulut menjadi kering' },
  { id: 'gusi_sakit_sentuh', label: 'Gusi sakit saat disentuh' },
  { id: 'plak_karang', label: 'Penumpukan plak/karang' },
  { id: 'gusi_mengkilap', label: 'Gusi mengkilap' },
  { id: 'gusi_disentuh', label: 'Gusi sakit saat disentuh' },
  { id: 'gigi_panas_dingin', label: 'Gusi Gigi sakit saat makan' },
  { id: 'gigi_berlubang', label: 'Gigi berlubang' },
  { id: 'mulut_pahit', label: 'Mulut tak sedap / pahit' },
  { id: 'noda_gigi', label: 'Terlihat noda hitam, coklat atau putih pada permukaan' },
  { id: 'gusi_berdarah', label: 'Gusi berdarah' },
  { id: 'gigi_patah', label: 'Gigi patah' },
  { id: 'gigi_renggang', label: 'Gigi renggang' },
  { id: 'tonggos', label: 'Gusi yang terdorong maju membuat gigi terlihat panjang' },
  { id: 'lapisan_lidah', label: 'Adanya lapisan pada lidah' },
];

export const diseases: Disease[] = [
  {
    id: 'karies',
    name: 'Karies Gigi',
    description: 'Kerusakan jaringan gigi akibat bakteri dan penumpukan plak yang menghasilkan asam sehingga membentuk lubang pada gigi.',
    severity: 'Sedang',
    symptoms: ['gigi_ngilu', 'gigi_panas_dingin', 'bau_mulut', 'gigi_berlubang', 'noda_gigi', 'nyeri_mengunyah'],
    recommendations: [
      'Menggosok gigi secara teratur dengan teknik yang benar.',
      'Gunakan pasta gigi berfluoride.',
      'Gunakan obat kumur antiseptik.',
      'Kurangi konsumsi makanan manis.',
      'Periksa gigi secara rutin ke dokter.'
    ]
  },
  {
    id: 'erosi',
    name: 'Erosi Gigi',
    description: 'Hilangnya lapisan enamel gigi secara bertahap akibat paparan asam berlebihan dari makanan, minuman, atau kondisi medis tertentu.',
    severity: 'Ringan',
    symptoms: ['gigi_ngilu', 'gigi_kuning', 'gigi_patah', 'gigi_panas_dingin'],
    recommendations: [
      'Kurangi konsumsi makanan dan minuman asam.',
      'Minum air putih setelah minuman berasam.',
      'Gunakan pasta gigi untuk gigi sensitif.',
      'Hindari menyikat gigi terlalu keras.'
    ]
  },
  {
    id: 'gingivitis',
    name: 'Gingivitis',
    description: 'Peradangan gusi akibat penumpukan plak pada gigi yang menyebabkan pembengkakan, kemerahan, dan nyeri.',
    severity: 'Sedang',
    symptoms: ['gusi_bengkak', 'gusi_berdarah', 'gusi_sakit_sentuh', 'gusi_nyeri', 'gusi_keunguan', 'bau_mulut', 'gusi_mengkilap'],
    recommendations: [
      'Menyikat gigi dengan benar dan teratur.',
      'Flossing setiap hari.',
      'Gunakan obat kumur antiseptik.',
      'Bersihkan karang gigi secara rutin.',
      'Sikat gigi berbulu lembut.'
    ]
  },
  {
    id: 'pulpitis',
    name: 'Pulpitis',
    description: 'Peradangan pada pulpa (saraf gigi) akibat infeksi atau kerusakan jaringan yang menyebabkan rasa nyeri terus-menerus.',
    severity: 'Parah',
    symptoms: ['bau_mulut', 'gigi_sakit_terus', 'gusi_disentuh', 'gigi_panas_dingin', 'nyeri_mengunyah'],
    recommendations: [
      'Segera lakukan pemeriksaan ke dokter gigi jika terjadi nyeri hebat.',
      'Hindari konsumsi makanan & minuman manis.',
      'Rawat gigi berlubang sebelum infeksi meluas.',
      'Perawatan saluran akar jika diperlukan.',
      'Kontrol rutin setelah perawatan.'
    ]
  },
  {
    id: 'abses',
    name: 'Abses Gigi',
    description: 'Infeksi bakteri serius yang membentuk nanah pada gusi atau akar gigi dan menyebabkan nyeri berat serta pembengkakan.',
    severity: 'Parah',
    symptoms: ['gusi_bengkak', 'gusi_bernanah', 'gusi_berdarah', 'bau_mulut', 'nyeri_mengunyah'],
    recommendations: [
      'Segera periksakan ke dokter (darurat).',
      'Perawatan saluran akar atau pencabutan jika diperlukan.',
      'Mengonsumsi obat antibiotik sesuai resep dokter.',
      'Hindari menekan / memencet gusi bernanah.',
      'Menjaga kebersihan mulut untuk mencegah infeksi kembali.'
    ]
  },
  {
    id: 'periodontitis',
    name: 'Periodontitis',
    description: 'Infeksi lanjutan gingivitis yang merusak jaringan penyangga gigi & tulang rahang hingga menyebabkan gigi goyang atau tanggal.',
    severity: 'Parah',
    symptoms: ['bau_mulut', 'gigi_sakit_terus', 'gusi_disentuh', 'gigi_panas_dingin', 'nyeri_mengunyah', 'gigi_goyang', 'gigi_renggang', 'tonggos'],
    recommendations: [
      'Segera lakukan pemeriksaan ke dokter gigi jika terjadi nyeri hebat.',
      'Hindari konsumsi makanan & minuman manis.',
      'Rawat gigi berlubang sebelum infeksi meluas.',
      'Perawatan saluran akar jika diperlukan.',
      'Kontrol rutin setelah perawatan.'
    ]
  },
  {
    id: 'halitosis',
    name: 'Halitosis',
    description: 'Bau mulut kronis akibat penumpukan bakteri pada mulut, lidah, atau gigi.',
    severity: 'Ringan',
    symptoms: ['bau_mulut', 'mulut_pahit', 'lapisan_lidah', 'gigi_kuning', 'mulut_kering'],
    recommendations: [
      'Membersihkan lidah secara rutin menggunakan tongue scraper.',
      'Gunakan obat kumur antibakteri.',
      'Konsumsi air putih yang cukup.',
      'Hindari rokok dan alkohol.',
      'Menyikat gigi secara teratur.'
    ]
  }
];

export interface DiagnosisResult {
  id: string;
  disease: Disease;
  matchedSymptoms: string[];
  confidence: number;
  date: string;
}

export interface DiagnosisHistory {
  id: string;
  disease: Disease;
  matchedSymptoms: string[];
  date: string;
}

export function diagnose(selectedSymptomIds: string[]): DiagnosisResult | null {
  if (selectedSymptomIds.length === 0) return null;

  let bestMatch: { disease: Disease; score: number; matchedSymptoms: string[] } | null = null;

  for (const disease of diseases) {
    const matchedSymptoms = disease.symptoms.filter(s => selectedSymptomIds.includes(s));
    const score = matchedSymptoms.length / disease.symptoms.length;

    if (!bestMatch || score > bestMatch.score || 
        (score === bestMatch.score && matchedSymptoms.length > bestMatch.matchedSymptoms.length)) {
      bestMatch = { disease, score, matchedSymptoms };
    }
  }

  if (!bestMatch || bestMatch.matchedSymptoms.length === 0) return null;

  return {
    id: crypto.randomUUID(),
    disease: bestMatch.disease,
    matchedSymptoms: bestMatch.matchedSymptoms,
    confidence: Math.round(bestMatch.score * 100),
    date: new Date().toISOString()
  };
}

const HISTORY_KEY = 'smiledetect_history';

export function saveToHistory(result: DiagnosisResult): void {
  const history = getHistory();
  const historyItem: DiagnosisHistory = {
    id: result.id,
    disease: result.disease,
    matchedSymptoms: result.matchedSymptoms,
    date: result.date
  };
  history.unshift(historyItem);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): DiagnosisHistory[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteFromHistory(id: string): void {
  const history = getHistory().filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
