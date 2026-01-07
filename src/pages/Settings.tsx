import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { clearHistory } from '@/data/diagnosisData';
import { Moon, Sun, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleClearHistory = () => {
    clearHistory();
    toast({
      title: 'Riwayat dihapus',
      description: 'Semua riwayat diagnosa berhasil dihapus.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        <div className="max-w-2xl mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Pengaturan</h1>
          <p className="text-muted-foreground mb-8">
            Kelola preferensi aplikasi Anda
          </p>

          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    {theme === 'dark' ? (
                      <Moon className="w-6 h-6 text-primary" />
                    ) : (
                      <Sun className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Mode Gelap</Label>
                    <p className="text-sm text-muted-foreground">
                      Aktifkan tampilan gelap untuk kenyamanan mata
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>

            {/* Clear History */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Hapus Riwayat</Label>
                    <p className="text-sm text-muted-foreground">
                      Hapus semua riwayat diagnosa yang tersimpan
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleClearHistory}
                >
                  Hapus Semua
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
