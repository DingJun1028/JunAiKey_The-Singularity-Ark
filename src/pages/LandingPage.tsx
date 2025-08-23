
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCoreInsight, generateLandingPageContent } from '../services/geminiService';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import { fallbackTheme } from '../theme/themes';
import { SunIcon, MoonIcon } from '../components/ui/Icons';

const Logo = () => {
    return (
        <div className="flex items-center cursor-pointer">
            <div className="flex-shrink-0 relative">
                <span className="absolute inset-0 bg-primary opacity-0 animate-pulse-logo rounded-full"></span>
                <h2 className="text-3xl font-bold text-primary">JunAiKey</h2>
            </div>
        </div>
    );
}

const Header = () => {
    const { themeMode, toggleTheme } = useTheme();
    return (
    <header className="bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <Logo />
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#" className="font-medium text-foreground/80 hover:text-primary transition-colors">Features</a>
                    <a href="#" className="font-medium text-foreground/80 hover:text-primary transition-colors">Docs</a>
                    <a href="#" className="font-medium text-foreground/80 hover:text-primary transition-colors">Community</a>
                </nav>
                <div className="flex items-center space-x-2">
                     <button onClick={toggleTheme} className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors" aria-label="Toggle theme">
                        {themeMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                    <Button as={Link} to="/app/omni-matrix" variant="primary" className="hidden sm:block">
                        Open IDE
                    </Button>
                     <Button as={Link} to="/app/omni-matrix" variant="ghost">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    </header>
)};

const Hero = () => {
    const { theme, themeMode } = useTheme();
    const [content, setContent] = useState({ headline: '', description: '', tags: [] as string[] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const result = await generateLandingPageContent();
                setContent(result);
            } catch (error) {
                console.error("Failed to generate landing page content:", error);
                setContent({
                    headline: 'The Ultimate Universal System for AI',
                    description: 'Build, evaluate, and monitor AI agents, from prototype to production. JunAiKey brings first-class observability to your entire development workflow.',
                    tags: ['AI Agents', 'Observability', 'Open Source', 'Developer Tools']
                });
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const activePalette = theme.palette[themeMode];

    return (
     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
                <p className="font-semibold" style={{color: activePalette.primary}}>JunAiKey #OmniKey</p>
                {loading ? (
                    <div className="animate-pulse mt-2">
                        <div className="h-12 bg-border rounded-md w-3/4"></div>
                        <div className="h-8 bg-border rounded-md w-1/2 mt-2"></div>
                        <div className="space-y-2 mt-6">
                            <div className="h-4 bg-border/50 rounded w-full"></div>
                            <div className="h-4 bg-border/50 rounded w-5/6"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="mt-2 text-4xl sm:text-5xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                            {content.headline}
                        </h1>
                         <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                            {content.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-full" style={{backgroundColor: `${activePalette.primary}20`, color: activePalette.primary}}>
                                    # {tag}
                                </span>
                            ))}
                        </div>
                        <p className="mt-6 max-w-2xl mx-auto lg:mx-0 text-lg text-foreground/70">
                           {content.description}
                        </p>
                    </>
                )}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                    <Button as={Link} to="/app/omni-matrix" variant="primary" className="!py-3 !px-5 w-full sm:w-auto">
                        Get Started
                    </Button>
                     <Button as="a" href="https://github.com/DingJun1028/junaikeyIOS" target="_blank" variant="ghost" className="!py-3 !px-5 w-full sm:w-auto">
                        View on GitHub
                    </Button>
                </div>
            </div>
            <div className="flex justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1618423447343-856eea923c34?q=80&w=2940&auto=format&fit=crop" 
                    alt="Abstract code visualization" 
                    className="rounded-xl shadow-2xl w-full max-w-lg object-cover aspect-[4/3] border-4 border-border"
                />
            </div>
        </div>
    </div>
    )
};

const CoreInsightSection = () => {
    const [query, setQuery] = useState('');
    const [insight, setInsight] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!query) return;
        setLoading(true);
        setInsight('');
        try {
            const result = await getCoreInsight(query);
            setInsight(result);
        } catch (error) {
            console.error("Failed to get insight:", error);
            setInsight("The core intelligence is currently recalibrating. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background/50 border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-foreground">Consult the Core Intelligence</h2>
                    <p className="mt-4 text-lg text-foreground/70">
                        The JunAiKey AI Core can provide insight for any situation, topic, or element. Test its wisdom.
                    </p>
                </div>
                <div className="mt-8 max-w-xl mx-auto">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter a word, phrase, or concept..."
                            className="flex-grow w-full px-4 py-3 text-base bg-background/80 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                            disabled={loading}
                        />
                        <Button
                            onClick={handleGenerate}
                            disabled={loading || !query}
                            variant="secondary"
                        >
                            {loading ? 'Consulting...' : 'Reveal'}
                        </Button>
                    </div>
                    {insight && (
                        <Card className="mt-6">
                            <p className="text-card-foreground italic text-center">{insight}</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

const Footer = () => (
    <footer className="bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-foreground/60">
            <p>&copy; {new Date().getFullYear()} JunAiKey. All rights reserved.</p>
        </div>
    </footer>
);

const LandingPage = () => {
    const { isLoading } = useTheme();
    
    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center" style={{backgroundColor: fallbackTheme.palette.dark.background}}><Spinner /></div>
    }

  return (
    <div className="font-sans antialiased">
        <Header />
        <main>
            <Hero />
            <CoreInsightSection />
        </main>
        <Footer />
    </div>
  );
};

export default LandingPage;