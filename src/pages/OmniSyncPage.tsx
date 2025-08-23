
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import Button from '../components/ui/Button';
import { SupabaseIcon, GitHubIcon, AITableIcon, CapacitiesIcon } from '../components/ui/Icons';
import { useTheme } from '../theme/ThemeContext';
import Skeleton from '../components/ui/Skeleton';
import { Palette } from '../types';

interface ServiceStatus {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    status: 'connecting' | 'connected' | 'pending' | 'error';
    lastSync: string;
}

const initialServices: ServiceStatus[] = [
    { id: 'supabase', name: 'Supabase', description: 'Core database and backend services.', icon: React.createElement(SupabaseIcon), status: 'connecting', lastSync: '...' },
    { id: 'github', name: 'GitHub', description: 'Code repository and CI/CD pipeline.', icon: React.createElement(GitHubIcon), status: 'connecting', lastSync: '...' },
    { id: 'aitable', name: 'AITable.ai', description: 'AI-native database for knowledge vectors.', icon: React.createElement(AITableIcon), status: 'connecting', lastSync: '...' },
    { id: 'capacities', name: 'Capacities', description: 'Object-based note-taking integration.', icon: React.createElement(CapacitiesIcon), status: 'connecting', lastSync: '...' }
];

const OmniSyncPage: React.FC = () => {
    const { theme, themeMode } = useTheme();
    const [services, setServices] = useState<ServiceStatus[]>(initialServices);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState<Record<string, boolean>>({});
    const [isSyncingAll, setIsSyncingAll] = useState(false);

    const handleSync = (serviceId: string) => {
        setIsSyncing(prev => ({ ...prev, [serviceId]: true }));
        setServices(prev => prev.map(s => s.id === serviceId ? { ...s, status: 'connecting', lastSync: 'Syncing...' } : s));

        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% chance of success
            setServices(prev => prev.map(s => s.id === serviceId ? { 
                ...s, 
                status: success ? 'connected' : 'error', 
                lastSync: success ? new Date().toLocaleString() : 'Failed to sync'
            } : s));
            setIsSyncing(prev => ({ ...prev, [serviceId]: false }));
        }, 1500 + Math.random() * 1000);
    };

    const handleSyncAll = () => {
        setIsSyncingAll(true);
        services.forEach((service, index) => {
            setTimeout(() => {
                handleSync(service.id);
            }, index * 300);
        });
        setTimeout(() => setIsSyncingAll(false), services.length * 300 + 2000);
    };

    useEffect(() => {
        const fetchStatuses = () => {
            setIsInitialLoading(true);
            const timeouts = [
                setTimeout(() => setServices(prev => prev.map(s => s.id === 'supabase' ? {...s, status: 'connected', lastSync: new Date().toLocaleString()} : s)), 800),
                setTimeout(() => setServices(prev => prev.map(s => s.id === 'github' ? {...s, status: 'connected', lastSync: new Date(Date.now() - 3600000).toLocaleString()} : s)), 1200),
                setTimeout(() => setServices(prev => prev.map(s => s.id === 'aitable' ? {...s, status: 'pending', lastSync: 'Never'} : s)), 1500),
                setTimeout(() => {
                    setServices(prev => prev.map(s => s.id === 'capacities' ? {...s, status: 'error', lastSync: new Date(Date.now() - 86400000).toLocaleString()} : s));
                    setIsInitialLoading(false);
                }, 2000),
            ];
            return () => timeouts.forEach(clearTimeout);
        };
        fetchStatuses();
    }, []);
    
    const statusStyles: { [key: string]: { text: keyof Palette; label: string } } = {
        connecting: { text: 'secondary', label: 'Connecting...' },
        connected: { text: 'success', label: 'Connected' },
        pending: { text: 'accent', label: 'Pending' },
        error: { text: 'error', label: 'Error' }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <TrilingualText as="h1" text={theme.vocabulary.omniSyncTitle} />
                    <TrilingualText as="p" text={theme.vocabulary.omniSyncSubtitle} className="text-lg text-foreground/70 mt-2" />
                </div>
                 <Button variant="primary" onClick={handleSyncAll} disabled={isSyncingAll || isInitialLoading}>
                    {isSyncingAll ? 'Synchronizing All...' : 'Synchronize All'}
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(service => {
                    const styles = statusStyles[service.status];
                    const activePalette = theme.palette[themeMode];
                    const color = activePalette[styles.text] || '#ffffff';
                    const isServiceSyncing = isSyncing[service.id];

                    return (
                        <Card key={service.name}>
                            {isInitialLoading ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-8 w-32" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-5 w-3/4" />
                                    <div className="border-t border-border pt-4 mt-4">
                                        <Skeleton className="h-10 w-28 ml-auto" />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-4">
                                            {service.icon}
                                            <h3 className="text-xl font-bold text-card-foreground">{service.name}</h3>
                                        </div>
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-500`} style={{backgroundColor: `${color}20`, color: color}}>
                                            <span className={`w-2 h-2 mr-2 rounded-full ${service.status === 'connecting' ? 'animate-pulse' : ''}`} style={{backgroundColor: color}}></span>
                                            {styles.label}
                                        </div>
                                    </div>
                                    <p className="text-card-foreground/70 mt-2 flex-grow">{service.description}</p>
                                    <div className="mt-6 border-t border-border pt-4 flex justify-between items-center">
                                        <p className="text-xs text-card-foreground/50">Last Sync: {service.lastSync}</p>
                                        <Button variant="ghost" onClick={() => handleSync(service.id)} disabled={isServiceSyncing || service.status === 'connecting'}>
                                            {isServiceSyncing ? 'Syncing...' : 'Manual Sync'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    )
                })}
            </div>
        </div>
    );
};

export default OmniSyncPage;
