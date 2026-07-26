import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Navigation } from './components/Navigation';
import { PrincipleView } from './components/PrincipleView';
import { CommandPalette } from './components/CommandPalette';

// Non-default routes — lazy so their code (and, for the demo, the ~266kB-gzip
// codehike syntax highlighter) stays off the initial load.
const SourcesPage = lazy(() =>
  import('./components/SourcesPage').then((m) => ({ default: m.SourcesPage }))
);
const CodeHikeDemo = lazy(() =>
  import('./components/CodeHikeDemo').then((m) => ({ default: m.CodeHikeDemo }))
);
import { SkipLink } from './components/SkipLink';
import { Footer } from './components/Footer';
import { ActiveFilterChips } from './components/ActiveFilterChips';
import { useMediaQuery } from './hooks/useMediaQuery';
import { principles } from './data/principles';
import type { PatternSource } from './types/principle';
import {
  parsePath,
  pathForRoute,
  routeFromLegacyHash,
  type Route,
} from './lib/routes';

const indexOfId = (id: string) => principles.findIndex((p) => p.id === id);

/**
 * Resolve the route the document was opened at. Legacy hash URLs are honoured here and
 * rewritten to a path on mount — llms.txt and llms-full.txt published hash permalinks
 * for every rule, so those links have to keep working indefinitely.
 */
function resolveInitialRoute(): Route {
  if (typeof window === 'undefined') return { kind: 'principle', id: principles[0].id };
  const fromPath = parsePath(window.location.pathname);
  if (fromPath) return fromPath;
  const fromHash = routeFromLegacyHash(window.location.hash);
  if (fromHash && (fromHash.kind !== 'principle' || indexOfId(fromHash.id) !== -1)) {
    return fromHash;
  }
  return { kind: 'principle', id: principles[0].id };
}

/** `initialRoute` is supplied by the prerenderer; the browser resolves it from the URL. */
function App({ initialRoute }: { initialRoute?: Route } = {}) {
  // One route, resolved synchronously, so a deep link is never clobbered by an effect
  // on first commit and the server and the client agree on what to render.
  const [route, setRoute] = useState<Route>(() => initialRoute ?? resolveInitialRoute());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<PatternSource[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = new URLSearchParams(window.location.search).get('source');
    return raw ? (raw.split(',').filter(Boolean) as PatternSource[]) : [];
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = new URLSearchParams(window.location.search).get('tag');
    return raw ? raw.split(',').filter(Boolean) : [];
  });
  // Desktop/tablet: sidebar always visible (md breakpoint = 768px)
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Compute available sources from principles data
  const availableSources = useMemo(() => {
    const sources = new Set<PatternSource>();
    principles.forEach((p) => {
      if (p.source) sources.add(p.source);
    });
    return Array.from(sources);
  }, []);

  // Compute available tags from principles data (sorted)
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    principles.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const showSources = route.kind === 'sources';
  const showCodeHikeDemo = route.kind === 'codehike';
  const currentIndex =
    route.kind === 'principle' ? Math.max(0, indexOfId(route.id)) : 0;
  const currentPrinciple = principles[currentIndex];

  /**
   * Every navigation goes through here. pushState keeps one history entry per rule;
   * the filter query string rides along so a filtered view stays shareable.
   */
  const navigate = useCallback((next: Route, { replace = false } = {}) => {
    setRoute(next);
    const url = `${pathForRoute(next)}${window.location.search}`;
    if (replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
    window.scrollTo({ top: 0, behavior: replace ? 'auto' : 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < principles.length - 1) {
      navigate({ kind: 'principle', id: principles[currentIndex + 1].id });
    }
  }, [currentIndex, navigate]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      navigate({ kind: 'principle', id: principles[currentIndex - 1].id });
    }
  }, [currentIndex, navigate]);

  const handlePrincipleSelect = useCallback(
    (principleId: string) => {
      if (principleId === 'codehike-demo') {
        navigate({ kind: 'codehike' });
        return;
      }
      if (indexOfId(principleId) !== -1) {
        navigate({ kind: 'principle', id: principleId });
      }
    },
    [navigate]
  );

  const handleShowSources = useCallback(() => navigate({ kind: 'sources' }), [navigate]);

  // ⌘K / Ctrl+K toggles the command palette
  useEffect(() => {
    const handlePaletteKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handlePaletteKey);
    return () => window.removeEventListener('keydown', handlePaletteKey);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target instanceof HTMLElement ? e.target : null;

      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        target?.isContentEditable
      ) {
        return;
      }

      // Don't hijack the arrow keys from widgets that own them (menus, listboxes,
      // dialogs, popovers, tabs). Otherwise navigating inside an example would
      // jump to the next rule instead.
      if (
        target?.closest(
          '[role="menu"],[role="listbox"],[role="dialog"],[role="radiogroup"],[role="tablist"],[data-slot="popover-content"],[data-radix-popper-content-wrapper]'
        )
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, handleNext, handlePrevious, isSidebarOpen]);

  // Back/forward. `hashchange` is gone along with the hash — with real paths, popstate
  // is the only event that fires, and it fires for every entry `navigate` pushed.
  useEffect(() => {
    const syncFromUrl = () => {
      const next = parsePath(window.location.pathname);
      if (next) setRoute(next);
    };
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  // Rewrite a legacy hash URL to its path, once, without leaving a history entry the
  // user's first Back press would land on. Published permalinks depend on this.
  useEffect(() => {
    const legacy = routeFromLegacyHash(window.location.hash);
    if (!legacy) return;
    if (legacy.kind === 'principle' && indexOfId(legacy.id) === -1) return;
    window.history.replaceState(null, '', `${pathForRoute(legacy)}${window.location.search}`);
    setRoute(legacy);
  }, []);

  // Landing on "/" resolves to the first rule, so correct the address bar to its real
  // path. replaceState, not push — the correction must not sit behind the user's first
  // Back press as a phantom entry. `navigate` owns every write after this one.
  useEffect(() => {
    if (parsePath(window.location.pathname)) return;
    window.history.replaceState(null, '', `${pathForRoute(route)}${window.location.search}`);
    // Deliberately once, on mount: this only exists to normalise the entry URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync active filters to the URL query string (preserving the hash) so a filtered view is shareable
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedSources.length) params.set('source', selectedSources.join(','));
    else params.delete('source');
    if (selectedTags.length) params.set('tag', selectedTags.join(','));
    else params.delete('tag');
    const qs = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, [selectedSources, selectedTags]);

  // Dynamic page title
  useEffect(() => {
    if (showSources) {
      document.title = 'Sources — UI Guides & Agent Rules';
    } else if (showCodeHikeDemo) {
      document.title = 'CodeHike Demo — UI Guides & Agent Rules';
    } else {
      document.title = `${currentPrinciple.title} — UI Guides & Agent Rules`;
    }
  }, [currentPrinciple.title, showCodeHikeDemo, showSources]);

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <Header
        onMenuToggle={() => setIsSidebarOpen(true)}
        onSearchClick={() => setIsPaletteOpen(true)}
        onSourcesClick={handleShowSources}
      />

      <CommandPalette
        open={isPaletteOpen}
        onOpenChange={setIsPaletteOpen}
        onSelect={handlePrincipleSelect}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        principles={principles}
        currentPrincipleId={showSources ? 'sources' : showCodeHikeDemo ? 'codehike-demo' : currentPrinciple.id}
        onPrincipleSelect={handlePrincipleSelect}
        selectedSources={selectedSources}
        onSourcesChange={setSelectedSources}
        availableSources={availableSources}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        availableTags={availableTags}
        isDesktop={isDesktop}
      />

      <main id="main-content" className="min-h-screen pt-14 md:ml-80">
        {!showSources && !showCodeHikeDemo && (
          <ActiveFilterChips
            selectedSources={selectedSources}
            onSourcesChange={setSelectedSources}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        )}
        <Suspense fallback={null}>
          {showSources ? (
            <SourcesPage />
          ) : showCodeHikeDemo ? (
            <CodeHikeDemo />
          ) : (
            <PrincipleView principle={currentPrinciple} />
          )}
        </Suspense>
        <Footer />
      </main>

      {!showCodeHikeDemo && !showSources && (
        <Navigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < principles.length - 1}
          previousId={principles[currentIndex - 1]?.id}
          nextId={principles[currentIndex + 1]?.id}
        />
      )}
    </div>
  );
}

export default App;
