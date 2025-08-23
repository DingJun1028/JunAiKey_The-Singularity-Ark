
import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import TrilingualText from '../ui/TrilingualText';
import { SunIcon, MoonIcon, ThemeIcon, BellIcon } from '../ui/Icons';
import { useJunAiKeyStore } from '../../store/junAiKeyStore';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  onOpenThemeModal: () => void;
  onToggleAnnouncements: () => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, onOpenThemeModal, onToggleAnnouncements }) => {
  const { theme, themeMode, toggleTheme } = useTheme();
  const { announcements, lastCheckedAnnouncements } = useJunAiKeyStore(state => ({
    announcements: state.announcements,
    lastCheckedAnnouncements: state.lastCheckedAnnouncements,
  }));
  const unreadCount = announcements.filter(a => new Date(a.timestamp) > new Date(lastCheckedAnnouncements)).length;

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-background/95 backdrop-blur-xl shadow-md border-b border-border">
      <button type="button" className="px-4 border-r border-border text-foreground/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary lg:hidden" onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          {/* Search bar can go here if needed */}
        </div>
        <div className="ml-4 flex items-center md:ml-6 gap-2">
           <button onClick={onOpenThemeModal} className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors" aria-label="Change theme">
            <ThemeIcon />
          </button>
          <button onClick={onToggleAnnouncements} className="relative p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors" aria-label="Toggle Announcements">
            <BellIcon />
            {unreadCount > 0 && (
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-error ring-2 ring-background" />
            )}
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors" aria-label="Toggle theme">
            {themeMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <div className="relative">
            <div className="flex items-center">
              <TrilingualText text={theme.vocabulary.systemStatus} as="span" className="text-foreground/80 text-sm font-medium mr-3 text-right" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${theme.palette[themeMode]?.success || '#508C69'}20`, color: theme.palette[themeMode]?.success || '#508C69' }}>
                <svg className="-ml-0.5 mr-1.5 h-2 w-2" style={{color: theme.palette[themeMode]?.success || '#508C69'}} fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                <TrilingualText text={theme.vocabulary.statusOptimal} as="span" showPinyin={false}/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;