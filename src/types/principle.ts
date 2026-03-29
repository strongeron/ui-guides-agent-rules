export type PrincipleCategory =
  | 'interactions'
  | 'animations'
  | 'layout'
  | 'content'
  | 'forms'
  | 'performance'
  | 'design'
  | 'aesthetics'
  | 'vercel-specific';

// Pattern source types for multi-source "brain center"
export type PatternSource =
  | 'vercel'           // Vercel Web Interface Guidelines
  | 'wcag'             // WCAG 2.1/2.2 Success Criteria
  | 'aria'             // WAI-ARIA Authoring Practices
  | 'design-system'    // Design system patterns
  | 'tailwind'         // Tailwind CSS golden rules
  | 'rams'             // RAMS accessibility and visual design review
  | 'ibelick'          // @Ibelick UI Skills - opinionated constraints
  | 'claude-code'      // Claude Code suggested rules from research
  | 'anthropic'        // Anthropic frontend-design skill guidelines
  | 'rauno'            // Rauno Freiberg's interfaces.rauno.me
  | 'custom';          // Internal/custom patterns

export interface PatternSourceInfo {
  id: PatternSource;
  name: string;
  description: string;
  url?: string;
  rulesUrl?: string;    // Direct URL to raw rules content
  color: string;        // Badge color class
}

export interface Principle {
  id: string;
  category: PrincipleCategory;
  source?: PatternSource;  // Pattern source for multi-source support
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
