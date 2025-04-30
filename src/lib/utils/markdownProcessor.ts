// src/lib/utils/markdownProcessor.ts
import { marked } from 'marked';
import { parse } from 'yaml';
import { getStageColor } from './stageColors';

export function processMarkdown(markdown: string): {
  html: string;
  metadata: any;
} {
  if (!markdown) return { html: '', metadata: {} };

  try {
    // Extract frontmatter using regex
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?/;
    const match = markdown.match(frontmatterRegex);

    let metadata = {};
    let content = markdown;

    if (match) {
      const rawFrontmatter = match[1];
      metadata = parse(rawFrontmatter); // Robust YAML parsing
      content = markdown.replace(frontmatterRegex, '');
    }

    const tokens = marked.lexer(content);
    let html = '';
    let currentStage = '';

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.type === 'heading') {
        const headingText = token.text;
        const level = token.depth;

        const stageMatch = headingText.match(/<stage:([a-z]+)>/i);
        if (stageMatch && level === 2) {
          if (currentStage) html += '</div>';

          currentStage = stageMatch[1].toLowerCase();
          const stageColor = getStageColor(currentStage);
          const stageName = currentStage.charAt(0).toUpperCase() + currentStage.slice(1);

          html += `
            <div class="stage-section" data-stage="${currentStage}">
              <h2 class="stage-heading" style="
                border-left: 6px solid ${stageColor};
                padding-left: 1rem;
                background-color: ${stageColor}20;
                color: ${stageColor};
                padding: 1rem;
                border-radius: 0.5rem;
              ">
                ${stageName}
              </h2>
          `;
          continue;
        } else if (currentStage && level > 2) {
          const stageColor = getStageColor(currentStage);
          const id = headingText.toLowerCase().replace(/[^\w]+/g, '-');

          html += `
            <h${level} id="${id}" class="stage-subheading" style="
              color: ${stageColor};
              border-bottom: 2px solid ${stageColor}40;
              padding-bottom: 0.5rem;
            ">
              ${headingText}
            </h${level}>
          `;
          continue;
        }

        if (level === 2 && currentStage) {
          html += '</div>';
          currentStage = '';
        }
      }

      html += marked.parser([token], { renderer: new marked.Renderer() });
    }

    if (currentStage) html += '</div>';

    return { html, metadata };
  } catch (error) {
    console.error('Error processing markdown:', error);
    return {
      html: `<p>Error processing content: ${error instanceof Error ? error.message : String(error)}</p>`,
      metadata: {}
    };
  }
}

