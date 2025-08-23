

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import OmniLogPage from './OmniLogPage';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { useTheme } from '../theme/ThemeContext';
import { fallbackTheme } from '../theme/themes';
import type { Agent, Rule } from '../types';
import '@testing-library/jest-dom/vitest';

// Mock dependencies
vi.mock('../hooks/useJunAiKeyData');
vi.mock('../theme/ThemeContext');

vi.mock('recharts', async () => {
    return {
        ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
        PieChart: ({ children }: { children: React.ReactNode }) => <div data-testid="pie-chart">{children}</div>,
        ScatterChart: ({ children }: { children: React.ReactNode }) => <div data-testid="scatter-chart">{children}</div>,
        Pie: () => <g data-testid="pie-element" />,
        Cell: () => null,
        Scatter: () => <g data-testid="scatter-element" />,
        XAxis: () => null,
        YAxis: () => null,
        ZAxis: () => null,
        Tooltip: () => null,
        Legend: () => null,
        CartesianGrid: () => null,
    };
});

vi.mock('react-grid-layout', async () => {
    return {
        Responsive: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="responsive-grid">
                {children}
            </div>
        ),
        WidthProvider: (Component: React.ComponentType<any>) => (props: any) => <Component {...props} />,
    };
});

// Mock data
const mockAgents: Agent[] = [
  { id: '1', name: 'Agent-001', avatar: '', currentLevel: 'Tier 1', engagement: 80, accuracy: 90, lastSession: new Date().toISOString(), learningPathId: 'lp1' },
  { id: '2', name: 'Agent-002', avatar: '', currentLevel: 'Tier 2', engagement: 70, accuracy: 80, lastSession: new Date().toISOString(), learningPathId: 'lp2' },
];

const mockRules: Rule[] = [
  { id: 'r1', name: 'Rule 1', description: '', conditions: [], actions: [], priority: 1, enabled: true, eternal: false },
];

describe('OmniLogPage', () => {

    beforeEach(() => {
        (useTheme as Mock).mockReturnValue({
            theme: fallbackTheme,
            themeMode: 'dark',
            updateLayout: vi.fn(),
        });
    });

    it('renders skeletons when loading', () => {
        (useJunAiKeyData as Mock).mockReturnValue({
            agents: [],
            rules: [],
            loading: true,
        });

        const { container } = render(
            <MemoryRouter>
                <OmniLogPage />
            </MemoryRouter>
        );

        // Check for skeleton elements by their animation class
        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);

        // Check that data-driven content is not present
        expect(screen.queryByText('OmniLog Dashboard')).not.toBeInTheDocument();
    });
    
    it('renders dashboard with data when not loading', () => {
        (useJunAiKeyData as Mock).mockReturnValue({
            agents: mockAgents,
            rules: mockRules,
            loading: false,
        });

        render(
            <MemoryRouter>
                <OmniLogPage />
            </MemoryRouter>
        );

        // Check for header
        expect(screen.getByText('OmniLog Dashboard')).toBeInTheDocument();
        
        // Check metric cards
        expect(screen.getByText('Active Agents')).toBeInTheDocument();
        expect(screen.getByText(mockAgents.length.toString())).toBeInTheDocument();

        expect(screen.getByText('Rules Executed')).toBeInTheDocument();
        expect(screen.getByText(mockRules.length.toString())).toBeInTheDocument();

        // Check Gauge cards
        const avgEngagement = Math.round((80 + 70) / 2);
        const avgAccuracy = Math.round((90 + 80) / 2);
        expect(screen.getByText('Avg. Engagement')).toBeInTheDocument();
        expect(screen.getByText(`${avgEngagement}%`)).toBeInTheDocument();
        
        expect(screen.getByText('Avg. Accuracy')).toBeInTheDocument();
        expect(screen.getByText(`${avgAccuracy}%`)).toBeInTheDocument();

        // Check chart cards
        expect(screen.getByText('Agent Tier Distribution')).toBeInTheDocument();
        expect(screen.getByTestId('pie-chart')).toBeInTheDocument();

        expect(screen.getByText('Agent Performance Matrix')).toBeInTheDocument();
        expect(screen.getByTestId('scatter-chart')).toBeInTheDocument();
    });

    it('handles empty data gracefully when not loading', () => {
        (useJunAiKeyData as Mock).mockReturnValue({
            agents: [],
            rules: [],
            loading: false,
        });

        render(
            <MemoryRouter>
                <OmniLogPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Active Agents')).toBeInTheDocument();
        const agentCounts = screen.getAllByText('0');
        expect(agentCounts.length).toBe(2); // One for agents, one for rules

        expect(screen.getByText('Avg. Engagement')).toBeInTheDocument();
        const zeroPercentages = screen.getAllByText('0%');
        expect(zeroPercentages.length).toBe(2); // One for engagement, one for accuracy
    });
});