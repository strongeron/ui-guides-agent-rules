export type PrincipleCategory =
  | 'interactions'
  | 'animations'
  | 'layout'
  | 'content'
  | 'forms'
  | 'performance'
  | 'design'
  | 'vercel-specific';

export interface Principle {
  id: string;
  category: PrincipleCategory;
  title: string;
  description: string;
  sourceQuote: string;
  additionalExplanation: string;
  sourceLinks: SourceLink[];
  badExampleKey: string;
  goodExampleKey: string;
}

export interface SourceLink {
  text: string;
  url: string;
}

export interface CategoryInfo {
  id: PrincipleCategory;
  title: string;
  description: string;
}

// Agent rule types
export type AgentRulePriority = 'MUST' | 'SHOULD' | 'NEVER';

export interface AgentRule {
  priority: AgentRulePriority;
  rule: string;
  codeExample?: string;
}

// Type helper to extract principle IDs from data
export type PrincipleId<T extends readonly Principle[]> = T[number]['id'];
