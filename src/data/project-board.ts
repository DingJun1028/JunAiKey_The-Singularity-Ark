
export interface BoardCard {
  title: string;
  assignees?: string[];
}

export interface BoardColumn {
  title: string;
  description: string;
  cards: BoardCard[];
}

export const projectBoardData: BoardColumn[] = [
    {
        title: "💭 New Feature",
        description: "The focus of the week. Stop by a weekly meeting to get more info!",
        cards: [
            { title: "Keep our Models List updated!" },
            { title: "[App]Can you add support for VScode LM API? That is, support for github copilot, refer to cline and roo cline" },
            { title: "MCP" },
            { title: "Agent Branching", assignees: ["michael-farah"] },
            { title: "[Feature] Add image upload feature" }
        ]
    },
    {
        title: "🔎 Improvements (A)",
        description: "The highest impact, top priority issues right now.",
        cards: [
            { title: "Nicely Show Diffs (not <<<<<< ORIGINAL, etc)" },
            { title: "[Feature] Allow multiple OpenAI-Compatible provider entries", assignees: ["HunterEvangelista"] },
            { title: "Add ability to specify additional JSON body in OpenAI-Compatible" },
            { title: "Disambiguate selected files" },
            { title: "Optimize" }
        ]
    },
    {
        title: "👀 Improvements (B)",
        description: "Smaller changes, but still high impact.",
        cards: [
            { title: "[Feature] Add \"copy prompt\" buttons everywhere" },
            { title: "Do not allow XML tool calls in <think> tags" },
            { title: "[Feature] Think tokens on vLLM - DeepSeek" },
            { title: "Feature Comparison" },
            { title: "[Feature] Auto-generate the commit message for git commit with one-click", assignees: ["Sedinha", "animeshlego5"] },
            { title: "[Feature] GitHub Copilot as provider" }
        ]
    }
];