import React from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import Skeleton from '../components/ui/Skeleton';
import { useTheme } from '../theme/ThemeContext';
import { useNavigate } from 'react-router-dom';

const OmniAgentsPage: React.FC = () => {
  const { agents, loading, memories } = useJunAiKeyData();
  const { theme, themeMode } = useTheme();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Skeleton className="h-20 w-1/3 mb-8" />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  const activePalette = theme.palette[themeMode];

  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.omniAgentsTitle} />
        <TrilingualText as="p" text={theme.vocabulary.omniAgentsSubtitle} className="text-lg text-foreground/70 mt-2" />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent) => {
            const agentMemories = memories.filter(m => m.metadata?.agentId === agent.id);
            const latestMemory = agentMemories.length > 0 ? agentMemories[0] : null;

            return (
              <Card 
                key={agent.id} 
                className="transition-all hover:border-primary/50 cursor-pointer flex flex-col"
                onClick={() => navigate(`/app/omni-agents/${agent.id}`)}
              >
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 text-center">
                        <img className="h-20 w-20 rounded-full border-4 border-primary/20 mx-auto" src={agent.avatar} alt={agent.name} />
                        <span className="mt-2 text-xs font-bold px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/80">{agent.currentLevel}</span>
                    </div>

                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-card-foreground">{agent.name}</h3>
                        <p className="text-sm text-card-foreground/70 mb-3">Last Sync: {new Date(agent.lastSession).toLocaleDateString()}</p>
                        
                        <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold w-24 text-right" style={{color: activePalette.secondary}}>Engagement</span>
                                <div className="w-full bg-border rounded-full h-2.5">
                                    <div className="h-2.5 rounded-full" style={{ width: `${agent.engagement}%`, backgroundColor: activePalette.secondary }}></div>
                                </div>
                                <span className="text-sm font-semibold w-10 text-left" style={{color: activePalette.secondary}}>{agent.engagement}%</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold w-24 text-right" style={{color: activePalette.accent}}>Accuracy</span>
                                <div className="w-full bg-border rounded-full h-2.5">
                                    <div className="h-2.5 rounded-full" style={{ width: `${agent.accuracy}%`, backgroundColor: activePalette.accent }}></div>
                                </div>
                                <span className="text-sm font-semibold w-10 text-left" style={{color: activePalette.accent}}>{agent.accuracy}%</span>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
                
                {latestMemory && (
                    <div className="mt-4 pt-4 border-t border-border text-sm">
                        <h4 className="font-semibold text-card-foreground/80 mb-1">Latest Memory:</h4>
                        <p className="text-card-foreground/60 italic line-clamp-2">"{latestMemory.content}"</p>
                    </div>
                )}
              </Card>
            )
        })}
      </div>
    </div>
  );
};

export default OmniAgentsPage;