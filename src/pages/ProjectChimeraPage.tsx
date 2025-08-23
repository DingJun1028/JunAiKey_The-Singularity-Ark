
import React from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';

const chimeraContent = `# Project Chimera: The Global Transaction Bus

> **System Upgrade Complete: Core architecture upgraded to version 3.0.**

**Project Chimera** marks a fundamental evolution in the Jun.Ai.Key system's core architecture. We have moved from a linear, single-point-of-failure trigger system to a decentralized, robust synchronization network built upon the **Global Transaction Bus (GTB)**.

---

## The Problem with Linear Flows

The previous architecture relied on a simple, linear flow. While simple, this had several limitations:

*   **Single Point of Failure**: If the initial trigger failed, the entire workflow was compromised.
*   **Lack of Flexibility**: It was difficult to initiate processes from different points in the ecosystem.
*   **One-Way Street**: Data synchronization was often unidirectional, leading to data silos and inconsistencies.

### Previous Architecture (v2.x)

\`\`\`mermaid
graph TD
    A[Event Trigger] --> B(OmniFlow);
    B --> C{Rule Matching};
    C --> D[Action Execution];
    D --> E((External API));
\`\`\`

---

## The Solution: Global Transaction Bus (GTB)

The GTB is the heart of Project Chimera. It's a decentralized message bus that every integrated component of the Jun.Ai.Key ecosystem is connected to. Instead of a single trigger point, any connected application or agent can publish an event (a "transaction") to the bus.

### How It Works

1.  **Publish**: A connected app (e.g., Notion, a custom agent, the UI) publishes an event to the GTB. This event contains a payload with all relevant data.
2.  **Listen**: Other components in the ecosystem are constantly listening for relevant events on the GTB.
3.  **React**: When a component detects an event it's subscribed to, it reacts accordingly. This could mean updating its own data, triggering an internal workflow, or even publishing a new event back to the bus.

This creates a self-sustaining, reactive loop where the entire system stays in a constant state of seamless, bi-directional synchronization.

### New Architecture (v3.0 "Chimera")

\`\`\`mermaid
graph TD
    subgraph GlobalTransactionBus [Global Transaction Bus (GTB)]
        direction LR
        bus((GTB Core))
    end

    A[Notion] -- Pub/Sub --> bus;
    B[Capacities] -- Pub/Sub --> bus;
    C[OmniAgents] -- Pub/Sub --> bus;
    D[OmniFlow] -- Pub/Sub --> bus;
    E[External Webhooks] -- Pub/Sub --> bus;
    F[...] -- Pub/Sub --> bus;

    style bus fill:#333,stroke:#8E5A85,stroke-width:4px
\`\`\`

## Key Benefits of Project Chimera

*   **Decentralization**: No single point of failure. The system is resilient and robust.
*   **True Bi-Directional Sync**: Any change in any connected app is instantly propagated across the entire ecosystem.
*   **Scalability**: New applications, agents, and services can be easily "plugged into" the bus without re-architecting existing flows.
*   **Emergent Automation**: Complex, multi-system workflows can emerge organically from simple, single-purpose event listeners reacting in concert.

Project Chimera lays the foundation for a truly interconnected and intelligent system, ready for the next generation of automation and AI-driven collaboration.
`;

const ProjectChimeraPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <header>
        <TrilingualText as="h1" text={theme.vocabulary.navProjectChimera} />
        <TrilingualText as="p" text={theme.vocabulary.projectChimeraSubtitle} className="text-lg text-foreground/70 mt-2" />
      </header>
      <Card>
        <MarkdownRenderer content={chimeraContent} />
      </Card>
    </div>
  );
};

export default ProjectChimeraPage;
