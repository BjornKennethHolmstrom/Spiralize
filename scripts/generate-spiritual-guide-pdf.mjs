// scripts/generate-spiritual-guide-pdf.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../static/content/guides/spiritual');
const imagesDir = path.join(__dirname, '../static/content/guides/spiritual/sections');
const outputPath = path.join(__dirname, '../static/spiritual-mystical-guide.pdf');
const coverSvgPath = path.join(__dirname, '../static/content/guides/spiritual/sections/00-intro/spiral-map.svg');
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
    page.drawText('The Spiritual & Mystical Spiral', {
      x: 150,
      y: 700,
      size: 30
    });
    
    page.drawText('A Guide to Awakening Through Spiral Dynamics', {
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

// Find all SVG images recursively in the content directory
async function findAllSvgImages() {
  console.log('Finding all SVG images...');
  
  const allSvgPaths = [];
  
  function traverseDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.svg')) {
        allSvgPaths.push(fullPath);
      }
    }
  }
  
  traverseDirectory(contentDir);
  console.log(`Found ${allSvgPaths.length} SVG images`);
  return allSvgPaths;
}

// Pre-process SVG images
async function preprocessSvgImages() {
  console.log('Pre-processing images...');
  
  const allSvgPaths = await findAllSvgImages();
  const imageMap = {};
  
  for (const svgPath of allSvgPaths) {
    const relativePath = path.relative(contentDir, svgPath);
    const filename = path.basename(svgPath);
    const destPath = path.join(tempImagesDir, filename);
    
    try {
      // Convert SVG to PNG
      const pngFileName = filename.replace('.svg', '.png');
      const pngPath = path.join(tempImagesDir, pngFileName);
      
      await sharp(svgPath)
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
        .png()
        .toFile(pngPath);
      
      imageMap[relativePath] = pngPath;
      console.log(`Converted ${filename} to PNG`);
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  }
  
  return imageMap;
}

// Process markdown content to handle images
function processMarkdown(markdown, imageMap) {
  let processedContent = markdown;
  
  // Replace SVG image references with PNG references
  for (const [svgPath, pngPath] of Object.entries(imageMap)) {
    const relativePngPath = path.relative(contentDir, pngPath).replace(/\\/g, '/');
    
    // Different patterns to catch various ways images might be referenced
    const patterns = [
      new RegExp(`!\\[([^\\]]*)\\]\\((?:\\.\\.\\/)*${svgPath.replace(/\\/g, '/')}\\)`, 'g'),
      new RegExp(`!\\[([^\\]]*)\\]\\((?:\\.\\.\\/)*${path.basename(svgPath)}\\)`, 'g')
    ];
    
    patterns.forEach(pattern => {
      processedContent = processedContent.replace(pattern, (match, alt) => {
        return `![${alt}](${relativePngPath})`;
      });
    });
  }
  
  return processedContent;
}

// Get ordered files for the spiritual guide
function getOrderedSpiritualFiles() {
  console.log('Getting ordered files for spiritual guide...');
  
  // Define the ordered list of files based on the guide structure
  const orderedFiles = [
    // Preface & Introduction
    'sections/00-intro/00-introduction.md',
    'sections/00-intro/spiral-dynamics-101.md',
    'sections/00-intro/mystical-experiences-101.md',
    'sections/00-intro/glossary.md',
    'sections/00-intro/visual-spiral-map.md',
    
    // Part 1: First-Tier Foundations
    'sections/01-first-tier/00-first-tier-intro.md',
    'sections/01-first-tier/beige-primal.md',
    'sections/01-first-tier/purple-tribal.md',
    'sections/01-first-tier/red-power.md',
    'sections/01-first-tier/blue-order.md',
    'sections/01-first-tier/orange-rational.md',
    'sections/01-first-tier/green-heart.md',
    
    // Part 2: Second-Tier
    'sections/02-second-tier/00-second-tier-intro.md',
    'sections/02-second-tier/yellow-systemic.md',
    'sections/02-second-tier/turquoise-holistic.md',
    
    // Part 3: Third-Tier Awakening
    'sections/03-third-tier/00-third-tier-intro.md',
    'sections/03-third-tier/coral-play.md',
    'sections/03-third-tier/ultraviolet-transparent.md',
    'sections/03-third-tier/clear-beyond.md',
    
    // Part 4: Practices and Crisis Navigation
    'sections/04-practices/00-practices-intro.md',
    'sections/04-practices/universal-practices.md',
    'sections/04-practices/beige-practices.md',
    'sections/04-practices/purple-practices.md',
    'sections/04-practices/red-practices.md',
    'sections/04-practices/blue-practices.md',
    'sections/04-practices/orange-practices.md',
    'sections/04-practices/green-practices.md',
    'sections/04-practices/yellow-practices.md',
    'sections/04-practices/turquoise-practices.md',
    'sections/04-practices/coral-practices.md',
    'sections/04-practices/ultraviolet-practices.md',
    'sections/04-practices/clear-practices.md',
    
    // Crisis and Shadow Integration
    'sections/05-crisis-integration/00-crisis-intro.md',
    'sections/05-crisis-integration/dark-night-guide.md',
    'sections/05-crisis-integration/integration-tools.md',
    
    // Stage-specific Crises
    'sections/05-crisis-integration/stage-specific-crises/beige-embodiment.md',
    'sections/05-crisis-integration/stage-specific-crises/purple-connection.md',
    'sections/05-crisis-integration/stage-specific-crises/red-rage.md',
    'sections/05-crisis-integration/stage-specific-crises/blue-doubt.md',
    'sections/05-crisis-integration/stage-specific-crises/orange-emptiness.md',
    'sections/05-crisis-integration/stage-specific-crises/green-disillusionment.md',
    'sections/05-crisis-integration/stage-specific-crises/yellow-analysis-paralysis.md',
    'sections/05-crisis-integration/stage-specific-crises/turquoise-loneliness.md',
    'sections/05-crisis-integration/stage-specific-crises/coral-exhaustion.md',
    'sections/05-crisis-integration/stage-specific-crises/ultraviolet-crisis.md',
    'sections/05-crisis-integration/stage-specific-crises/clear-crisis.md',
    
    // Ethics and Service
    'sections/06-ethics-service/00-ethics-intro.md',
    'sections/06-ethics-service/everyday-mysticism.md',
    'sections/06-ethics-service/service-frameworks.md',
    
    // Wisdom Traditions
    'sections/07-wisdom-traditions/00-traditions-intro.md',
    'sections/07-wisdom-traditions/indigenous.md',
    'sections/07-wisdom-traditions/monastic.md',
    'sections/07-wisdom-traditions/nondual.md',
    'sections/07-wisdom-traditions/integral.md',
    
    // Tools and Appendices
    'tools/shadow-journal.md',
    'tools/mystical-diagnostics.md',
    'tools/universal-adapter.md',
    'tools/boundary-setting.md',
    'tools/digital-detox.md',
    'tools/concept-fast.md',
    'tools/no-tools-needed.md',
    'tools/no-special-time.md',
    'tools/crisis-protocols.md',
    'appendices/states-vs-stages.md',
    'appendices/conscious-consumerism.md',
    'practices/commuter-meditations.md',
    'practices/kitchen-retreats.md'
  ];

  // Filter to only include files that actually exist
  const existingFiles = orderedFiles.filter(file => {
    const fullPath = path.join(contentDir, file);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      console.warn(`Warning: File ${file} listed in order but not found at ${fullPath}`);
    }
    return exists;
  });
  
  console.log(`Found ${existingFiles.length} existing files out of ${orderedFiles.length} defined in order`);
  return existingFiles;
}

// Generate content PDF from all markdown files
async function generateContentPdf() {
  console.log('Generating content PDF...');

  const imageMap = await preprocessSvgImages();
  const orderedFiles = getOrderedSpiritualFiles();

  if (orderedFiles.length === 0) {
    throw new Error('No content files found for the spiritual guide');
  }

  let combinedMarkdown = `# The Spiritual & Mystical Spiral\n\n`;
  combinedMarkdown += `## A Guide to Awakening Through Spiral Dynamics\n\n`;
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
        combinedMarkdown += `# Introduction to the Spiral of Awakening\n\n`;
      } else if (file.includes('sections/01-first-tier/00-first-tier-intro.md')) {
        combinedMarkdown += `# Part 1: First-Tier Foundations (Beige–Green)\n\n`;
      } else if (file.includes('sections/02-second-tier/00-second-tier-intro.md')) {
        combinedMarkdown += `# Part 2: Second-Tier Awakening (Yellow, Turquoise)\n\n`;
      } else if (file.includes('sections/03-third-tier/00-third-tier-intro.md')) {
        combinedMarkdown += `# Part 3: Third-Tier Awakening (Coral–Clear)\n\n`;
      } else if (file.includes('sections/04-practices/00-practices-intro.md')) {
        combinedMarkdown += `# Part 4: Practices and Technologies\n\n`;
      } else if (file.includes('sections/05-crisis-integration/00-crisis-intro.md')) {
        combinedMarkdown += `# Part 5: Crisis and Shadow Integration\n\n`;
      } else if (file.includes('sections/06-ethics-service/00-ethics-intro.md')) {
        combinedMarkdown += `# Part 6: Spiral Ethics and Service\n\n`;
      } else if (file.includes('sections/07-wisdom-traditions/00-traditions-intro.md')) {
        combinedMarkdown += `# Part 7: Wisdom Traditions Through the Spiral\n\n`;
      } else if (file.includes('tools/shadow-journal.md')) {
        combinedMarkdown += `# Appendices: Practical Tools\n\n`;
      }

      // Process markdown content
      let processed = processMarkdown(raw, imageMap);

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
        printBackground: true,
        timeout: 240000
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
async function generateSpiritualGuidePdf() {
  try {
    console.log('Generating The Spiritual & Mystical Spiral PDF...');
    
    await generateCoverPdf();
    await generateContentPdf();
    await mergePdfs();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

generateSpiritualGuidePdf();
