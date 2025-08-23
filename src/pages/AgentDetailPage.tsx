
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import Skeleton from '../components/ui/Skeleton';
import { useTheme } from '../theme/ThemeContext';
import Button from '../components/ui/Button';
import { MemoryIcon, UserIcon } from '../components/ui/Icons';
import { MemoryRecord, Agent, ChatMessage } from '../types';
import { startAgentChat } from '../services/geminiService';
import { Chat } from '@google/genai';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';

const AgentDetailPage: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { theme, themeMode } = useTheme();
  const { getAgentById, memories, rules, loading, addMemory } = useJunAiKeyData();
  
  const agent = agentId ? getAgentById(agentId) : undefined;
  
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agentMemories = memories.filter(m => m.metadata?.agentId === agentId);

  useEffect(() => {
    if (agent && messages.length === 0) {
        setMessages([{
            id: 'init',
            role: 'model',
            text: `This is a direct communication channel with ${agent.name}. How can I assist you?`
        }]);
    }
  }, [agent, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isChatLoading || !agent) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMessageId, text: '', role: 'model' }]);
    
    const query = input;
    setInput('');
    setIsChatLoading(true);

    try {
        const activeChat = chat || startAgentChat(agent, agentMemories);
        if (!chat) setChat(activeChat);

        const stream = await activeChat.sendMessageStream({ message: query });
        let fullResponseText = '';
        
        for await (const chunk of stream) {
            fullResponseText += chunk.text;
            setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, text: fullResponseText } : msg));
        }
        
        addMemory({
            type: 'conversation',
            content: `Admin asked: "${query}". Agent responded: "${fullResponseText}"`,
            metadata: { agentId: agent.id, chatId: `direct_chat_${agent.id}` }
        });

    } catch (error) {
        const errorMessage = "A communication error occurred. Please try again.";
        setMessages(prev => prev.map(msg => msg.id === aiMessageId ? {...msg, text: errorMessage } : msg));
        toast.error("Failed to get response from Agent.");
        console.error(error);
    } finally {
        setIsChatLoading(false);
    }
  };


  if (loading || !agentId) {
    return <Skeleton className="h-screen w-full" />;
  }
  
  if (!agent) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-2xl font-bold">Agent Not Found</p>
          <p className="text-foreground/70 mt-2">The specified agent could not be located in the network.</p>
          <Button onClick={() => navigate('/app/omni-agents')} className="mt-6">Return to Agents List</Button>
        </div>
      </Card>
    );
  }
  
  const activePalette = theme.palette[themeMode];
  const associatedRuleIds = new Set(
    agentMemories
      .map(m => m.metadata?.ruleId)
      .filter((id): id is string => !!id)
  );
  const associatedRules = rules.filter(r => associatedRuleIds.has(r.id));
  const isOnline = (new Date().getTime() - new Date(agent.lastSession).getTime()) < (24 * 60 * 60 * 1000);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <TrilingualText as="h1" text={`Agent Profile: ${agent.name}|||代理檔案：${agent.name.split('-')[1]||agent.name}|||Dàilǐ Dǎng'àn: ${agent.name}`} />
          <p className="text-lg text-foreground/70 mt-2">Detailed view of agent performance and memory stream.</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/app/omni-agents')}>
          &larr; Back to Agent List
        </Button>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-8 sticky top-24">
          <Card glow>
            <div className="flex flex-col items-center">
              <img className="h-32 w-32 rounded-full border-4" src={agent.avatar} alt={agent.name} style={{borderColor: activePalette.primary}} />
              <h2 className="mt-4 text-2xl font-bold text-card-foreground">{agent.name}</h2>
              <p className="text-card-foreground/70">{agent.currentLevel}</p>
              <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium`} style={{backgroundColor: isOnline ? `${activePalette.success}20` : `${activePalette.error}20`, color: isOnline ? activePalette.success : activePalette.error}}>
                  <span className={`w-2 h-2 mr-2 rounded-full ${isOnline ? 'animate-pulse' : ''}`} style={{backgroundColor: isOnline ? activePalette.success : activePalette.error}}></span>
                  {isOnline ? 'Online' : 'Offline'}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold w-24 text-right" style={{color: activePalette.secondary}}>Engagement</span>
                  <div className="w-full bg-border rounded-full h-2.5">
                      <div className="h-2.5 rounded-full" style={{ width: `${agent.engagement}%`, backgroundColor: activePalette.secondary }}></div>
                  </div>
                  <span className="text-sm font-semibold w-10 text-left" style={{color: activePalette.secondary}}>{agent.engagement}%</span>
              </div>
              <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold w-24 text-right" style={{color: activePalette.accent}}>Accuracy</span>
                  <div className="w-full bg-border rounded-full h-2.5">
                      <div className="h-2.5 rounded-full" style={{ width: `${agent.accuracy}%`, backgroundColor: activePalette.accent }}></div>
                  </div>
                  <span className="text-sm font-semibold w-10 text-left" style={{color: activePalette.accent}}>{agent.accuracy}%</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
            <Card>
                <h3 className="text-xl font-bold text-card-foreground mb-4">Direct Chat with {agent.name}</h3>
                <div className="flex flex-col h-[60vh] bg-background/30 rounded-lg border border-border">
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <img src={agent.avatar} alt={agent.name} className="h-8 w-8 rounded-full border-2 border-secondary" />
                                )}
                                <div className={`max-w-md p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-background rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none border border-border'}`}>
                                    {msg.text ? <p className="whitespace-pre-wrap">{msg.text}</p> : <Spinner />}
                                </div>
                                {msg.role === 'user' && <div className="p-1.5 bg-primary/10 text-primary rounded-full mt-1"><UserIcon className="h-5 w-5"/></div>}
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className="p-4 border-t border-border">
                        <form onSubmit={handleSend} className="flex items-center gap-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Message ${agent.name}...`}
                                className="flex-grow p-3 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
                                disabled={isChatLoading}
                            />
                            <Button type="submit" variant="secondary" className="!py-3 !px-5" disabled={isChatLoading || !input.trim()}>
                                {isChatLoading ? <Spinner/> : 'Send'}
                            </Button>
                        </form>
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-bold text-card-foreground mb-4">Agent Memory Stream</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                   {agentMemories.length > 0 ? agentMemories.map((memory: MemoryRecord) => (
                       <div key={memory.id} className="flex items-start gap-4 p-3 rounded-lg bg-background/50 border border-border/50">
                            <div className="p-2 bg-primary/10 text-primary rounded-full mt-1">
                                <MemoryIcon />
                            </div>
                            <div className="flex-grow">
                                <p className="text-card-foreground text-sm">{memory.content}</p>
                                <div className="flex items-center gap-4 text-xs text-card-foreground/50 mt-2">
                                   <span>{new Date(memory.timestamp).toLocaleString()}</span>
                                   <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{memory.type}</span>
                                   {memory.metadata?.ruleId && <span className="font-mono">RuleID: {memory.metadata.ruleId.substring(0,8)}...</span>}
                                   {memory.metadata?.chatId && <span className="font-mono">ChatID: {memory.metadata.chatId}</span>}
                                </div>
                            </div>
                        </div>
                   )) : (
                       <div className="text-center py-10 text-card-foreground/60">
                           <p>No memories recorded for this agent.</p>
                       </div>
                   )}
                </div>
            </Card>

            {associatedRules.length > 0 && (
                <Card>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">Associated Rules</h3>
                  <div className="space-y-3">
                    {associatedRules.map(rule => (
                      <div key={rule.id} className="p-3 rounded-lg bg-background/50 border border-border/50 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{rule.name}</p>
                          <p className="text-xs text-foreground/60">{rule.description}</p>
                        </div>
                        <Button variant="ghost" onClick={() => navigate(`/app/omni-flow/${rule.id}`)}>
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;
