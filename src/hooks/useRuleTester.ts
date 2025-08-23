import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Agent, BulkTestResult, TestResult, EditableRule } from '../types';
import { evaluateCondition } from '../services/ruleEngine';

export const useRuleTester = (formData: EditableRule | Omit<EditableRule, 'id'>, agents: Agent[]) => {
    const [testAgentId, setTestAgentId] = useState<string>('');
    const [testResults, setTestResults] = useState<TestResult | null>(null);
    const [bulkTestResults, setBulkTestResults] = useState<BulkTestResult | null>(null);
    const [isBulkTesting, setIsBulkTesting] = useState(false);

    useEffect(() => {
        // Reset test results when form data changes
        setTestResults(null);
        setBulkTestResults(null);
    }, [formData]);

    const handleTestRule = () => {
        if (!testAgentId) { toast.error('Please select an agent to test against.'); return; }
        const agent = agents.find(a => a.id === testAgentId);
        if (!agent) { toast.error('Selected agent not found.'); return; }
        
        const conditions = formData.conditions || [];
        if (conditions.length === 0) {
            setTestResults({ overallMatch: true, conditionResults: [] });
            toast.success("Rule has no conditions, so it matches by default.");
            return;
        }
        
        const conditionResults = conditions.map(c => {
            const { met, actualValue } = evaluateCondition(agent, c);
            return { condition: c, met, actualValue };
        });
        
        const overallMatch = conditionResults.every(r => r.met);
        setTestResults({ overallMatch, conditionResults });
    };

    const handleBulkTestRule = () => {
        setIsBulkTesting(true);
        setBulkTestResults(null);
        
        const conditions = formData.conditions || [];
        if (conditions.length === 0) {
            setBulkTestResults({ matchCount: agents.length, totalCount: agents.length, matchingAgents: agents });
            toast.success("Rule has no conditions, so it matches all agents by default.");
            setIsBulkTesting(false);
            return;
        }

        // Simulate async operation for better UX
        setTimeout(() => {
            const matchingAgents = agents.filter(agent => conditions.every(c => evaluateCondition(agent, c).met));
            setBulkTestResults({ matchCount: matchingAgents.length, totalCount: agents.length, matchingAgents: matchingAgents });
            setIsBulkTesting(false);
        }, 300);
    };

    return {
        testAgentId,
        setTestAgentId,
        testResults,
        bulkTestResults,
        isBulkTesting,
        handleTestRule,
        handleBulkTestRule,
    };
};
