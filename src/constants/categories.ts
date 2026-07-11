import {
  MousePointerClick,
  Sparkles,
  LayoutGrid,
  FileText,
  TextCursorInput,
  Gauge,
  Palette,
  Wand2,
  FlaskConical,
  Folder,
  type LucideIcon,
} from 'lucide-react';

/** One icon per category, shared by the sidebar sections and the content tags */
export const categoryIcons: Record<string, LucideIcon> = {
  interactions: MousePointerClick,
  animations: Sparkles,
  layout: LayoutGrid,
  content: FileText,
  forms: TextCursorInput,
  performance: Gauge,
  design: Palette,
  aesthetics: Wand2,
  demos: FlaskConical,
};

export const fallbackCategoryIcon: LucideIcon = Folder;
