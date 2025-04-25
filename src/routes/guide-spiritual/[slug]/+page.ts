// src/routes/guide-spiritual/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getAllItems } from '$lib/stores/spiritualGuideStore';

// Define all possible slug values for prerendering
export const entries = () => {
  const items = getAllItems();
  return items.map(item => ({
    slug: item.path
  }));
};

export const load: PageLoad = ({ params }) => {
  const { slug } = params;

  return {
    slug
  };
};

// Ensure static prerendering
export const prerender = true;
