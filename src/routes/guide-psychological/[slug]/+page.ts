// src/routes/guide-psychological/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getAllChapters } from '$lib/stores/psychGuideStore';

// Define all possible slug values for prerendering
export const entries = () => {
  const chapters = getAllChapters();
  return chapters.map(chapter => ({
    slug: chapter.path
  }));
};

export const load: PageLoad = ({ params }) => {
  const { slug } = params;
  
  if (!slug) {
    throw error(404, 'Not found');
  }
  
  // Check if the slug exists in our chapters data
  const chapters = getAllChapters();
  const chapterExists = chapters.some(chapter => chapter.path === slug);
  
  if (!chapterExists) {
    throw error(404, 'Chapter not found');
  }
  
  return {
    slug
  };
};

// Ensure static prerendering
export const prerender = true;
