

import React from 'react';
import { Layouts } from 'react-grid-layout';
import type { ReactNode } from 'react';

// Canonical Agent Type
export interface Agent {
  id: string;
  name: string;
  avatar: string;
  currentLevel: string; // e.g., 'Tier 2' or 'B1'
  engagement: number; // 0-100
  accuracy: number; // 0-100
  lastSession: string; // ISO date string
  learningPathId: string;
}

// Canonical Rule Types
export interface RuleCondition {
  id: string;
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'contains';
  value: any;
}

export interface RuleAction {
  id: string;
  type: 'transform' | 'route' | 'notify' | 'custom';
  target: string;
  parameters: Record<string, any>;
}

export interface Rule {
  id:string;
  name: string;
  description: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number;
  enabled: boolean;
  eternal: boolean;
  tags?: string[];
}

// Project Board Types
export interface BoardCard {
  id: string;
  title: string;
  assignees?: string[];
}

export interface BoardColumn {
  id: string;
  title: string;
  description: string;
  cards: BoardCard[];
}

// Gallery and Guardian Types
export interface GalleryItem {
  id: string;
  name: string;
  description: string;
  type: 'Item' | 'Phrase' | 'Artifact' | 'Rune';
  icon: string;
  themeId: string;
  effect?: { type: string; value: number };
  chineseExplanation?: string;
}

export interface ElementalGuardian {
  id: string;
  name: string;
  element: 'Fire' | 'Water' | 'Air' | 'Earth' | 'Light' | 'Dark' | 'Nature' | 'Aether';
  description: string;
  icon: string;
  effect: { type: 'efficiency' | 'insight'; value: number };
}

// --- NEW OMNI-CODEX TYPES ---

export enum CodexElementType {
  Gold = 'Gold',
  Wood = 'Wood',
  Water = 'Water',
  Fire = 'Fire',
  Earth = 'Earth',
  Light = 'Light',
  Dark = 'Dark',
  Aether = 'Aether', // Representing 'Colorless' or 'Universal'
  Nature = 'Nature',
}

export enum CodexCardType {
  Pillar = 'Pillar', // Replacing 'Resource' for foundational concepts
  Creature = 'Creature',
  Spell = 'Spell',
  Artifact = 'Artifact',
  Enchantment = 'Enchantment',
  Planeswalker = 'Planeswalker',
  Concept = 'Concept', // For non-card-like entries
}

export enum CodexTier {
  Origin = 'Origin',
  Core = 'Core',
  Apex = 'Apex',
}

export enum CodexRarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Mythic = 'Mythic',
  Legendary = 'Legendary',
}


export interface CodexEntry {
  id: string;
  name: string; // Trilingual: "Primary|||Secondary|||Pinyin"
  description: string; // Trilingual
  type: CodexCardType;
  tier: CodexTier;
  element: CodexElementType;
  rarity: CodexRarity;
  icon: React.FC<{ className?: string }>;
  relatedEntries?: string[]; // Array of related entry IDs
}


// Autonomous Agents
export interface AutonomousAgentAction {
  timestamp: string;
  description: string;
  status: 'success' | 'failure' | 'info';
}

export interface AutonomousAgent {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{className?: string}>;
  status: 'active' | 'inactive' | 'error';
  actions: AutonomousAgentAction[];
}

// Shared Types
export interface CustomPage {
  id: string;
  name: string;
  path: string;
}

export interface GroundingChunkWeb {
  uri?: string;
  title?: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
}

export interface ChatMessage {
  id:string;
  role: 'user' | 'model';
  text: string;
  imageUrl?: string;
  groundingChunks?: GroundingChunk[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  baseUrl?: string;
  title: string;
  category: string;
  description: string;
  headers?: { name: string; description: string; required: boolean; }[];
  parameters: { name: string; type: string; description:string; required: boolean; }[];
  requestBody?: {
    description: string;
    schema: string;
  };
  responseBody: {
    description: string;
    schema: string;
  };
}

export interface MemoryRecord {
  id: string;
  type: 'conversation' | 'agent_action' | 'system_event';
  timestamp: string; // ISO date string
  content: string;
  metadata?: Record<string, any>; // e.g., { agentId: '...', chatId: '...' }
}

export interface Tag {
  name: string;
  count: number;
}

export interface BulkTestResult {
  matchCount: number;
  totalCount: number;
  matchingAgents: Agent[];
}

// Types for RuleEditorPage component modularization
export type EditableRuleAction = Omit<RuleAction, 'parameters'> & {
    parameters: string | Record<string, any>;
};

export type EditableRule = Omit<Rule, 'actions'> & {
    actions?: EditableRuleAction[];
};

export interface TestResult {
  overallMatch: boolean;
  conditionResults: {
    condition: RuleCondition;
    actualValue: any;
    met: boolean;
  }[];
}


export interface Announcement {
  id: string;
  icon: 'info' | 'warning' | 'success' | 'system';
  title: string;
  description: string;
  timestamp: string; // ISO date string
  href?: string;
}


// --- Theming System Types ---

export interface Palette {
  [key: string]: string;
}

export interface Theme {
  id: string;
  name: string;
  palette: {
    light: Palette;
    dark: Palette;
  };
  fonts: {
    heading: string;
    body: string;
    monospace: string;
  };
  vocabulary: {
    [key: string]: string;
  };
  abilities: {
    systemInstruction: string;
    [key: string]: any;
  };
  images?: {
    background?: string;
  };
  effects?: {
    [key:string]: any;
  };
  layout: Layouts;
}

// --- NEW UNIFIED ARCHITECTURE TYPES ---
export type ModuleCategory = 'CoreEngine' | 'RuneSystem' | 'AgentNetwork' | 'KnowledgeHub' | 'SyncMatrix' | 'InterfaceProtocol' | 'EvolutionLoop' | 'MonitoringBody' | 'SecurityDomain' | 'MetaArchitecture' | 'TaggingSystem' | 'ThemeEngine';

export interface OmniModule {
  id: string;
  nameKey: keyof Theme['vocabulary'];
  descriptionKey: keyof Theme['vocabulary'];
  href: string;
  icon: React.FC<{ className?: string }>;
}

export interface MeceDimension {
  id: ModuleCategory;
  nameKey: keyof Theme['vocabulary'];
  descriptionKey: keyof Theme['vocabulary'];
  modules: OmniModule[];
}

// --- Zustand State ---

export interface JunAiKeyState {
  agents: Agent[];
  rules: Rule[];
  memories: MemoryRecord[];
  galleryItems: GalleryItem[];
  elementalGuardians: ElementalGuardian[];
  collectedArtifactIds: string[];
  activeGuardianIds: string[];
  customPages: CustomPage[];
  boardColumns: BoardColumn[];
  announcements: Announcement[];
  lastCheckedAnnouncements: string;
  loading: boolean;
  
  initialize: () => void;
  updateRule: (updatedRule: Rule) => void;
  addRule: (newRule: Omit<Rule, 'id'>) => Rule;
  getRuleById: (id: string) => Rule | undefined;
  getAgentById: (id: string) => Agent | undefined;
  
  addCustomPage: (page: Omit<CustomPage, 'id'>) => void;

  toggleArtifact: (artifactId: string) => void;
  toggleGuardian: (guardianId: string) => void;
  
  addMemory: (memory: Omit<MemoryRecord, 'id' | 'timestamp'>) => void;
  searchMemories: (query: string) => MemoryRecord[];

  getAllTags: () => Tag[];
  renameTag: (oldName: string, newName: string) => void;
  deleteTag: (tagName: string) => void;
  mergeTags: (sourceTagNames: string[], destinationTagName: string) => void;

  setBoardData: (newBoardData: BoardColumn[]) => void;
  markAllAnnouncementsAsRead: () => void;

  getClarityBoost: () => number;
  getDevotionBoost: () => number;
  getSystemEfficiencyBoost: () => number;
  getAiInsightBoost: () => number;
}