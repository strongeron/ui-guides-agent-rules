import 'react';

// Add inert attribute to HTML elements (standardized in HTML spec but not yet in React types)
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    inert?: '' | undefined;
  }
}
