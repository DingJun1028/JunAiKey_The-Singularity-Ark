

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import { RuneIcon, SparklesIcon, SanctumIcon, BlueprintIcon, OracleIcon, BeakerIcon } from '../components/ui/Icons';
import Spinner from '../components/ui/Spinner';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { generateEsotericaName, generateEvolutionaryStep } from '../services/geminiService';
import toast from 'react-hot-toast';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import { Rule } from '../types';

const EVOLUTION_DURATION = 300; // 5 minutes

const EvolutionNexusPage: React.FC = () => {
  const { theme, themeMode } = useTheme();
  const { rules, agents, getSystemEfficiencyBoost, getAiInsightBoost, addRule, updateRule } = useJunAiKeyData();
  const navigate = useNavigate();
  
  const [countdown, setCountdown] = useState(EVOLUTION_DURATION);
  const [isEvolving, setIsEvolving] = useState(false);
  const [lastEvolvedRule, setLastEvolvedRule] = useState<Rule | null>(null);
  const [generatedEsoterica, setGeneratedEsoterica] = useState<{name: string, description: string, timestamp: string}[]>([
    { name: 'Universal Genesis', description: 'The system first came online.', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { name: 'Quantum Reconstruction', description: 'Core architecture was solidified.', timestamp: new Date(Date.now() - 43200000).toISOString() },
  ]);
  const [evolutionBoost, setEvolutionBoost] = useState(0);
  const [boostCountdown, setBoostCountdown] = useState(0);

  // Cornerstone Calculations
  const cornerstoneScores = useMemo(() => {
    // Simplicity: Fewer conditions/actions per rule is simpler. Score is inverted.
    const avgComplexity = rules.length > 0 ? rules.reduce((acc, rule) => acc + rule.conditions.length + rule.actions.length, 0) / rules.length : 0;
    const simplicityScore = Math.max(0, 100 - avgComplexity * 10);

    // Speed: Simulated based on efficiency boost from guardians.
    const speedScore = Math.min(100, 75 + getSystemEfficiencyBoost());

    // Practicality: More enabled rules are more practical.
    const enabledRules = rules.filter(r => r.enabled).length;
    const practicalityScore = rules.length > 0 ? (enabledRules / rules.length) * 100 : 100;

    // Performance: Based on average agent accuracy.
    const performanceScore = agents.length > 0 ? agents.reduce((acc, agent) => acc + agent.accuracy, 0) / agents.length : 100;

    return { simplicityScore, speedScore, practicalityScore, performanceScore };
  }, [rules, agents, getSystemEfficiencyBoost]);

  // Main countdown timer
  useEffect(() => {
    if (isEvolving) return;

    const timerId = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsEvolving(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isEvolving]);

  // Evolution process
  useEffect(() => {
    if (!isEvolving) return;

    let isCancelled = false;
    const evolve = async () => {
      try {
        // Step 1: Generate a new name for the evolution event
        const existingNames = generatedEsoterica.map(e => e.name);
        const newName = await generateEsotericaName(existingNames, theme.abilities.systemInstruction);
        
        // Step 2: Generate a new rule based on system health
        const newRuleStub = await generateEvolutionaryStep(cornerstoneScores, rules.map(r => r.name));
        
        if (!isCancelled) {
          // Step 3: Add the new rule to the system and get the full object back
          const newRuleWithId = addRule(newRuleStub);
          setLastEvolvedRule(newRuleWithId);

          // Step 4: Update the UI
          const evolutionDescription = `New Rule Forged: "${newRuleWithId.name}".`;
          toast.success(`Evolution complete: ${newName}! ${evolutionDescription}`, { duration: 6000 });
          setGeneratedEsoterica(prev => [{ name: newName, description: evolutionDescription, timestamp: new Date().toISOString() }, ...prev].slice(0, 10));
          
          // Grant a temporary boost
          setEvolutionBoost(5);
          setBoostCountdown(60);
        }
      } catch (error) {
        toast.error("An anomaly occurred during evolution. The system remains stable.");
        console.error("Evolution Error:", error);
      } finally {
        if (!isCancelled) {
          setIsEvolving(false);
          setCountdown(EVOLUTION_DURATION);
        }
      }
    };
    evolve();

    return () => { isCancelled = true; };
  }, [isEvolving, theme.abilities.systemInstruction, generatedEsoterica, cornerstoneScores, rules, addRule]);
  
  // Boost countdown timer
  useEffect(() => {
    if (boostCountdown > 0) {
      const timerId = setTimeout(() => setBoostCountdown(c => c - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setEvolutionBoost(0);
    }
  }, [boostCountdown]);


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleToggleRule = (rule: Rule) => {
    if (!rule) return;
    const updatedRule = { ...rule, enabled: !rule.enabled };
    updateRule(updatedRule);
    setLastEvolvedRule(updatedRule);
  }

  const systemEfficiency = getSystemEfficiencyBoost();
  const aiInsight = getAiInsightBoost();
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const activePalette = theme.palette[themeMode];

  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.navEvolutionNexus || 'Evolution Nexus|||進化中樞'} />
        <TrilingualText as="p" text={theme.vocabulary.evolutionNexusSubtitle || 'Witness the system\'s self-improvement.'} className="text-lg text-foreground/70 mt-2" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
            <Card glow className="lg:col-span-1">
              <TrilingualText as="h2" text={theme.vocabulary.eternalEvolutionStatus} className="text-2xl font-bold mb-6 text-center" />
              
              <div className="flex flex-col items-center justify-center">
                {isEvolving ? (
                  <div className="flex flex-col items-center justify-center h-56">
                    <Spinner />
                    <TrilingualText as="p" text={theme.vocabulary.evolutionInProgress} className="mt-4 text-accent font-semibold" />
                  </div>
                ) : (
                  <div className="relative w-56 h-56">
                    <svg width="224" height="224" viewBox="0 0 224 224" className="transform -rotate-90">
                      <circle cx="112" cy="112" r={radius} stroke="var(--color-border)" strokeWidth="12" fill="transparent" />
                      <motion.circle
                        cx="112" cy="112" r={radius}
                        stroke="var(--color-primary)" strokeWidth="12" fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference * (1 - countdown / EVOLUTION_DURATION) }}
                        transition={{ duration: 1, ease: 'linear' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <TrilingualText text={theme.vocabulary.nextEvolutionIn} className="text-sm text-foreground/70 text-center" />
                      <p className="text-5xl font-mono font-bold text-primary my-1">{formatTime(countdown)}</p>
                    </div>
                  </div>
                )}
                 <div className="w-full mt-6 pt-6 border-t border-border space-y-3">
                    <div className="text-sm font-semibold text-foreground/60 mb-2 text-center uppercase tracking-wider">Four Cornerstones Status</div>
                     
                     <ProgressBar label="Simplicity" value={cornerstoneScores.simplicityScore} icon={<BlueprintIcon />} color={activePalette.primary} />
                     <ProgressBar label="Speed" value={cornerstoneScores.speedScore} icon={<OracleIcon />} color={activePalette.secondary} />
                     <ProgressBar label="Practicality" value={cornerstoneScores.practicalityScore} icon={<BeakerIcon />} color={activePalette.accent} />
                     <ProgressBar label="Performance" value={cornerstoneScores.performanceScore} icon={<SanctumIcon />} color={activePalette.success} />

                    <div className="text-sm font-semibold text-foreground/60 pt-3 mt-3 border-t border-border text-center uppercase tracking-wider">Guardian Boosts</div>
                    <div className="flex items-center">
                        <SanctumIcon className="h-6 w-6 mr-3 text-secondary"/>
                        <span className="flex-grow">Guardian Efficiency</span>
                        <span className="font-bold text-secondary">+{systemEfficiency}%</span>
                    </div>
                    <div className="flex items-center">
                        <SparklesIcon className="h-6 w-6 mr-3 text-accent"/>
                        <span className="flex-grow">Guardian Insight</span>
                        <span className="font-bold text-accent">+{aiInsight}%</span>
                    </div>
                    {evolutionBoost > 0 && (
                        <div className="flex items-center text-primary animate-pulse">
                            <SparklesIcon className="h-6 w-6 mr-3"/>
                            <span className="flex-grow font-bold">Evolution Boost</span>
                            <span className="font-bold">+{evolutionBoost}% ({boostCountdown}s)</span>
                        </div>
                    )}
                </div>
              </div>
            </Card>
        </div>

        <div className="space-y-8">
            <Card className="lg:col-span-1">
                 <TrilingualText as="h2" text={theme.vocabulary.generatedEsoterica} className="text-2xl font-bold mb-6" />
                 <div className="space-y-3 max-h-[15rem] overflow-y-auto pr-2">
                    {generatedEsoterica.map(esoterica => (
                        <div key={esoterica.name} className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                            <RuneIcon className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                            <div className="flex-grow">
                                <p className="font-semibold text-lg">{esoterica.name}</p>
                                <p className="text-sm text-foreground/70">{esoterica.description}</p>
                                <p className="text-xs text-foreground/50 mt-1">{new Date(esoterica.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {lastEvolvedRule && (
              <Card glow>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Latest Evolved Rule</h2>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">NEW</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-card-foreground">{lastEvolvedRule.name}</h3>
                  <p className="text-base text-card-foreground/70 mt-1">{lastEvolvedRule.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lastEvolvedRule.tags?.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary">
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border my-4"></div>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                  <Button variant="ghost" onClick={() => navigate(`/app/omni-flow/${lastEvolvedRule.id}`)}>
                    Edit
                  </Button>
                  <div className="flex items-center">
                    <TrilingualText text={lastEvolvedRule.enabled ? theme.vocabulary.enabled : theme.vocabulary.disabled} as="span" className={`mr-3 text-sm font-medium ${lastEvolvedRule.enabled ? 'text-success' : 'text-foreground/60'}`} />
                    <button
                      type="button"
                      onClick={() => handleToggleRule(lastEvolvedRule)}
                      className={`relative inline-flex flex-shrink-0 h-7 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-secondary`}
                      style={{backgroundColor: lastEvolvedRule.enabled ? activePalette.success : 'var(--color-border)'}}
                      role="switch"
                      aria-checked={lastEvolvedRule.enabled}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-holy-white shadow transform ring-0 transition ease-in-out duration-200 ${
                          lastEvolvedRule.enabled ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default EvolutionNexusPage;
