// scripts/generate-leadership-guide-pdf.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../static/content/guides/leadership');
const imagesDir = path.join(__dirname, '../static/content/guides/leadership/images');
const outputPath = path.join(__dirname, '../static/spiral-leadership-toolkit.pdf');
const coverSvgPath = path.join(__dirname, '../static/content/guides/leadership/cover.svg');
const tempCoverPath = path.join(__dirname, '../static/temp-cover.pdf');
const tempContentPath = path.join(__dirname, '../static/temp-content.pdf');
const tempImagesDir = path.join(__dirname, '../static/temp-images');

// Create temp directory for image processing if it doesn't exist
if (!fs.existsSync(tempImagesDir)) {
  fs.mkdirSync(tempImagesDir, { recursive: true });
}

// Generate PDF cover from SVG
async function generateCoverPdf() {
  console.log('Generating cover page...');
  
  // Check if cover SVG exists, if not create a basic placeholder
  if (!fs.existsSync(coverSvgPath)) {
    console.warn('Cover SVG not found, creating a placeholder cover');
    
    // Create a basic PDF document as cover
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([850, 1100]);
    
    // Add text title
    page.drawText('Spiral Coaching & Leadership Toolkit', {
      x: 150,
      y: 700,
      size: 30
    });
    
    page.drawText('A practice guide for coaches and leaders using Spiral Dynamics', {
      x: 150,
      y: 650,
      size: 16
    });
    
    page.drawText('Spiralize.org', {
      x: 380,
      y: 100,
      size: 14
    });
    
    // Save the placeholder cover PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(tempCoverPath, pdfBytes);
    console.log('Placeholder cover page generated');
    return;
  }
  
  // Convert SVG to PNG first (pdf-lib works better with raster images)
  const pngBuffer = await sharp(coverSvgPath)
    .resize({ width: 850, height: 1100, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();
  
  // Create a PDF document with the cover image
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([850, 1100]);
  
  // Convert PNG to a format that pdf-lib can use
  const image = await pdfDoc.embedPng(pngBuffer);
  
  // Draw the image on the page
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: 850,
    height: 1100
  });
  
  // Save the cover PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(tempCoverPath, pdfBytes);
  console.log('Cover page generated');
}

// Pre-process SVG images
async function preprocessSvgImages() {
  console.log('Pre-processing images...');
  
  if (!fs.existsSync(imagesDir)) {
    console.warn('No images directory found at', imagesDir);
    return {};
  }
  
  const imageMap = {};
  const allImageFiles = fs.readdirSync(imagesDir)
    .filter(file => ['.svg', '.png', '.jpg', '.jpeg', '.gif'].includes(path.extname(file).toLowerCase()));
  
  for (const imageFile of allImageFiles) {
    const ext = path.extname(imageFile).toLowerCase();
    const sourcePath = path.join(imagesDir, imageFile);
    const destPath = path.join(tempImagesDir, imageFile);
    
    try {
      if (ext === '.svg') {
        // Convert SVG to PNG
        const pngFileName = imageFile.replace('.svg', '.png');
        const pngPath = path.join(tempImagesDir, pngFileName);
        
        await sharp(sourcePath)
          .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .png()
          .toFile(pngPath);
        
        imageMap[imageFile] = pngPath;
        console.log(`Converted ${imageFile} to PNG`);
      } else {
        // Copy other image formats as-is
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${imageFile} to temp directory`);
      }
    } catch (error) {
      console.error(`Error processing ${imageFile}:`, error);
    }
  }
  
  return imageMap;
}

// Process markdown content to handle images
function processMarkdown(markdown, imageMap) {
  let processedContent = markdown;
  
  // Replace all image references (both SVG and other formats)
  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\((?:\.\.\/)?images\/([^)]+)\)/g, 
    (match, alt, filename) => {
      // If this was an SVG that we converted, use the PNG path
      if (imageMap[filename]) {
        const pngPath = path.relative(contentDir, imageMap[filename]).replace(/\\/g, '/');
        return `![${alt}](${pngPath})`;
      }
      // For non-SVG images, point to the temp directory
      const newPath = path.relative(contentDir, path.join(tempImagesDir, filename)).replace(/\\/g, '/');
      return `![${alt}](${newPath})`;
    }
  );
  
  return processedContent;
}

// Get all files sorted by section
function getOrderedLeadershipFiles() {
  // Define the ordered list of files based on the toolkit structure
  const orderedFiles = [
    // Section 0: Introduction
    'sections/00-intro/00-introduction.md',
    'sections/00-intro/spiral-dynamics-101.md',
    'sections/00-intro/core-concepts.md',
    'sections/00-intro/quick-reference.md',
    'tools/spiral-cheat-sheet.md',
    
    // Section 1: Coaching Questions by Stage
    'sections/01-coaching-questions/leadership-01-overview.md',
    'sections/01-coaching-questions/beige-questions.md',
    'sections/01-coaching-questions/purple-questions.md',
    'sections/01-coaching-questions/red-questions.md',
    'sections/01-coaching-questions/blue-questions.md',
    'sections/01-coaching-questions/orange-questions.md',
    'sections/01-coaching-questions/green-questions.md',
    'sections/01-coaching-questions/yellow-questions.md',
    'sections/01-coaching-questions/turquoise-questions.md',
    'sections/01-coaching-questions/coral-questions.md',
    'tools/coaching-questions-table.md',
    'tools/client-communication-templates.md',
    
    // Section 2: Leadership Styles & Triggers
    'sections/02-leadership-styles/00-leadership-styles-introduction.md',
    'sections/02-leadership-styles/01-leadership-archetypes.md',
    'sections/02-leadership-styles/02-triggers.md',
    'sections/02-leadership-styles/03-feedback-strategies.md',
    'sections/02-leadership-styles/04-team-dynamics.md',
    'sections/02-leadership-styles/05-cultural-adaptation.md',
    'sections/02-leadership-styles/06-coaching-model-crosswalk.md',
    'tools/leadership-quick-start-snapshot.md',
    
    // Section 3: Shadow & Resistance Work
    'sections/03-shadow-and-resistance-work/00-shadow-resistance-introduction.md',
    'sections/03-shadow-and-resistance-work/00-stage-specific-shadows.md',
    'sections/03-shadow-and-resistance-work/01-identifying-resistance.md',
    'sections/03-shadow-and-resistance-work/02-techniques-for-uncovering-shadows.md',
    'sections/03-shadow-and-resistance-work/03-re-integration-practices.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-01-beige-stage.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-02-purple-stage.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-03-red-stage.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-04-blue-stage.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-05-orange-stage.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-06-green-stage.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-07-yellow-stage.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-08-turquoise-stage.md',
    'sections/03-shadow-and-resistance-work/04-exercise-case-study-09-coral-stage.md',
    'tools/shadow-and-resistance-work-quick-start-guide.md',
    
    // Section 4: Transitions & Transformations
    'sections/04-transitions/00-transitions-introduction.md',
    'sections/04-transitions/00-quick-start-transition.md',
    'sections/04-transitions/01-transition-maps.md',
    'sections/04-transitions/02-markers-transition.md',
    'sections/04-transitions/03-motivational-styles-and-cultural-considerations.md',
    'sections/04-transitions/04-liminal-space-techniques.md',
    'sections/04-transitions/05-evaluating-progress.md',
    'tools/progress-tracker-template.md',
    
    // Section 5: Coaching Blind Spots
    'sections/05-blind-spots/00-blind-spots-introduction.md',
    'sections/05-blind-spots/00-quick-start-and-key-takeaways.md',
    'sections/05-blind-spots/01-understanding-coaching-blind-spots.md',
    'sections/05-blind-spots/02-reflective-practice-for-spiral-aware-coaching.md',
    'sections/05-blind-spots/03-spiral-aware-coach-self-assessment.md',
    'sections/05-blind-spots/04-coaching-model-crosswalk.md',
    
    // Section 6: Cultural and Organizational Contexts
    'sections/06-cultural-and-organizational-contexts/00-contexts-introduction.md',
    'sections/06-cultural-and-organizational-contexts/00-quick-start-and-key-takeaways.md',
    'sections/06-cultural-and-organizational-contexts/01-cultural-and-organizational-adaptations-of-spiral-dynamics.md',
    'sections/06-cultural-and-organizational-contexts/02-adaptation-framework-and-case-studies.md',
    
    // Section 7: Resources & Community
    'sections/07-resources/00-resources-introduction.md',
    'sections/07-resources/01-curated-reading-list.md',
    'sections/07-resources/02-contact-forms.md',
    
    // Implementation Roadmap
    'roadmap.md'
  ];

  // Filter to only include files that actually exist
  return orderedFiles.filter(file => {
    const fullPath = path.join(contentDir, file);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      console.warn(`Warning: File ${file} defined in order but not found at ${fullPath}`);
    }
    return exists;
  });
}

// Generate content PDF from all markdown files
async function generateContentPdf() {
  console.log('Generating content PDF...');

  const imageMap = await preprocessSvgImages();
  const orderedFiles = getOrderedLeadershipFiles();

  if (orderedFiles.length === 0) {
    throw new Error('No content files found for the leadership guide');
  }

  let combinedMarkdown = `# Spiral Coaching & Leadership Toolkit\n\n`;
  combinedMarkdown += `## A practice guide for coaches and leaders using Spiral Dynamics principles\n\n`;
  combinedMarkdown += `## Table of Contents\n\n`;

  // Generate Table of Contents
  orderedFiles.forEach((file, i) => {
    try {
      const fullPath = path.join(contentDir, file);
      const content = fs.readFileSync(fullPath, 'utf-8');
      const titleMatch = content.match(/^#+\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : file.replace(/\.md$/, '').split('/').pop();
      const anchorId = file.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      combinedMarkdown += `${i + 1}. [${title}](#${anchorId})\n`;
    } catch (error) {
      console.warn(`Error reading file for TOC: ${file}`, error.message);
      combinedMarkdown += `${i + 1}. [${file}](#${file.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')})\n`;
    }
  });

  combinedMarkdown += `\n---\n\n`;

  // Append content
  for (let i = 0; i < orderedFiles.length; i++) {
    const file = orderedFiles[i];
    try {
      const fullPath = path.join(contentDir, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const anchorId = file.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

      // Add section dividers for clarity
      if (file.includes('sections/00-intro/00-introduction.md')) {
        combinedMarkdown += `# Introduction to Spiral Dynamics\n\n`;
      } else if (file.includes('sections/01-coaching-questions/leadership-01-overview.md')) {
        combinedMarkdown += `# Coaching Questions by Stage\n\n`;
      } else if (file.includes('sections/02-leadership-styles/00-leadership-styles-introduction.md')) {
        combinedMarkdown += `# Leadership Styles & Triggers Across the Spiral\n\n`;
      } else if (file.includes('sections/03-shadow-and-resistance-work/00-shadow-resistance-introduction.md')) {
        combinedMarkdown += `# Shadow & Resistance Work in Developmental Growth\n\n`;
      } else if (file.includes('sections/04-transitions/00-transitions-introduction.md')) {
        combinedMarkdown += `# Tools for Guiding Transitions & Transformations\n\n`;
      } else if (file.includes('sections/05-blind-spots/00-blind-spots-introduction.md')) {
        combinedMarkdown += `# Maps for Self-Diagnosing Coaching Blind Spots\n\n`;
      } else if (file.includes('sections/06-cultural-and-organizational-contexts/00-contexts-introduction.md')) {
        combinedMarkdown += `# Adapting to Cultural and Organizational Contexts\n\n`;
      } else if (file.includes('sections/07-resources/00-resources-introduction.md')) {
        combinedMarkdown += `# Further Resources & Community Engagement\n\n`;
      } else if (file.includes('roadmap.md')) {
        combinedMarkdown += `# Implementation Roadmap\n\n`;
      }

      // Process markdown content
      let processed = raw.replace(/\!\[([^\]]*)\]\((images\/[^\)]+)\)/g, (_, alt, imgPath) => {
        const filename = path.basename(imgPath);
        return `![${alt}](../temp-images/${filename})`;
      });

      processed = processMarkdown(processed, imageMap);

      // Add anchor for TOC linking
      combinedMarkdown += `<a id="${anchorId}"></a>\n\n`;
      combinedMarkdown += processed + '\n\n';

      // Add page break unless last file
      if (i < orderedFiles.length - 1) {
        combinedMarkdown += `<div style="page-break-after: always;"></div>\n\n`;
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
      combinedMarkdown += `\n\n## Error loading content for ${file}\n\n`;
    }
  }

  // Convert markdown to PDF
  await mdToPdf(
    { content: combinedMarkdown },
    {
      dest: tempContentPath,
      pdf_options: {
        format: 'A4',
        margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
        printBackground: true
      },
      stylesheet_paths: [path.join(__dirname, 'pdf-styles.css')],
      marked_options: {
        headerIds: true,
        smartypants: true
      },
      basedir: path.join(__dirname, '../static'),
      launch_options: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: 'new',
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
      },
      asset_options: {
        allowed_schemes: ['file', 'data'],
        allow_local: true
      }
    }
  );

  console.log('Content PDF generated');
}

// Merge cover and content PDFs
async function mergePdfs() {
  console.log('Merging PDFs...');
  
  // Read both PDFs
  const coverPdfBytes = fs.readFileSync(tempCoverPath);
  const contentPdfBytes = fs.readFileSync(tempContentPath);
  
  // Load PDFs
  const coverPdf = await PDFDocument.load(coverPdfBytes);
  const contentPdf = await PDFDocument.load(contentPdfBytes);
  
  // Create a new PDF
  const mergedPdf = await PDFDocument.create();
  
  // Copy pages from cover
  const coverPages = await mergedPdf.copyPages(coverPdf, coverPdf.getPageIndices());
  coverPages.forEach(page => mergedPdf.addPage(page));
  
  // Copy pages from content
  const contentPages = await mergedPdf.copyPages(contentPdf, contentPdf.getPageIndices());
  contentPages.forEach(page => mergedPdf.addPage(page));
  
  // Save the merged PDF
  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(outputPath, mergedPdfBytes);
  
  // Clean up temporary files
  fs.unlinkSync(tempCoverPath);
  fs.unlinkSync(tempContentPath);
  
  // Clean up temporary converted images
  if (fs.existsSync(tempImagesDir)) {
    const tempFiles = fs.readdirSync(tempImagesDir);
    for (const file of tempFiles) {
      fs.unlinkSync(path.join(tempImagesDir, file));
    }
    // Remove the directory itself
    fs.rmdirSync(tempImagesDir);
  }
  
  console.log(`✅ Complete PDF generated at: ${outputPath}`);
}

// Main function to run the process
async function generateLeadershipGuidePdf() {
  try {
    console.log('Generating Spiral Coaching & Leadership Toolkit PDF...');
    
    await generateCoverPdf();
    await generateContentPdf();
    await mergePdfs();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

generateLeadershipGuidePdf();
