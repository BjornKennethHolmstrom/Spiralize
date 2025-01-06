import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // Enables Single Page Application behavior
    }),
    prerender: {
      crawl: true, // Automatically discovers pages
      entries: ['*'] // Prerender all pages
    }
  }
};

