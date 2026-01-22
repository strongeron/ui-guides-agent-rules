import { Pre, highlight, type AnnotationHandler } from 'codehike/code';
import { useState, useEffect } from 'react';

// Annotation handlers
const mark: AnnotationHandler = {
  name: 'mark',
  Inline: ({ children }) => (
    <span className="bg-warning/40 rounded px-0.5">{children}</span>
  ),
  Line: ({ ...props }) => (
    <div {...props} className="bg-warning/20 border-l-2 border-warning -mx-4 px-4" />
  ),
};

const focus: AnnotationHandler = {
  name: 'focus',
  onlyIfAnnotated: true,
  Line: ({ annotation, ...props }) => (
    <div {...props} className={annotation ? 'bg-primary/10' : 'opacity-40'} />
  ),
};

const callout: AnnotationHandler = {
  name: 'callout',
  Block: ({ annotation, children }) => (
    <div className="relative">
      {children}
      <div className="absolute -right-2 top-0 translate-x-full pl-4 text-xs text-muted-foreground max-w-[200px]">
        <span className="bg-muted px-2 py-1 rounded border border-border">
          {annotation.query}
        </span>
      </div>
    </div>
  ),
};

const diff: AnnotationHandler = {
  name: 'diff',
  Line: ({ annotation, ...props }) => {
    const bg = annotation?.query === '-'
      ? 'bg-error/20 border-l-2 border-error'
      : 'bg-success/20 border-l-2 border-success';
    return <div {...props} className={`${bg} -mx-4 px-4`} />;
  },
};

const handlers = [mark, focus, callout, diff];

// Demo code samples
const transitionAllCode = `/* ❌ Bad - animates EVERYTHING */
.card {
  transition: all 0.3s ease;
}

/* ✅ Good - only compositor properties */
.card {
  transition: transform 0.3s, opacity 0.3s;
}`;

const focusDemoCode = `function Form() {
  // Create refs for focus management
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = () => {
    if (errors.name) {
      nameRef.current?.focus();
    }
  };
}`;

const diffDemoCode = `function Button({ children }) {
-  return <div onClick={onClick}>{children}</div>
+  return <button type="button">{children}</button>
}`;

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
  annotations?: string[];
}

function CodeBlock({ code, lang = 'tsx', title }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<any>(null);

  useEffect(() => {
    highlight(
      { value: code, lang, meta: '' },
      'github-dark'
    ).then(setHighlighted);
  }, [code, lang]);

  if (!highlighted) {
    return <div className="animate-pulse bg-muted h-32 rounded-lg" />;
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {title && (
        <div className="bg-muted px-4 py-2 text-sm font-medium border-b border-border">
          {title}
        </div>
      )}
      <Pre
        code={highlighted}
        handlers={handlers}
        className="p-4 bg-[#0d1117] text-sm overflow-x-auto font-mono"
      />
    </div>
  );
}

export function CodeHikeDemo() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">CodeHike Demo</h1>
        <p className="text-muted-foreground">
          Interactive code blocks with syntax highlighting, annotations, and more.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Basic Syntax Highlighting</h2>
        <p className="text-sm text-muted-foreground">
          CodeHike provides beautiful syntax highlighting out of the box.
        </p>
        <CodeBlock
          code={transitionAllCode}
          lang="css"
          title="transition-comparison.css"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Focus Annotations</h2>
        <p className="text-sm text-muted-foreground">
          Highlight specific lines to draw attention to key code.
        </p>
        <CodeBlock
          code={focusDemoCode}
          lang="tsx"
          title="FocusManagement.tsx"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Diff Highlighting</h2>
        <p className="text-sm text-muted-foreground">
          Show code changes with + and - line markers.
        </p>
        <CodeBlock
          code={diffDemoCode}
          lang="tsx"
          title="Before → After"
        />
      </section>

      <section className="space-y-4 bg-muted/50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Integration Status</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-success">✓</span>
            CodeHike configured in vite.config.ts
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">✓</span>
            Syntax highlighting working
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">✓</span>
            Annotation handlers created
          </li>
          <li className="flex items-center gap-2">
            <span className="text-warning">◐</span>
            MDX integration pending (MDX files exist but not rendered in main app)
          </li>
        </ul>
      </section>
    </div>
  );
}
