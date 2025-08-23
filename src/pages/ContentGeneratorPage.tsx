
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { generateNewLesson } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { useTheme } from '../theme/ThemeContext';
import TrilingualText from '../components/ui/TrilingualText';

interface Lesson {
  title: string;
  objective: string;
  activities: string[];
}

const ContentGeneratorPage: React.FC = () => {
    const { theme, themeMode } = useTheme();
    const [topic, setTopic] = useState('Beginner phrases for traveling');
    const [generatedLesson, setGeneratedLesson] = useState<Lesson | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setGeneratedLesson(null);
        try {
            const lesson = await generateNewLesson(topic, theme.abilities.systemInstruction);
            setGeneratedLesson(lesson);
            toast.success("A new lesson has been scribed!");
        } catch (error) {
            console.error("Failed to generate lesson:", error);
            toast.error("The divine inspiration is unclear. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navContentGenerator} />
                <TrilingualText as="p" text={theme.vocabulary.contentGeneratorSubtitle} className="text-lg text-foreground/70 mt-1" />
            </header>

            <Card glow>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder={theme.vocabulary.lessonTopicPlaceholder?.split('|||')[0]}
                        className="flex-grow p-3 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
                        disabled={isLoading}
                    />
                    <Button variant="secondary" onClick={handleGenerate} disabled={!topic || isLoading}>
                        <TrilingualText text={isLoading ? theme.vocabulary.scribingButton : theme.vocabulary.scribeLessonButton} />
                    </Button>
                </div>
            </Card>
            
            {isLoading && (
                <Card className="flex justify-center items-center py-12">
                    <Spinner />
                </Card>
            )}

            {generatedLesson && (
                <Card glow>
                    <h2 className="text-2xl font-bold text-primary mb-4 font-heading">{generatedLesson.title}</h2>
                    <p className="text-lg text-card-foreground mb-2"><strong style={{color: theme.palette[themeMode].accent}}>Objective:</strong> {generatedLesson.objective}</p>
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">Activities:</h3>
                        <ul className="list-disc list-inside space-y-2 text-card-foreground/80">
                            {generatedLesson.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default ContentGeneratorPage;
