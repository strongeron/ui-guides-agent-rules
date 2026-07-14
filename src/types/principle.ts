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
  | 'web-platform'     // web.dev + MDN (Google / Mozilla)
  | 'anthropic'        // Anthropic frontend-design skill guidelines
  | 'rauno'            // Rauno Freiberg's interfaces.rauno.me
  | 'emilkowalski'     // Emil Kowalski's animation skills
  | 'impeccable'       // Paul Bakaus' impeccable design language (impeccable.style)
  | 'interface-design' // Damola Akinleye's interface-design craft principles
  | 'lottiefiles'      // LottieFiles motion-design skill (runtime-agnostic motion direction)
  | 'custom';          // Internal/custom patterns

export interface PatternSourceInfo {
  id: PatternSource;
  name: string;
  description: string;
  url?: string;
  rulesUrl?: string;    // Direct URL to raw rules content
  color: string;        // Badge color class
}

/** A published principle renders normally; a draft is hidden in the app until its examples are authored. */
export type PrincipleStatus = 'published' | 'draft';

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
  /** Freeform filter tags (e.g. 'motion', 'a11y', 'typography'). */
  tags?: string[];
  /** Defaults to 'published' when omitted. Drafts are hidden from the app. */
  status?: PrincipleStatus;
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
