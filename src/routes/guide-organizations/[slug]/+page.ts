// src/routes/guide-organizations/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getAllChapters } from '$lib/stores/organizationsGuideStore';

// Define all possible slug values for prerendering
export const entries = () => {
  const chapters = getAllChapters();
  return chapters.map(chapter => ({
    slug: chapter.path
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
