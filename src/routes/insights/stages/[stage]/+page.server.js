// src/routes/insights/stages/[stage]/+page.server.js
export async function entries() {
  return [
    { stage: 'beige' },
    { stage: 'purple' },
    { stage: 'red' },
    { stage: 'blue' },
    { stage: 'orange' },
    { stage: 'green' },
    { stage: 'yellow' },
    { stage: 'turquoise' },
    { stage: 'coral' },
    { stage: 'ultraviolet' }
  ];
}

// This tells SvelteKit that this route should be prerendered
export const prerender = true;
