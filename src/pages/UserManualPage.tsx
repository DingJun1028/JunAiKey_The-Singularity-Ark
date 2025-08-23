
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import Spinner from '../components/ui/Spinner';

const UserManualPage: React.FC = () => {
  const { theme } = useTheme();
  const [manualContent, setManualContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManual = async () => {
        try {
            const response = await fetch('/src/data/user-manual.md');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            setManualContent(text);
        } catch (error) {
            console.error("Failed to load user manual:", error);
            setManualContent("# Error\n\nCould not load the user manual. Please check the network connection and file path.");
        } finally {
            setLoading(false);
        }
    };

    fetchManual();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.navUserManual} />
        <TrilingualText as="p" text={theme.vocabulary.userManualSubtitle} className="text-lg text-foreground/70 mt-2" />
      </header>
      <Card>
        {loading ? (
            <div className="flex justify-center items-center h-96">
                <Spinner />
            </div>
        ) : (
            <MarkdownRenderer content={manualContent} />
        )}
      </Card>
    </div>
  );
};

export default UserManualPage;
