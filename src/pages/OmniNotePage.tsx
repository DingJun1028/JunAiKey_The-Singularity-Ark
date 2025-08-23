
import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { MemoryIcon, OracleIcon, BeakerIcon, SanctumIcon } from '../components/ui/Icons';
import { MemoryRecord } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';


// Mapping memory types to icons and colors
const memoryTypeDetails: { [key in MemoryRecord['type']]: { Icon: React.FC; color: 'secondary' | 'accent' | 'primary' | 'foreground' } } = {
  conversation: { Icon: OracleIcon, color: 'secondary' },
  agent_action: { Icon: BeakerIcon, color: 'accent' },
  system_event: { Icon: SanctumIcon, color: 'primary' },
};

type MemoryType = MemoryRecord['type'];

const OmniNotePage: React.FC = () => {
  const { theme, themeMode } = useTheme();
  const { memories, loading } = useJunAiKeyData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<MemoryType>>(new Set());

  const activePalette = theme.palette[themeMode];

  const toggleFilter = (filter: MemoryType) => {
    setActiveFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const filteredMemories = useMemo(() => {
    let filtered = memories;

    if (activeFilters.size > 0) {
      filtered = filtered.filter(m => activeFilters.has(m.type));
    }

    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [memories, searchTerm, activeFilters]);

  const memoryFilters: MemoryType[] = ['conversation', 'agent_action', 'system_event'];

  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.omniNoteTitle} />
        <TrilingualText as="p" text={theme.vocabulary.omniNoteSubtitle} className="text-lg text-foreground/70 mt-2" />
      </header>
      
      <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
             <input
                type="text"
                placeholder="Search memories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                {memoryFilters.map(filter => (
                    <Button 
                        key={filter} 
                        variant={activeFilters.has(filter) ? 'primary' : 'ghost'} 
                        onClick={() => toggleFilter(filter)}
                        className="capitalize"
                    >
                        {filter.replace('_', ' ')}
                    </Button>
                ))}
                 <Button 
                    variant={'ghost'} 
                    onClick={() => setActiveFilters(new Set())}
                    disabled={activeFilters.size === 0}
                >
                    Clear
                </Button>
            </div>
          </div>
      </Card>
      
      {loading ? (
        <div className="space-y-4 pt-8">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
      ) : (
      <div className="relative pt-8">
          {filteredMemories.length > 0 && <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>}

          <div className="space-y-12">
            <AnimatePresence>
            {filteredMemories.length > 0 ? (
                filteredMemories.map((memory: MemoryRecord, index) => {
                    const { Icon, color } = memoryTypeDetails[memory.type] || { Icon: MemoryIcon, color: 'foreground' };
                    const isLeft = index % 2 === 0;

                    return (
                        <motion.div
                            layout
                            key={memory.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="relative flex items-start"
                        >
                            <div className={`hidden md:block absolute top-5 w-1/2 h-0.5 bg-border ${isLeft ? 'right-1/2' : 'left-1/2'}`}></div>
                            <div className="absolute top-3 left-4 md:left-1/2 w-6 h-6 bg-background border-4 rounded-full -translate-x-1/2" style={{borderColor: activePalette[color]}}></div>
                            
                            <div className={`w-full md:w-1/2 pl-12 ${isLeft ? 'md:pl-0 md:pr-12' : 'md:ml-[50%] md:pl-12'}`}>
                                <Card>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-full mt-1" style={{backgroundColor: `${activePalette[color]}20`, color: activePalette[color]}}>
                                            <Icon />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-card-foreground">{memory.content}</p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-card-foreground/50 mt-2">
                                               <span>{new Date(memory.timestamp).toLocaleString()}</span>
                                               <span className="px-2 py-0.5 rounded-full capitalize" style={{backgroundColor: `${activePalette[color]}20`, color: activePalette[color]}}>{memory.type.replace('_', ' ')}</span>
                                               {memory.metadata?.agentId && <span className="font-mono">Agent: {memory.metadata.agentId}</span>}
                                               {memory.metadata?.chatId && <span className="font-mono">Chat: {memory.metadata.chatId.substring(0,8)}...</span>}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    )
                })
            ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                <Card className="text-center py-12">
                    <p className="text-card-foreground/70">The Memory Vault is empty or no memories match your filters.</p>
                </Card>
                </motion.div>
            )}
            </AnimatePresence>
          </div>
      </div>
      )}
    </div>
  );
};

export default OmniNotePage;
