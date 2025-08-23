
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { generateImagesFromPrompt } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { useTheme } from '../theme/ThemeContext';
import TrilingualText from '../components/ui/TrilingualText';
import { PhotoIcon } from '../components/ui/Icons';

const ImageAltarPage: React.FC = () => {
    const { theme } = useTheme();
    const [prompt, setPrompt] = useState('A divine key made of celestial light, floating in a nebula, surrounded by glowing runes, epic, fantasy, digital painting');
    const [numberOfImages, setNumberOfImages] = useState<number>(1);
    const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16" | "4:3" | "3:4">("1:1");
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const aspectRatios: { value: "1:1" | "16:9" | "9:16" | "4:3" | "3:4", label: string }[] = [
        { value: '1:1', label: 'Square (1:1)' },
        { value: '16:9', label: 'Widescreen (16:9)' },
        { value: '9:16', label: 'Portrait (9:16)' },
        { value: '4:3', label: 'Landscape (4:3)' },
        { value: '3:4', label: 'Tall (3:4)' },
    ];

    const inputClass = "w-full p-2 bg-background/50 border border-border rounded-md text-foreground focus:ring-1 focus:ring-secondary focus:outline-none";

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter a prompt to conjure an image.");
            return;
        }

        setIsLoading(true);
        setGeneratedImages([]);
        toast.loading('Conjuring images from the aether...');

        try {
            const imageBytesArray = await generateImagesFromPrompt(prompt, numberOfImages, aspectRatio);
            const imageUrls = imageBytesArray.map(bytes => `data:image/jpeg;base64,${bytes}`);
            setGeneratedImages(imageUrls);
            toast.dismiss();
            toast.success("Visions have manifested!");
        } catch (error) {
            console.error("Failed to generate images:", error);
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : "The aether is turbulent. Could not conjure images.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navImageAltar || 'Image Altar|||圖像祭壇'} />
                <TrilingualText as="p" text={theme.vocabulary.imageAltarSubtitle || 'Conjure visions from the aether with descriptive words.'} className="text-lg text-foreground/70 mt-2" />
            </header>

            <Card glow>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-foreground/70">Prompt</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the vision you wish to manifest..."
                            className={`${inputClass} h-24`}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="text-sm font-medium text-foreground/70">Number of Images</label>
                            <select value={numberOfImages} onChange={e => setNumberOfImages(Number(e.target.value))} className={inputClass} disabled={isLoading}>
                                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground/70">Aspect Ratio</label>
                            <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value as any)} className={inputClass} disabled={isLoading}>
                                {aspectRatios.map(ar => <option key={ar.value} value={ar.value}>{ar.label}</option>)}
                            </select>
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <Button variant="primary" onClick={handleGenerate} disabled={isLoading} className="!py-3 !px-6">
                            {isLoading ? <Spinner /> : <TrilingualText text={theme.vocabulary.generateImagesButton || 'Conjure Images'} />}
                        </Button>
                    </div>
                </div>
            </Card>

            {isLoading && (
                <Card className="flex flex-col items-center justify-center py-24 text-center">
                    <Spinner />
                    <p className="mt-4 text-lg font-semibold text-primary animate-pulse">
                         <TrilingualText text={theme.vocabulary.conjuringImagesButton || 'Conjuring...'} />
                    </p>
                    <p className="text-sm text-foreground/70 mt-1">Drawing power from the visual streams...</p>
                </Card>
            )}

            {generatedImages.length > 0 && !isLoading && (
                <Card>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {generatedImages.map((src, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <img
                                    src={src}
                                    alt={`Generated image ${index + 1}`}
                                    className="w-full h-auto rounded-lg border-2 border-border shadow-lg"
                                />
                            </motion.div>
                        ))}
                    </div>
                </Card>
            )}

            {!isLoading && generatedImages.length === 0 && (
                 <Card className="text-center py-20 border-2 border-dashed border-border/50 bg-transparent shadow-none">
                     <div className="flex justify-center text-foreground/30 mb-4">
                        <PhotoIcon className="h-16 w-16" />
                     </div>
                    <p className="text-lg font-medium text-foreground/70">The Altar is waiting for your command.</p>
                    <p className="text-sm text-foreground/50">Describe a vision to begin the ritual.</p>
                </Card>
            )}
        </div>
    );
};

export default ImageAltarPage;
