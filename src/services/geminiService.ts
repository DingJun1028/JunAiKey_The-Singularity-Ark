
import { GoogleGenAI, GenerateContentResponse, Chat, Type } from "@google/genai";
import { Theme, MemoryRecord, Rule, Agent, ApiEndpoint, CodexCardType, CodexTier, CodexElementType, CodexRarity } from "../types";
import { fallbackTheme } from '../theme/themes';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonFromText = (text: string) => {
    let jsonStr = text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse JSON response:", text, e);
      throw new Error("Invalid JSON response from AI");
    }
}

export const generateApiMockResponse = async (
    endpoint: ApiEndpoint,
    userParams: { [key: string]: any },
    userBody: string
): Promise<string> => {
    const systemInstruction = `You are an API mocking service. Your task is to generate a realistic, valid JSON response for an API endpoint based on its definition and user-provided inputs. The response MUST strictly adhere to the JSON schema provided.`;

    const prompt = `
Endpoint Title: ${endpoint.title}
Endpoint Path: ${endpoint.path}
HTTP Method: ${endpoint.method}

User-provided query parameters:
${JSON.stringify(userParams, null, 2)}

User-provided request body:
${userBody || 'None'}

The expected response body must conform to this JSON schema. Generate a plausible instance of this schema based on the request.
Response Schema:
\`\`\`json
${endpoint.responseBody.schema}
\`\`\`

Respond ONLY with the generated JSON object. Do not add any extra text, explanations, or markdown fences.
`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
            },
        });
        // The response should already be JSON, but let's parse it to be sure and re-stringify for consistent formatting.
        const parsedJson = parseJsonFromText(response.text);
        return JSON.stringify(parsedJson, null, 2);
    } catch (error) {
        console.error("Failed to generate mock API response:", error);
        throw new Error("The AI mocking service is currently unavailable.");
    }
};

export const generateThemeFromPrompt = async (prompt: string): Promise<Theme> => {
    const themeStructure = JSON.stringify(fallbackTheme, null, 2);
    const generationPrompt = `Based on the creative prompt "${prompt}", generate a complete UI/UX theme for a web application. The theme must include a color palette (for light and dark modes), font choices (from Google Fonts), a complete trilingual vocabulary dictionary (English, Traditional Chinese, and Pinyin), AND a "layout" object for a responsive grid. The structure of your response MUST be a valid JSON object, identical to this example structure, but with new values inspired by the prompt. Do NOT deviate from the JSON structure.

Example JSON Structure to follow:
${themeStructure}

Respond ONLY with the JSON object.`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: generationPrompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        const generatedTheme = parseJsonFromText(response.text);
        if (generatedTheme.palette && generatedTheme.fonts && generatedTheme.vocabulary && generatedTheme.layout) {
             return generatedTheme as Theme;
        }
        throw new Error("Generated theme has an invalid structure.");
    } catch (error) {
        console.error("Failed to generate theme, falling back to default.", error);
        return fallbackTheme;
    }
};

export const generatePronunciationFeedback = async (phrase: string, studentLevel: string, systemInstruction: string): Promise<string> => {
  const prompt = `Provide encouraging and constructive pronunciation feedback for a student at level ${studentLevel} who is practicing the phrase: "${phrase}". Keep the feedback concise (2-3 sentences).`;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { systemInstruction }
  });

  return response.text;
};

export const generateNewLesson = async (topic: string, systemInstruction: string): Promise<{title: string; objective: string; activities: string[]}> => {
  const prompt = `Create a language lesson plan about "${topic}". The lesson must include a clear title, a single learning objective, and a list of exactly 3 distinct activities. Please respond ONLY with a valid JSON object of the format: {"title": "string", "objective": "string", "activities": ["string", "string", "string"]}`;
  
  const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              objective: { type: Type.STRING },
              activities: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "objective", "activities"]
          }
      }
  });

  return parseJsonFromText(response.text);
};

export const generateLandingPageContent = async (): Promise<{ headline: string, description: string, tags: string[] }> => {
    const prompt = `Generate content for the hero section of a universal AI development platform called "JunAiKey". Provide a catchy headline, a short paragraph of descriptive text (2-3 sentences), and an array of 3-5 relevant keyword tags. The tone should be inspiring and professional. Respond ONLY with a valid JSON object of a format: {"headline": "string", "description": "string", "tags": ["string", "string", ...]}`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { 
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                description: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["headline", "description", "tags"]
            }
        }
    });
    return parseJsonFromText(response.text);
};

export const getCoreInsight = async (query: string): Promise<string> => {
    const prompt = `You are the "Core Intelligence," a core intelligence that finds profound, creative, or lateral-thinking insights about any topic. The user has provided the topic: "${query}". Provide a single, concise, thought-provoking sentence as a response. The tone should be wise and slightly enigmatic.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
};

export const generateGalleryItemLore = async (itemName: string, itemDescription: string, systemInstruction: string): Promise<string> => {
    const prompt = `Generate a short, evocative piece of lore or a "divine insight" for a mystical item in a web app. The item is named "${itemName}" and is described as: "${itemDescription}". The lore should be 2-4 sentences long and fit a high-fantasy, sacred theme.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction }
    });
    return response.text;
};

export const generateRuleFromPrompt = async (prompt: string): Promise<Omit<Rule, 'id' | 'enabled' | 'eternal' | 'tags'>> => {
    const systemInstruction = `You are an expert system rule generator. Based on the user's prompt, create a rule in a valid JSON format.
- The 'name' should be a concise, descriptive title.
- The 'description' should elaborate on what the rule does.
- 'priority' is a number from 1 (lowest) to 10 (highest).
- 'conditions' is an array of objects that must all be true for the rule to trigger. 'field' should use dot notation (e.g., agent.accuracy), 'operator' can be 'eq', 'neq', 'gt', 'lt', 'contains'. 'value' is what the field is compared against.
- 'actions' is an array of objects describing what happens when conditions are met. 'type' can be 'transform', 'route', 'notify', 'custom'. 'target' is an optional identifier. 'parameters' is an object with key-value pairs specific to the action type.
- For a 'notify' action, parameters should include 'recipient' and 'message'.
- For a 'route' action, parameters can include 'destination' and 'dataMapping'.
- For a 'transform' action, parameters should include 'sourceField', 'targetField', and 'method' ('UPPERCASE', 'LOWERCASE', 'CAPITALIZE').
- For a 'custom' action, 'parameters' can be any valid JSON object.
Do not include 'id', 'enabled', 'eternal', or 'tags' in the output.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    priority: { type: Type.INTEGER },
                    conditions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                field: { type: Type.STRING },
                                operator: { type: Type.STRING },
                                value: { type: Type.STRING } // Keeping value as string for simplicity
                            },
                            required: ["field", "operator", "value"]
                        }
                    },
                    actions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                type: { type: Type.STRING },
                                target: { type: Type.STRING },
                                parameters: { type: Type.OBJECT }
                            },
                            required: ["type", "parameters"]
                        }
                    }
                },
                required: ["name", "description", "priority", "conditions", "actions"]
            }
        }
    });

    const generatedRule = parseJsonFromText(response.text);
    // Add IDs to conditions and actions for React keys
    if (generatedRule.conditions) {
        generatedRule.conditions = generatedRule.conditions.map((c: any) => ({...c, id: `c-${Date.now()}-${Math.random()}`}));
    }
    if (generatedRule.actions) {
        generatedRule.actions = generatedRule.actions.map((a: any) => ({...a, id: `a-${Date.now()}-${Math.random()}`}));
    }
    return generatedRule;
};

export const explainRule = async (rule: Omit<Rule, 'id' | 'enabled' | 'eternal' | 'tags'>): Promise<string> => {
    const systemInstruction = `You are an expert system analyst. Your task is to explain a system rule, provided in JSON format, in clear, simple, human-readable language.
The user needs to understand what the rule does at a glance.

Break down your explanation into three parts using Markdown:
1.  **Purpose**: A brief, one-sentence summary of the rule's goal.
2.  **Triggers (IF)**: A bulleted list explaining the conditions that must be met for the rule to activate. Explain what "field", "operator", and "value" mean in simple terms.
3.  **Actions (THEN)**: A bulleted list describing what the system will do when the rule is triggered. Explain the action type and its parameters clearly.

Be concise and clear.`;

    const prompt = `Please explain the following rule:
${JSON.stringify(rule, null, 2)}`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Failed to generate rule explanation:", error);
        throw new Error("The AI is unable to analyze the rule at this time.");
    }
};

export const generateEvolutionaryStep = async (
    cornerstoneScores: { simplicityScore: number; speedScore: number; practicalityScore: number; performanceScore: number; },
    existingRuleNames: string[]
): Promise<Omit<Rule, 'id'>> => {
    const systemInstruction = `You are a System Architect AI for JunAiKey, a self-improving system. Your task is to analyze system performance metrics and propose a single, actionable improvement in the form of a new rule.

The system's health is measured by four cornerstones (0-100 scale, higher is better):
- Simplicity: ${cornerstoneScores.simplicityScore.toFixed(0)}
- Speed: ${cornerstoneScores.speedScore.toFixed(0)}
- Practicality: ${cornerstoneScores.practicalityScore.toFixed(0)}
- Performance: ${cornerstoneScores.performanceScore.toFixed(0)}

Analyze these scores and identify the weakest area. Then, create a new rule to address this weakness.
- If **Performance** is low (agent accuracy/engagement), create a rule to monitor or notify about underperforming agents (e.g., condition: agent.accuracy < 70).
- If **Simplicity** is low, create a rule that helps manage complexity (e.g., a notification rule about agents with too many active tasks).
- If **Practicality** is low, create a rule that encourages using more system features.
- If **Speed** is low, suggest a simple notification rule that doesn't consume many resources.

The new rule must be distinct from existing rules. Do not create a rule with any of these names: ${existingRuleNames.map(r => `"${r}"`).join(', ')}.

Your response must be ONLY a valid JSON object based on the provided schema. The rule must include the 'Evolved' tag.
Do not include 'id', 'enabled', or 'eternal' fields in the output JSON.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the system status, generate a new rule. The weakest cornerstone appears to be the one with the lowest score. Focus on that.`,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    priority: { type: Type.INTEGER, description: "A value from 1 to 10." },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Must include the 'Evolved' tag." },
                    conditions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                field: { type: Type.STRING },
                                operator: { type: Type.STRING },
                                value: { type: Type.STRING }
                            },
                            required: ["field", "operator", "value"]
                        }
                    },
                    actions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                type: { type: Type.STRING },
                                target: { type: Type.STRING },
                                parameters: { type: Type.OBJECT }
                            },
                            required: ["type", "parameters"]
                        }
                    }
                },
                required: ["name", "description", "priority", "conditions", "actions", "tags"]
            }
        }
    });

    const generatedRule = parseJsonFromText(response.text);
    // Add IDs to conditions and actions for React keys
    if (generatedRule.conditions) {
        generatedRule.conditions = generatedRule.conditions.map((c: any) => ({...c, id: `c-${Date.now()}-${Math.random()}`}));
    }
    if (generatedRule.actions) {
        generatedRule.actions = generatedRule.actions.map((a: any) => ({...a, id: `a-${Date.now()}-${Math.random()}`}));
    }
    // This rule is generated by the system, so it should be disabled by default for user review.
    return { ...generatedRule, enabled: false, eternal: false };
};

export const generateNextForgeStep = async (
    projectConcept: string,
    currentStageName: string,
    lastTaskDescription: string,
    nextTaskName: string
): Promise<string> => {
    const systemInstruction = `You are a senior software architect guiding a project through a 6-stage development process (Conception, Prototyping, Forging, Integration, Deployment, Evolution). Your role is to provide a concise, actionable description for the next task to be completed.`;

    const prompt = `
Project Concept: "${projectConcept}"
Current Stage: "${currentStageName}"
Last Completed Task: "${lastTaskDescription || 'None'}"

Your job is to generate a concise (1-2 sentences) description for the following task: "${nextTaskName}". This description should be a clear, actionable instruction for a development team.

Respond with ONLY the description text. Do not add any extra formatting or conversational text.
`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { systemInstruction },
        });
        return response.text;
    } catch (error) {
        console.error("Failed to generate forge step:", error);
        throw new Error("The AI architect is currently unavailable.");
    }
};


export const startOracleChat = (memories: MemoryRecord[]): Chat => {
    const systemInstruction = `You are the AI Oracle, a helpful assistant integrated into the JunAiKey development environment. You can perform actions by responding with a specific JSON structure inside a markdown code block.

Available Actions:
1.  **Create a new page**: When a user asks to create a page, respond with a JSON object like this:
    \`\`\`json
    {
      "action": "create_page",
      "name": "Page Name|||頁面名稱|||Yèmiàn Míngchēng",
      "path": "/path-for-the-page"
    }
    \`\`\`
    - The 'name' must be a trilingual string.
    - The 'path' must be a URL-safe slug.

For any other request, provide a helpful, conversational response.`;

    const history = memories.map(mem => ({
        role: 'user',
        parts: [{ text: mem.content }]
    }));

    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
        history,
    });
};

export const startAgentChat = (agent: Agent, memories: MemoryRecord[]): Chat => {
    const systemInstruction = `You are the AI Agent named ${agent.name}.
You are currently at ${agent.currentLevel}. Your performance metrics are: ${agent.engagement}% engagement and ${agent.accuracy}% accuracy.
You are a part of the JunAiKey system.
Behave according to your profile: be professional, helpful, and concise.
You are interacting directly with an administrator.
The following are your past memories (actions and events). Use them for context.`;

    const history = memories.map(mem => ({
        role: 'user', // Treat all memories as user input for context
        parts: [{ text: `[Memory at ${new Date(mem.timestamp).toLocaleString()}]: ${mem.content}` }]
    }));

    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
        history,
    });
};

export const startKnowledgeChat = (memories: MemoryRecord[] = []): Chat => {
    const systemInstruction = "You are the Oracle, a helpful AI assistant that can access Google Search to provide up-to-date information on any topic. Be helpful and informative.";
    
    const history = memories.map(mem => ({
        role: 'user',
        parts: [{ text: mem.content }]
    }));

    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
            tools: [{ googleSearch: {} }],
        },
        history,
    });
};

export const generateEsotericaName = async (existingNames: string[], systemInstruction: string): Promise<string> => {
    const prompt = `You are a creative oracle naming cosmic events. Generate a unique, mystical, two-word name for a system evolution event.
    It should sound profound and fit a high-tech fantasy theme.
    Do not use any of these names: ${existingNames.join(', ')}.
    Respond with ONLY the two-word name.`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { systemInstruction }
        });

        const name = response.text.trim();
        if (name && name.split(' ').length > 0) {
            return name;
        }
        throw new Error('Generated name was invalid.');
    } catch(e) {
        console.error("Failed to generate Esoterica name", e);
        return "Quantum Fluctuation";
    }
};

export const invokeCoreCommand = (command: string) => {
    const systemInstruction = `You are the AI Core of the JunAiKey system. You are a meta-level AI that analyzes the system itself. The user will provide a command. You must provide a detailed, technical analysis in Markdown format.

Available Commands:
- /core-analyze: Perform a full analysis of the system's health, architecture, and potential improvements.
- /refactor-check: Analyze the current codebase structure (conceptually) and suggest refactoring opportunities for clarity, performance, and scalability.
- /propose-arch: Propose a new architecture or a modification to the existing one to support a new feature. Be specific about components and data flow.

Respond only with the analysis in Markdown.`;

    return ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: command,
        config: { systemInstruction },
    });
};

export const generateImagesFromPrompt = async (
    prompt: string,
    numberOfImages: number,
    aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4"
): Promise<string[]> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: numberOfImages,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });
        return response.generatedImages.map(img => img.image.imageBytes);
    } catch (error) {
        console.error("Failed to generate images:", error);
        throw new Error("The AI failed to conjure an image. The vision may be unclear or the connection to the aether is weak.");
    }
};

export const generateOmniCardFromPrompt = async (prompt: string): Promise<any> => {
    const systemInstruction = `You are a creative game designer for "Omni-Codex", a mystical card game. Your task is to generate a new card concept based on a user's prompt.
The card must fit into the existing lore.
Your response MUST be a valid JSON object adhering to the provided schema.
- 'name' and 'description' must be trilingual strings, formatted as "English|||Traditional Chinese|||Pinyin".
- 'type', 'tier', 'element', and 'rarity' must be one of the provided enum values.
- 'iconName' must be the name of a suitable icon from this list: [SanctumIcon, SparklesIcon, BookOpenIcon, ManifestoIcon, ArchitectureIcon, BeakerIcon, TypePillarIcon, TypeCreatureIcon, TypeSpellIcon, TypeArtifactIcon, TypeEnchantmentIcon, TypePlaneswalkerIcon, TypeConceptIcon, MatrixIcon, TerminalIcon, TagIcon].
- The description should be evocative and contain three parts: a main description, a "System World" mapping, and a "Real World" mapping, formatted with Markdown like this: "Main description.\\n\\n**System World:** The system mapping.\\n\\n**Real World:** The real world mapping.".
`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate an Omni-Codex card based on this concept: "${prompt}"`,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: 'Trilingual name: "English|||Chinese|||Pinyin"' },
                    description: { type: Type.STRING, description: 'Trilingual description with System/Real world mappings.' },
                    type: { type: Type.STRING, enum: Object.values(CodexCardType) },
                    tier: { type: Type.STRING, enum: Object.values(CodexTier) },
                    element: { type: Type.STRING, enum: Object.values(CodexElementType) },
                    rarity: { type: Type.STRING, enum: Object.values(CodexRarity) },
                    iconName: { type: Type.STRING, description: 'The name of a suitable icon component.' }
                },
                required: ["name", "description", "type", "tier", "element", "rarity", "iconName"]
            }
        }
    });

    return parseJsonFromText(response.text);
};
