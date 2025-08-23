import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { EditableRule, EditableRuleAction } from '../types';
import { generateRuleFromPrompt, explainRule } from '../services/geminiService';

export const useRuleAIHandler = (
    formData: EditableRule | Omit<EditableRule, 'id'>,
    setFormData: React.Dispatch<React.SetStateAction<EditableRule | Omit<EditableRule, 'id'>>>
) => {
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExplaining, setIsExplaining] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);

    const handleExplainRule = async () => {
        setIsExplaining(true);
        setIsExplanationModalOpen(true);
        setExplanation('');
        const ruleToExplain = JSON.parse(JSON.stringify(formData));
        if (ruleToExplain.actions) {
            ruleToExplain.actions = ruleToExplain.actions.map((action: EditableRuleAction) => {
                if (action.type === 'custom' && typeof action.parameters === 'string') {
                    try {
                        return { ...action, parameters: JSON.parse(action.parameters) };
                    } catch {
                        return { ...action, parameters: {} }; 
                    }
                }
                return action;
            });
        }
        delete ruleToExplain.id;
        delete ruleToExplain.enabled;
        delete ruleToExplain.eternal;
        delete ruleToExplain.tags;
        try {
            const result = await explainRule(ruleToExplain);
            setExplanation(result);
        } catch (error) {
            console.error("Failed to explain rule:", error);
            toast.error(error instanceof Error ? error.message : "Could not get explanation.");
            setIsExplanationModalOpen(false);
        } finally {
            setIsExplaining(false);
        }
    };

    const handleGenerateRule = async () => {
        if (!aiPrompt.trim()) {
            toast.error("Please enter a description for the AI to generate a rule.");
            return;
        }
        setIsGenerating(true);
        toast.loading("Generating rule with AI...");
        try {
            const generatedRule = await generateRuleFromPrompt(aiPrompt);
            const processedActions = (generatedRule.actions || []).map(action => {
                if (action.type === 'custom' && typeof action.parameters === 'object') {
                    return { ...action, parameters: JSON.stringify(action.parameters, null, 2) };
                }
                return action;
            });
            setFormData(prev => ({
                ...prev,
                name: generatedRule.name,
                description: generatedRule.description,
                priority: generatedRule.priority,
                conditions: generatedRule.conditions,
                actions: processedActions,
            }));
            toast.dismiss();
            toast.success("Rule generated! Please review and save.");
            
            // Auto-explain the generated rule
            setIsExplanationModalOpen(true);
            setIsExplaining(true);
            setExplanation('');
            try {
                const ruleExplanation = await explainRule(generatedRule);
                setExplanation(ruleExplanation);
            } catch (explanationError) {
                console.error("Failed to auto-explain rule:", explanationError);
                toast.error("Could not get an explanation for the generated rule.");
                setIsExplanationModalOpen(false);
            } finally {
                setIsExplaining(false);
            }
        } catch (error) {
            console.error("Failed to generate rule:", error);
            toast.dismiss();
            toast.error("Could not generate rule. The AI might be confused. Please try a clearer prompt.");
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        aiPrompt,
        setAiPrompt,
        isGenerating,
        isExplaining,
        explanation,
        isExplanationModalOpen,
        setIsExplanationModalOpen,
        handleGenerateRule,
        handleExplainRule,
    };
};