
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { useTheme } from '../theme/ThemeContext';
import { GalleryItem } from '../types';
import { QuillIcon, ScrollIcon, QuoteIcon, RuneIcon } from '../components/ui/Icons';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { generateGalleryItemLore } from '../services/geminiService';
import toast from 'react-hot-toast';


const iconMap: { [key: string]: React.FC } = {
    QuillIcon,
    ScrollIcon,
    QuoteIcon,
    RuneIcon
};

const GalleryPage: React.FC = () => {
    const { theme } = useTheme();
    const { galleryItems, collectedArtifactIds, toggleArtifact } = useJunAiKeyData();
    
    const [filter, setFilter] = useState<'All' | GalleryItem['type']>('All');
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [lore, setLore] = useState<string | null>(null);
    const [isLoreLoading, setIsLoreLoading] = useState(false);

    const filteredItems = galleryItems.filter(item => filter === 'All' || item.type === filter);
    
    const handleInvokeInsight = async (item: GalleryItem) => {
        setLore(null);
        setIsLoreLoading(true);
        setSelectedItem(item);
        try {
            const generatedLore = await generateGalleryItemLore(item.name.split('|||')[0], item.description.split('|||')[0], theme.abilities.systemInstruction);
            setLore(generatedLore);
        } catch (error) {
            console.error("Failed to generate lore:", error);
            toast.error("The ether is silent. Could not divine the lore.");
        } finally {
            setIsLoreLoading(false);
        }
    };
    
    const handleToggleArtifact = (e: React.MouseEvent, item: GalleryItem) => {
      e.stopPropagation();
      toggleArtifact(item.id);
      const isCollected = collectedArtifactIds.includes(item.id);
      if(!isCollected) {
        toast.success(`Collected ${item.name.split('|||')[0]}!`);
      } else {
        toast.success(`Released ${item.name.split('|||')[0]}.`);
      }
    }

    const handleCloseModal = () => {
        setSelectedItem(null);
        setLore(null);
    }

    const filterButtons: ('All' | GalleryItem['type'])[] = ['All', 'Artifact', 'Phrase', 'Rune', 'Item'];

    return (
        <div className="space-y-8">
            <header>
                 <TrilingualText as="h1" text={theme.vocabulary.navGallery} />
                 <TrilingualText as="p" text={theme.vocabulary.gallerySubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>
            
            <Card>
                <div className="flex flex-wrap gap-2">
                    {filterButtons.map(f => (
                        <Button 
                            key={f} 
                            variant={filter === f ? 'primary' : 'ghost'} 
                            onClick={() => setFilter(f)}
                        >
                            {f === 'All' ? f : `${f}s`}
                        </Button>
                    ))}
                </div>
            </Card>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item: GalleryItem) => {
                        const IconComponent = iconMap[item.icon];
                        const isCollected = collectedArtifactIds.includes(item.id);
                        return (
                            <Card 
                              key={item.id} 
                              glow={isCollected} 
                              className={`flex flex-col cursor-pointer transition-all duration-300 ${isCollected ? 'border-primary' : ''}`}
                              onClick={() => handleInvokeInsight(item)}
                            >
                                <div className="flex flex-col items-center text-center flex-grow">
                                    <div className={`transition-colors duration-300 ${isCollected ? 'text-primary' : 'text-foreground/50'}`}>
                                        {IconComponent ? React.createElement(IconComponent) : null}
                                    </div>
                                    <TrilingualText as="h3" text={item.name} className="mt-4 text-xl font-bold text-card-foreground" />
                                    <TrilingualText as="p" text={item.description} className="text-sm text-card-foreground/70 mt-2 flex-grow" />
                                    <span className="mt-4 px-2 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent">
                                        {item.type}
                                    </span>
                                </div>
                                <Button variant={isCollected ? 'ghost' : 'secondary'} className="w-full mt-4" onClick={(e) => handleToggleArtifact(e, item)}>
                                    {isCollected ? 'Release' : 'Collect'}
                                </Button>
                            </Card>
                        )
                    })}
                </div>
            ) : (
                <Card>
                    <p className="text-center text-card-foreground/70">The Treasury is empty for this category. Embark on your journey to discover new artifacts.</p>
                </Card>
            )}
             <Modal isOpen={!!selectedItem} onClose={handleCloseModal} title={selectedItem?.name || ''}>
                {isLoreLoading ? (
                    <div className="flex justify-center items-center h-24">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <TrilingualText text={selectedItem?.description || ''} className="mb-4 italic text-card-foreground/80"/>
                        <p className="text-card-foreground">{lore}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default GalleryPage;
