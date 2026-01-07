import { Sparkles, Droplets, Apple, CalendarCheck, Moon, Smile } from 'lucide-react';

const tips = [
  {
    id: 1,
    title: 'Sikat Gigi dengan Benar',
    description: 'Sikat gigi minimal 2 kali sehari selama 2 menit dengan teknik yang benar. Gunakan sikat gigi berbulu lembut dan pasta gigi berfluoride.',
    icon: Sparkles,
    colorClass: 'tip-card-blue',
  },
  {
    id: 2,
    title: 'Gunakan Benang Gigi',
    description: 'Flossing setiap hari membantu membersihkan sisa makanan dan plak di antara gigi yang tidak terjangkau sikat gigi.',
    icon: Droplets,
    colorClass: 'tip-card-pink',
  },
  {
    id: 3,
    title: 'Pola Makan Sehat',
    description: 'Kurangi makanan manis dan asam. Konsumsi makanan kaya kalsium seperti susu dan keju untuk memperkuat gigi.',
    icon: Apple,
    colorClass: 'tip-card-green',
  },
  {
    id: 4,
    title: 'Kunjungi Dokter Gigi Rutin',
    description: 'Lakukan pemeriksaan gigi setiap 6 bulan sekali untuk deteksi dini masalah gigi dan pembersihan karang gigi profesional.',
    icon: CalendarCheck,
    colorClass: 'tip-card-blue',
  },
  {
    id: 5,
    title: 'Hindari Kebiasaan Buruk',
    description: 'Jangan merokok, menggigit kuku, atau menggunakan gigi untuk membuka sesuatu. Hindari menggertakkan gigi saat tidur.',
    icon: Moon,
    colorClass: 'tip-card-pink',
  },
  {
    id: 6,
    title: 'Gunakan Obat Kumur',
    description: 'Obat kumur antiseptik membantu mengurangi bakteri di mulut dan memberikan perlindungan ekstra terhadap penyakit gusi.',
    icon: Smile,
    colorClass: 'tip-card-green',
  },
];

export function HealthTips() {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Tips Kesehatan Gigi</h2>
        <p className="text-muted-foreground">
          Ikuti panduan praktis ini untuk menjaga kesehatan gigi dan mulut Anda.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div
              key={tip.id}
              className={`tip-card ${tip.colorClass} animate-slide-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">{tip.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
