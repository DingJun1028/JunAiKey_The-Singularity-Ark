import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { useRuleDataManager } from '../hooks/useRuleDataManager';
import { useRuleAIHandler } from '../hooks/useRuleAIHandler';
import { useRuleTester } from '../hooks/useRuleTester';

import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import Modal from '../components/ui/Modal';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import { useTheme } from '../theme/ThemeContext';

import RuleAIGenerator from '../components/rules/RuleAIGenerator';
import RuleCoreDefinition from '../components/rules/RuleCoreDefinition';
import RuleConditions from '../components/rules/RuleConditions';
import RuleActions from '../components/rules/RuleActions';
import RuleTester from '../components/rules/RuleTester';

const RuleEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { agents } = useJunAiKeyData();
  const { theme } = useTheme();
  
  const {
    isCreating,
    formData,
    setFormData,
    paramErrors,
    isReady,
    handleInputChange,
    handleCheckboxChange,
    handleConditionChange,
    handleAddCondition,
    handleRemoveCondition,
    handleActionChange,
    handleAddAction,
    handleRemoveAction,
    handleCustomParamChange,
    handleSubmit,
  } = useRuleDataManager();

  const {
    aiPrompt,
    setAiPrompt,
    isGenerating,
    isExplaining,
    explanation,
    isExplanationModalOpen,
    setIsExplanationModalOpen,
    handleGenerateRule,
    handleExplainRule,
  } = useRuleAIHandler(formData, setFormData);

  const {
    testAgentId,
    setTestAgentId,
    testResults,
    bulkTestResults,
    isBulkTesting,
    handleTestRule,
    handleBulkTestRule,
  } = useRuleTester(formData, agents);
  
  if (!isReady) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  }
  
  const inputClass = "w-full p-2 bg-background/50 border border-border/50 rounded-md text-foreground focus:ring-1 focus:ring-secondary focus:outline-none";
  
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <TrilingualText as="h1" text={isCreating ? theme.vocabulary.ruleEditorCreateTitle : theme.vocabulary.ruleEditorEditTitle} />
        <Button variant="ghost" onClick={() => navigate('/app/omni-flow')}>
          <TrilingualText text={theme.vocabulary.backToRulesButton} />
        </Button>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <RuleAIGenerator
             aiPrompt={aiPrompt}
             setAiPrompt={setAiPrompt}
             onGenerate={handleGenerateRule}
             onExplain={handleExplainRule}
             isGenerating={isGenerating}
             isExplaining={isExplaining}
             inputClass={inputClass}
           />
           <RuleCoreDefinition
             formData={formData}
             onInputChange={handleInputChange}
             onCheckboxChange={handleCheckboxChange}
             inputClass={inputClass}
           />
          <Card>
            <RuleConditions
              conditions={formData.conditions || []}
              onConditionChange={handleConditionChange}
              onAddCondition={handleAddCondition}
              onRemoveCondition={handleRemoveCondition}
              inputClass={inputClass}
            />
          </Card>
          <Card>
            <RuleActions
              formData={formData}
              paramErrors={paramErrors}
              onActionChange={handleActionChange}
              onCustomParamChange={handleCustomParamChange}
              onAddAction={handleAddAction}
              onRemoveAction={handleRemoveAction}
              inputClass={inputClass}
            />
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
            <RuleTester
              testAgentId={testAgentId}
              setTestAgentId={setTestAgentId}
              onTestRule={handleTestRule}
              onBulkTestRule={handleBulkTestRule}
              testResults={testResults}
              bulkTestResults={bulkTestResults}
              isBulkTesting={isBulkTesting}
              agents={agents}
              inputClass={inputClass}
            />
            <div className="flex justify-end">
                <Button type="submit" variant="primary" className="!px-8 !py-3">
                   <TrilingualText text={theme.vocabulary.saveRuleButton} />
                </Button>
            </div>
        </div>
      </form>
      
      <Modal isOpen={isExplanationModalOpen} onClose={() => setIsExplanationModalOpen(false)} title="Rule Explanation">
          {isExplaining ? <div className="h-48 flex items-center justify-center"><Spinner /></div> : <MarkdownRenderer content={explanation} />}
      </Modal>

    </div>
  );
};

export default RuleEditorPage;
