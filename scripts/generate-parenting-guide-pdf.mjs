// scripts/generate-parenting-guide-pdf.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../static/content/guides/parenting');
const imagesDir = path.join(__dirname, '../static/content/guides/parenting/sections');
const outputPath = path.join(__dirname, '../static/spiral-parenting-guide.pdf');
const coverSvgPath = path.join(__dirname, '../static/content/guides/parenting/sections/tools/spiral-stage-timeline.svg');
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
    page.drawText('Spiral-Aware Parenting & Education Guide', {
      x: 100,
      y: 700,
      size: 30
    });
    
    page.drawText('Supporting Developmental Growth Through Spiral Dynamics', {
      x: 100,
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

// Get ordered files for the parenting guide
function getOrderedParentingFiles() {
  console.log('Getting ordered files for parenting guide...');
  
  // Define the ordered list of files based on the guide structure
  const orderedFiles = [
    // Introduction Section
    'sections/00-intro/00-introduction.md',
    'sections/00-intro/spiral-dynamics-101.md',
    'sections/00-intro/core-concepts.md',
    'sections/00-intro/quick-reference-glossary.md',
    'sections/00-intro/visual-roadmap.md',
    'sections/tools/spiral-parenting-cheat-sheet.md',
    
    // Developmental Signals Section
    'sections/01-developmental-signals/00-signals-introduction.md',
    'sections/01-developmental-signals/01-stage-signals-with-age-ranges.md',
    'sections/01-developmental-signals/02-transition-signs.md',
    'sections/01-developmental-signals/03-parenting-practices.md',
    'sections/01-developmental-signals/04-teaching-practices.md',
    'sections/01-developmental-signals/05-special-needs-considerations.md',
    'sections/01-developmental-signals/06-case-study-progression.md',
    'sections/tools/stage-signals-guide.md',
    'sections/tools/individual-progress-tracker.md',
    'sections/tools/spiral-stage-timeline.md',
    
    // Communication & Discipline Section
    'sections/02-communication-discipline/00-communication-introduction.md',
    'sections/02-communication-discipline/01-stage-aligned-language.md',
    'sections/02-communication-discipline/02-discipline-dos-and-donts.md',
    'sections/02-communication-discipline/03-storytelling-techniques.md',
    'sections/02-communication-discipline/04-encouraging-responsibility.md',
    'sections/02-communication-discipline/05-client-communication-tools.md',
    'sections/02-communication-discipline/06-transition-toolkit.md',
    'sections/02-communication-discipline/07-special-needs-considerations.md',
    'sections/tools/spiral-scripts.md',
    
    // Pedagogies Section
    'sections/03-pedagogies/00-pedagogies-introduction.md',
    'sections/03-pedagogies/01-montessori-mapping.md',
    'sections/03-pedagogies/02-waldorf-mapping.md',
    'sections/03-pedagogies/03-project-based-learning.md',
    'sections/03-pedagogies/04-traditional-vs-spiral-aligned.md',
    'sections/03-pedagogies/05-blending-systems.md',
    'sections/03-pedagogies/06-framework-integration.md',
    'sections/03-pedagogies/07-special-needs-considerations.md',
    'sections/tools/pedagogy-alignment-guide.md',
    
    // Stage Gaps Section
    'sections/04-stage-gaps/00-stage-gaps-introduction.md',
    'sections/04-stage-gaps/01-common-misattunements.md',
    'sections/04-stage-gaps/02-bridging-strategies.md',
    'sections/04-stage-gaps/03-supporting-faster-evolution.md',
    'sections/04-stage-gaps/04-parent-self-development.md',
    'sections/04-stage-gaps/05-communication-practices.md',
    'sections/04-stage-gaps/06-transition-toolkit.md',
    'sections/04-stage-gaps/07-special-needs-considerations.md',
    'sections/tools/conversation-starters.md',
    'sections/tools/family-teacher-stage-awareness-map.md',
    
    // Curriculum & School Transformation Section
    'sections/05-curriculum-transformation/00-curriculum-introduction.md',
    'sections/05-curriculum-transformation/01-spiral-informed-subjects.md',
    'sections/05-curriculum-transformation/02-curriculum-scaffolding.md',
    'sections/05-curriculum-transformation/03-school-wide-practices.md',
    'sections/05-curriculum-transformation/04-team-development.md',
    'sections/05-curriculum-transformation/05-special-needs-considerations.md',
    'sections/05-curriculum-transformation/06-visionary-section.md',
    'sections/tools/curriculum-snapshot.md',
    'sections/tools/school-transformation-metrics.md',
    
    // Technology Integration Section
    'sections/06-technology-integration/00-technology-introduction.md',
    'sections/06-technology-integration/01-stage-specific-tech-use.md',
    'sections/06-technology-integration/02-benefits-and-risks.md',
    'sections/06-technology-integration/03-parenting-strategies.md',
    'sections/06-technology-integration/04-teaching-strategies.md',
    'sections/06-technology-integration/05-special-needs-considerations.md',
    'sections/tools/tech-alignment-guide.md',
    
    // Cultural Contexts Section
    'sections/07-cultural-contexts/00-cultural-contexts-introduction.md',
    'sections/07-cultural-contexts/01-cultural-influences.md',
    'sections/07-cultural-contexts/02-socioeconomic-adaptations.md',
    'sections/07-cultural-contexts/03-special-needs-considerations.md',
    'sections/07-cultural-contexts/04-case-studies.md',
    'sections/07-cultural-contexts/05-master-adaptation-framework.md',
    'sections/tools/context-adaptation-guide.md',
    
    // Community Engagement Section
    'sections/08-community-engagement/00-community-introduction.md',
    'sections/08-community-engagement/01-spiralize-resources.md',
    'sections/08-community-engagement/02-curated-reading-list.md',
    'sections/08-community-engagement/03-community-of-practice.md',
    'sections/08-community-engagement/04-engagement-feedback.md',
    
    // Implementation Roadmap Section
    'sections/09-implementation/00-implementation-introduction.md',
    'sections/09-implementation/01-suggested-workflow.md',
    'sections/09-implementation/02-thirty-day-quick-start.md',
    'sections/09-implementation/03-troubleshooting-guide.md'
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
  const orderedFiles = getOrderedParentingFiles();

  if (orderedFiles.length === 0) {
    throw new Error('No content files found for the parenting guide');
  }

  let combinedMarkdown = `# Spiral-Aware Parenting & Education Guide\n\n`;
  combinedMarkdown += `## Supporting Developmental Growth Through Spiral Dynamics\n\n`;
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
        combinedMarkdown += `# 🌟 Introduction to Spiral Dynamics for Parenting & Education\n\n`;
      } else if (file.includes('sections/01-developmental-signals/00-signals-introduction.md')) {
        combinedMarkdown += `# 🌱 Developmental Signals & Needs in Children Through Spiral Stages\n\n`;
      } else if (file.includes('sections/02-communication-discipline/00-communication-introduction.md')) {
        combinedMarkdown += `# 🗣️ Stage-Appropriate Discipline, Communication & Storytelling\n\n`;
      } else if (file.includes('sections/03-pedagogies/00-pedagogies-introduction.md')) {
        combinedMarkdown += `# 🏫 Integrating Montessori, Waldorf & Project-Based Learning\n\n`;
      } else if (file.includes('sections/04-stage-gaps/00-stage-gaps-introduction.md')) {
        combinedMarkdown += `# ⚖️ Navigating "Stage Gaps" Between Parents, Teachers & Kids\n\n`;
      } else if (file.includes('sections/05-curriculum-transformation/00-curriculum-introduction.md')) {
        combinedMarkdown += `# 📚 Spiral-Aligned Curriculum & School Transformation\n\n`;
      } else if (file.includes('sections/06-technology-integration/00-technology-introduction.md')) {
        combinedMarkdown += `# 🌐 Digital & Technology Integration in Spiral-Aware Education\n\n`;
      } else if (file.includes('sections/07-cultural-contexts/00-cultural-contexts-introduction.md')) {
        combinedMarkdown += `# 🌍 Adapting to Cultural and Socioeconomic Contexts\n\n`;
      } else if (file.includes('sections/08-community-engagement/00-community-introduction.md')) {
        combinedMarkdown += `# 🤝 Community Engagement & Peer Learning\n\n`;
      } else if (file.includes('sections/09-implementation/00-implementation-introduction.md')) {
        combinedMarkdown += `# 🚀 Implementation Roadmap\n\n`;
      } else if (file.includes('sections/tools/') && !combinedMarkdown.includes('# Tools & Resources\n\n')) {
        combinedMarkdown += `# 🧰 Tools & Resources\n\n`;
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
async function generateParentingGuidePdf() {
  try {
    console.log('Generating Spiral-Aware Parenting & Education Guide PDF...');
    
    await generateCoverPdf();
    await generateContentPdf();
    await mergePdfs();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

generateParentingGuidePdf();
