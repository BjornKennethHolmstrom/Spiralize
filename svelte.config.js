import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';
const base = dev ? '' : '/Spiralize';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: base
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path.includes('.png') || path.includes('.svg')) {
          console.warn(`Warning: Missing asset ${path}`);
          return;
        }
        if (path.includes('/quiz/results')) {
          return;
        }
        throw new Error(message);
      }
    }
  },
  preprocess: vitePreprocess()
};

export default config;
