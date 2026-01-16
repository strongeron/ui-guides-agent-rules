import type { ComponentType, HTMLAttributes, AnchorHTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Custom heading component with anchor link support
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;
  const sizes = {
    1: 'text-3xl font-bold mb-6',
    2: 'text-2xl font-semibold mb-4 mt-8',
    3: 'text-xl font-semibold mb-3 mt-6',
    4: 'text-lg font-medium mb-2 mt-4',
    5: 'text-base font-medium mb-2 mt-3',
    6: 'text-sm font-medium mb-1 mt-2',
  };

  return function Heading({ id, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <Tag id={id} className={`${sizes[level]} text-gray-900 scroll-mt-20`} {...props}>
        {id ? (
          <a href={`#${id}`} className="hover:underline">
            {children}
          </a>
        ) : (
          children
        )}
      </Tag>
    );
  };
}

// Custom link component
function Link({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith('http');
  return (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {children}
    </a>
  );
}

// Callout component for quotes and tips
interface CalloutProps {
  type?: 'quote' | 'tip' | 'warning' | 'info';
  children?: React.ReactNode;
}

function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    quote: 'bg-blue-50 border-l-4 border-blue-600 text-blue-800 italic',
    tip: 'bg-green-50 border-l-4 border-green-600 text-green-800',
    warning: 'bg-yellow-50 border-l-4 border-yellow-600 text-yellow-800',
    info: 'bg-gray-50 border-l-4 border-gray-600 text-gray-800',
  };

  return (
    <div className={`${styles[type]} p-4 my-4 rounded-r-lg`}>
      {children}
    </div>
  );
}

// Code block styling
function Pre({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  );
}

function Code({ children, ...props }: HTMLAttributes<HTMLElement>) {
  // Inline code
  if (typeof children === 'string' && !children.includes('\n')) {
    return (
      <code
        className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  }
  // Block code (inside pre)
  return <code {...props}>{children}</code>;
}

// Table components
function Table({ children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200" {...props}>
        {children}
      </table>
    </div>
  );
}

function Th({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50"
      {...props}
    >
      {children}
    </th>
  );
}

function Td({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className="px-4 py-2 text-sm text-gray-700 border-t border-gray-200" {...props}>
      {children}
    </td>
  );
}

// Paragraph and list styling
function P({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="text-gray-700 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  );
}

function Ul({ children, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props}>
      {children}
    </ul>
  );
}

function Ol({ children, ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props}>
      {children}
    </ol>
  );
}

function Blockquote({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 py-2 my-4 text-gray-600 italic"
      {...props}
    >
      {children}
    </blockquote>
  );
}

function Hr(props: HTMLAttributes<HTMLHRElement>) {
  return <hr className="my-8 border-t border-gray-200" {...props} />;
}

// MDX components mapping
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, ComponentType<any>> = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: P,
  a: Link,
  pre: Pre,
  code: Code,
  table: Table,
  th: Th,
  td: Td,
  ul: Ul,
  ol: Ol,
  blockquote: Blockquote,
  hr: Hr,
  // Custom components
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Callout,
};

// For use with MDXProvider
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMDXComponents(components: Record<string, ComponentType<any>>) {
  return {
    ...mdxComponents,
    ...components,
  };
}
