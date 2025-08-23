
import React from 'react';
import { EditableRule, EditableRuleAction } from '../../types';
import Button from '../ui/Button';
import { TrashIcon } from '../ui/Icons';
import { ACTION_TYPES } from '../../constants';

interface RuleActionsProps {
  formData: EditableRule | Omit<EditableRule, 'id'>;
  paramErrors: Record<number, string | null>;
  onActionChange: (index: number, field: keyof EditableRuleAction, value: any) => void;
  onCustomParamChange: (index: number, value: string) => void;
  onAddAction: () => void;
  onRemoveAction: (index: number) => void;
  inputClass: string;
}

const RuleActions: React.FC<RuleActionsProps> = ({
  formData,
  paramErrors,
  onActionChange,
  onCustomParamChange,
  onAddAction,
  onRemoveAction,
  inputClass,
}) => {
  
  const handleActionParameterChange = (actionIndex: number, paramName: string, paramValue: any) => {
      const newActions = [...(formData.actions || [])];
      const actionToUpdate = { ...newActions[actionIndex] };
      const currentParams = (typeof actionToUpdate.parameters === 'object' && actionToUpdate.parameters !== null)
        ? actionToUpdate.parameters
        : {};
      actionToUpdate.parameters = { ...currentParams, [paramName]: paramValue };
      newActions[actionIndex] = actionToUpdate;
      // This is a direct manipulation, which is not ideal, but it's how the parent state setter works.
      // A better pattern would be to call a single update function passed via props.
      // For this refactor, we pass the full onActionChange handler.
      // A better way is: onActionChange(actionIndex, 'parameters', actionToUpdate.parameters)
      onActionChange(actionIndex, 'parameters', actionToUpdate.parameters);
  };

  const renderActionParameters = (action: EditableRuleAction, index: number) => {
      const params = action.parameters || {};

      switch (action.type) {
          case 'notify':
              return (
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70">Recipient</label>
                      <input type="text" value={(params as any).recipient || ''} onChange={e => handleActionParameterChange(index, 'recipient', e.target.value)} className={inputClass} placeholder="e.g., admin@junaikey.com or #channel" />
                      <label className="text-sm font-medium text-foreground/70">Message</label>
                      <textarea value={(params as any).message || ''} onChange={e => handleActionParameterChange(index, 'message', e.target.value)} className={inputClass} rows={3} placeholder="e.g., Agent {agent.name} has reached Tier 3." />
                  </div>
              );
          case 'route':
              return (
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70">Destination</label>
                      <input type="text" value={(params as any).destination || ''} onChange={e => handleActionParameterChange(index, 'destination', e.target.value)} className={inputClass} placeholder="e.g., 'OmniSync' or a webhook URL" />
                      <label className="text-sm font-medium text-foreground/70">Data Mapping</label>
                       <textarea value={(params as any).dataMapping || ''} onChange={e => handleActionParameterChange(index, 'dataMapping', e.target.value)} className={inputClass} rows={3} placeholder={'e.g., {"externalId": "{agent.id}", "level": "{agent.currentLevel}"}'} />
                  </div>
              );
          case 'transform':
              return (
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-foreground/70">Source Field</label>
                      <input type="text" value={(params as any).sourceField || ''} onChange={e => handleActionParameterChange(index, 'sourceField', e.target.value)} className={inputClass} placeholder="e.g., agent.name" />
                     <label className="text-sm font-medium text-foreground/70">Target Field</label>
                      <input type="text" value={(params as any).targetField || ''} onChange={e => handleActionParameterChange(index, 'targetField', e.target.value)} className={inputClass} placeholder="e.g., agent.name" />
                      <label className="text-sm font-medium text-foreground/70">Method</label>
                      <select value={(params as any).method || ''} onChange={e => handleActionParameterChange(index, 'method', e.target.value)} className={inputClass}>
                          <option value="">Select Method</option>
                          <option value="UPPERCASE">UPPERCASE</option>
                          <option value="LOWERCASE">LOWERCASE</option>
                          <option value="CAPITALIZE">CAPITALIZE</option>
                      </select>
                  </div>
              );
          case 'custom':
               const paramString = typeof action.parameters === 'string'
                ? action.parameters
                : JSON.stringify(action.parameters, null, 2);

              return (
                  <div>
                      <label className="text-sm font-medium text-foreground/70">Parameters (JSON)</label>
                      <textarea
                        value={paramString}
                        onChange={e => onCustomParamChange(index, e.target.value)}
                        className={`${inputClass} font-mono ${paramErrors[index] ? 'border-error' : ''}`}
                        rows={5}
                        placeholder={`{
  "functionName": "sendWelcomeEmail",
  "args": ["{agent.id}"]
}`}
                      />
                      {paramErrors[index] && <p className="text-xs text-error mt-1">{paramErrors[index]}</p>}
                  </div>
              );
          default:
              return <p className="text-sm text-foreground/60">Select an action type to configure parameters.</p>;
      }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-card-foreground mb-4">Actions (THEN)</h2>
      <div className="space-y-4">
        {(formData.actions || []).map((action, index) => (
          <div key={action.id} className="p-4 bg-background/50 rounded-lg border border-border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-3">
              <select value={action.type} onChange={e => onActionChange(index, 'type', e.target.value)} className={inputClass}>
                {ACTION_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
              </select>
              <input type="text" placeholder="Target (optional)" value={action.target} onChange={e => onActionChange(index, 'target', e.target.value)} className={inputClass} />
              <Button type="button" variant="ghost" onClick={() => onRemoveAction(index)} className="!p-2 text-error/70 hover:text-error self-start"><TrashIcon /></Button>
            </div>
            <div className="pl-2 border-l-2 border-border/50">
              {renderActionParameters(action, index)}
            </div>
          </div>
        ))}
      </div>
      <Button type="button" onClick={onAddAction} className="mt-4">+ Add Action</Button>
    </div>
  );
};

export default RuleActions;
