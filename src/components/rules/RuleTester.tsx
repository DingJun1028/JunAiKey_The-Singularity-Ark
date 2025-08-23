
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { Agent, BulkTestResult, TestResult } from '../../types';
import { BeakerIcon } from '../ui/Icons';
import OrnateDivider from '../ui/OrnateDivider';

interface RuleTesterProps {
  testAgentId: string;
  setTestAgentId: (id: string) => void;
  onTestRule: () => void;
  onBulkTestRule: () => void;
  testResults: TestResult | null;
  bulkTestResults: BulkTestResult | null;
  isBulkTesting: boolean;
  agents: Agent[];
  inputClass: string;
}

const RuleTester: React.FC<RuleTesterProps> = ({
  testAgentId,
  setTestAgentId,
  onTestRule,
  onBulkTestRule,
  testResults,
  bulkTestResults,
  isBulkTesting,
  agents,
  inputClass,
}) => {
  return (
    <Card className="sticky top-24">
      <h2 className="text-2xl font-bold text-card-foreground flex items-center gap-3">
        <BeakerIcon className="h-7 w-7 text-secondary" />
        Test Rule
      </h2>
      <div className="mt-4 space-y-3">
        <select value={testAgentId} onChange={e => setTestAgentId(e.target.value)} className={inputClass}>
          <option value="">Select Agent to Test...</option>
          {agents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
        </select>
        <Button type="button" variant="ghost" onClick={onTestRule} className="w-full">Test Against Selected Agent</Button>
      </div>
      {testResults && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className={`text-lg font-bold ${testResults.overallMatch ? 'text-success' : 'text-error'}`}>
            Overall Match: {testResults.overallMatch ? '✔ Yes' : '❌ No'}
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {testResults.conditionResults.map(({ condition, actualValue, met }, i) => (
              <li key={i}>
                {met ? '✔' : '❌'} {condition.field} ({actualValue}) {condition.operator} {condition.value}
              </li>
            ))}
          </ul>
        </div>
      )}
      <OrnateDivider />
      <Button
        type="button"
        variant="secondary"
        onClick={onBulkTestRule}
        disabled={isBulkTesting}
        className="w-full"
      >
        {isBulkTesting ? <Spinner /> : 'Test Against All Agents'}
      </Button>

      {bulkTestResults && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-lg font-semibold">Bulk Test Results</h4>
          <p className={`text-lg font-bold ${bulkTestResults.matchCount > 0 ? 'text-success' : 'text-foreground/80'}`}>
            Rule would trigger for {bulkTestResults.matchCount} / {bulkTestResults.totalCount} agents.
          </p>
          {bulkTestResults.matchingAgents.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-foreground/80">Matching Agents:</p>
              <div className="max-h-32 overflow-y-auto bg-background/50 p-2 rounded-md border border-border mt-1">
                {bulkTestResults.matchingAgents.map(agent => (
                  <div key={agent.id} className="flex items-center gap-2 text-sm p-1">
                    <img src={agent.avatar} className="h-5 w-5 rounded-full" alt={agent.name} />
                    <span>{agent.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default RuleTester;
