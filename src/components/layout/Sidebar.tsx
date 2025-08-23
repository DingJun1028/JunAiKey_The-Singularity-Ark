import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavLinks } from '../../constants';
import TrilingualText from '../ui/TrilingualText';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navLinks = useNavLinks();

  const navLinkClasses = ({ isActive }: {isActive: boolean}) => `
    group flex items-center px-3 py-2 text-sm font-medium rounded-md
    transition-colors duration-200
    ${isActive
      ? 'bg-primary text-background shadow-lg'
      : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
    }
  `;

  const sidebarContent = (
    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex-shrink-0 flex items-center px-4 text-3xl font-bold font-heading relative text-foreground">
          <span className="absolute inset-0 bg-primary opacity-0 animate-pulse-logo rounded-full"></span>
          <span className="text-primary">JunAiKey</span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navLinks.map((item) => (
            <NavLink key={item.href} to={item.href} className={navLinkClasses} aria-disabled={item.disabled} onClick={e => {
              if (item.disabled) e.preventDefault();
              if (sidebarOpen) setSidebarOpen(false);
            }}>
              {React.cloneElement(item.icon, { className: 'h-6 w-6 mr-3' })}
              <TrilingualText text={item.name} as="span" lineClassName="text-left leading-tight" showPinyin={false} />
            </NavLink>
          ))}
        </nav>
      </div>
  );

  return (
    <>
       <style>{`
        @keyframes pulse-logo {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.5);
          }
        }
        .animate-pulse-logo {
          animation: pulse-logo 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-card border-r border-border">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {sidebarContent}
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-card border-r border-border">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default Sidebar;