import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { promises as fs } from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    sveltekit(),
    {
      name: 'markdown-loader',
      async load(id) {
        if (id.endsWith('.md')) {
          const content = await fs.readFile(id, 'utf-8');
          return `export default ${JSON.stringify(content)};`;
        }
      }
    }
  ],
  base: process.env.NODE_ENV === 'production' 
    ? '/Spiralize/'
    : '',
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
