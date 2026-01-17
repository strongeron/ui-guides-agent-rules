import { lazy, Suspense, ComponentType } from 'react';

// Auto-discover all example components using import.meta.glob
const exampleModules = import.meta.glob<{ [key: string]: ComponentType }>(
  './examples/**/*.tsx',
  { eager: false }
);

// Convert file paths to example keys
// e.g., './examples/forms/EnterSubmitsBad.tsx' -> 'forms-enter-submits-bad'
function pathToKey(path: string): string {
  const match = path.match(/\.\/examples\/(.+)\/(.+)\.tsx$/);
  if (!match) return '';

  const [, category, fileName] = match;
  // Convert PascalCase to kebab-case
  const kebabName = fileName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();

  return `${category}-${kebabName}`;
}

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

  if (!Component) {
    return (
      <div className="text-center text-muted-foreground">
        <p className="text-sm font-medium mb-2">Example Coming Soon</p>
        <p className="text-xs">This interactive example is being developed</p>
        <p className="text-xs opacity-70 mt-2 font-mono">{exampleKey}</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
}

