// scripts/generate-guide-pdf.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../static/content/guides/psychology');
const outputPath = path.join(__dirname, '../static/spiral-aware-guide.pdf');
const coverSvgPath = path.join(__dirname, '../static/content/guides/psychology/cover.svg');
const tempCoverPath = path.join(__dirname, '../static/temp-cover.pdf');
const tempContentPath = path.join(__dirname, '../static/temp-content.pdf');

// Generate PDF cover from SVG
async function generateCoverPdf() {
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

// Get all chapter files and sort them
async function generateContentPdf() {
  console.log('Generating content PDF...');
  
  // Get all chapter files
  const chapterFiles = fs.readdirSync(contentDir)
    .filter(file => file.match(/^chapter-\d+\.md$/))
    .sort((a, b) => {
      const numA = parseInt(a.match(/^chapter-(\d+)\.md$/)[1]);
      const numB = parseInt(b.match(/^chapter-(\d+)\.md$/)[1]);
      return numA - numB;
    });
  
  // Get all appendix files
  const appendixFiles = fs.readdirSync(contentDir)
    .filter(file => file.match(/^appendix-[a-g]\.md$/))
    .sort((a, b) => {
      const letterA = a.match(/^appendix-([a-g])\.md$/)[1];
      const letterB = b.match(/^appendix-([a-g])\.md$/)[1];
      return letterA.localeCompare(letterB);
    });
  
  // Create table of contents
  let combinedMarkdown = `# Spiral-Aware Mental Health & Therapeutic Guide
## Table of Contents

`;

  // Add chapter titles to table of contents
  chapterFiles.forEach((file, index) => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const titleMatch = content.match(/^#+\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `Chapter ${index + 1}`;
    combinedMarkdown += `${index + 1}. [${title}](#chapter-${index + 1})\n`;
  });
  
  // Add appendix titles to table of contents
  combinedMarkdown += '\n### Appendices\n\n';
  appendixFiles.forEach((file, index) => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const titleMatch = content.match(/^#+\s+(.+)$/m);
    const letter = file.match(/^appendix-([a-g])\.md$/)[1].toUpperCase();
    const title = titleMatch ? titleMatch[1] : `Appendix ${letter}`;
    combinedMarkdown += `${letter}. [${title}](#appendix-${letter.toLowerCase()})\n`;
  });
  
  combinedMarkdown += '\n---\n\n';
  
  // Combine all chapter content
  for (let i = 0; i < chapterFiles.length; i++) {
    const file = chapterFiles[i];
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    
    // Add chapter marker for table of contents linking
    combinedMarkdown += `<a id="chapter-${i + 1}"></a>\n\n`;
    
    // Add chapter content
    combinedMarkdown += content + '\n\n';
    
    // Add page break between chapters
    if (i < chapterFiles.length - 1) {
      combinedMarkdown += '<div style="page-break-after: always;"></div>\n\n';
    }
  }
  
  // Add a page break before appendices
  combinedMarkdown += '<div style="page-break-after: always;"></div>\n\n';
  combinedMarkdown += '# Appendices\n\n';
  
  // Combine all appendix content
  for (let i = 0; i < appendixFiles.length; i++) {
    const file = appendixFiles[i];
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const letter = file.match(/^appendix-([a-g])\.md$/)[1].toLowerCase();
    
    // Add appendix marker for table of contents linking
    combinedMarkdown += `<a id="appendix-${letter}"></a>\n\n`;
    
    // Add appendix content
    combinedMarkdown += content + '\n\n';
    
    // Add page break between appendices
    if (i < appendixFiles.length - 1) {
      combinedMarkdown += '<div style="page-break-after: always;"></div>\n\n';
    }
  }
  
  // Generate content PDF
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
  
  console.log(`✅ Complete PDF generated at: ${outputPath}`);
}

// Main function to run the process
async function generateGuidePdf() {
  try {
    console.log('Generating Spiral-Aware Guide PDF...');
    
    await generateCoverPdf();
    await generateContentPdf();
    await mergePdfs();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

generateGuidePdf();
