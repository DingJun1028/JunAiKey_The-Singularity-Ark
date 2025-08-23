
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { UserIcon, TrashIcon, PlusIcon, XIcon } from '../components/ui/Icons';
import { Reorder } from 'framer-motion';
import { BoardColumn, BoardCard } from '../types';
import Button from '../components/ui/Button';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const AddCardForm: React.FC<{
    columnId: string;
    onAddCard: (columnId: string, title: string) => void;
}> = ({ columnId, onAddCard }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAddCard(columnId, title.trim());
            setTitle('');
            setIsAdding(false);
        }
    };

    if (!isAdding) {
        return (
            <Button variant="ghost" onClick={() => setIsAdding(true)} className="w-full mt-2">
                + Add a card
            </Button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-2 space-y-2">
            <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this card..."
                className="w-full p-2 bg-background/80 border border-border rounded-lg text-foreground focus:ring-1 focus:ring-secondary focus:outline-none"
                rows={3}
                autoFocus
            />
            <div className="flex items-center gap-2">
                <Button type="submit" variant="primary">Add Card</Button>
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
        </form>
    );
};

const AddColumn: React.FC<{ onAddColumn: (title: string) => void }> = ({ onAddColumn }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAddColumn(title.trim());
            setTitle('');
            setIsAdding(false);
        }
    };

    if (!isAdding) {
        return (
            <Button 
                variant="ghost" 
                onClick={() => setIsAdding(true)} 
                className="w-full h-full min-h-24 bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center gap-2"
            >
                <PlusIcon className="h-5 w-5" /> Add another list
            </Button>
        );
    }

    return (
        <div className="bg-card/40 rounded-xl p-2 h-full flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter list title..."
                    className="w-full p-2 bg-background/80 border border-border rounded-lg text-foreground focus:ring-1 focus:ring-secondary focus:outline-none"
                    autoFocus
                />
                <div className="flex items-center gap-2">
                    <Button type="submit" variant="primary">Add List</Button>
                    <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="!p-2">
                        <XIcon className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

const ProjectBoardPage: React.FC = () => {
    const { theme } = useTheme();
    const { boardColumns, setBoardData } = useJunAiKeyData();
    const [columns, setColumns] = useState<BoardColumn[]>(boardColumns || []);

    useEffect(() => {
        setColumns(boardColumns || []);
    }, [boardColumns]);

    const handleSetData = (newColumns: BoardColumn[]) => {
        setColumns(newColumns);
        setBoardData(newColumns);
    };

    const handleAddCard = (columnId: string, title: string) => {
        const newCard: BoardCard = { id: uuidv4(), title };
        const newColumns = columns.map(col => {
            if (col.id === columnId) {
                return { ...col, cards: [...col.cards, newCard] };
            }
            return col;
        });
        handleSetData(newColumns);
        toast.success("Card added!");
    };
    
    const handleCardReorder = (columnId: string, reorderedCards: BoardCard[]) => {
        const newColumns = columns.map(col => {
            if(col.id === columnId) {
                return {...col, cards: reorderedCards};
            }
            return col;
        });
        handleSetData(newColumns);
    };

    const handleAddColumn = (title: string) => {
        const newColumn: BoardColumn = {
            id: uuidv4(),
            title,
            description: '',
            cards: [],
        };
        handleSetData([...columns, newColumn]);
        toast.success("Column added!");
    };
    
    const handleDeleteCard = (columnId: string, cardId: string) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            const newColumns = columns.map(col => {
                if (col.id === columnId) {
                    return { ...col, cards: col.cards.filter(card => card.id !== cardId) };
                }
                return col;
            });
            handleSetData(newColumns);
            toast.success("Card deleted.");
        }
    };
    
    const handleDeleteColumn = (columnId: string) => {
        if (window.confirm('Are you sure you want to delete this column and all its cards?')) {
            const newColumns = columns.filter(col => col.id !== columnId);
            handleSetData(newColumns);
            toast.success("Column deleted.");
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navProjectBoard} />
                <TrilingualText as="p" text={theme.vocabulary.projectBoardSubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>
            
            <div className="flex items-start gap-6 overflow-x-auto pb-4">
                <Reorder.Group
                    axis="x"
                    values={columns}
                    onReorder={handleSetData}
                    className="flex items-start gap-6"
                >
                    {columns.map((column) => (
                        <Reorder.Item key={column.id} value={column} className="h-full w-80 flex-shrink-0">
                             <div className="bg-card/40 rounded-xl p-4 h-full flex flex-col">
                                <div className="flex justify-between items-center mb-1 px-2 cursor-grab">
                                    <h2 className="font-bold text-lg">{column.title}</h2>
                                    <Button variant="ghost" className="!p-1" onClick={() => handleDeleteColumn(column.id)} aria-label="Delete column">
                                        <TrashIcon className="h-4 w-4 text-foreground/50 hover:text-error" />
                                    </Button>
                                </div>
                                <p className="text-sm text-foreground/60 mb-4 px-2">{column.description}</p>
                                <Reorder.Group
                                    values={column.cards}
                                    onReorder={(newCards) => handleCardReorder(column.id, newCards)}
                                    className="space-y-3 flex-grow min-h-[60px]"
                                >
                                    {column.cards.map((card) => (
                                        <Reorder.Item
                                            key={card.id}
                                            value={card}
                                            className="cursor-grab"
                                            whileDrag={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                                        >
                                            <Card className="p-4 w-full relative group">
                                                <p>{card.title}</p>
                                                <Button
                                                    variant="ghost"
                                                    className="!absolute !top-2 !right-2 !p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleDeleteCard(column.id, card.id)}
                                                    aria-label="Delete card"
                                                >
                                                    <TrashIcon className="h-4 w-4 text-foreground/50 hover:text-error" />
                                                </Button>
                                                {card.assignees && card.assignees.length > 0 && (
                                                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                                                        {card.assignees.map(assignee => (
                                                            <span key={assignee} className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/80">
                                                                <UserIcon className="h-4 w-4" />
                                                                {assignee}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </Card>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                                <AddCardForm columnId={column.id} onAddCard={handleAddCard} />
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                <div className="w-80 flex-shrink-0">
                     <AddColumn onAddColumn={handleAddColumn} />
                </div>
            </div>
        </div>
    );
};

export default ProjectBoardPage;
