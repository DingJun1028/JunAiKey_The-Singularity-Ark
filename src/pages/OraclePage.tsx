
import React, { useState, useEffect, useRef } from 'react';
import { GenerateContentResponse, Chat } from '@google/genai';
import { startKnowledgeChat } from '../services/geminiService';
import { useTheme } from '../theme/ThemeContext';
import { ChatMessage } from '../types';
import Button from '../components/ui/Button';
import TrilingualText from '../components/ui/TrilingualText';
import Spinner from '../components/ui/Spinner';
import { OracleIcon, UserIcon } from '../components/ui/Icons';
import toast from 'react-hot-toast';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';

const OraclePage: React.FC = () => {
    const { theme } = useTheme();
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { addMemory, searchMemories } = useJunAiKeyData();

    useEffect(() => {
        // Chat is initialized when a message is first sent.
        setMessages([{
            id: 'init',
            role: 'model',
            text: "I am the Oracle, a vessel of vast knowledge. Ask, and I shall seek the truth, from the deepest archives to the ever-flowing stream of current events.",
        }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        
        const aiMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: aiMessageId, text: '', role: 'model' }]);
        
        const query = input;
        setInput('');
        setIsLoading(true);

        try {
            const relevantMemories = searchMemories(query);
            const activeChat = chat || startKnowledgeChat(relevantMemories);
            if (!chat) setChat(activeChat);

            const stream = await activeChat.sendMessageStream({ message: query });
            let fullResponseText = '';
            let finalChunk: GenerateContentResponse | null = null;
            
            for await (const chunk of stream) {
                fullResponseText += chunk.text;
                finalChunk = chunk;
                setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, text: fullResponseText } : msg));
            }

            const groundingChunks = finalChunk?.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (groundingChunks && groundingChunks.length > 0) {
                 setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, groundingChunks } : msg));
            }
            
            // Add conversation to memory
            addMemory({
                type: 'conversation',
                content: `User asked: "${query}". AI responded: "${fullResponseText}"`,
                metadata: { chatId: 'oracle_page' }
            });

        } catch (error) {
            const errorMessage = "The connection to knowledge streams has been severed. Please try again when the connection is restored.";
            setMessages(prev => prev.map(msg => msg.id === aiMessageId ? {...msg, text: errorMessage } : msg));
            toast.error("Failed to get response from Oracle.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col h-[calc(100vh-10rem)]">
             <header className="mb-4">
                <TrilingualText as="h1" text={theme.vocabulary.oracleTitle} />
                <TrilingualText as="p" text={theme.vocabulary.oracleSubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>

            <div className="flex-grow overflow-y-auto pr-4 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && <div className="p-2 bg-secondary/10 text-secondary rounded-full"><OracleIcon /></div>}
                        <div className={`max-w-2xl flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-background rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none border border-border'}`}>
                                {msg.text ? <p className="whitespace-pre-wrap">{msg.text}</p> : <Spinner />}
                            </div>
                             {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                                <div className="mt-3 px-1">
                                    <h4 className="font-semibold text-sm text-foreground/70 mb-2">{theme.vocabulary.oracleSources.split('|||')[0]}</h4>
                                    <ul className="space-y-1 list-disc list-inside">
                                        {msg.groundingChunks.map((chunk, index) => {
                                            if (!chunk.web?.uri) return null;
                                            return (
                                                <li key={index}>
                                                    <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-secondary text-sm hover:underline" title={chunk.web.title}>
                                                        {chunk.web.title || new URL(chunk.web.uri).hostname}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                         {msg.role === 'user' && <div className="p-2 bg-primary/10 text-primary rounded-full"><UserIcon /></div>}
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
                <form onSubmit={handleSend} className="flex items-center gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={theme.vocabulary.oraclePlaceholder?.split('|||')[0] || "Ask anything..."}
                        className="flex-grow p-4 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow"
                        disabled={isLoading}
                    />
                    <Button type="submit" variant="secondary" className="!py-4 !px-6" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Spinner/> : 'Send'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default OraclePage;
