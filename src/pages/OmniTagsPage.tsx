
import React, { useState, useEffect, useMemo } from 'react';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { useTheme } from '../theme/ThemeContext';
import { Tag } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import TrilingualText from '../components/ui/TrilingualText';
import Modal from '../components/ui/Modal';
import { OmniNoteIcon, TrashIcon } from '../components/ui/Icons';
import toast from 'react-hot-toast';
import Skeleton from '../components/ui/Skeleton';

const OmniTagsPage: React.FC = () => {
    const { theme } = useTheme();
    const { rules, getAllTags, renameTag, deleteTag, mergeTags, loading } = useJunAiKeyData();
    
    const [tags, setTags] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
    const [modal, setModal] = useState<{ type: 'rename' | 'delete' | 'merge' | null; data: any }>({ type: null, data: null });
    const [renameValue, setRenameValue] = useState('');
    const [mergeValue, setMergeValue] = useState('');

    useEffect(() => {
        if (!loading) {
            setTags(getAllTags());
        }
    }, [loading, getAllTags, rules]);

    const filteredTags = useMemo(() => {
        return tags.filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [tags, searchTerm]);

    const handleSelectTag = (tagName: string) => {
        setSelectedTagNames(prev => 
            prev.includes(tagName) ? prev.filter(t => t !== tagName) : [...prev, tagName]
        );
    };

    const handleRename = () => {
        if (!modal.data || !renameValue.trim()) {
            toast.error("New tag name cannot be empty.");
            return;
        }
        if (modal.data.name === renameValue.trim()) {
            setModal({ type: null, data: null });
            return;
        }
        renameTag(modal.data.name, renameValue.trim());
        toast.success(`Tag "${modal.data.name}" renamed to "${renameValue.trim()}".`);
        setModal({ type: null, data: null });
        setSelectedTagNames([]);
    };

    const handleDelete = () => {
        if (!modal.data) return;
        deleteTag(modal.data.name);
        toast.success(`Tag "${modal.data.name}" deleted.`);
        setModal({ type: null, data: null });
        setSelectedTagNames(prev => prev.filter(t => t !== modal.data.name));
    };
    
    const handleMerge = () => {
        if (!mergeValue.trim() || selectedTagNames.length < 2) {
            toast.error("Please select at least two tags and provide a destination tag name.");
            return;
        }
        mergeTags(selectedTagNames, mergeValue.trim());
        toast.success(`Tags merged into "${mergeValue.trim()}".`);
        setModal({ type: null, data: null });
        setSelectedTagNames([]);
    };

    if (loading) {
        return <div className="space-y-4">
            <Skeleton className="h-20 w-1/3 mb-8" />
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-24" />)}
            </div>
        </div>
    }

    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navOmniTags} />
                <TrilingualText as="p" text={theme.vocabulary.omniTagsSubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>

            <Card>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow p-3 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
                    />
                    <Button variant="secondary" onClick={() => setModal({ type: 'merge', data: null })} disabled={selectedTagNames.length < 2}>
                        Merge Selected ({selectedTagNames.length})
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredTags.map(tag => {
                    const isSelected = selectedTagNames.includes(tag.name);
                    return (
                        <Card key={tag.name} className={`relative p-4 transition-all duration-300 ${isSelected ? 'border-primary' : ''}`}>
                            <div className="absolute top-3 right-3">
                                <input type="checkbox" checked={isSelected} onChange={() => handleSelectTag(tag.name)} className="h-5 w-5 rounded text-primary bg-background/50 border-border focus:ring-primary" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-bold text-lg text-card-foreground pr-8">{tag.name}</p>
                                <p className="text-sm text-card-foreground/60">{tag.count} item{tag.count > 1 ? 's' : ''}</p>
                            </div>
                            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                                <Button variant="ghost" className="!p-2" aria-label="Rename" onClick={() => { setRenameValue(tag.name); setModal({ type: 'rename', data: tag });}}>
                                    <OmniNoteIcon className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" className="!p-2 text-error/70 hover:text-error" aria-label="Delete" onClick={() => setModal({ type: 'delete', data: tag })}>
                                    <TrashIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Rename Modal */}
            <Modal isOpen={modal.type === 'rename'} onClose={() => setModal({ type: null, data: null })} title="Rename Tag">
                <div className="space-y-4">
                    <p>Renaming "{modal.data?.name}" will update it across all associated items.</p>
                    <input type="text" value={renameValue} onChange={e => setRenameValue(e.target.value)} className="w-full p-2 bg-background/50 border border-border rounded-md text-foreground focus:ring-1 focus:ring-secondary focus:outline-none" />
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setModal({ type: null, data: null })}>Cancel</Button>
                        <Button variant="primary" onClick={handleRename}>Rename</Button>
                    </div>
                </div>
            </Modal>
            
            {/* Delete Modal */}
             <Modal isOpen={modal.type === 'delete'} onClose={() => setModal({ type: null, data: null })} title="Delete Tag">
                <div className="space-y-4">
                    <p>Are you sure you want to delete the tag "{modal.data?.name}"? This will remove it from {modal.data?.count} item(s) and cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setModal({ type: null, data: null })}>Cancel</Button>
                        <Button variant="primary" className="bg-error hover:bg-opacity-80" onClick={handleDelete}>Delete</Button>
                    </div>
                </div>
            </Modal>

            {/* Merge Modal */}
            <Modal isOpen={modal.type === 'merge'} onClose={() => setModal({ type: null, data: null })} title="Merge Tags">
                <div className="space-y-4">
                    <p>Merging the following tags:</p>
                    <div className="flex flex-wrap gap-2 p-2 bg-background/50 rounded-md border border-border">
                        {selectedTagNames.map(t => <span key={t} className="px-2 py-1 text-sm rounded-full bg-secondary/20 text-secondary">{t}</span>)}
                    </div>
                    <p>Into a single destination tag:</p>
                    <input type="text" placeholder="Enter destination tag name..." value={mergeValue} onChange={e => setMergeValue(e.target.value)} className="w-full p-2 bg-background/50 border border-border rounded-md text-foreground focus:ring-1 focus:ring-secondary focus:outline-none" />
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setModal({ type: null, data: null })}>Cancel</Button>
                        <Button variant="primary" onClick={handleMerge}>Merge</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OmniTagsPage;
