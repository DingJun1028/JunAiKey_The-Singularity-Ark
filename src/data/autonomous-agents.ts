import { CodeBracketSquareIcon, BeakerIcon, SanctumIcon } from '../components/ui/Icons';
import type { AutonomousAgent } from '../types';

export const initialAutonomousAgents: AutonomousAgent[] = [
  {
    id: 'linter-agent',
    name: '守律者 (Linter Agent)',
    description: 'Continuously monitors code quality, ensuring order and elegance throughout the system.',
    icon: CodeBracketSquareIcon,
    status: 'inactive',
    actions: [
      { timestamp: new Date(Date.now() - 3600000).toISOString(), description: 'Initialized and standing by.', status: 'info' }
    ]
  },
  {
    id: 'security-agent',
    name: '聖盾衛 (Security Auditor)',
    description: 'Periodically scans for vulnerabilities, protecting the system from all threats.',
    icon: BeakerIcon,
    status: 'inactive',
    actions: [
       { timestamp: new Date(Date.now() - 7200000).toISOString(), description: 'Initialized and standing by.', status: 'info' }
    ]
  },
  {
    id: 'optimizer-agent',
    name: '效能核心 (Performance Core)',
    description: 'Analyzes system performance and optimizes resource allocation for peak efficiency.',
    icon: SanctumIcon,
    status: 'inactive',
    actions: [
       { timestamp: new Date(Date.now() - 10800000).toISOString(), description: 'Initialized and standing by.', status: 'info' }
    ]
  }
];