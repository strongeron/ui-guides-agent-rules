/**
 * Convert file paths to example keys
 *
 * Transforms an example component file path into a standardized key.
 *
 * @example
 * pathToKey('./examples/forms/EnterSubmitsBad.tsx') // 'forms-enter-submits-bad'
 * pathToKey('./examples/interactions/ManageFocusGood.tsx') // 'interactions-manage-focus-good'
 */
export function pathToKey(path: string): string {
  const match = path.match(/\.\/examples\/(.+)\/(.+)\.tsx$/);
  if (!match) return '';

  const [, category, fileName] = match;
  // Convert PascalCase to kebab-case
  const kebabName = fileName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();

  return `${category}-${kebabName}`;
}

/**
 * Convert PascalCase string to kebab-case
 *
 * @example
 * pascalToKebab('EnterSubmitsBad') // 'enter-submits-bad'
 * pascalToKebab('ManageFocusGood') // 'manage-focus-good'
 */
export function pascalToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
