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
      strict: true,
      trailingSlash: 'always'
    }),
    paths: {
      base: base,
      assets: dev ? '' : 'https://www.spiralize.org/Spiralize'
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore missing social preview images
        if (path.includes('.png') || path.includes('.svg')) {
          console.warn(`Warning: Missing asset ${path}`);
          return;
        }
        // Ignore quiz results page
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
