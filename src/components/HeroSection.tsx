import { useAuth } from '@/contexts/AuthContext';
import heroImage from '@/assets/hero-dentist.jpg';
import illustration from '@/assets/dentist-illustration.png';

interface HeroSectionProps {
  onStartDiagnosis: () => void;
}

export function HeroSection({ onStartDiagnosis }: HeroSectionProps) {
  const { user } = useAuth();

  const handleScrollToDiagnosis = () => {
    onStartDiagnosis();
    // Wait for tab change then scroll
    setTimeout(() => {
      const diagnosisSection = document.getElementById('diagnosis-section');
      if (diagnosisSection) {
        diagnosisSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section className="relative overflow-hidden print:hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Dental Care"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-primary-foreground animate-fade-in">
            <p className="text-lg mb-2 opacity-90">Hello {user?.name || 'User'}</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Selamat Datang di SmileDetect.
            </h1>
            <p className="text-base md:text-lg mb-6 opacity-90 leading-relaxed">
              SmileDetect adalah platform cerdas yang dirancang untuk membantu Anda 
              melakukan diagnosa awal penyakit gigi secara mandiri. Cukup masukkan 
              gejala yang Anda rasakan, dan dapatkan rekomendasi perawatan serta 
              akses ke informasi kesehatan gigi yang lengkap dan terpercaya.
            </p>
            <p className="text-sm opacity-80 mb-8">
              Ambil kendali penuh atas kesehatan gigi Anda. Mulai diagnosa gejala yang 
              Anda rasakan sekarang untuk mendapatkan rekomendasi perawatan terbaik.
            </p>
            
            {/* CTA Button - Now in left column */}
            <button
              onClick={handleScrollToDiagnosis}
              className="cta-button flex items-center gap-2"
            >
              Mulai Diagnosa Sekarang
            </button>
          </div>

          {/* Illustration */}
          <div className="hidden md:flex justify-center md:justify-end animate-scale-in">
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
              <img
                src={illustration}
                alt="Dental Check Illustration"
                className="w-48 md:w-64 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
