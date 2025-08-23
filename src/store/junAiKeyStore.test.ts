

import { describe, it, expect, beforeEach } from 'vitest';
import { useJunAiKeyStore } from './junAiKeyStore';
import type { Rule } from '../types';

// Reset the store's state before each test
beforeEach(() => {
  useJunAiKeyStore.setState({
    rules: [
        { id: '1', name: 'Rule 1', description: 'First rule', conditions: [], actions: [], priority: 1, enabled: true, eternal: false },
        { id: '2', name: 'Rule 2', description: 'Second rule', conditions: [], actions: [], priority: 2, enabled: false, eternal: true },
    ],
    collectedArtifactIds: ['item1'],
  });
});

describe('junAiKeyStore', () => {

  describe('Rules actions', () => {
    it('should add a new rule with a generated id', () => {
      const newRule: Omit<Rule, 'id'> = {
        name: 'New Test Rule',
        description: 'A rule for testing',
        conditions: [],
        actions: [],
        priority: 5,
        enabled: true,
        eternal: false
      };

      const initialRules = useJunAiKeyStore.getState().rules;
      expect(initialRules).toHaveLength(2);

      useJunAiKeyStore.getState().addRule(newRule);

      const finalRules = useJunAiKeyStore.getState().rules;
      expect(finalRules).toHaveLength(3);
      const addedRule = finalRules.find(r => r.name === 'New Test Rule');
      expect(addedRule).toBeDefined();
      expect(addedRule?.id).toBeTypeOf('string');
      expect(addedRule?.description).toBe('A rule for testing');
    });

    it('should update an existing rule', () => {
      const updatedRuleData: Rule = {
        id: '1',
        name: 'Rule 1 Updated',
        description: 'Updated description',
        conditions: [],
        actions: [],
        priority: 10,
        enabled: false,
        eternal: false
      };

      useJunAiKeyStore.getState().updateRule(updatedRuleData);

      const rules = useJunAiKeyStore.getState().rules;
      const updatedRule = rules.find(r => r.id === '1');
      const unchagedRule = rules.find(r => r.id === '2');

      expect(updatedRule?.name).toBe('Rule 1 Updated');
      expect(updatedRule?.description).toBe('Updated description');
      expect(updatedRule?.enabled).toBe(false);
      expect(unchagedRule?.name).toBe('Rule 2'); // Ensure other rules are not affected
    });
    
    it('should get a rule by its id', () => {
      const rule = useJunAiKeyStore.getState().getRuleById('2');
      expect(rule).toBeDefined();
      expect(rule?.name).toBe('Rule 2');
      expect(rule?.eternal).toBe(true);
    });
    
    it('should return undefined for a non-existent rule id', () => {
      const rule = useJunAiKeyStore.getState().getRuleById('non-existent-id');
      expect(rule).toBeUndefined();
    });
  });

  describe('Artifact actions', () => {
    it('should add an artifact ID to collectedArtifactIds if not present', () => {
      let collected = useJunAiKeyStore.getState().collectedArtifactIds;
      expect(collected).not.toContain('item2');

      useJunAiKeyStore.getState().toggleArtifact('item2');
      
      collected = useJunAiKeyStore.getState().collectedArtifactIds;
      expect(collected).toContain('item2');
      expect(collected).toHaveLength(2);
    });

    it('should remove an artifact ID from collectedArtifactIds if already present', () => {
      let collected = useJunAiKeyStore.getState().collectedArtifactIds;
      expect(collected).toContain('item1');

      useJunAiKeyStore.getState().toggleArtifact('item1');

      collected = useJunAiKeyStore.getState().collectedArtifactIds;
      expect(collected).not.toContain('item1');
      expect(collected).toHaveLength(0);
    });
  });

});