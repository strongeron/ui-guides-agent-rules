import {
  Pre,
  highlight,
  type RawCode,
  type AnnotationHandler,
} from 'codehike/code';

// Annotation handler for callouts
const callout: AnnotationHandler = {
  name: 'callout',
  Inline: ({ annotation, children }) => (
    <span className="relative group">
      {children}
      <span className="absolute left-0 top-full mt-1 px-2 py-1 text-xs bg-popover text-popover-foreground border border-border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {annotation.query}
      </span>
    </span>
  ),
};

// Annotation handler for focus (dim non-focused lines)
const focus: AnnotationHandler = {
  name: 'focus',
  Line: ({ annotation, ...props }) => (
    <div
      {...props}
      className={annotation ? 'bg-primary/10' : 'opacity-50'}
    />
  ),
};

// Annotation handler for marking/highlighting
const mark: AnnotationHandler = {
  name: 'mark',
  Inline: ({ children }) => (
    <span className="bg-warning/30 rounded px-0.5">{children}</span>
  ),
  Line: ({ ...props }) => (
    <div {...props} className="bg-warning/20 border-l-2 border-warning" />
  ),
};

// Annotation handler for diff (+ and -)
const diff: AnnotationHandler = {
  name: 'diff',
  Line: ({ annotation, ...props }) => {
    const isDeletion = annotation?.query === '-';
    return (
      <div
        {...props}
        className={
          isDeletion
            ? 'bg-error/20 border-l-2 border-error'
            : 'bg-success/20 border-l-2 border-success'
        }
      />
    );
  },
};

const handlers = [callout, focus, mark, diff];

interface CodeProps {
  codeblock: RawCode;
}

export async function Code({ codeblock }: CodeProps) {
  const highlighted = await highlight(codeblock, 'github-dark');

  return (
    <Pre
      code={highlighted}
      handlers={handlers}
      className="p-4 rounded-lg bg-[#0d1117] text-sm overflow-x-auto font-mono"
    />
  );
}
