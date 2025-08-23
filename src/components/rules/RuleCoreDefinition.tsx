
import React from 'react';
import Card from '../ui/Card';
import { EditableRule } from '../../types';

interface RuleCoreDefinitionProps {
  formData: EditableRule | Omit<EditableRule, 'id'>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClass: string;
}

const RuleCoreDefinition: React.FC<RuleCoreDefinitionProps> = ({
  formData,
  onInputChange,
  onCheckboxChange,
  inputClass,
}) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-card-foreground mb-4">Core Definition</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground/80">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={onInputChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground/80">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={onInputChange} className={inputClass} rows={3} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-foreground/80">Priority</label>
            <input type="number" name="priority" id="priority" value={formData.priority} min="1" max="10" onChange={onInputChange} className={inputClass} />
          </div>
          <div className="flex items-end gap-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="enabled" id="enabled" checked={formData.enabled} onChange={onCheckboxChange} className="h-5 w-5 rounded text-primary bg-background/50 border-border focus:ring-primary" />
              <label htmlFor="enabled" className="text-sm font-medium text-foreground/80">Enabled</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="eternal" id="eternal" checked={formData.eternal} onChange={onCheckboxChange} className="h-5 w-5 rounded text-primary bg-background/50 border-border focus:ring-primary" />
              <label htmlFor="eternal" className="text-sm font-medium text-foreground/80">Eternal (Core)</label>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RuleCoreDefinition;
