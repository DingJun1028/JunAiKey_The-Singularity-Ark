
import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import { CodexEntry, CodexElementType, CodexCardType, CodexTier, CodexRarity } from '../types';
import { OMNI_CODEX_DATA } from '../data/omni-codex';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ElementGoldIcon, ElementWoodIcon, ElementWaterIcon, ElementFireIcon, ElementEarthIcon,
    ElementLightIcon, ElementDarkIcon, ElementAetherIcon, ElementNatureIcon, TypePillarIcon, TypeCreatureIcon,
    TypeSpellIcon, TypeArtifactIcon, TypeEnchantmentIcon, TypePlaneswalkerIcon, TypeConceptIcon,
    SanctumIcon, SparklesIcon, BookOpenIcon, ManifestoIcon, ArchitectureIcon, BeakerIcon,
    MatrixIcon, TerminalIcon, TagIcon
} from '../components/ui/Icons';
import Button from '../components/ui/Button';
import { generateOmniCardFromPrompt } from '../services/geminiService';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import { v4 as uuidv4 } from 'uuid';

const elementIcons: Record<CodexElementType, React.FC<{ className?: string }>> = {
    [CodexElementType.Gold]: ElementGoldIcon,
    [CodexElementType.Wood]: ElementWoodIcon,
    [CodexElementType.Water]: ElementWaterIcon,
    [CodexElementType.Fire]: ElementFireIcon,
    [CodexElementType.Earth]: ElementEarthIcon,
    [CodexElementType.Light]: ElementLightIcon,
    [CodexElementType.Dark]: ElementDarkIcon,
    [CodexElementType.Aether]: ElementAetherIcon,
    [CodexElementType.Nature]: ElementNatureIcon,
};

const typeIcons: Record<CodexCardType, React.FC<{ className?: string }>> = {
    [CodexCardType.Pillar]: TypePillarIcon,
    [CodexCardType.Creature]: TypeCreatureIcon,
    [CodexCardType.Spell]: TypeSpellIcon,
    [CodexCardType.Artifact]: TypeArtifactIcon,
    [CodexCardType.Enchantment]: TypeEnchantmentIcon,
    [CodexCardType.Planeswalker]: TypePlaneswalkerIcon,
    [CodexCardType.Concept]: TypeConceptIcon,
};

const iconNameToComponent: Record<string, React.FC<{ className?: string }>> = {
    SanctumIcon, SparklesIcon, BookOpenIcon, ManifestoIcon, ArchitectureIcon, BeakerIcon,
    TypePillarIcon, TypeCreatureIcon, TypeSpellIcon, TypeArtifactIcon, TypeEnchantmentIcon,
    TypePlaneswalkerIcon, TypeConceptIcon, MatrixIcon, TerminalIcon, TagIcon
};

const rarityColors: Record<CodexRarity, string> = {
    [CodexRarity.Common]: 'text-foreground/70',
    [CodexRarity.Uncommon]: 'text-success',
    [CodexRarity.Rare]: 'text-secondary',
    [CodexRarity.Mythic]: 'text-primary',
    [CodexRarity.Legendary]: 'text-accent',
};

const CodexCard: React.FC<{ entry: CodexEntry }> = ({ entry }) => {
    const ElementIcon = elementIcons[entry.element];
    const TypeIcon = typeIcons[entry.type];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="h-full flex flex-col group transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {React.createElement(entry.icon, { className: 'h-6 w-6' })}
                    </div>
                    <div className="flex-1">
                        <TrilingualText as="h4" text={entry.name} className="font-bold text-card-foreground transition-colors group-hover:text-primary" />
                        <div className="flex items-center gap-2 text-xs text-foreground/60 mt-1">
                           <span className={rarityColors[entry.rarity]}>{entry.rarity}</span>
                           <span>&bull;</span>
                           <span>{entry.tier} Tier</span>
                        </div>
                    </div>
                </div>
                <TrilingualText as="p" text={entry.description} className="text-sm text-card-foreground/70 flex-grow" showPinyin={false} />
                 <div className="mt-4 pt-3 border-t border-border/50 flex justify-between items-center text-foreground/50">
                    <div className="flex items-center gap-1.5" title={entry.type}>
                        <TypeIcon className="h-4 w-4" />
                        <span className="text-xs">{entry.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title={entry.element}>
                        <ElementIcon className="h-4 w-4" />
                        <span className="text-xs">{entry.element}</span>
                    </div>
                 </div>
            </Card>
        </motion.div>
    );
};

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2">{children}</div>
    </div>
);

const OmniCodexPage: React.FC = () => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        element: 'All',
        type: 'All',
        tier: 'All',
        rarity: 'All',
    });
    const [generatorPrompt, setGeneratorPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCard, setGeneratedCard] = useState<CodexEntry | null>(null);

    const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };
    
    const handleGenerateCard = async () => {
        if (!generatorPrompt.trim()) {
            toast.error("Please enter a card concept.");
            return;
        }
        setIsGenerating(true);
        setGeneratedCard(null);
        toast.loading("Generating card with AI...");
    
        try {
            const result = await generateOmniCardFromPrompt(generatorPrompt);
    
            const IconComponent = iconNameToComponent[result.iconName] || TypeConceptIcon;
    
            const newCard: CodexEntry = {
                id: `gen-${uuidv4()}`,
                name: result.name,
                description: result.description,
                type: result.type as CodexCardType,
                tier: result.tier as CodexTier,
                element: result.element as CodexElementType,
                rarity: result.rarity as CodexRarity,
                icon: IconComponent,
            };
    
            setGeneratedCard(newCard);
            toast.dismiss();
            toast.success("Omni-Card manifested!");
    
        } catch (error) {
            console.error("Failed to generate card:", error);
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : "The AI is unable to manifest the concept.");
        } finally {
            setIsGenerating(false);
        }
    };

    const filteredEntries = useMemo(() => {
        return OMNI_CODEX_DATA.filter(entry => {
            const searchMatch = searchTerm === '' || entry.name.toLowerCase().includes(searchTerm.toLowerCase()) || entry.description.toLowerCase().includes(searchTerm.toLowerCase());
            const elementMatch = filters.element === 'All' || entry.element === filters.element;
            const typeMatch = filters.type === 'All' || entry.type === filters.type;
            const tierMatch = filters.tier === 'All' || entry.tier === filters.tier;
            const rarityMatch = filters.rarity === 'All' || entry.rarity === filters.rarity;
            return searchMatch && elementMatch && typeMatch && tierMatch && rarityMatch;
        });
    }, [searchTerm, filters]);

    const FilterButton: React.FC<{filterType: keyof typeof filters, value: string, children: React.ReactNode}> = ({filterType, value, children}) => (
        <Button variant={filters[filterType] === value ? 'primary' : 'ghost'} onClick={() => handleFilterChange(filterType, value)} className="!px-2.5 !py-1.5 !text-xs">
            {children}
        </Button>
    )

    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navOmniCodex} />
                <TrilingualText as="p" text={theme.vocabulary.codexSubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                    <Card className="sticky top-24 p-4 space-y-6">
                        <input
                            type="text"
                            placeholder="Search Codex..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
                        />
                        <FilterSection title="Element">
                           <FilterButton filterType="element" value="All">All</FilterButton>
                            {Object.values(CodexElementType).map(el => <FilterButton key={el} filterType="element" value={el}>{el}</FilterButton>)}
                        </FilterSection>
                        <FilterSection title="Card Type">
                            <FilterButton filterType="type" value="All">All</FilterButton>
                            {Object.values(CodexCardType).map(t => <FilterButton key={t} filterType="type" value={t}>{t}</FilterButton>)}
                        </FilterSection>
                         <FilterSection title="Tier">
                            <FilterButton filterType="tier" value="All">All</FilterButton>
                            {Object.values(CodexTier).map(t => <FilterButton key={t} filterType="tier" value={t}>{t}</FilterButton>)}
                        </FilterSection>
                        <FilterSection title="Rarity">
                            <FilterButton filterType="rarity" value="All">All</FilterButton>
                            {Object.values(CodexRarity).map(r => <FilterButton key={r} filterType="rarity" value={r}>{r}</FilterButton>)}
                        </FilterSection>
                    </Card>
                </aside>
                
                <main className="lg:col-span-3 space-y-6">
                     <Card>
                        <h2 className="text-2xl font-bold text-card-foreground mb-4">✨ 萬能卡牌生成器 ✨</h2>
                        <div className="space-y-4">
                            <textarea
                                value={generatorPrompt}
                                onChange={(e) => setGeneratorPrompt(e.target.value)}
                                placeholder="Enter a card concept, e.g., 'A spell that rewinds time for one turn' or 'A creature that represents the system's core security protocols'."
                                className="w-full p-3 h-24 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
                                disabled={isGenerating}
                            />
                            <div className="flex justify-end">
                                <Button variant="primary" onClick={handleGenerateCard} disabled={isGenerating}>
                                    {isGenerating ? <Spinner /> : 'Generate Omni-Card'}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                         <AnimatePresence>
                            {isGenerating && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="md:col-span-2 xl:col-span-3"
                                >
                                    <Card className="h-full flex flex-col justify-center items-center p-8 border-dashed border-2 border-primary/50">
                                        <Spinner />
                                        <p className="mt-4 text-primary animate-pulse">Manifesting concept...</p>
                                    </Card>
                                </motion.div>
                            )}
                            {generatedCard && <CodexCard key={generatedCard.id} entry={generatedCard} />}
                            {filteredEntries.map(entry => <CodexCard key={entry.id} entry={entry} />)}
                         </AnimatePresence>
                    </motion.div>
                    {filteredEntries.length === 0 && !generatedCard && !isGenerating && (
                        <Card className="text-center py-20">
                            <p className="text-lg text-foreground/70">No entries match your criteria.</p>
                            <p className="text-sm text-foreground/50 mt-1">Try adjusting your filters.</p>
                        </Card>
                    )}
                </main>
            </div>
        </div>
    );
};

export default OmniCodexPage;
