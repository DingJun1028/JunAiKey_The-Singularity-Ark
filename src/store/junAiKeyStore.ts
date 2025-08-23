
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { Agent, Rule, CustomPage, JunAiKeyState, GalleryItem, ElementalGuardian, MemoryRecord, Tag, BoardColumn, Announcement } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { initialGuardians } from '../data/guardians';
import { projectBoardData as initialProjectBoardDataRaw } from '../data/project-board';

const initialAgents: Agent[] = [
  { id: '1', name: 'Agent-SarahK', avatar: 'https://i.pravatar.cc/100?u=sarah', currentLevel: 'Tier 2', engagement: 88, accuracy: 92, lastSession: new Date(Date.now() - 86400000).toISOString(), learningPathId: 'lp1' },
  { id: '2', name: 'Agent-Ding', avatar: 'https://i.pravatar.cc/100?u=dingching', currentLevel: 'Tier 3', engagement: 95, accuracy: 85, lastSession: new Date(Date.now() - 172800000).toISOString(), learningPathId: 'lp2' },
  { id: '3', name: 'Agent-JDoe', avatar: 'https://i.pravatar.cc/100?u=john', currentLevel: 'Tier 1', engagement: 65, accuracy: 78, lastSession: new Date().toISOString(), learningPathId: 'lp3' },
];

const initialRules: Rule[] = [
    {
        id: 'adaptive-engine-core',
        name: 'Core Adaptive Engine',
        description: 'Dynamically adjusts system resources based on agent performance.',
        conditions: [],
        actions: [],
        priority: 10,
        enabled: true,
        eternal: true,
        tags: ['AI', 'Performance', 'Core Logic'],
    },
];

const initialGalleryItems: GalleryItem[] = [
  { id: 'item1', name: 'Golden Feather Pen|||金色羽毛筆', description: 'An ethereal pen that scribes lessons of light. Said to improve the clarity of generated content.', type: 'Artifact', icon: 'QuillIcon', themeId: 'sacred_covenant', effect: {type: 'clarity', value: 5 } },
  { id: 'item2', name: 'Scroll of Illumination|||啟迪卷軸', description: 'A sacred scroll containing the foundational edicts of the learning path.', type: 'Artifact', icon: 'ScrollIcon', themeId: 'sacred_covenant', effect: {type: 'devotion', value: 8 } },
  { id: 'item3', name: 'Whisper of Truth|||真理的低語', description: '"Clarity is not found, but forged in the crucible of practice."|||"清晰不是被發現的，而是在實踐的熔爐中鍛造出來的。"', type: 'Phrase', icon: 'QuoteIcon', themeId: 'sacred_covenant', chineseExplanation: '這句箴言強調了持續努力在達到精通和理解過程中的重要性。' },
  { id: 'item4', name: 'Rune of Comprehension|||理解符文', description: 'A glowing rune that, when invoked, clarifies complex grammatical structures.', type: 'Rune', icon: 'RuneIcon', themeId: 'sacred_covenant' },
];

const initialMemories: MemoryRecord[] = [
    { id: 'mem1', type: 'system_event', timestamp: new Date(Date.now() - 3600000).toISOString(), content: "Agent-SarahK initialized and passed diagnostics.", metadata: { agentId: '1' } },
    { id: 'mem2', type: 'agent_action', timestamp: new Date(Date.now() - 1800000).toISOString(), content: "Analyzed user prompt regarding 'quantum entanglement'.", metadata: { agentId: '1' } },
    { id: 'mem3', type: 'system_event', timestamp: new Date().toISOString(), content: "Successfully routed data to OmniSync for backup.", metadata: { agentId: '1' } },
    { id: 'mem4', type: 'agent_action', timestamp: new Date(Date.now() - 7200000).toISOString(), content: "Triggered rule 'adaptive-engine-core' due to performance deviation.", metadata: { agentId: '2', ruleId: 'adaptive-engine-core' } },
    { id: 'mem5', type: 'conversation', timestamp: new Date(Date.now() - 360000).toISOString(), content: 'User asked Oracle: "What is the capital of Mongolia?"', metadata: { chatId: 'oracle_page' } },
    { id: 'mem6', type: 'system_event', timestamp: new Date(Date.now() - 9000000).toISOString(), content: "Agent-JDoe flagged for sub-optimal engagement metrics. Rule 'notify-admin' triggered.", metadata: { agentId: '3' } },
];

const initialAnnouncements: Announcement[] = [
    {
        id: 'announcement-1',
        icon: 'system',
        title: 'Welcome to JunAiKey v5.0!',
        description: 'The Quantum Codex edition is now live. Explore the new OmniMatrix and Evolution Nexus.',
        timestamp: new Date().toISOString(),
        href: '/app/manifesto'
    },
    {
        id: 'announcement-2',
        icon: 'success',
        title: 'Project Chimera Deployed',
        description: 'The Global Transaction Bus is now operational, enabling true bi-directional sync.',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        href: '/app/architecture'
    },
    {
        id: 'announcement-3',
        icon: 'info',
        title: 'New "Solutions Hub" Page',
        description: 'Check out the new Solutions Hub for pre-built blueprints and guides.',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        href: '/app/solutions-hub'
    }
];

const getInitialBoardDataWithIds = (): BoardColumn[] => {
    return initialProjectBoardDataRaw.map(column => ({
        ...column,
        id: uuidv4(),
        cards: column.cards.map(card => ({
            ...card,
            id: uuidv4(),
        }))
    }));
};

const JUNAIKEY_STORAGE_KEY = 'junaikey-storage-v3';

const saveState = (state: Partial<JunAiKeyState>) => {
    try {
        const stateToSave = { 
          rules: state.rules, 
          galleryItems: state.galleryItems, 
          customPages: state.customPages,
          collectedArtifactIds: state.collectedArtifactIds,
          activeGuardianIds: state.activeGuardianIds,
          memories: state.memories,
          boardColumns: state.boardColumns,
          announcements: state.announcements,
          lastCheckedAnnouncements: state.lastCheckedAnnouncements,
        };
        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem(JUNAIKEY_STORAGE_KEY, serializedState);
    } catch (e) {
        console.error("Could not save state to localStorage", e);
    }
};

const loadState = (): Partial<Omit<JunAiKeyState, 'agents' | 'elementalGuardians' | 'loading' | 'initialize' | 'addRule' | 'getRuleById' | 'updateRule' | 'addCustomPage' | 'toggleArtifact' | 'toggleGuardian' | 'addMemory' | 'searchMemories' | 'getClarityBoost' | 'getDevotionBoost' | 'getSystemEfficiencyBoost' | 'getAiInsightBoost'>> => {
    try {
        const serializedState = localStorage.getItem(JUNAIKEY_STORAGE_KEY);
        if (serializedState === null) {
            return { 
                rules: initialRules, 
                galleryItems: initialGalleryItems,
                customPages: [], 
                collectedArtifactIds: ['item2'],
                activeGuardianIds: [],
                memories: initialMemories,
                boardColumns: getInitialBoardDataWithIds(),
                announcements: initialAnnouncements,
                lastCheckedAnnouncements: new Date(0).toISOString(),
            };
        }
        const loaded = JSON.parse(serializedState);
        return {
            rules: loaded.rules || initialRules,
            galleryItems: loaded.galleryItems || initialGalleryItems,
            customPages: loaded.customPages || [],
            collectedArtifactIds: loaded.collectedArtifactIds || [],
            activeGuardianIds: loaded.activeGuardianIds || [],
            memories: loaded.memories && loaded.memories.length > 0 ? loaded.memories : initialMemories,
            boardColumns: loaded.boardColumns || getInitialBoardDataWithIds(),
            announcements: loaded.announcements || initialAnnouncements,
            lastCheckedAnnouncements: loaded.lastCheckedAnnouncements || new Date(0).toISOString(),
        };
    } catch (e) {
        console.error("Could not load state from localStorage", e);
        return { 
            rules: initialRules, 
            galleryItems: initialGalleryItems,
            customPages: [], 
            collectedArtifactIds: [],
            activeGuardianIds: [],
            memories: initialMemories,
            boardColumns: getInitialBoardDataWithIds(),
            announcements: initialAnnouncements,
            lastCheckedAnnouncements: new Date(0).toISOString(),
        };
    }
};

export const useJunAiKeyStore = createWithEqualityFn<JunAiKeyState>((set, get) => {
    
    const persistedState = loadState();

    const store: JunAiKeyState = {
        agents: initialAgents,
        rules: initialRules,
        galleryItems: initialGalleryItems,
        elementalGuardians: initialGuardians,
        customPages: [],
        collectedArtifactIds: [],
        activeGuardianIds: [],
        memories: [],
        boardColumns: [],
        announcements: [],
        lastCheckedAnnouncements: new Date(0).toISOString(),
        ...persistedState,
        loading: true,

        initialize: () => set({ loading: false }),

        updateRule: (updatedRule: Rule) => {
            set((state) => {
                const newRules = state.rules.map((rule) => (rule.id === updatedRule.id ? updatedRule : rule));
                saveState({ ...get(), rules: newRules });
                return { rules: newRules };
            });
        },
        addRule: (newRule: Omit<Rule, 'id'>) => {
            const ruleWithId = { ...newRule, id: uuidv4() };
            set((state) => {
                const newRules = [...state.rules, ruleWithId];
                saveState({ ...get(), rules: newRules });
                return { rules: newRules };
            });
            return ruleWithId;
        },
        getRuleById: (id: string) => get().rules.find(rule => rule.id === id),
        getAgentById: (id: string) => get().agents.find(agent => agent.id === id),

        addCustomPage: (page: Omit<CustomPage, 'id'>) => {
            set((state) => {
                const newPage = { ...page, id: uuidv4() };
                const newPages = [...state.customPages, newPage];
                saveState({ ...get(), customPages: newPages });
                return { customPages: newPages };
            });
        },
        
        addMemory: (memory: Omit<MemoryRecord, 'id' | 'timestamp'>) => {
            set((state) => {
                const newMemory: MemoryRecord = {
                    ...memory,
                    id: uuidv4(),
                    timestamp: new Date().toISOString(),
                };
                const newMemories = [newMemory, ...state.memories];
                saveState({ ...get(), memories: newMemories });
                return { memories: newMemories };
            });
        },
        
        searchMemories: (query: string) => {
            const lowerCaseQuery = query.toLowerCase();
            return get().memories
                .filter(memory => memory.content.toLowerCase().includes(lowerCaseQuery))
                .slice(0, 5); // Return top 5 relevant memories for simplicity
        },

        toggleArtifact: (artifactId: string) => {
            set(state => {
                const currentIds = new Set(state.collectedArtifactIds);
                if (currentIds.has(artifactId)) {
                    currentIds.delete(artifactId);
                } else {
                    currentIds.add(artifactId);
                }
                const newCollectedIds = Array.from(currentIds);
                saveState({ ...get(), collectedArtifactIds: newCollectedIds });
                return { collectedArtifactIds: newCollectedIds };
            });
        },
        toggleGuardian: (guardianId: string) => {
            set(state => {
                const currentIds = new Set(state.activeGuardianIds);
                if (currentIds.has(guardianId)) {
                    currentIds.delete(guardianId);
                } else {
                    currentIds.add(guardianId);
                }
                const newActiveIds = Array.from(currentIds);
                saveState({ ...get(), activeGuardianIds: newActiveIds });
                return { activeGuardianIds: newActiveIds };
            });
        },

        getAllTags: () => {
            const tagCountMap = new Map<string, number>();
            get().rules.forEach(rule => {
                rule.tags?.forEach(tag => {
                    tagCountMap.set(tag, (tagCountMap.get(tag) || 0) + 1);
                });
            });
            return Array.from(tagCountMap.entries())
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
        },
        
        renameTag: (oldName: string, newName: string) => {
            set(state => {
                const newRules = state.rules.map(rule => {
                    if (!rule.tags?.includes(oldName)) return rule;
                    const newTags = Array.from(new Set(rule.tags.map(t => t === oldName ? newName : t)));
                    return { ...rule, tags: newTags };
                });
                saveState({ ...get(), rules: newRules });
                return { rules: newRules };
            });
        },
        
        deleteTag: (tagName: string) => {
            set(state => {
                const newRules = state.rules.map(rule => {
                    if (!rule.tags?.includes(tagName)) return rule;
                    const newTags = rule.tags.filter(t => t !== tagName);
                    return { ...rule, tags: newTags };
                });
                saveState({ ...get(), rules: newRules });
                return { rules: newRules };
            });
        },
        
        mergeTags: (sourceTagNames: string[], destinationTagName: string) => {
            set(state => {
                const sourceSet = new Set(sourceTagNames);
                const newRules = state.rules.map(rule => {
                    const hasSourceTags = rule.tags?.some(t => sourceSet.has(t));
                    if (!hasSourceTags) return rule;

                    const newTags = Array.from(new Set([
                        ...(rule.tags?.filter(t => !sourceSet.has(t)) || []),
                        destinationTagName
                    ]));
                    return { ...rule, tags: newTags };
                });
                 saveState({ ...get(), rules: newRules });
                return { rules: newRules };
            });
        },
        
        setBoardData: (newBoardData: BoardColumn[]) => {
            set(() => {
                saveState({ ...get(), boardColumns: newBoardData });
                return { boardColumns: newBoardData };
            });
        },

        markAllAnnouncementsAsRead: () => {
            set(() => {
                const newTimestamp = new Date().toISOString();
                saveState({ ...get(), lastCheckedAnnouncements: newTimestamp });
                return { lastCheckedAnnouncements: newTimestamp };
            });
        },

        getClarityBoost: () => {
            return get().galleryItems.reduce((total, item) => {
                if (get().collectedArtifactIds.includes(item.id) && item.effect?.type === 'clarity') {
                    return total + (item.effect.value || 0);
                }
                return total;
            }, 0);
        },
        getDevotionBoost: () => {
             return get().galleryItems.reduce((total, item) => {
                if (get().collectedArtifactIds.includes(item.id) && item.effect?.type === 'devotion') {
                    return total + (item.effect.value || 0);
                }
                return total;
            }, 0);
        },
        getSystemEfficiencyBoost: () => {
            return get().elementalGuardians.reduce((total, guardian) => {
                if (get().activeGuardianIds.includes(guardian.id) && guardian.effect.type === 'efficiency') {
                    return total + (guardian.effect.value || 0);
                }
                return total;
            }, 0);
        },
        getAiInsightBoost: () => {
            return get().elementalGuardians.reduce((total, guardian) => {
                if (get().activeGuardianIds.includes(guardian.id) && guardian.effect?.type === 'insight') {
                    return total + (guardian.effect.value || 0);
                }
                return total;
            }, 0);
        }
    };
    return store;
}, shallow);