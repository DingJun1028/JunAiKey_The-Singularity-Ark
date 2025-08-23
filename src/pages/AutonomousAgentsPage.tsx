import React, { useState } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import { initialAutonomousAgents } from '../data/autonomous-agents';
import type { AutonomousAgent, AutonomousAgentAction, Palette } from '../types';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import { SparklesIcon } from '../components/ui/Icons';

const StatusBadge: React.FC<{ status: AutonomousAgent['status'] }> = ({ status }) => {
    const { theme, themeMode } = useTheme();
    const activePalette = theme.palette[themeMode];

    const statusMap: { [key in AutonomousAgent['status']]: { text: keyof Palette, labelKey: keyof typeof theme.vocabulary } } = {
        active: { text: 'success', labelKey: 'statusActive' },
        inactive: { text: 'foreground', labelKey: 'statusInactive' },
        error: { text: 'error', labelKey: 'statusError' },
    };

    const currentStatus = statusMap[status];
    const color = activePalette[currentStatus.text] || activePalette.foreground;

    return (
        <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${status === 'active' ? 'animate-pulse' : ''}`} style={{ backgroundColor: color }}></span>
            <TrilingualText text={theme.vocabulary[currentStatus.labelKey]} as="span" className="font-semibold" style={{ color }} />
        </div>
    );
};

const simulationSteps: { [key: string]: { delay: number, message: string, status: 'info' | 'success' | 'failure' }[] } = {
    'linter-agent': [
        { delay: 1000, message: 'Scanning file system for anomalies...', status: 'info' },
        { delay: 1500, message: 'Found 3 minor inconsistencies.', status: 'info' },
        { delay: 1000, message: 'Applying automated fixes...', status: 'info' },
        { delay: 500, message: 'Code integrity verified. All files compliant.', status: 'success' },
    ],
    'security-agent': [
        { delay: 1000, message: 'Initiating vulnerability scan...', status: 'info' },
        { delay: 2000, message: 'Checking dependencies for known exploits...', status: 'info' },
        { delay: 1500, message: 'No critical vulnerabilities found.', status: 'success' },
        { delay: 500, message: 'Security audit complete. System secure.', status: 'success' },
    ],
    'optimizer-agent': [
        { delay: 1000, message: 'Analyzing system performance metrics...', status: 'info' },
        { delay: 1500, message: 'Identifying performance bottlenecks in OmniFlow.', status: 'info' },
        { delay: 1000, message: 'Re-allocating resources for rule execution.', status: 'info' },
        { delay: 500, message: 'Optimization complete. System efficiency improved by 3%.', status: 'success' },
    ],
};

const AutonomousAgentsPage: React.FC = () => {
    const { theme } = useTheme();
    const [agents, setAgents] = useState<AutonomousAgent[]>(initialAutonomousAgents);
    const [isProtocolRunning, setIsProtocolRunning] = useState(false);

    const addActionToAgent = (agentId: string, description: string, status: 'info' | 'success' | 'failure') => {
        setAgents(prev => prev.map(a =>
            a.id === agentId ? { ...a, actions: [{ timestamp: new Date().toISOString(), description, status }, ...a.actions].slice(0, 10) } : a
        ));
    };

    const runAgentSimulation = async (agentId: string) => {
        const agent = agents.find(a => a.id === agentId);
        if (!agent || agent.status === 'active') return;

        // Set agent to active
        setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'active' } : a));
        addActionToAgent(agentId, 'Activation confirmed. Executing protocol.', 'info');

        // Run simulation
        const steps = simulationSteps[agentId];
        if (steps) {
            for (const step of steps) {
                await new Promise(resolve => setTimeout(resolve, step.delay));
                addActionToAgent(agentId, step.message, step.status);
            }
        }
        
        // Set agent to inactive
        setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'inactive' } : a));
    };
    
    const handlePerfectionProtocol = async () => {
        setIsProtocolRunning(true);
        toast.success('Perfection Protocol Initiated...');

        for (const agent of initialAutonomousAgents) { // Use initial list to ensure order
            await runAgentSimulation(agent.id);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        setIsProtocolRunning(false);
        toast.success('Perfection Protocol Complete. System is Optimal.');
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                 <div>
                    <TrilingualText as="h1" text={theme.vocabulary.navAutonomousAgents} />
                    <TrilingualText as="p" text={theme.vocabulary.autonomousAgentsSubtitle} className="text-lg text-foreground/70 mt-2" />
                </div>
                 <Button variant="primary" onClick={handlePerfectionProtocol} disabled={isProtocolRunning} className="!py-3 !px-5">
                    {isProtocolRunning ? <Spinner /> : <SparklesIcon className="mr-2 h-5 w-5" />}
                    Initiate Perfection Protocol
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                {agents.map(agent => (
                    <Card key={agent.id} className="h-full flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    {React.createElement(agent.icon, { className: 'h-8 w-8' })}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{agent.name}</h3>
                                    <p className="text-sm text-foreground/70 line-clamp-2">{agent.description}</p>
                                </div>
                            </div>
                            <StatusBadge status={agent.status} />
                        </div>

                        <div className="border-t border-border my-4"></div>

                        <div className="space-y-3 flex-grow min-h-[160px] max-h-[160px] overflow-y-auto pr-2">
                             <TrilingualText as="h4" text={theme.vocabulary.agentLog} className="text-sm font-semibold text-foreground/80 mb-2 sticky top-0 bg-card py-1" />
                             {agent.actions.map(action => (
                                 <div key={action.timestamp} className="flex gap-3 text-xs">
                                     <span className="font-mono text-foreground/50 whitespace-nowrap">{new Date(action.timestamp).toLocaleTimeString()}</span>
                                     <p className={`truncate ${action.status === 'failure' ? 'text-error' : 'text-foreground/70'}`}>{action.description}</p>
                                 </div>
                             ))}
                        </div>

                        <div className="border-t border-border mt-4 pt-4">
                            <Button 
                                variant={agent.status === 'active' ? 'ghost' : 'secondary'} 
                                onClick={() => runAgentSimulation(agent.id)}
                                disabled={isProtocolRunning || agent.status === 'active'}
                            >
                                <TrilingualText text={agent.status === 'active' ? theme.vocabulary.statusActive : theme.vocabulary.activateAgent} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AutonomousAgentsPage;