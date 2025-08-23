
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import {
  ManifestoIcon,
  TerminalIcon,
  CodeBracketSquareIcon,
  BeakerIcon,
  CloudArrowUpIcon,
  SparklesIcon,
} from '../components/ui/Icons';
import type { Theme, Palette } from '../types';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { generateNextForgeStep } from '../services/geminiService';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

interface Stage {
  titleKey: keyof Theme['vocabulary'];
  descriptionKey: keyof Theme['vocabulary'];
  icon: React.FC<{ className?: string }>;
  tasks: (keyof Theme['vocabulary'])[];
  color: keyof Palette;
}

const stages: Stage[] = [
    { titleKey: 'forgeStageConception', descriptionKey: 'forgeStageConceptionDesc', icon: ManifestoIcon, tasks: ['forgeTaskDefineConcept', 'forgeTaskDraftSpecs', 'forgeTaskAlignManifesto'], color: 'primary' },
    { titleKey: 'forgeStagePrototyping', descriptionKey: 'forgeStagePrototypingDesc', icon: TerminalIcon, tasks: ['forgeTaskBuildPrototype', 'forgeTaskProposeArch', 'forgeTaskTestLogic'], color: 'secondary' },
    { titleKey: 'forgeStageForging', descriptionKey: 'forgeStageForgingDesc', icon: CodeBracketSquareIcon, tasks: ['forgeTaskDevelopFeature', 'forgeTaskWriteCode', 'forgeTaskIntegrateSystems'], color: 'accent' },
    { titleKey: 'forgeStageIntegration', descriptionKey: 'forgeStageIntegrationDesc', icon: BeakerIcon, tasks: ['forgeTaskRunTests', 'forgeTaskAuditSecurity', 'forgeTaskEnsureConsistency'], color: 'success' },
    { titleKey: 'forgeStageDeployment', descriptionKey: 'forgeStageDeploymentDesc', icon: CloudArrowUpIcon, tasks: ['forgeTaskDeployLive', 'forgeTaskMonitorPerformance', 'forgeTaskGatherFeedback'], color: 'primary' },
    { titleKey: 'forgeStageEvolution', descriptionKey: 'forgeStageEvolutionDesc', icon: SparklesIcon, tasks: ['forgeTaskAnalyzeData', 'forgeTaskFeedMemory', 'forgeTaskRepeatCycle'], color: 'secondary' },
];

interface StageCardProps {
    stage: Stage;
    index: number;
    isActive: boolean;
    activeTaskIndex: { stage: number; task: number; };
    generatedContent: Record<string, string>;
}

const StageCard: React.FC<StageCardProps> = ({ stage, index, isActive, activeTaskIndex, generatedContent }) => {
    const { theme, themeMode } = useTheme();
    const activePalette = theme.palette[themeMode];
    const color = activePalette[stage.color];

    return (
        <Card className={`flex-shrink-0 w-80 h-full flex flex-col transition-all duration-500 border-l-4 ${isActive ? 'shadow-divine-glow' : ''}`} style={{ borderColor: isActive ? color : 'var(--color-border)' }}>
            <div className="flex items-start gap-4">
                <div className={`text-3xl font-bold transition-colors ${isActive ? 'text-primary' : 'text-foreground/20'}`}>{index + 1}</div>
                <div>
                    <TrilingualText as="h3" text={theme.vocabulary[stage.titleKey]} className="text-xl font-bold" />
                    <TrilingualText as="p" text={theme.vocabulary[stage.descriptionKey]} className="text-sm text-foreground/60 mt-1" />
                </div>
            </div>
            
            <div className="border-t border-border my-4"></div>
            
            <ul className="space-y-2 flex-grow">
                {stage.tasks.map((taskKey, taskIndex) => {
                    const isCompleted = index < activeTaskIndex.stage || (index === activeTaskIndex.stage && taskIndex < activeTaskIndex.task);
                    const isInProgress = index === activeTaskIndex.stage && taskIndex === activeTaskIndex.task;
                    const contentKey = `${index}-${taskIndex}`;
                    
                    return (
                        <li key={taskKey} className={`p-2 rounded-md transition-colors ${isInProgress ? 'bg-primary/10' : ''}`}>
                            <div className="flex items-start gap-3 text-sm">
                                <div className="mt-1" style={{color: isCompleted ? activePalette.success : color}}>
                                    {isCompleted ? <BeakerIcon className="h-4 w-4" /> : React.createElement(stage.icon, { className: 'h-4 w-4' })}
                                </div>
                                <div className="flex-grow">
                                    <TrilingualText text={theme.vocabulary[taskKey]} as="span" className={`transition-colors ${isCompleted ? 'text-foreground/50 line-through' : 'text-foreground/80'}`} />
                                    <AnimatePresence>
                                    {isCompleted && generatedContent[contentKey] && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="text-xs text-foreground/60 mt-1 pl-1 border-l-2 border-border/50"
                                        >
                                            <p className="p-1 italic">"{generatedContent[contentKey]}"</p>
                                        </motion.div>
                                    )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
};


const CosmicForgePage: React.FC = () => {
  const { theme } = useTheme();
  const [projectConcept, setProjectConcept] = useState('An AI assistant for learning guitar chords.');
  const [progress, setProgress] = useState({ stageIndex: 0, taskIndex: 0 });
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const isComplete = progress.stageIndex >= stages.length;

  const handleAutoContinue = async () => {
    if (!projectConcept.trim() || isComplete) {
        toast.error(isComplete ? "Forge is complete!" : "Please define a project concept.");
        return;
    }
    
    setIsLoading(true);
    toast.loading("Forging next step...");
    
    try {
        const currentStage = stages[progress.stageIndex];
        const currentTaskKey = currentStage.tasks[progress.taskIndex];
        const nextTaskName = theme.vocabulary[currentTaskKey]?.split('|||')[0] || '...';
        
        const lastTaskKey = progress.taskIndex > 0 
            ? `${progress.stageIndex}-${progress.taskIndex - 1}`
            : progress.stageIndex > 0 
              ? `${progress.stageIndex - 1}-${stages[progress.stageIndex-1].tasks.length-1}`
              : null;
        const lastTaskDescription = lastTaskKey ? generatedContent[lastTaskKey] : 'Initial concept.';

        const content = await generateNextForgeStep(
            projectConcept,
            theme.vocabulary[currentStage.titleKey].split('|||')[0],
            lastTaskDescription,
            nextTaskName
        );

        const contentKey = `${progress.stageIndex}-${progress.taskIndex}`;
        setGeneratedContent(prev => ({...prev, [contentKey]: content}));
        
        toast.dismiss();
        toast.success(`Task "${nextTaskName}" forged!`);

        // Update progress
        const nextTaskIndex = progress.taskIndex + 1;
        if (nextTaskIndex >= currentStage.tasks.length) {
            setProgress({ stageIndex: progress.stageIndex + 1, taskIndex: 0 });
        } else {
            setProgress({ ...progress, taskIndex: nextTaskIndex });
        }

    } catch (error) {
        toast.dismiss();
        toast.error(error instanceof Error ? error.message : "Failed to forge next step.");
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.navCosmicForge} />
        <TrilingualText as="p" text={theme.vocabulary.cosmicForgeSubtitle} className="text-lg text-foreground/70 mt-2" />
      </header>
      
      <Card>
          <div className="flex flex-col md:flex-row gap-4">
              <input
                  type="text"
                  value={projectConcept}
                  onChange={(e) => setProjectConcept(e.target.value)}
                  placeholder="Enter a project concept..."
                  className="flex-grow p-3 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
                  disabled={isLoading}
              />
              <Button variant="primary" onClick={handleAutoContinue} disabled={isLoading || isComplete} className="!py-3 !px-5">
                  {isLoading ? <Spinner /> : (isComplete ? 'Forge Complete' : 'Auto-Continue')}
              </Button>
          </div>
      </Card>

      <div className="flex overflow-x-auto gap-6 pb-4">
        {stages.map((stage, index) => (
            <StageCard 
                key={stage.titleKey} 
                stage={stage} 
                index={index} 
                isActive={index === progress.stageIndex}
                activeTaskIndex={{ stage: progress.stageIndex, task: progress.taskIndex }}
                generatedContent={generatedContent}
            />
        ))}
      </div>
    </div>
  );
};

export default CosmicForgePage;