import { Agent, RuleCondition } from '../types';

export const evaluateCondition = (agent: Agent, condition: RuleCondition): { met: boolean; actualValue: any } => {
    const getAgentValue = (field: string) => {
        // Support both 'accuracy' and 'agent.accuracy'
        const key = field.startsWith('agent.') ? field.substring(6) : field;
        return agent[key as keyof Agent];
    }
    
    const actualValue = getAgentValue(condition.field);
    const expectedValue = condition.value;

    if (actualValue === undefined) return { met: false, actualValue: 'N/A' };

    let met = false;
    switch (condition.operator) {
        case 'eq': met = String(actualValue).toLowerCase() == String(expectedValue).toLowerCase(); break;
        case 'neq': met = String(actualValue).toLowerCase() != String(expectedValue).toLowerCase(); break;
        case 'gt': met = Number(actualValue) > Number(expectedValue); break;
        case 'lt': met = Number(actualValue) < Number(expectedValue); break;
        case 'contains': met = String(actualValue).toLowerCase().includes(String(expectedValue).toLowerCase()); break;
    }
    
    return { met, actualValue };
};
