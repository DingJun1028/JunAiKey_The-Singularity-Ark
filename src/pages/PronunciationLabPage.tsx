
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { generatePronunciationFeedback } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { MicrophoneIcon } from '../components/ui/Icons';
import { useTheme } from '../theme/ThemeContext';
import TrilingualText from '../components/ui/TrilingualText';

const PronunciationLabPage: React.FC = () => {
    const { theme } = useTheme();
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const { agents } = useJunAiKeyData();

    const practicePhrase = "The world is full of wonders.";
    const activeAgent = agents[0] || { currentLevel: 'B1' };

    const handleRecordToggle = () => {
        if (isRecording) {
            setIsRecording(false);
            getFeedback();
        } else {
            setIsRecording(true);
            setFeedback(null);
        }
    };
    
    const getFeedback = async () => {
        setIsLoading(true);
        try {
            const result = await generatePronunciationFeedback(practicePhrase, activeAgent.currentLevel, theme.abilities.systemInstruction);
            setFeedback(result);
            toast.success("Feedback received from the ether!");
        } catch (error) {
            console.error("Failed to get pronunciation feedback:", error);
            toast.error("Could not analyze your voice. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navPronunciationLab} />
                <TrilingualText as="p" text={theme.vocabulary.pronunciationLabSubtitle} className="text-lg text-foreground/70 mt-2"/>
            </header>

            <Card glow className="text-center">
                 <TrilingualText as="p" text={theme.vocabulary.recitePhrasePrompt} className="text-lg text-card-foreground/80 mb-4" />
                <div className="p-6 border-2 border-dashed border-primary/50 rounded-xl bg-primary/5">
                    <p className="text-4xl font-semibold text-primary" style={{fontFamily: theme.fonts.heading}}>
                        "{practicePhrase}"
                    </p>
                </div>
            </Card>

            <div className="flex justify-center">
                <Button 
                    variant={isRecording ? 'primary' : 'secondary'}
                    onClick={handleRecordToggle}
                    disabled={isLoading}
                    className="flex items-center space-x-3 !px-8 !py-4 !text-lg rounded-full"
                >
                    <MicrophoneIcon />
                    <TrilingualText as="span" text={isRecording ? theme.vocabulary.stopRecitingButton : theme.vocabulary.beginRecitalButton} />
                </Button>
            </div>
            
            { isRecording && <p className="text-center text-error animate-pulse">Listening...</p>}

            {isLoading && (
                <Card className="flex justify-center items-center py-12">
                    <Spinner />
                </Card>
            )}
            
            {feedback && !isLoading && (
                 <Card glow>
                    <TrilingualText as="h3" text={theme.vocabulary.divineFeedback} className="text-xl font-bold text-accent mb-2" />
                    <p className="text-card-foreground/90 text-lg">{feedback}</p>
                 </Card>
            )}
        </div>
    );
};

export default PronunciationLabPage;
