import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Rule, RuleCondition, EditableRule, EditableRuleAction } from '../types';
import { useJunAiKeyData } from './useJunAiKeyData';

const newRuleTemplate: Omit<Rule, 'id'> = {
  name: '',
  description: '',
  conditions: [],
  actions: [],
  priority: 5,
  enabled: true,
  eternal: false,
};

export const useRuleDataManager = () => {
    const { ruleId } = useParams<{ ruleId: string }>();
    const navigate = useNavigate();
    const { getRuleById, addRule, updateRule, loading } = useJunAiKeyData();
    const isCreating = ruleId === 'new';

    const [formData, setFormData] = useState<EditableRule | Omit<EditableRule, 'id'>>(newRuleTemplate);
    const [paramErrors, setParamErrors] = useState<Record<number, string | null>>({});
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!isCreating && ruleId) {
                const existingRule = getRuleById(ruleId);
                if (existingRule) {
                    const processedActions = (existingRule.actions || []).map(action => {
                        if (action.type === 'custom' && typeof action.parameters === 'object') {
                            return { ...action, parameters: JSON.stringify(action.parameters, null, 2) };
                        }
                        return action;
                    });
                    setFormData({ ...existingRule, actions: processedActions });
                } else {
                    toast.error('Rule not found.');
                    navigate('/app/omni-flow');
                }
            } else {
                setFormData(newRuleTemplate);
            }
            setIsReady(true);
        }
    }, [ruleId, loading, getRuleById, navigate, isCreating]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: string | number | boolean = value;
        if (type === 'number') { processedValue = value === '' ? 0 : parseInt(value, 10); }
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };
    
    const handleConditionChange = (index: number, field: keyof RuleCondition, value: any) => {
        const newConditions = [...(formData.conditions || [])];
        newConditions[index] = { ...newConditions[index], [field]: value };
        setFormData(prev => ({ ...prev, conditions: newConditions }));
    };

    const handleAddCondition = () => {
        setFormData(prev => ({ ...prev, conditions: [...(prev.conditions || []), { id: `c-${Date.now()}`, field: '', operator: 'eq', value: '' }] }));
    };

    const handleRemoveCondition = (index: number) => {
        setFormData(prev => ({...prev, conditions: prev.conditions?.filter((_, i) => i !== index)}));
    };

    const handleActionChange = (index: number, field: keyof EditableRuleAction, value: any) => {
        const newActions = [...(formData.actions || [])];
        const actionToUpdate: EditableRuleAction = { ...newActions[index] };
        (actionToUpdate as any)[field] = value;
        if (field === 'type') { actionToUpdate.parameters = actionToUpdate.type === 'custom' ? '' : {}; }
        newActions[index] = actionToUpdate;
        setFormData(prev => ({ ...prev, actions: newActions }));
    };

    const handleAddAction = () => {
        setFormData(prev => ({ ...prev, actions: [...(prev.actions || []), { id: `a-${Date.now()}`, type: 'notify', target: '', parameters: {} }] }));
    };

    const handleRemoveAction = (index: number) => {
        setFormData(prev => ({...prev, actions: prev.actions?.filter((_, i) => i !== index)}));
    };
    
    const handleCustomParamChange = (index: number, value: string) => {
        setParamErrors(prev => ({...prev, [index]: null}));
        const newActions = [...(formData.actions || [])];
        const actionToUpdate: EditableRuleAction = { ...newActions[index], parameters: value };
        try { if(value.trim()){ JSON.parse(value); } }
        catch { setParamErrors(prev => ({...prev, [index]: "Invalid JSON format"})); }
        newActions[index] = actionToUpdate;
        setFormData(prev => ({ ...prev, actions: newActions }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(paramErrors).some(error => error !== null)) {
            toast.error('Please fix invalid JSON in parameters for custom actions.');
            return;
        }
        const finalFormData = JSON.parse(JSON.stringify(formData));
        if (finalFormData.actions) {
            finalFormData.actions = finalFormData.actions.map((action: EditableRuleAction) => {
                if (action.type === 'custom' && typeof action.parameters === 'string') {
                    try { return { ...action, parameters: JSON.parse(action.parameters) }; }
                    catch (err) { return { ...action, parameters: {} }; }
                }
                return action;
            });
        }
        if (isCreating) { addRule(finalFormData); toast.success('Rule created!'); }
        else { updateRule(finalFormData as Rule); toast.success('Rule updated!'); }
        navigate('/app/omni-flow');
    };
    
    return {
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
    };
};