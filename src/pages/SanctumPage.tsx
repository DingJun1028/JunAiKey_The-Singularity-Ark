
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';
import TrilingualText from '../components/ui/TrilingualText';
import Button from '../components/ui/Button';
import { invokeCoreCommand } from '../services/geminiService';
import toast from 'react-hot-toast';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';

const SanctumPage: React.FC = () => {
    const { theme } = useTheme();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<{ command: string; response: string }[]>([]);
    const [currentResponse, setCurrentResponse] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const commands = ['/core-analyze', '/refactor-check', '/propose-arch'];

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [currentResponse, history]);

    const handleCommand = async (commandToRun: string) => {
        if (!commandToRun || isLoading) return;

        setInput(commandToRun);
        setIsLoading(true);
        setCurrentResponse('');

        try {
            const stream = await invokeCoreCommand(commandToRun);
            let responseText = '';
            for await (const chunk of stream) {
                responseText += chunk.text;
                setCurrentResponse(responseText);
            }
            setHistory(prev => [...prev, { command: commandToRun, response: responseText }]);
        } catch (error) {
            console.error("Error invoking core command:", error);
            toast.error("The AI Core is unresponsive.");
            const errorResponse = `ERROR: Command "${commandToRun}" failed.\n\n${error instanceof Error ? error.message : 'Unknown error'}`;
            setHistory(prev => [...prev, { command: commandToRun, response: errorResponse }]);
        } finally {
            setIsLoading(false);
            setCurrentResponse('');
            setInput('');
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
    }

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] bg-background/50 border border-border rounded-xl shadow-2xl shadow-primary/10">
            <header className="p-4 border-b border-border flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <TrilingualText as="h1" text={theme.vocabulary.sanctumTitle} className="text-center flex-grow font-mono" />
            </header>

            <div ref={containerRef} className="flex-grow p-6 overflow-y-auto font-mono text-base text-foreground/90 leading-relaxed">
                <p className="text-secondary opacity-80">Welcome to the AI Core Terminal. Issue your command.</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                    <p className="opacity-60 text-sm">Suggestions:</p>
                    {commands.map((cmd) => (
                        <Button
                          key={cmd}
                          variant="ghost"
                          className="!py-1 !px-2 !text-xs !font-mono"
                          onClick={() => handleCommand(cmd)}
                          disabled={isLoading}
                        >
                            {cmd}
                        </Button>
                    ))}
                </div>
                <br />
                {history.map((entry, index) => (
                    <div key={index} className="mb-6">
                        <p className="text-accent"><span className="text-primary">&gt;</span> {entry.command}</p>
                        <div className="pl-4 border-l-2 border-border/30">
                            <MarkdownRenderer content={entry.response} />
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="mb-6">
                        <p className="text-accent"><span className="text-primary">&gt;</span> {input}</p>
                        <div className="pl-4 border-l-2 border-border/30">
                           <MarkdownRenderer content={currentResponse} />
                           <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-4">
                <span className="text-primary font-bold">&gt;</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Issue a core command..."
                    className="flex-grow bg-transparent font-mono text-lg text-foreground focus:outline-none"
                    disabled={isLoading}
                    autoFocus
                />
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Awaiting...' : 'Invoke'}
                </Button>
            </form>
        </div>
    );
};

export default SanctumPage;