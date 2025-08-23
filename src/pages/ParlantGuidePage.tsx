
import React from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';

const CodeBlock: React.FC<{ children: React.ReactNode, lang?: string }> = ({ children, lang }) => (
    <div className="my-4 rounded-lg border border-border overflow-hidden bg-background/50">
        {lang && <div className="px-4 py-1 bg-border/20 text-xs font-mono text-foreground/70">{lang}</div>}
        <pre className="p-4 overflow-x-auto text-sm">
            <code className={`language-${lang}`}>{children}</code>
        </pre>
    </div>
);


const SolutionsHubPage: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navSolutionsHub} />
                <TrilingualText as="p" text={theme.vocabulary.solutionsHubSubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>

            <Card className="p-8">
                <div className="max-w-4xl mx-auto space-y-8 text-foreground/90">
                    <div className="text-center space-y-4">
                        <picture>
                            <source media="(prefers-color-scheme: dark)" srcSet="https://github.com/emcie-co/parlant/blob/develop/LogoTransparentLight.png?raw=true" />
                            <img alt="Parlant Banner" src="https://github.com/emcie-co/parlant/blob/develop/LogoTransparentDark.png?raw=true" width="400" className="mx-auto" />
                        </picture>
                        <div className="flex justify-center items-center gap-4 flex-wrap">
                            <a href="https://www.parlant.io/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Website</a> —
                            <a href="https://www.parlant.io/docs/quickstart/introduction" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Introduction</a> —
                            <a href="https://www.parlant.io/docs/tutorial/getting-started" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Tutorial</a> —
                            <a href="https://www.parlant.io/docs/about" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">About</a>
                        </div>
                        <div className="flex justify-center items-center gap-2 flex-wrap">
                            <img alt="PyPI - Version" src="https://img.shields.io/pypi/v/parlant" />
                            <img alt="PyPI - Python Version" src="https://img.shields.io/pypi/pyversions/parlant" />
                            <img alt="Apache 2 License" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg" />
                            <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/w/emcie-co/parlant?label=commits" />
                            <img alt="PyPI - Downloads" src="https://img.shields.io/pypi/dm/parlant" />
                            <a href="https://discord.gg/duxWqxKk6J" target="_blank" rel="noopener noreferrer"><img alt="Discord" src="https://img.shields.io/discord/1312378700993663007?style=flat&logo=discord&logoColor=white&label=discord" /></a>
                        </div>
                        <a href="https://trendshift.io/repositories/12768" target="_blank" rel="noopener noreferrer">
                            <img src="https://trendshift.io/api/badge/repositories/12768" alt="emcie-co%2Fparlant | Trendshift" style={{ width: 250, height: 55 }} />
                        </a>
                    </div>

                    <h1 className="text-4xl font-bold text-center">Build a scalable AI chat agent—in minutes.</h1>
                    <p>Parlant is the open-source backbone for LLM agents that stay under control as you scale their complexity.</p>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">💡 Bring control and consistency to LLM agents...</h2>
                    <p>You've built a conversational AI agent—that's great! However, when you actually test it, you see it's not handling many customer interactions properly, and your business experts are displeased with its behavior. We've all been there. What do you do?</p>
                    <p>Parlant might be the answer you've been waiting for. It's an open-source conversation modeling engine that gives you unparalleled, scalable control over LLMs, enabling the creation of deliberate, predictable, and compliant Agentic User Experience (UX).</p>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">✨ Why Parlant?</h2>
                    <p>Building good quality conversational AI means teaching your agents many facts, rules, and principles of behavior to follow when interacting with customers.</p>
                    <p>Parlant lets you define your conversational rules and logic in natural language, and it manages the underlying LLM's context such that it knows exactly which rules it must conform to at any point in a conversation.</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>🚀 Gets you up and running with a live conversational agent in minutes</li>
                        <li>⚡️ Uses perceived-performance techniques to deliver responsive chat UX out-of-the-box</li>
                        <li>🧱 A scalable foundation for scaling your agent's knowledge and rules</li>
                        <li>🎯 Dramatically increases the LLM's consistency in following your instructions</li>
                        <li>💬 Tailor-made framework for conversational, customer-facing use cases</li>
                    </ul>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">🚀 Getting started</h2>
                    <p>Getting Parlant up and running is straightforward.</p>

                    <h3 className="text-2xl font-semibold">Installation</h3>
                    <CodeBlock lang="bash">{'pip install parlant'}</CodeBlock>

                    <h3 className="text-2xl font-semibold">Code Example</h3>
                    <CodeBlock lang="python">{`import asyncio
from collections import defaultdict
from textwrap import dedent

# Note: This is a conceptual example. \`p\` would be \`import parlant as p\`.
# This code is for illustrative purposes and is not directly executable here.

CARTS: dict[str, list[str]] = defaultdict(list)

# @p.tool
async def add_item_to_cart(item_id: str):
    # Mock implementation
    print(f"Adding ${'{'}item_id${'}'} to cart.")
    return f"Item added successfully."

# @p.tool
async def list_books(preference_query: str):
    # Mock implementation
    print(f"Searching for books with preference: ${'{'}preference_query${'}'}")
    return ["The Wise Man's Fear", "The Name of the Wind"]

# @p.tool
async def human_handoff(reason: str):
    # Mock implementation
    print(f"Handoff to human operator for reason: ${'{'}reason${'}'}")
    return "Session handed off to sales team"

# ... (conceptual representation of agent configuration)
`}</CodeBlock>
                    <p>After running a Parlant server, you can visit http://localhost:8800 for an integrated playground web UI.</p>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">⭐ Star Parlant to support our vision!</h2>
                    <p>Creating Parlant is a significant effort, as conversational semantics are extremely complex to get under control.</p>
                    <p>Your star goes a long way to support our team's effort in creating a reality where generative AI agents reliably do what we tell them!</p>
                    <a href="https://www.star-history.com/#emcie-co/parlant&Date" target="_blank" rel="noopener noreferrer">
                        <img src="https://api.star-history.com/svg?repos=emcie-co/parlant&type=Date" alt="Star History Chart" />
                    </a>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">Integrated prototyping playground</h2>
                    <img alt="Parlant Demo" src="https://github.com/emcie-co/parlant/blob/develop/demo.gif?raw=true" className="w-full rounded-lg border border-border" />

                    <h2 className="text-3xl font-bold border-b border-border pb-2">🛠️ Key features</h2>
                    <p>Parlant is <strong>packed</strong> with useful features for production conversational AI!</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li><strong>Behavioral Guidelines:</strong> Easily define rules and guardrails for agent interactions and <strong>dictate and enforce exact conversation behavior</strong>.</li>
                      <li><strong>Semantic Relationships:</strong> Define how different guidelines relate to each other (dependencies, prioritization, etc.), creating sophisticated and adaptive conversational flows.</li>
                      <li><strong>Tool Integration:</strong> Seamlessly attach external tools (APIs, databases, etc.) with specific guidance for agent usage.</li>
                      <li><strong>Context Awareness:</strong> Intelligently tracks conversation progress, understanding what instructions need to apply at each point, and when required actions have already been taken.</li>
                      <li><strong>Dynamic Guideline Matching:</strong> Ensures contextually relevant instruction execution, eliminating irrelevant instructions at any point in the conversation — solving LLM attention drift.</li>
                      <li><strong>Utterance Templates:</strong> Sanitize LLM outputs, preventing unpredictable or inaccurate messages and ensuring compliance and accuracy.</li>
                      <li><strong>Glossary Management:</strong> Control and manage the agent's vocabulary for consistent and accurate communication.</li>
                      <li><strong>Contextual Information:</strong> Inject customer-specific or domain-specific information for personalized and relevant responses.</li>
                      <li><strong>Continuous Re-evaluation:</strong> The Parlant engine constantly assesses the conversational situation, checks relevant guidelines, gathers necessary information, and re-evaluates its approach.</li>
                    </ul>
                    <p>For more detailed installation instructions and advanced usage, please refer to our <a href="https://parlant.io" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Official Documentation</a>.</p>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">React Widget</h2>
                    <p>Please see <a href="https://github.com/emcie-co/parlant-chat-react" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">https://github.com/emcie-co/parlant-chat-react</a> for our official, highly-customizable React widget to interact with your Parlant server on your app.</p>
                    <img src="https://github.com/emcie-co/parlant-chat-react/raw/main/src/assets/chatbox.gif" alt="React chatbox widget" className="rounded-lg border border-border" />
                    <CodeBlock lang="tsx">{`import React from 'react';
import ParlantChatbox from 'parlant-chat-react';

function App() {
  return (
    <div>
      <h1>My Application</h1>
      <ParlantChatbox
        float
        agentId="AGENT_ID"
        server="PARLANT_SERVER_URL"
      />
    </div>
  );
}

export default App;`}
                    </CodeBlock>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">🌐 Use cases & industries</h2>
                    <p>Parlant is ideal for organizations that demand precision and reliability from their AI agents. It's currently being used to deliver complex conversational agents in:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Regulated Financial Services:</strong> Ensuring compliance and accuracy in customer interactions.</li>
                        <li><strong>Healthcare Communications:</strong> Providing accurate, compliant, and sensitive patient information.</li>
                        <li><strong>Legal Assistance:</strong> Delivering reliable and verifiable legal guidance.</li>
                        <li><strong>Compliance-Focused Use Cases:</strong> Automating adherence to industry standards and strict protocols.</li>
                        <li><strong>Brand-Sensitive Customer Service:</strong> Maintaining consistent brand voice and policies across all interactions.</li>
                        <li><strong>Personal Advocacy & Representation:</strong> Supporting structured and goal-oriented dialogues for high-stakes scenarios.</li>
                    </ul>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">🤝 Contributing</h2>
                    <p>We use the Linux-standard Developer Certificate of Origin (DCO.md), so that, by contributing, you confirm that you have the rights to submit your contribution under the Apache 2.0 license (i.e., that the code you're contributing is truly yours to share with the project).</p>
                    <p>Please consult CONTRIBUTING.md for more details.</p>
                    <p>Can't wait to get involved? Join us on Discord and let's discuss how you can help shape Parlant. We're excited to work with contributors directly while we set up our formal processes!</p>

                    <h2 className="text-3xl font-bold border-b border-border pb-2">📧 Contact & support</h2>
                    <p>Need help? Ask us anything on <a href="https://discord.gg/duxWqxKk6J" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Discord</a>. We're happy to answer questions and help you get up and running!</p>
                </div>
            </Card>
        </div>
    );
};

export default SolutionsHubPage;
