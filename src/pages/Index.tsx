import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TabNavigation, TabType } from '@/components/TabNavigation';
import { DiagnosisForm } from '@/components/DiagnosisForm';
import { HistoryList } from '@/components/HistoryList';
import { DiseaseList } from '@/components/DiseaseList';
import { HealthTips } from '@/components/HealthTips';
import { DentistLocator } from '@/components/DentistLocator';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'tips');

  useEffect(() => {
    if (tabParam && ['diagnosa', 'riwayat', 'penyakit', 'tips'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleStartDiagnosis = () => {
    setActiveTab('diagnosa');
    setSearchParams({ tab: 'diagnosa' });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'diagnosa':
        return <DiagnosisForm />;
      case 'riwayat':
        return <HistoryList />;
      case 'penyakit':
        return <DiseaseList />;
      case 'tips':
        return (
          <>
            <HealthTips />
            <DentistLocator />
          </>
        );
      default:
        return (
          <>
            <HealthTips />
            <DentistLocator />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <HeroSection onStartDiagnosis={handleStartDiagnosis} />
      
      <main className="flex-1">
        <div className="container mx-auto px-4">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="pb-12">
            {renderTabContent()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
