import { useState, useEffect } from 'react';
import { getHistory, deleteFromHistory, DiagnosisHistory, symptoms } from '@/data/diagnosisData';
import { Stethoscope, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export function HistoryList() {
  const [history, setHistory] = useState<DiagnosisHistory[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
    setHistory(getHistory());
    toast({
      title: 'Riwayat dihapus',
      description: 'Hasil diagnosa berhasil dihapus dari riwayat.',
    });
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Ringan': return 'severity-ringan';
      case 'Sedang': return 'severity-sedang';
      case 'Parah': return 'severity-parah';
      default: return 'severity-sedang';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSymptomLabel = (symptomId: string) => {
    return symptoms.find(s => s.id === symptomId)?.label || symptomId;
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Belum Ada Riwayat</h3>
        <p className="text-muted-foreground">
          Lakukan diagnosa untuk melihat riwayat hasil pemeriksaan Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Riwayat Diagnosa</h2>
        <p className="text-muted-foreground">
          Lihat semua hasil diagnosa yang pernah Anda lakukan beserta rekomendasi perawatannya.
        </p>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="disease-card animate-slide-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-lg">{item.disease.name}</h3>
                    <span className={`severity-badge ${getSeverityClass(item.disease.severity)}`}>
                      {item.disease.severity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.date)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(item.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Deskripsi singkat: {item.disease.description}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Gejala yang dilaporkan:</h4>
              <div className="flex flex-wrap gap-2">
                {item.matchedSymptoms.map((symptomId) => (
                  <span
                    key={symptomId}
                    className="px-3 py-1 bg-muted rounded-full text-xs"
                  >
                    {getSymptomLabel(symptomId)}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Rekomendasi:</h4>
              <ul className="space-y-1.5">
                {item.disease.recommendations.map((rec, index) => (
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
