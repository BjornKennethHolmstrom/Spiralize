import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: process.env.NODE_ENV === 'production' 
    ? '/Spiralize/'
    : '', 
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
