// src/lib/utils/contentLoader.ts
import { browser } from '$app/environment';
import { base } from '$app/paths';

export async function loadExampleContent(
  language: 'en' | 'sv',
  category: string,
  subcategory: string
): Promise<string> {
  try {
    // Construct the URL for the content file
    // In development, we need to access from the public directory
    const url = `${base}/content/examples/${language}/${category}/${subcategory}.md`;
    console.log('Attempting to load content from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to load content (${response.status}): ${response.statusText}`);
      return `# Content Not Found\n\nThe requested content file for ${category}/${subcategory} in ${language} could not be loaded.`;
    }
    
    const text = await response.text();
    console.log('Content loaded successfully, length:', text.length);
    return text;
  } catch (error) {
    console.error('Error loading example content:', error);
    return `# Error Loading Content\n\nSorry, an error occurred while loading the content: ${error.message}`;
  }
}
