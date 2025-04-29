// src/lib/utils/markdownProcessor.ts
import { marked } from 'marked';
import { getStageColor, getStageTextColor } from './stageColors';

// Process markdown with stage awareness
export function processMarkdown(markdown: string): {
  html: string;
  metadata: any;
} {
  if (!markdown) {
    return { html: '', metadata: {} };
  }

  try {
    // Process frontmatter
    const { content, metadata } = processFrontmatter(markdown);
    
    // Track the current stage
    let currentStage = '';
    
    // Initialize a new tokenizer/parser for proper processing
    const tokens = marked.lexer(content);
    
    // Modified HTML output
    let html = '';
    
    // Process tokens manually to handle stage sections
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      if (token.type === 'heading') {
        const headingText = token.text;
        const level = token.depth;
        
        // Check if this is a stage marker
        const stageMatch = typeof headingText === 'string' && headingText.match(/<stage:([a-z]+)>/i);
        
        if (stageMatch && level === 2) {
          // Update current stage
          currentStage = stageMatch[1].toLowerCase();
          const stageColor = getStageColor(currentStage);
          const stageName = currentStage.charAt(0).toUpperCase() + currentStage.slice(1);
          
          // Create stage section start
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
          
          // Skip to next token
          continue;
        } 
        else if (currentStage && level > 2) {
          // Subheading within a stage
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
          
          // Skip to next token
          continue;
        }
      }
      
      // For regular tokens or non-stage headings, use the default renderer
      html += marked.parser([token], { renderer: new marked.Renderer() });
    }
    
    // Close any open stage sections
    if (currentStage) {
      html += '</div>';
    }
    
    return { html, metadata };
  } catch (error) {
    console.error('Error processing markdown:', error);
    return { 
      html: `<p>Error processing content: ${error.message}</p>`, 
      metadata: {} 
    };
  }
}

// Process frontmatter to extract stage information
function processFrontmatter(content: string): {
  content: string;
  metadata: any;
} {
  // Ensure content is a string
  if (typeof content !== 'string') {
    console.error('Invalid content for processing:', content);
    return { content: '', metadata: {} };
  }

  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    const frontmatter = match[1];
    const contentWithoutFrontmatter = content.replace(frontmatterRegex, '');
    
    // Parse YAML frontmatter (simplified)
    const metadata: any = {};
    const stagesData = [];
    
    let inStagesBlock = false;
    let currentStage = null;
    
    // Process the frontmatter line by line
    frontmatter.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      
      // Check for stages section start
      if (trimmedLine === 'stages:') {
        inStagesBlock = true;
        return;
      }
      
      // Process inside stages block
      if (inStagesBlock) {
        // Check for new stage entry
        if (trimmedLine.startsWith('- id:')) {
          // If we have a current stage, push it to stages array before starting new one
          if (currentStage) {
            stagesData.push(currentStage);
          }
          
          // Start a new stage
          const id = trimmedLine.replace('- id:', '').trim();
          currentStage = { id };
        } 
        // Process stage properties
        else if (currentStage && trimmedLine.includes(':')) {
          const [key, value] = trimmedLine.split(':').map(p => p.trim());
          if (key && value) {
            currentStage[key] = value;
          }
        }
        // End of stages section if line is not indented
        else if (!trimmedLine.startsWith('  ') && !trimmedLine.startsWith('-') && trimmedLine !== '') {
          inStagesBlock = false;
          // Push final stage if exists
          if (currentStage) {
            stagesData.push(currentStage);
            currentStage = null;
          }
        }
      }
      
      // Process other frontmatter lines
      if (!inStagesBlock && trimmedLine.includes(':')) {
        const [key, value] = trimmedLine.split(':').map(p => p.trim());
        if (key && value) {
          metadata[key] = value;
        }
      }
    });
    
    // Add the last stage if we have one
    if (currentStage) {
      stagesData.push(currentStage);
    }
    
    // Add stages data to metadata
    if (stagesData.length > 0) {
      metadata.stages = stagesData;
    }
    
    return { content: contentWithoutFrontmatter, metadata };
  }
  
  return { content, metadata: {} };
}
