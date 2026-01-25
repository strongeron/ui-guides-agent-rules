import { Pre, highlight, type AnnotationHandler, type HighlightedCode } from 'codehike/code';
import { useState, useEffect, useRef } from 'react';

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

// Link: Makes code clickable
const link: AnnotationHandler = {
  name: 'link',
  Inline: ({ annotation, children }) => (
    <a
      href={annotation.query}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-info decoration-2 underline-offset-2 hover:bg-info/20 rounded transition-colors cursor-pointer"
    >
      {children}
    </a>
  ),
};

// Label: Adds a hoverable label with tooltip
const label: AnnotationHandler = {
  name: 'label',
  Line: ({ annotation, ...props }) => (
    <div {...props} className="relative group">
      {props.children}
      <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-medium bg-info/90 text-info-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {annotation?.query}
      </span>
    </div>
  ),
};

// Fold: Collapsible code sections
const fold: AnnotationHandler = {
  name: 'fold',
  Block: ({ children, annotation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const summary = annotation?.query || 'collapsed code';

    return (
      <div className="my-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-0.5"
        >
          <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
          <span className="font-mono">{summary}</span>
        </button>
        {isOpen && (
          <div className="border-l-2 border-muted pl-3 ml-1.5 mt-1">
            {children}
          </div>
        )}
      </div>
    );
  },
};

// WithClass: Apply custom CSS class
const withClass: AnnotationHandler = {
  name: 'withClass',
  Inline: ({ annotation, children }) => (
    <span className={annotation.query}>{children}</span>
  ),
  Line: ({ annotation, ...props }) => (
    <div {...props} className={annotation?.query} />
  ),
};

// Line numbers handler
const lineNumbers: AnnotationHandler = {
  name: 'line-numbers',
  Line: (props) => {
    const lineNumber = props.lineNumber;
    return (
      <div {...props} className="flex">
        <span className="w-8 shrink-0 text-right pr-4 text-muted-foreground/50 select-none text-xs">
          {lineNumber}
        </span>
        <span className="flex-1">{props.children}</span>
      </div>
    );
  },
};

// Tooltip on hover for inline code
const tooltip: AnnotationHandler = {
  name: 'tooltip',
  Inline: ({ annotation, children }) => (
    <span className="relative group cursor-help">
      {children}
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 text-xs bg-foreground text-background rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
        {annotation.query}
        <span className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-foreground" />
      </span>
    </span>
  ),
};

// Error/warning underline
const error: AnnotationHandler = {
  name: 'error',
  Inline: ({ children, annotation }) => (
    <span className="relative">
      {children}
      <span
        className="absolute inset-x-0 bottom-0 border-b-2 border-wavy border-error"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 6 3\'%3E%3Cpath d=\'M0 3 L1.5 0 L3 3 L4.5 0 L6 3\' fill=\'none\' stroke=\'%23ef4444\' stroke-width=\'0.8\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '6px 3px',
          paddingBottom: '3px',
          borderBottom: 'none'
        }}
        title={annotation?.query}
      />
    </span>
  ),
};

// All handlers combined
const allHandlers = [mark, focus, callout, diff, box, link, label, fold, withClass, lineNumbers, tooltip, error];

// ============================================
// CODE BLOCK COMPONENT
// ============================================

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
  meta?: string;
  handlers?: AnnotationHandler[];
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

function CodeBlock({
  code,
  lang = 'tsx',
  title,
  meta = '',
  handlers: customHandlers,
  showLineNumbers = false,
  showCopyButton = true,
}: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null);
  const [copied, setCopied] = useState(false);

  const activeHandlers = customHandlers || allHandlers;
  const finalHandlers = showLineNumbers
    ? [lineNumbers, ...activeHandlers.filter(h => h.name !== 'line-numbers')]
    : activeHandlers.filter(h => h.name !== 'line-numbers');

  useEffect(() => {
    highlight(
      { value: code, lang, meta },
      'github-dark'
    ).then(setHighlighted);
  }, [code, lang, meta]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!highlighted) {
    return <div className="animate-pulse bg-muted h-32 rounded-lg" />;
  }

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm group relative">
      {title && (
        <div className="bg-muted/80 px-4 py-2.5 text-sm font-medium border-b border-border flex items-center gap-2">
          <span className="text-muted-foreground">📄</span>
          {title}
        </div>
      )}
      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all z-10"
          title="Copy code"
        >
          {copied ? (
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      )}
      <Pre
        code={highlighted}
        handlers={finalHandlers}
        className={`p-4 bg-[#0d1117] text-sm overflow-x-auto font-mono leading-relaxed ${title ? '' : 'pt-8'}`}
      />
    </div>
  );
}

// ============================================
// TABBED CODE COMPONENT
// ============================================

interface CodeTab {
  name: string;
  code: string;
  lang: string;
  meta?: string;
}

function TabbedCode({ tabs, handlers }: { tabs: CodeTab[]; handlers?: AnnotationHandler[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [highlighted, setHighlighted] = useState<(HighlightedCode | null)[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.all(
      tabs.map(tab =>
        highlight({ value: tab.code, lang: tab.lang, meta: tab.meta || '' }, 'github-dark')
      )
    ).then(setHighlighted);
  }, [tabs]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tabs[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (highlighted.length === 0) {
    return <div className="animate-pulse bg-muted h-48 rounded-lg" />;
  }

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm group relative">
      <div className="bg-muted/80 border-b border-border flex items-center">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              i === activeTab
                ? 'bg-[#0d1117] text-foreground border-b-2 border-primary -mb-px'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all z-10"
        title="Copy code"
      >
        {copied ? (
          <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      {highlighted[activeTab] && (
        <Pre
          code={highlighted[activeTab]!}
          handlers={handlers || allHandlers}
          className="p-4 bg-[#0d1117] text-sm overflow-x-auto font-mono leading-relaxed"
        />
      )}
    </div>
  );
}

// ============================================
// SCROLLYCODING COMPONENT
// ============================================

interface ScrollyStep {
  content: React.ReactNode;
  code: string;
  lang?: string;
  meta?: string;
}

function Scrollycoding({ steps }: { steps: ScrollyStep[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const [highlighted, setHighlighted] = useState<(HighlightedCode | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all(
      steps.map(step =>
        highlight({ value: step.code, lang: step.lang || 'tsx', meta: step.meta || '' }, 'github-dark')
      )
    ).then(setHighlighted);
  }, [steps]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const stepElements = container.querySelectorAll('[data-step]');

      stepElements.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const relativeTop = rect.top - containerRect.top;
        const threshold = containerRect.height * 0.4;

        if (relativeTop < threshold && relativeTop > -rect.height + threshold) {
          setActiveStep(i);
        }
      });
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  if (highlighted.length === 0) {
    return <div className="animate-pulse bg-muted h-96 rounded-lg" />;
  }

  return (
    <div
      ref={containerRef}
      className="grid md:grid-cols-2 gap-6 h-[500px] overflow-y-auto scroll-smooth"
    >
      {/* Steps content */}
      <div className="space-y-32 py-32">
        {steps.map((step, i) => (
          <div
            key={i}
            data-step={i}
            className={`transition-opacity duration-300 ${i === activeStep ? 'opacity-100' : 'opacity-40'}`}
          >
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-muted-foreground">Step {i + 1}</span>
              </div>
              {step.content}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky code panel */}
      <div className="sticky top-0 h-fit">
        <div className="rounded-xl overflow-hidden border border-border shadow-lg">
          <div className="bg-muted/80 px-4 py-2.5 text-sm font-medium border-b border-border">
            📄 Interactive Code
          </div>
          {highlighted[activeStep] && (
            <Pre
              code={highlighted[activeStep]!}
              handlers={allHandlers}
              className="p-4 bg-[#0d1117] text-sm overflow-x-auto font-mono leading-relaxed max-h-[400px]"
            />
          )}
        </div>
      </div>
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
          <span className="text-primary font-medium"> Hover to copy.</span>
        </p>
      </div>
      <CodeBlock code={code} lang="typescript" title="greeting.ts" />
    </section>
  );
}

function LineNumbersDemo() {
  const code = `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🔢</span> Line Numbers
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Display line numbers for reference and debugging.
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="typescript"
        title="useLocalStorage.ts"
        showLineNumbers={true}
      />
    </section>
  );
}

function FocusDemo() {
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

function LinkDemo() {
  const code = `// Click on highlighted code to open documentation
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Hello, world!
    </motion.div>
  );
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🔗</span> Link Annotation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Make code clickable to link to documentation.
          <span className="text-info font-medium"> Click the underlined imports below.</span>
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="tsx"
        title="AnimatedComponent.tsx"
        meta="link(2[10:30])[https://react.dev/reference/react] link(3[10:28])[https://www.framer.com/motion/]"
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

function TabbedCodeDemo() {
  const tabs: CodeTab[] = [
    {
      name: 'component.tsx',
      lang: 'tsx',
      code: `import styles from './Button.module.css';

export function Button({ children, variant = 'primary' }) {
  return (
    <button className={styles[variant]}>
      {children}
    </button>
  );
}`,
      meta: 'focus(3:7)',
    },
    {
      name: 'Button.module.css',
      lang: 'css',
      code: `.primary {
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}

.secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid currentColor;
}`,
    },
    {
      name: 'usage.tsx',
      lang: 'tsx',
      code: `import { Button } from './Button';

function App() {
  return (
    <div>
      <Button variant="primary">Submit</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  );
}`,
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">📑</span> Tabbed Code
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Display multiple related files in a tabbed interface.
          <span className="text-primary font-medium"> Click tabs to switch files.</span>
        </p>
      </div>
      <TabbedCode tabs={tabs} />
    </section>
  );
}

function ScrollycodingDemo() {
  const steps: ScrollyStep[] = [
    {
      content: (
        <div>
          <h3 className="font-semibold mb-2">Start with state</h3>
          <p className="text-sm text-muted-foreground">
            First, we set up our state to track the count value. React's useState hook
            gives us a reactive value and a setter function.
          </p>
        </div>
      ),
      code: `function Counter() {
  // Initialize state with 0
  const [count, setCount] = useState(0);

  return <div>{count}</div>;
}`,
      meta: 'focus(2:3)',
    },
    {
      content: (
        <div>
          <h3 className="font-semibold mb-2">Add increment handler</h3>
          <p className="text-sm text-muted-foreground">
            Create a function that updates the count. Using the functional form of
            setState ensures we always have the latest value.
          </p>
        </div>
      ),
      code: `function Counter() {
  const [count, setCount] = useState(0);

  // Functional update pattern
  const increment = () => {
    setCount(prev => prev + 1);
  };

  return <div>{count}</div>;
}`,
      meta: 'focus(4:7)',
    },
    {
      content: (
        <div>
          <h3 className="font-semibold mb-2">Wire up the button</h3>
          <p className="text-sm text-muted-foreground">
            Finally, connect the increment function to a button click.
            Now users can interact with our counter!
          </p>
        </div>
      ),
      code: `function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}`,
      meta: 'focus(10:13)',
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">📜</span> Scrollycoding
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Synchronized prose and code for step-by-step tutorials.
          <span className="text-primary font-medium"> Scroll the left panel to progress.</span>
        </p>
      </div>
      <div className="border border-border rounded-xl overflow-hidden bg-card/50">
        <Scrollycoding steps={steps} />
      </div>
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
        showLineNumbers={true}
      />
    </section>
  );
}

function ErrorAnnotationDemo() {
  const code = `function processData(data) {
  // Type error: 'data' is possibly undefined
  const result = data.map(item => item.value);

  // Safe version with optional chaining
  const safeResult = data?.map(item => item.value) ?? [];

  return safeResult;
}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">⚠️</span> Error Annotation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Show inline errors with wavy underlines, like an IDE.
          <span className="text-error font-medium"> Line 3 shows an error.</span>
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="typescript"
        title="process.ts"
        meta="error(3[17:35])[Object is possibly 'undefined'] mark(6)"
      />
    </section>
  );
}

function TooltipDemo() {
  const code = `const config = {
  apiKey: process.env.API_KEY,
  timeout: 5000,
  retries: 3,
  baseUrl: 'https://api.example.com',
};`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">💭</span> Tooltip Annotation
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add hover tooltips to explain configuration options.
          <span className="text-info font-medium"> Hover over the values below.</span>
        </p>
      </div>
      <CodeBlock
        code={code}
        lang="typescript"
        title="config.ts"
        meta="tooltip(2[11:31])[Read from environment variables] tooltip(3[12:16])[Request timeout in ms] tooltip(4[12:13])[Max retry attempts]"
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
          documentation features powered by{' '}
          <a
            href="https://codehike.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            CodeHike v1
          </a>.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-16">
        {/* Core Features */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center border-b border-border pb-4">
            Core Features
          </h2>
          <div className="grid gap-12">
            <BasicHighlightingDemo />
            <LineNumbersDemo />
            <TabbedCodeDemo />
          </div>
        </div>

        {/* Annotations */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center border-b border-border pb-4">
            Annotation Types
          </h2>
          <div className="grid gap-12">
            <FocusDemo />
            <MarkDemo />
            <DiffDemo />
            <CalloutDemo />
            <TooltipDemo />
            <LinkDemo />
            <BoxDemo />
            <ErrorAnnotationDemo />
          </div>
        </div>

        {/* Advanced */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center border-b border-border pb-4">
            Advanced Features
          </h2>
          <div className="grid gap-12">
            <CombinedDemo />
            <ScrollycodingDemo />
          </div>
        </div>
      </div>

      {/* Annotation Reference */}
      <section className="mt-16 bg-gradient-to-br from-muted/50 to-muted p-8 rounded-2xl border border-border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">📚</span> Annotation Reference
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'focus', syntax: 'focus(line:line)', desc: 'Dim unfocused lines' },
            { name: 'mark', syntax: 'mark(line,line)', desc: 'Highlight lines' },
            { name: 'diff', syntax: 'diff(line:line)[+/-]', desc: 'Show additions/deletions' },
            { name: 'box', syntax: 'box(line:line)', desc: 'Group code in a box' },
            { name: 'callout', syntax: 'callout(line)[text]', desc: 'Inline tooltip' },
            { name: 'link', syntax: 'link(line[col:col])[url]', desc: 'Clickable code' },
            { name: 'tooltip', syntax: 'tooltip(line[col:col])[text]', desc: 'Hover tooltip' },
            { name: 'error', syntax: 'error(line[col:col])[msg]', desc: 'Wavy underline' },
            { name: 'label', syntax: '// label text', desc: 'Line label (comment)' },
          ].map(({ name, syntax, desc }) => (
            <div key={name} className="bg-card p-3 rounded-lg border border-border">
              <code className="text-primary font-mono text-sm">{name}</code>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{syntax}</p>
              <p className="text-xs mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Status */}
      <section className="mt-8 bg-gradient-to-br from-success/10 to-success/5 p-8 rounded-2xl border border-success/30">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">✅</span> Full Feature Demo
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          This demo showcases all CodeHike features available in the current integration.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <h3 className="font-medium text-success">Code Display</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>✓ Syntax highlighting</li>
              <li>✓ Line numbers</li>
              <li>✓ Copy button</li>
              <li>✓ File names</li>
              <li>✓ Tabbed files</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-success">Annotations</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>✓ Focus & Mark</li>
              <li>✓ Diff (+/-)</li>
              <li>✓ Callout & Tooltip</li>
              <li>✓ Link & Box</li>
              <li>✓ Error underline</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-success">Advanced</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>✓ Scrollycoding</li>
              <li>✓ Combined annotations</li>
              <li>✓ Custom handlers</li>
              <li>✓ Theme support</li>
              <li>✓ MDX integration</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
