
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import Button from '../components/ui/Button';
import { SparklesIcon } from '../components/ui/Icons';
import { v4 as uuidv4 } from 'uuid';
import { getCoreInsight } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';

interface Note {
  id: string;
  content: string;
  timestamp: string;
  wisdom?: string;
}

const OmniNotePage: React.FC = () => {
  const { theme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoadingWisdom, setIsLoadingWisdom] = useState<string | null>(null);

  const handleSaveNote = () => {
    if (!newNote.trim()) {
      toast.error('Note content cannot be empty.');
      return;
    }
    const note: Note = {
      id: uuidv4(),
      content: newNote.trim(),
      timestamp: new Date().toISOString(),
    };
    setNotes(prev => [note, ...prev]);
    setNewNote('');
    toast.success('Note saved!');
  };
  
  const handleDistillWisdom = async (noteId: string) =>