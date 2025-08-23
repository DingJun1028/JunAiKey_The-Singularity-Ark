

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJunAiKeyStore } from '../../store/junAiKeyStore';
import { startOracleChat } from '../../services/geminiService';
import { Chat } from '@google/genai';
import Button from './Button';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { OracleIcon, UserIcon } from './Icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const parseJsonFromText = (text: string) => {
    const fenceRegex = /```(json)?\s*\n?(.*?)\n?\s*```/s;
    const match = text.match(fenceRegex);
    if (match && match[2]) {
      try {
        return JSON.parse(match[2].trim());
      } catch (e) { /* ignore */ }
    }
    return null;
}

function OracleChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { addCustomPage, addMemory, searchMemories } = useJunAiKeyStore();
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (isOpen && !chat) {
            const relevantMemories = searchMemories("oracle chat"); // Generic search for context
            setChat(startOracleChat(relevantMemories));
            setMessages([{id: '0', text: "Greetings. How may I assist you? You can ask me to 'create a page for project notes', for example.", sender: 'ai'}]);
        }
    }, [isOpen, chat, searchMemories]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const query = input;
        setInput('');
        setIsLoading(true);
        
        const aiMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);

        try {
            const stream = await chat.sendMessageStream({ message: query });
            let fullResponse = '';
            for await (const chunk of stream) {
                fullResponse += chunk.text;
                setMessages(prev => prev.map(msg => msg.id === aiMessageId ? {...msg, text: fullResponse} : msg));
            }
            
            // Add to memory
            addMemory({
                type: 'conversation',
                content: `User asked Oracle: "${query}". Oracle responded: "${fullResponse}"`,
                metadata: { chatId: 'oracle_chat' }
            });

            // After stream is complete, check for actions
            const command = parseJsonFromText(fullResponse);
            if (command && command.action === 'create_page') {
                addCustomPage({ name: command.name, path: command.path });
                toast.success(`Page "${command.name.split('|||')[0]}" created!`);
                navigate(`/app/${command.path.startsWith('/') ? command.path.substring(1) : command.path}`);
                setIsOpen(false);
            }
        } catch (error) {
            console.error("Chat error:", error);
            toast.error("The Oracle is silent. Please try again.");
             setMessages(prev => prev.map(msg => msg.id === aiMessageId ? {...msg, text: 'I seem to have lost my connection. My apologies.'} : msg));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40">
                <Button
                    variant="primary"
                    onClick={() => setIsOpen(!isOpen)}
                    className="!rounded-full !p-4 shadow-2xl !w-16 !h-16 flex items-center justify-center"
                    aria-label="Open AI Oracle Chat"
                >
                    <OracleIcon />
                </Button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col"
                    >
                        <header className="p-4 border-b border-border flex justify-between items-center">
                            <h3 className="font-bold text-lg">AI Oracle</h3>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-card-foreground/60 hover:bg-border">&times;</button>
                        </header>

                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg) => (
                               <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                  {msg.sender === 'ai' && <div className="p-1.5 bg-secondary/10 text-secondary rounded-full mt-1"><OracleIcon /></div>}
                                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary text-background rounded-br-none' : 'bg-background text-foreground rounded-bl-none'}`}>
                                      {msg.text || (msg.sender === 'ai' && isLoading && <Spinner />)}
                                  </div>
                                  {msg.sender === 'user' && <div className="p-1.5 bg-primary/10 text-primary rounded-full mt-1"><UserIcon /></div>}
                              </div>
                            ))}
                             <div ref={messagesEndRef} />
                        </div>
                        
                        <form onSubmit={handleSend} className="p-4 border-t border-border flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Consult the Oracle..."
                                className="flex-grow p-2 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
                                disabled={isLoading}
                            />
                            <Button type="submit" variant="secondary" disabled={isLoading || !input.trim()}>Send</Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default OracleChat;
