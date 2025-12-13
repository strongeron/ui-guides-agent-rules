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
