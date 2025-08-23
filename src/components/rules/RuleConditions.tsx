
import React from 'react';
import { RuleCondition } from '../../types';
import Button from '../ui/Button';
import { TrashIcon } from '../ui/Icons';
import { OPERATORS } from '../../constants';

const AGENT_CONDITION_FIELDS = [
  'agent.name',
  'agent.currentLevel',
  'agent.engagement',
  'agent.accuracy',
  'agent.lastSession',
  'agent.learningPathId',
];

interface RuleConditionsProps {
  conditions: RuleCondition[];
  onConditionChange: (index: number, field: keyof RuleCondition, value: any) => void;
  onAddCondition: () => void;
  onRemoveCondition: (index: number) => void;
  inputClass: string;
}

const RuleConditions: React.FC<RuleConditionsProps> = ({
  conditions,
  onConditionChange,
  onAddCondition,
  onRemoveCondition,
  inputClass,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-card-foreground mb-4">Conditions (IF ALL ARE TRUE)</h2>
      <div className="space-y-4">
        {(conditions || []).map((condition, index) => (
          <div key={condition.id} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-3 p-3 bg-background/50 rounded-lg border border-border">
            <input
              type="text"
              placeholder="Field (e.g., agent.accuracy)"
              value={condition.field}
              onChange={e => onConditionChange(index, 'field', e.target.value)}
              className={inputClass}
              list="agent-fields"
            />
            <select value={condition.operator} onChange={e => onConditionChange(index, 'operator', e.target.value)} className={inputClass}>
              {OPERATORS.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
            </select>
            <input type="text" placeholder="Value" value={condition.value} onChange={e => onConditionChange(index, 'value', e.target.value)} className={inputClass} />
            <Button type="button" variant="ghost" onClick={() => onRemoveCondition(index)} className="!p-2 text-error/70 hover:text-error self-end"><TrashIcon /></Button>
          </div>
        ))}
      </div>
      <datalist id="agent-fields">
        {AGENT_CONDITION_FIELDS.map(field => (
          <option key={field} value={field} />
        ))}
      </datalist>
      <Button type="button" onClick={onAddCondition} className="mt-4">+ Add Condition</Button>
    </div>
  );
};

export default RuleConditions;
