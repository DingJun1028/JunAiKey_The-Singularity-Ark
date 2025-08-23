
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import Spinner from '../components/ui/Spinner';

const ManifestoPage: React.FC = () => {
  const { theme } = useTheme();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/src/data/manifesto.md');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Failed to load manifesto:", error);
        setContent("# Error\n\nCould not load the manifesto. Please check the file path and network connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.navManifesto} />
        <TrilingualText as="p" text={theme.vocabulary.manifestoSubtitle} className="text-lg text-foreground/70 mt-2" />
      </header>
      <Card>
        {loading ? (
            <div className="flex justify-center items-center h-96">
                <Spinner />
            </div>
        ) : (
            <MarkdownRenderer content={content} />
        )}
      </Card>
    </div>
  );
};

export default ManifestoPage;
