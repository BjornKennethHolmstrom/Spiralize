// scripts/generate-governance-guide-pdf.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../static/content/guides/governance');
const outputPath = path.join(__dirname, '../static/spiral-governance-guide.pdf');
const coverSvgPath = path.join(__dirname, '../static/content/guides/governance/spiral-dynamics-governance-chart.svg');
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
    page.drawText('Spiral-Aware Global Governance', {
      x: 100,
      y: 700,
      size: 30
    });
    
    page.drawText('A Developmental Approach to Planetary Challenges', {
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

// Get ordered files for the governance guide
function getOrderedGovernanceFiles() {
  console.log('Getting ordered files for governance guide...');
  
  // Define the ordered list of files based on the guide structure
  const orderedFiles = [
    // Introduction
    'introduction.md',
    
    // Part I: Mapping the Global Developmental Landscape
    'part-i.md',
    'chapter-1-value-systems.md',
    'chapter-2-developmental-assessment.md',
    
    // Part II: Bridging Developmental Divides
    'part-ii.md',
    'chapter-3-climate-governance.md',
    'chapter-4-security-peace.md',
    'chapter-5-economic-systems.md',
    
    // Part III: Facilitating Healthy Development
    'part-iii.md',
    'chapter-6-digital-governance.md',
    'chapter-7-cultural-exchange.md',
    'chapter-8-crisis-resilience.md',
    
    // Part IV: Challenges and Emerging Possibilities
    'part-iv.md',
    'chapter-9-developmental-transitions.md',
    'chapter-10-emergent-models.md',
    'chapter-11-practices.md',
    
    // Conclusion and Resources
    'conclusion.md',
    'resources.md'
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
  const orderedFiles = getOrderedGovernanceFiles();

  if (orderedFiles.length === 0) {
    throw new Error('No content files found for the governance guide');
  }

  let combinedMarkdown = `# Spiral-Aware Global Governance\n\n`;
  combinedMarkdown += `## A Developmental Approach to Planetary Challenges\n\n`;
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
      if (file.includes('introduction.md')) {
        combinedMarkdown += `# 🌟 Introduction: The Developmental Challenge of Global Governance\n\n`;
      } else if (file.includes('part-i.md')) {
        combinedMarkdown += `# 🗺️ Part I: Mapping the Global Developmental Landscape\n\n`;
      } else if (file.includes('part-ii.md')) {
        combinedMarkdown += `# 🌉 Part II: Bridging Developmental Divides\n\n`;
      } else if (file.includes('part-iii.md')) {
        combinedMarkdown += `# 🌱 Part III: Facilitating Healthy Development\n\n`;
      } else if (file.includes('part-iv.md')) {
        combinedMarkdown += `# 🔭 Part IV: Challenges and Emerging Possibilities\n\n`;
      } else if (file.includes('conclusion.md')) {
        combinedMarkdown += `# 🌐 Conclusion: A Developmental Path Forward\n\n`;
      } else if (file.includes('resources.md')) {
        combinedMarkdown += `# 🧰 Resources\n\n`;
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
async function generateGovernanceGuidePdf() {
  try {
    console.log('Generating Spiral-Aware Global Governance Guide PDF...');
    
    await generateCoverPdf();
    await generateContentPdf();
    await mergePdfs();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

generateGovernanceGuidePdf();
