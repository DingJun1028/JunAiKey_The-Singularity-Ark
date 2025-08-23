
import React from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import Skeleton from '../components/ui/Skeleton';
import Gauge from '../components/ui/Gauge';
import { useTheme } from '../theme/ThemeContext';
import TrilingualText from '../components/ui/TrilingualText';

const ResponsiveGridLayout = WidthProvider(Responsive);

const OmniLogPage: React.FC = () => {
  const { agents, rules, loading } = useJunAiKeyData();
  const { theme, updateLayout, themeMode } = useTheme();

  if (loading) {
    return (
        <div className="space-y-8">
            <Skeleton className="h-20 w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
            </div>
      </div>
    );
  }
  
  const activePalette = theme.palette[themeMode];
  const averageEngagement = agents.length > 0 ? Math.round(agents.reduce((acc, s) => acc + s.engagement, 0) / agents.length) : 0;
  const averageAccuracy = agents.length > 0 ? Math.round(agents.reduce((acc, s) => acc + s.accuracy, 0) / agents.length) : 0;
  
  const performanceData = agents.map(s => ({ name: s.name, engagement: s.engagement, accuracy: s.accuracy }));
  
  const levelDistribution = agents.reduce((acc: {[key: string]: number}, agent) => {
    acc[agent.currentLevel] = (acc[agent.currentLevel] || 0) + 1;
    return acc;
  }, {});

  const proficiencyData = Object.keys(levelDistribution).map(level => ({
    name: level,
    value: levelDistribution[level]
  }));
  
  const COLORS = [activePalette.primary, activePalette.secondary, activePalette.accent, activePalette.success, activePalette.error, '#A97C50'];

  const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border text-sm text-card-foreground">
            <p className="font-bold">{`Agent: ${data.name}`}</p>
            <p style={{color: activePalette.secondary}}>{`Engagement: ${data.engagement}%`}</p>
            <p style={{color: activePalette.accent}}>{`Accuracy: ${data.accuracy}%`}</p>
          </div>
        );
      }
      return null;
    };

    const dashboardWidgets: { [key: string]: React.ReactNode } = {
        "metrics-agents": (
            <Card glow className="h-full flex flex-col justify-center">
                <TrilingualText as="h4" text={theme.vocabulary.metricActiveAgents} className="text-sm font-medium text-card-foreground/70 uppercase tracking-wider" />
                <p className="text-4xl font-bold text-card-foreground mt-2">{agents.length.toString()}</p>
            </Card>
        ),
        "metrics-engagement": (
            <Card className="h-full flex items-center justify-center">
                <Gauge value={averageEngagement} label={theme.vocabulary.metricAvgEngagement} color={activePalette.secondary} />
            </Card>
        ),
        "metrics-accuracy": (
            <Card className="h-full flex items-center justify-center">
                <Gauge value={averageAccuracy} label={theme.vocabulary.metricAvgAccuracy} color={activePalette.accent} />
            </Card>
        ),
        "metrics-rules": (
            <Card className="h-full flex flex-col justify-center">
                <TrilingualText as="h4" text={theme.vocabulary.metricRulesExecuted} className="text-sm font-medium text-card-foreground/70 uppercase tracking-wider" />
                <p className="text-4xl font-bold text-card-foreground mt-2">{rules.length.toString()}</p>
            </Card>
        ),
        "chart-proficiency": (
            <Card className="h-full flex flex-col">
                <TrilingualText as="h3" text={theme.vocabulary.chartProficiency} className="text-lg font-semibold text-card-foreground mb-4" />
                <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={proficiencyData} cx="50%" cy="50%" labelLine={false} outerRadius="80%" dataKey="value" nameKey="name" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} fill="var(--color-card-foreground)">
                                {proficiencyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-card-foreground)' }} />
                            <Legend iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        ),
        "chart-performance": (
            <Card className="h-full flex flex-col">
                <TrilingualText as="h3" text={theme.vocabulary.chartPerformance} className="text-lg font-semibold text-card-foreground mb-4"/>
                <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                        <XAxis type="number" dataKey="engagement" name="Engagement" unit="%" tick={{ fill: 'var(--color-foreground)' }} label={{ value: 'Engagement →', position: 'insideBottom', dy: 15, fill: 'var(--color-foreground)' }}/>
                        <YAxis type="number" dataKey="accuracy" name="Accuracy" unit="%" tick={{ fill: 'var(--color-foreground)' }} label={{ value: 'Accuracy →', position: 'insideLeft', angle: -90, dx: -15, fill: 'var(--color-foreground)' }} />
                        <ZAxis type="category" dataKey="name" name="Agent" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                        <Scatter name="Agents" data={performanceData} fill={activePalette.secondary} />
                    </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        ),
    };

  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.omniLogTitle} />
        <TrilingualText as="p" text={theme.vocabulary.omniLogSubtitle} className="text-lg text-foreground/70 mt-2" />
      </header>
      
      <ResponsiveGridLayout
        className="layout"
        layouts={theme.layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={150}
        onLayoutChange={(_, layouts) => updateLayout(layouts)}
        isDraggable
        isResizable
      >
        {(theme.layout?.lg || []).map(layoutItem => (
            <div key={layoutItem.i}>
                {dashboardWidgets[layoutItem.i]}
            </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default OmniLogPage;
