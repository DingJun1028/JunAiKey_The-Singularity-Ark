
import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { generateThemeFromPrompt } from '../../services/geminiService';
import Modal from './Modal';
import Button from './Button';
import Spinner from './Spinner';
import toast from 'react-hot-toast';

interface ThemeChangerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeChangerModal: React.FC<ThemeChangerModalProps> = ({ isOpen, onClose }) => {
  const { setTheme } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGenerate = async () => {
    if (!prompt) {
      toast.error('Please enter a prompt for the theme.');
      return;
    }
    
    setIsLoading(true);
    toast.loading('Generating new theme...');

    try {
      const newTheme = await generateThemeFromPrompt(prompt);
      setTheme(newTheme);
      toast.dismiss();
      toast.success('Theme updated successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to generate theme:', error);
      toast.dismiss();
      toast.error('Could not generate theme. Please try a different prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate New Theme|||生成新主題">
      <div className="space-y-4">
        <p className="text-sm text-card-foreground/70">
          Describe the aesthetic you want for the application. For example: "A dark, cyberpunk theme with neon blues and pinks" or "A light, minimalist theme inspired by Japanese gardens."
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a theme prompt..."
          className="w-full h-24 p-3 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow"
          disabled={isLoading}
        />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Generate'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ThemeChangerModal;
