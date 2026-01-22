import { Pre, highlight, type AnnotationHandler, type HighlightedCode } from 'codehike/code';
import { useState, useEffect } from 'react';

// ============================================
// ANNOTATION HANDLERS
// Each handler defines how an annotation renders
// ============================================

// Mark: Highlights text with a warning color
const mark: AnnotationHandler = {
  name: 'mark',
  Inline: ({ children }) => (
    <span className="bg-warning/50 rounded px-1 py-0.5 text-warning-foreground">{children}</span>
  ),
  Line: ({ ...props }) => (
    <div {...props} className="bg-warning/20 border-l-4 border-warning -mx-4 px-4" />
  ),
};

// Focus: Dims non-focused lines, highlights focused ones
const focus: AnnotationHandler = {
  name: 'focus',
  onlyIfAnnotated: true,
  Line: ({ annotation, ...props }) => (
    <div
      {...props}
      className={annotation ? 'bg-primary/15 border-l-4 border-primary -mx-4 px-4' : 'opacity-30'}
    />
  ),
};

// Callout: Shows a tooltip/callout next to code
const callout: AnnotationHandler = {
  name: 'callout',
  Inline: ({ annotation, children }) => (
    <span className="relative group cursor-help border-b-2 border-dotted border-info">
      {children}
      <span className="absolute left-0 top-full mt-2 px-3 py-2 text-xs bg-popover text-popover-foreground border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
        💡 {annotation.query}
      </span>
    </span>
  ),
};

// Diff: Shows added/removed lines with git-style colors
const diff: AnnotationHandler = {
  name: 'diff',
  Line: ({ annotation, ...props }) => {
    const isRemoval = annotation?.query === '-';
    return (
      <div
        {...props}
        className={`-mx-4 px-4 ${
          isRemoval
            ? 'bg-error/20 border-l-4 border-error line-through decoration-error/50'
            : 'bg-success/20 border-l-4 border-success'
        }`}
      />
    );
  },
};

// Box: Wraps code in a highlighted box
const box: AnnotationHandler = {
  name: 'box',
  Block: ({ children }) => (
    <div className="ring-2 ring-primary/50 rounded-md bg-primary/5 -mx-2 px-2 py-1 my-1">
      {children}
    </div>
  ),
};

// ============================================
// CODE BLOCK COMPONENT
// ============================================

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
  meta?: string;
  handlers?: AnnotationHandler[];
}

function CodeBlock({
  code,
  lang = 'tsx',
  title,
  meta = '',
  handlers: customHandlers
}: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null);

  const activeHandlers = customHandlers || [mark, focus, callout, diff, box];

  useEffect(() => {
    highlight(
      { value: code, lang, meta },
      'github-dark'
    ).then(setHighlighted);
  }, [code, lang, meta]);

  if (!highlighted) {
    return <div className="animate-pulse bg-muted h-32 rounded-lg" />;
  }

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm">
      {title && (
        <div className="bg-muted/80 px-4 py-2.5 text-sm font-medium border-b border-border flex items-center gap-2">
          <span className="text-muted-foreground">📄</span>
          {title}
        </div>
      )}
      <Pre
        code={highlighted}
        handlers={activeHandlers}
        className="p-4 bg-[#0d1117] text-sm overflow-x-auto font-mono leading-relaxed"
      />
    </div>
  );
}

// ============================================
// DEMO SECTIONS
// ============================================

function BasicHighlightingDemo() {
  const code = `function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
  return { greeting: \`Hello, \${name}!\` };
}

// Call the function
const result = greet("World");`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🎨</span> Basic Syntax Highlighting
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          CodeHike provides beautiful, theme-aware syntax highlighting out of the box.
        </p>
      </div>
      <CodeBlock code={code} lang="typescript" title="greeting.ts" />
    </section>
  );
}

function FocusDemo() {
  // Lines 3-5 are focused (1-indexed in meta)
  const code = `function validateForm(data) {
  const errors = {};

  // These lines are focused - key validation logic
  if (!data.email?.includes('@')) {
    errors.email = 'Invalid email address';
  }

  if (data.password?.length < 8) {
    errors.password = 'Password too short';
  }

  return errors;
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🔍</span> Focus Annotation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Draw attention to specific lines by dimming surrounding code.
          <span className="text-primary font-medium"> Lines 4-7 are focused below.</span>
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="javascript"
        title="validation.js"
        meta="focus(4:7)"
      />
    </section>
  );
}

function MarkDemo() {
  const code = `/* ❌ Bad - animates EVERYTHING including layout */
.card {
  transition: all 0.3s ease;
}

/* ✅ Good - only compositor-friendly properties */
.card {
  transition: transform 0.3s, opacity 0.3s;
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">✨</span> Mark Annotation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Highlight important lines with a colored background.
          <span className="text-warning font-medium"> Lines 3 and 8 are marked below.</span>
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="css"
        title="transitions.css"
        meta="mark(3,8)"
      />
    </section>
  );
}

function DiffDemo() {
  const code = `function Button({ children, onClick }) {
  return (
    <div onClick={onClick} className="btn">
      {children}
    </div>
  );
}`;

  const codeAfter = `function Button({ children, onClick }) {
  return (
    <button type="button" onClick={onClick} className="btn">
      {children}
    </button>
  );
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">📝</span> Diff Annotation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Show code changes with git-style added/removed highlighting.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <CodeBlock
          code={code}
          lang="tsx"
          title="❌ Before (using div)"
          meta="diff(3:5)[-]"
        />
        <CodeBlock
          code={codeAfter}
          lang="tsx"
          title="✅ After (using button)"
          meta="diff(3:5)[+]"
        />
      </div>
    </section>
  );
}

function CalloutDemo() {
  const code = `function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">💬</span> Callout Annotation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add explanatory tooltips to specific parts of code.
          <span className="text-info font-medium"> Hover over the dotted underlines below.</span>
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="typescript"
        title="useDebounce.ts"
        meta="callout(5:7)[Debounce prevents excessive calls] callout(9)[Cleanup on unmount]"
      />
    </section>
  );
}

function CombinedDemo() {
  const code = `// Error handling pattern for forms
async function handleSubmit(formData) {
  // Validate first
  const errors = validateForm(formData);

  if (Object.keys(errors).length > 0) {
    // Focus first error field
    const firstError = Object.keys(errors)[0];
    document.getElementById(firstError)?.focus();
    return { success: false, errors };
  }

  // Submit to API
  const response = await api.submit(formData);
  return { success: true, data: response };
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🎯</span> Combined Annotations
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Multiple annotation types can be combined for rich code documentation.
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="typescript"
        title="formHandler.ts"
        meta="focus(6:10) mark(8)"
      />
    </section>
  );
}

function BoxDemo() {
  const code = `interface UserProps {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function UserCard({ name, email, role }: UserProps) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      <Badge variant={role}>{role}</Badge>
    </div>
  );
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">📦</span> Box Annotation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Group related code with a visual boundary.
          <span className="text-primary font-medium"> The interface definition is boxed below.</span>
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="typescript"
        title="UserCard.tsx"
        meta="box(1:5)"
      />
    </section>
  );
}

// ============================================
// MAIN DEMO PAGE
// ============================================

export function CodeHikeDemo() {
  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
          CodeHike Demo
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interactive code blocks with syntax highlighting, annotations, and visual
          documentation features powered by CodeHike.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-12">
        <BasicHighlightingDemo />
        <FocusDemo />
        <MarkDemo />
        <DiffDemo />
        <CalloutDemo />
        <BoxDemo />
        <CombinedDemo />
      </div>

      {/* Integration Status */}
      <section className="mt-16 bg-gradient-to-br from-muted/50 to-muted p-8 rounded-2xl border border-border">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚙️</span> Integration Status
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-success text-lg">✓</span>
                CodeHike configured in vite.config.ts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success text-lg">✓</span>
                Syntax highlighting with github-dark theme
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success text-lg">✓</span>
                Annotation handlers (mark, focus, diff, callout, box)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success text-lg">✓</span>
                Demo page with interactive examples
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Next Steps</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-warning text-lg">◐</span>
                MDX content integration (render principles from MDX)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground text-lg">○</span>
                Scrollycoding for step-by-step tutorials
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground text-lg">○</span>
                Code comparison slider component
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
