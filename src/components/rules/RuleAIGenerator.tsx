
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { SparklesIcon } from '../ui/Icons';

interface RuleAIGeneratorProps {
  aiPrompt: string;
  setAiPrompt: (value: string) => void;
  onGenerate: () => void;
  onExplain: () => void;
  isGenerating: boolean;
  isExplaining: boolean;
  inputClass: string;
}

const RuleAIGenerator: React.FC<RuleAIGeneratorProps> = ({
  aiPrompt,
  setAiPrompt,
  onGenerate,
  onExplain,
  isGenerating,
  isExplaining,
  inputClass,
}) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-card-foreground flex items-center gap-3">
        <SparklesIcon className="h-7 w-7 text-primary" />
        AI-Assisted Generation
      </h2>
      <div className="mt-4 space-y-4">
        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Describe the rule you want to create, e.g., 'If an agent's accuracy drops below 75, send a notification to the admin.'"
          className={`${inputClass} h-24`}
          disabled={isGenerating}
        />
        <div className="flex justify-between gap-4">
          <Button type="button" variant="secondary" onClick={onGenerate} disabled={isGenerating}>
            {isGenerating ? <Spinner /> : 'Generate Rule'}
          </Button>
          <Button type="button" variant="ghost" onClick={onExplain} disabled={isExplaining}>
            {isExplaining ? <Spinner /> : 'Explain Current Rule'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RuleAIGenerator;
