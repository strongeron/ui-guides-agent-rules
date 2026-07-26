import { lazy, Suspense, ComponentType } from 'react';
import { pathToKey } from '@/utils/exampleKeys';
import { useMounted } from '@/hooks/useMounted';

// Auto-discover all example components using import.meta.glob
const exampleModules = import.meta.glob<{ [key: string]: ComponentType }>(
  './examples/**/*.tsx',
  { eager: false }
);

// Build the component registry from discovered modules
const exampleComponents: Record<string, ReturnType<typeof lazy>> = {};

for (const path of Object.keys(exampleModules)) {
  const key = pathToKey(path);
  if (key) {
    exampleComponents[key] = lazy(async () => {
      const module = await exampleModules[path]();
      // Find the exported component (usually the first export)
      const componentName = Object.keys(module).find(
        (name) => typeof module[name] === 'function'
      );
      if (componentName) {
        return { default: module[componentName] as ComponentType };
      }
      throw new Error(`No component found in ${path}`);
    });
  }
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-32">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

interface ExampleRendererProps {
  exampleKey: string;
}

export function ExampleRenderer({ exampleKey }: ExampleRendererProps) {
  const Component = exampleComponents[exampleKey];
  // The one genuinely client-only part of the page. The prerendered HTML carries the
  // rule, its reasoning and its links; the runnable demo arrives a tick later. Holding
  // the placeholder through the first client render is what keeps hydration clean, and
  // the card's own min-h-[180px] means the swap costs no layout shift.
  const mounted = useMounted();

  if (!Component) {
    return (
      <div className="text-center text-muted-foreground">
        <p className="text-sm font-medium mb-2">Example Coming Soon</p>
        <p className="text-xs">This interactive example is being developed</p>
        <p className="text-xs opacity-70 mt-2 font-mono">{exampleKey}</p>
      </div>
    );
  }

  if (!mounted) return <LoadingFallback />;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
}

