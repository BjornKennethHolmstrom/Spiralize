// src/routes/guide-communication/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getAllChapters, getMainNavItems } from '$lib/stores/communicationGuideStore';

// Define all possible slug values for prerendering
export const entries = () => {
  // Get all navigable items, not just chapters
  const allItems = getMainNavItems();
  return allItems.map(item => ({
    slug: item.path
  }));
};

export const load: PageLoad = ({ params }) => {
  const { slug } = params;

  // Simple validation could be added here if needed
  if (!slug) {
    throw error(404, 'Page not found');
  }

  return {
    slug
  };
};

// Ensure static prerendering
export const prerender = true;
