/**
 * Server entry for the build-time prerender. Not shipped to the browser.
 *
 * This renders the real component tree, not a hand-written template of it — which is
 * the whole point. A template would duplicate the JSX and drift from it; rendering the
 * actual components means the static HTML and the app cannot disagree. The one part
 * held back is the interactive example, which stays a placeholder until mount (see
 * ExampleRenderer) so hydration has nothing to argue with.
 */
import { renderToString } from 'react-dom/server';
import App from './App';
import type { Route } from './lib/routes';

export function render(route: Route): string {
  return renderToString(<App initialRoute={route} />);
}

export { principles } from './data/principles';
export { agentRules } from './data/agentRules';
