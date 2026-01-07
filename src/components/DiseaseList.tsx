import { diseases } from '@/data/diagnosisData';
import { Stethoscope } from 'lucide-react';

export function DiseaseList() {
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Ringan': return 'severity-ringan';
      case 'Sedang': return 'severity-sedang';
      case 'Parah': return 'severity-parah';
      default: return 'severity-sedang';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Penyakit Gigi Umum</h2>
        <p className="text-muted-foreground">
          Pelajari tentang berbagai penyakit gigi, gejala, dan cara pencegahannya.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {diseases.map((disease, index) => (
          <div
            key={disease.id}
            className="disease-card animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="disease-card-header">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-lg">{disease.name}</h3>
                  <span className={`severity-badge ${getSeverityClass(disease.severity)}`}>
                    {disease.severity}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Deskripsi singkat: {disease.description}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Gejala:</h4>
              <ul className="space-y-1">
                {disease.symptoms.slice(0, 5).map((symptomId) => (
                  <li key={symptomId} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    {symptomId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Rekomendasi:</h4>
              <ul className="space-y-1">
                {disease.recommendations.slice(0, 5).map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
