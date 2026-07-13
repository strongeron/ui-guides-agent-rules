import type { Principle } from '../../types/principle';
import { withTags } from '../tags';
import { interactionsPrinciples } from './interactions';
import { animationsPrinciples } from './animations';
import { layoutPrinciples } from './layout';
import { contentPrinciples } from './content';
import { formsPrinciples } from './forms';
import { performancePrinciples } from './performance';
import { designPrinciples } from './design';
import { aestheticsPrinciples } from './aesthetics';

export { categories } from './categories';
export { draftPrinciples } from './drafts';
export { interactionsPrinciples } from './interactions';
export { animationsPrinciples } from './animations';
export { layoutPrinciples } from './layout';
export { contentPrinciples } from './content';
export { formsPrinciples } from './forms';
export { performancePrinciples } from './performance';
export { designPrinciples } from './design';
export { aestheticsPrinciples } from './aesthetics';

export const principles: Principle[] = withTags([
  ...interactionsPrinciples,
  ...animationsPrinciples,
  ...layoutPrinciples,
  ...contentPrinciples,
  ...formsPrinciples,
  ...performancePrinciples,
  ...designPrinciples,
  ...aestheticsPrinciples,
]);
