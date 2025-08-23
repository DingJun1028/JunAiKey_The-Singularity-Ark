
import React from 'react';
import type { Theme } from './types';
import { useTheme } from './theme/ThemeContext';
import { useJunAiKeyStore } from './store/junAiKeyStore';
import { GenericIcon } from './components/ui/Icons';
import { OMNI_ARCHITECTURE_DATA } from './data/omni-architecture';

interface NavLinkItem {
  name: string;
  href: string;
  icon: React.ReactElement<{ className?: string }>;
  disabled?: boolean;
}

export const useNavLinks = () => {
  const { theme } = useTheme();
  const customPages = useJunAiKeyStore(state => state.customPages);

  const staticLinks: NavLinkItem[] = OMNI_ARCHITECTURE_DATA.flatMap(dim => dim.modules).map(module => ({
    name: theme.vocabulary[module.nameKey as keyof typeof theme.vocabulary] || String(module.nameKey),
    href: module.href,
    icon: React.createElement(module.icon),
  }));

  const dynamicLinks: NavLinkItem[] = customPages.map(page => ({
      name: page.name,
      href: `/app${page.path.startsWith('/') ? page.path : `/${page.path}`}`,
      icon: React.createElement(GenericIcon, { path: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" }),
  }));

  return [...staticLinks, ...dynamicLinks];
};


export const OPERATORS = [
    { value: 'eq', label: 'Equals' },
    { value: 'neq', label: 'Not Equals' },
    { value: 'gt', label: 'Greater Than' },
    { value: 'lt', 'label': 'Less Than' },
    { value: 'contains', label: 'Contains' },
];

export const ACTION_TYPES = [
    { value: 'transform', label: 'Transform Data' },
    { value: 'route', label: 'Route to System' },
    { value: 'notify', label: 'Send Notification' },
    { value: 'custom', label: 'Execute Custom Function' },
];