import type { MDXComponents } from 'mdx/types';
import { Callout, ExampleComparison, CodeBlock } from '@/components/mdx';
import { AgentRuleCard, PriorityBadge } from '@/components/AgentRuleCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * MDX Components Provider
 *
 * Maps markdown elements and custom components for use in MDX files.
 * Import this in your MDX provider setup.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with anchor support (rehype-slug adds IDs)
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'scroll-m-20 text-4xl font-bold tracking-tight text-foreground mb-6',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 border-b pb-2',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight text-foreground mt-8 mb-3',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'scroll-m-20 text-lg font-semibold tracking-tight text-foreground mt-6 mb-2',
          className
        )}
        {...props}
      />
    ),

    // Paragraphs and text
    p: ({ className, ...props }) => (
      <p
        className={cn('leading-7 text-muted-foreground [&:not(:first-child)]:mt-4', className)}
        {...props}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn('font-semibold text-foreground', className)} {...props} />
    ),
    em: ({ className, ...props }) => (
      <em className={cn('italic', className)} {...props} />
    ),

    // Links
    a: ({ className, ...props }) => (
      <a
        className={cn(
          'text-primary underline underline-offset-4 hover:text-primary/80 transition-colors',
          className
        )}
        {...props}
      />
    ),

    // Lists
    ul: ({ className, ...props }) => (
      <ul
        className={cn('my-4 ml-6 list-disc text-muted-foreground [&>li]:mt-2', className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn('my-4 ml-6 list-decimal text-muted-foreground [&>li]:mt-2', className)}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn('leading-7', className)} {...props} />
    ),

    // Blockquote
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'mt-6 border-l-4 border-primary/30 pl-4 italic text-muted-foreground',
          className
        )}
        {...props}
      />
    ),

    // Code blocks and inline code
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          'my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm',
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
          className
        )}
        {...props}
      />
    ),

    // Horizontal rule
    hr: ({ className, ...props }) => (
      <hr className={cn('my-8 border-t border-border', className)} {...props} />
    ),

    // Tables
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn('w-full', className)} {...props} />
      </div>
    ),
    thead: ({ className, ...props }) => (
      <thead className={cn('border-b', className)} {...props} />
    ),
    tbody: ({ className, ...props }) => (
      <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
    ),
    tr: ({ className, ...props }) => (
      <tr
        className={cn('border-b transition-colors hover:bg-muted/50', className)}
        {...props}
      />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td className={cn('p-4 align-middle', className)} {...props} />
    ),

    // Images
    img: ({ className, alt, ...props }) => (
      <img
        className={cn('rounded-lg border', className)}
        alt={alt}
        {...props}
      />
    ),

    // Custom components for MDX content
    Callout,
    ExampleComparison,
    CodeBlock,
    AgentRuleCard,
    PriorityBadge,
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,

    // Allow overrides from parent
    ...components,
  };
}

// Export components for direct import in MDX files
export {
  Callout,
  ExampleComparison,
  CodeBlock,
  AgentRuleCard,
  PriorityBadge,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
};
