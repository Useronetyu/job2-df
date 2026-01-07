import { useState, useRef } from 'react';
import { symptoms, diagnose, saveToHistory, DiagnosisResult } from '@/data/diagnosisData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Stethoscope, RotateCcw, Save, CheckCircle, AlertCircle, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function DiagnosisForm() {
  const { user } = useAuth();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
    setResult(null);
    setIsSaved(false);
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: 'Pilih gejala terlebih dahulu',
        description: 'Silakan pilih minimal satu gejala untuk melakukan diagnosa.',
        variant: 'destructive',
      });
      return;
    }

    const diagnosisResult = diagnose(selectedSymptoms);
    setResult(diagnosisResult);
    setIsSaved(false);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setResult(null);
    setIsSaved(false);
  };

  const handleSave = () => {
    if (result) {
      saveToHistory(result);
      setIsSaved(true);
      toast({
        title: 'Riwayat tersimpan',
        description: 'Hasil diagnosa berhasil disimpan ke riwayat.',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Ringan': return 'severity-ringan';
      case 'Sedang': return 'severity-sedang';
      case 'Parah': return 'severity-parah';
      default: return 'severity-sedang';
    }
  };

  const getSymptomLabel = (symptomId: string) => {
    return symptoms.find(s => s.id === symptomId)?.label || symptomId;
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="animate-fade-in" id="diagnosis-section">
      <div className="text-center mb-8 print:hidden">
        <h2 className="text-2xl font-bold mb-2">Diagnosa Penyakit Gigi</h2>
        <p className="text-muted-foreground">
          Pilih gejala yang Anda alami untuk mendapatkan diagnosa awal
        </p>
      </div>

      {/* Symptoms Grid - Hidden when printing */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6 print:hidden">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" />
          Pilih Gejala Yang di Alami
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {symptoms.map((symptom) => {
            const isChecked = selectedSymptoms.includes(symptom.id);
            return (
              <label
                key={symptom.id}
                className={`symptom-checkbox ${isChecked ? 'symptom-checkbox-checked' : ''}`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => handleSymptomToggle(symptom.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm">{symptom.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Buttons - Hidden when printing */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 print:hidden">
        <Button
          onClick={handleAnalyze}
          className="flex-1 bg-secondary hover:bg-secondary/90 h-12 text-base"
        >
          <Stethoscope className="mr-2 h-5 w-5" />
          Analisa Gejala
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="h-12"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </div>

      {/* Result - Printable */}
      {result && (
        <div ref={printRef} className="result-card animate-scale-in print:shadow-none print:border-none">
          {/* Print Header - Only visible when printing */}
          <div className="hidden print:block print-header mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">😊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">SmileDetect</h1>
                <p className="text-sm text-gray-600">Sistem Pakar Diagnosa Penyakit Gigi</p>
              </div>
            </div>
            <div className="border-t border-b py-3 my-4">
              <p className="text-sm"><strong>Nama Pasien:</strong> {user?.name || 'Pengguna'}</p>
              <p className="text-sm"><strong>Tanggal Diagnosa:</strong> {currentDate}</p>
            </div>
            <h2 className="text-lg font-semibold mb-2">Hasil Diagnosa</h2>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center print:hidden">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-bold">{result.disease.name}</h3>
                <span className={`severity-badge ${getSeverityClass(result.disease.severity)} print:bg-gray-200 print:text-gray-800`}>
                  {result.disease.severity}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 print:text-gray-600">
                Tingkat keparahan: {result.disease.severity}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 print:text-gray-700">
            <strong>Deskripsi:</strong> {result.disease.description}
          </p>

          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-sm">Rekomendasi Perawatan:</h4>
            <ul className="space-y-1.5">
              {result.disease.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm print:text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0 print:bg-gray-600" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-4 print:bg-gray-100">
            <p className="text-xs text-muted-foreground flex items-start gap-2 print:text-gray-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Catatan Penting:</strong> Diagnosis ini bersifat informatif dan tidak menggantikan 
                konsultasi dengan dokter gigi profesional. Segera hubungi dokter gigi untuk pemeriksaan yang lebih akurat.
              </span>
            </p>
          </div>

          {/* Print Footer - Only visible when printing */}
          <div className="hidden print:block print-footer mt-8 pt-4 border-t">
            <p className="text-xs text-gray-500 text-center">
              © 2026 SmileDetect - Universitas Putra Bangsa | Dokumen ini dicetak pada {currentDate}
            </p>
          </div>

          {/* Action Buttons - Hidden when printing */}
          <div className="flex flex-col sm:flex-row gap-3 print:hidden">
            {!isSaved ? (
              <Button
                onClick={handleSave}
                variant="outline"
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                Simpan Riwayat Diagnosa
              </Button>
            ) : (
              <div className="flex-1 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center justify-center gap-2 font-medium">
                <CheckCircle className="h-5 w-5" />
                Hasil Diagnosa Tersimpan
              </div>
            )}
            <Button
              onClick={handlePrint}
              variant="outline"
              className="sm:w-auto"
            >
              <Printer className="mr-2 h-4 w-4" />
              Cetak Laporan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
