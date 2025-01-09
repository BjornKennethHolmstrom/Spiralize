import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: process.env.NODE_ENV === 'production' 
    ? 'https://www.spiralize.org/Spiralize/'
    : '',
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
