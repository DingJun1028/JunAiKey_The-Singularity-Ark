

import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { useTheme } from '../../theme/ThemeContext';
import Spinner from '../ui/Spinner';
import type { Theme, Palette } from '../../types';
import OracleChat from '../ui/OracleChat';
import ThemeChangerModal from '../ui/ThemeChangerModal';
import AnnouncementsPanel from './AnnouncementsPanel';


const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -20, scale: 1.02 },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const GlobalStyles = ({ theme, themeMode }: { theme: Theme; themeMode: 'light' | 'dark' }) => {
    const activePalette: Palette = theme.palette[themeMode] || theme.palette.light;
    const fontHeading = theme.fonts.heading.replace(/"/g, '').replace(/ /g, '+');
    const fontBody = theme.fonts.body.replace(/"/g, '').replace(/ /g, '+');
    const fontMonospace = theme.fonts.monospace.replace(/"/g, '').replace(/ /g, '+');
    
    // Create the full font URL
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontHeading}:wght@400;700&family=${fontBody}:wght@400;700&family=${fontMonospace}:wght@400&display=swap`;

    return (
    <style>{`
      @import url('${fontUrl}');
      
      :root {
        ${Object.keys(activePalette).map(key => `--color-${key}: ${activePalette[key]};`).join('\n')}
      }

      h1, h2, h3, h4, h5, h6 { font-family: ${theme.fonts.heading}; color: var(--color-foreground); }
      body { 
        font-family: ${theme.fonts.body}; 
        background-color: var(--color-background); 
        color: var(--color-foreground);
        transition: background-color 0.5s ease, color 0.5s ease;
      }
      pre, code, .font-mono { font-family: ${theme.fonts.monospace}; }
      h1 { font-size: 2.25rem; line-height: 2.5rem; font-weight: 700; }
      h2 { font-size: 1.875rem; line-height: 2.25rem; font-weight: 700; }
      h3 { font-size: 1.5rem; line-height: 2rem; font-weight: 600; }
      p { color: var(--color-foreground-muted, var(--color-foreground)); }
    `}</style>
    );
};

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isAnnouncementsPanelOpen, setAnnouncementsPanelOpen] = useState(false);
  const location = useLocation();
  const { theme, themeMode, isLoading } = useTheme();

  if (isLoading) {
      return (
          <div className="min-h-screen flex justify-center items-center" style={{backgroundColor: '#121212'}}>
              <Spinner />
          </div>
      )
  }

  return (
    <>
    <GlobalStyles theme={theme} themeMode={themeMode} />
    <ThemeChangerModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
    <AnnouncementsPanel isOpen={isAnnouncementsPanelOpen} onClose={() => setAnnouncementsPanelOpen(false)} />
    <div className="min-h-screen bg-transparent font-sans">
       <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div style={{backgroundSize: '400% 400%', backgroundImage: 'radial-gradient(ellipse at top, var(--color-primary), transparent 70%), radial-gradient(ellipse at bottom, var(--color-secondary), transparent 70%)'}} className="absolute inset-0 opacity-10 animate-aurora-bg"></div>
      </div>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative lg:pl-64 flex flex-col flex-1">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--color-card)',
              color: 'var(--color-card-foreground)',
              border: '1px solid var(--color-border)',
            },
          }}
        />
        <Header 
            setSidebarOpen={setSidebarOpen} 
            onOpenThemeModal={() => setIsThemeModalOpen(true)}
            onToggleAnnouncements={() => setAnnouncementsPanelOpen(prev => !prev)}
        />
        <main className="flex-1 pb-8">
            <AnimatePresence mode="wait">
                 <motion.div
                    key={location.pathname}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                 >
                    <div className="px-4 sm:px-6 lg:px-8 py-8">
                        <Outlet />
                    </div>
                </motion.div>
            </AnimatePresence>
        </main>
      </div>
      <OracleChat />
    </div>
    </>
  );
}

export default Layout;