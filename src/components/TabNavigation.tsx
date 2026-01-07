import { Stethoscope, History, BookOpen, Heart } from 'lucide-react';

type TabType = 'diagnosa' | 'riwayat' | 'penyakit' | 'tips';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'diagnosa' as TabType, label: 'Diagnosa', icon: Stethoscope },
  { id: 'riwayat' as TabType, label: 'Riwayat', icon: History },
  { id: 'penyakit' as TabType, label: 'Penyakit Gigi', icon: BookOpen },
  { id: 'tips' as TabType, label: 'Tips Kesehatan', icon: Heart },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex justify-center py-6">
      <div className="tab-container flex-wrap justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`tab-item ${isActive ? 'tab-item-active' : 'tab-item-inactive'}`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { TabType };
