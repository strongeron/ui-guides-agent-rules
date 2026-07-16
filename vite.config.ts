import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx';
import path from 'path';

// CodeHike configuration
const chConfig = {
  components: { code: 'Code' },
  syntaxHighlighting: {
    theme: 'github-dark',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        [remarkCodeHike, chConfig],
      ],
      recmaPlugins: [[recmaCodeHike, chConfig]],
      rehypePlugins: [rehypeSlug],
      providerImportSource: '@mdx-js/react',
    }),
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Split vendors into separately-cached chunks so a change to app code
        // doesn't invalidate the (rarely-changing) library bundles, and the
        // browser can download them in parallel.
        manualChunks(id) {
          // Principle dataset — its own chunk so editing a principle doesn't
          // bust the app-code bundle (and vice versa). Still loaded eagerly;
          // the sidebar needs the full list on first paint.
          if (
            id.includes('/src/data/principles/') ||
            id.includes('/src/data/agentRules') ||
            id.includes('/src/data/tags')
          ) {
            return 'principles-data';
          }
          if (!id.includes('node_modules')) return;
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
          if (id.includes('@radix-ui')) return 'radix';
          if (id.includes('@hugeicons') || id.includes('lucide-react')) return 'icons';
          if (id.includes('cmdk')) return 'cmdk';
          if (/codehike|shiki|@code-hike/.test(id)) return 'codehike';
          if (/node_modules\/motion\//.test(id) || id.includes('framer-motion')) return 'motion';
          return 'vendor';
        },
      },
    },
  },
});
