// scripts/generate-guide-pdf.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseContentDir = path.join(__dirname, '../static/content/guides/psychology');
const imagesDir = path.join(__dirname, '../static/content/guides/psychology/images');
const tempImagesDir = path.join(__dirname, '../static/temp-images');

// Define supported languages
const LANGUAGES = ['en', 'sv'];
const TITLES = {
  en: "Spiral-Aware Mental Health & Therapeutic Guide",
  sv: "Spiralmedveten Guide för Mental Hälsa & Terapi"
};
const TOC_TITLES = {
  en: "Table of Contents",
  sv: "Innehållsförteckning"
};
const CHAPTER_TITLES = {
  en: "Chapter",
  sv: "Kapitel"
};
const APPENDIX_TITLES = {
  en: "Appendices",
  sv: "Bilagor"
};
const APPENDIX_TITLE = {
  en: "Appendix",
  sv: "Bilaga"
};

// Create temp directory for image processing if it doesn't exist
if (!fs.existsSync(tempImagesDir)) {
  fs.mkdirSync(tempImagesDir, { recursive: true });
}

// Generate PDF cover from SVG for a specific language
async function generateCoverPdf(language) {
  const tempCoverPath = path.join(__dirname, `../static/temp-cover-${language}.pdf`);
  
  // First try to find language-specific cover
  let coverSvgPath = path.join(baseContentDir, language, 'cover.svg');
  
  // If language-specific cover doesn't exist, fall back to generic cover
  if (!fs.existsSync(coverSvgPath)) {
    coverSvgPath = path.join(baseContentDir, 'cover.svg');
    
    // If even the generic cover doesn't exist, log an error and return null
    if (!fs.existsSync(coverSvgPath)) {
      console.error(`No cover SVG found for ${language}`);
      return null;
    }
    
    console.log(`Using generic cover for ${language}`);
  } else {
    console.log(`Using language-specific cover for ${language}`);
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
  console.log(`Cover page generated for ${language}`);
  
  return tempCoverPath;
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
        const pngPath = path.relative(baseContentDir, imageMap[filename]).replace(/\\/g, '/');
        return `![${alt}](${pngPath})`;
      }
      // For non-SVG images, point to the temp directory
      const newPath = path.relative(baseContentDir, path.join(tempImagesDir, filename)).replace(/\\/g, '/');
      return `![${alt}](${newPath})`;
    }
  );
  
  return processedContent;
}

// Generate content PDF for a specific language
async function generateContentPdf(language) {
  console.log(`Generating ${language} content PDF...`);
  
  const contentDir = path.join(baseContentDir, language);
  const tempContentPath = path.join(__dirname, `../static/temp-content-${language}.pdf`);
  
  // Check if the language directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`No content directory found for ${language} at ${contentDir}`);
    return null;
  }
  
  // Pre-process SVG images
  const imageMap = await preprocessSvgImages();
  
  // Get all chapter files
  const chapterFiles = fs.readdirSync(contentDir)
    .filter(file => file.match(/^chapter-\d+\.md$/))
    .sort((a, b) => {
      const numA = parseInt(a.match(/^chapter-(\d+)\.md$/)[1]);
      const numB = parseInt(b.match(/^chapter-(\d+)\.md$/)[1]);
      return numA - numB;
    });
  
  if (chapterFiles.length === 0) {
    console.warn(`No chapter files found for ${language} at ${contentDir}`);
    return null;
  }
  
  // Get all appendix files
  const appendixFiles = fs.readdirSync(contentDir)
    .filter(file => file.match(/^appendix-[a-g]\.md$/))
    .sort((a, b) => {
      const letterA = a.match(/^appendix-([a-g])\.md$/)[1];
      const letterB = b.match(/^appendix-([a-g])\.md$/)[1];
      return letterA.localeCompare(letterB);
    });
  
  // Create table of contents
  let combinedMarkdown = `# ${TITLES[language]}
## ${TOC_TITLES[language]}

`;

  // Add chapter titles to table of contents
  chapterFiles.forEach((file, index) => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const titleMatch = content.match(/^#+\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `${CHAPTER_TITLES[language]} ${index + 1}`;
    combinedMarkdown += `${index + 1}. [${title}](#chapter-${index + 1})\n`;
  });
  
  // Add appendix titles to table of contents
  if (appendixFiles.length > 0) {
    combinedMarkdown += `\n### ${APPENDIX_TITLES[language]}\n\n`;
    appendixFiles.forEach((file, index) => {
      const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const titleMatch = content.match(/^#+\s+(.+)$/m);
      const letter = file.match(/^appendix-([a-g])\.md$/)[1].toUpperCase();
      const title = titleMatch ? titleMatch[1] : `${APPENDIX_TITLE[language]} ${letter}`;
      combinedMarkdown += `${letter}. [${title}](#appendix-${letter.toLowerCase()})\n`;
    });
  }
  
  combinedMarkdown += '\n---\n\n';
  
  // Combine all chapter content
  for (let i = 0; i < chapterFiles.length; i++) {
    const file = chapterFiles[i];
    let content = fs.readFileSync(path.join(contentDir, file), 'utf-8');

    // Replace all image paths from 'images/filename.png' to '../temp-images/filename.png'
    content = content.replace(/\!\[([^\]]*)\]\((images\/[^\)]+)\)/g, (_, alt, imgPath) => {
      const filename = path.basename(imgPath);
      return `![${alt}](../temp-images/${filename})`;
    });

    // Process content to handle images
    content = processMarkdown(content, imageMap);
    
    // Add chapter marker for table of contents linking
    combinedMarkdown += `<a id="chapter-${i + 1}"></a>\n\n`;
    
    // Add chapter content
    combinedMarkdown += content + '\n\n';
    
    // Add page break between chapters
    if (i < chapterFiles.length - 1) {
      combinedMarkdown += '<div style="page-break-after: always;"></div>\n\n';
    }
  }
  
  // Add appendices if they exist
  if (appendixFiles.length > 0) {
    // Add a page break before appendices
    combinedMarkdown += '<div style="page-break-after: always;"></div>\n\n';
    combinedMarkdown += `# ${APPENDIX_TITLES[language]}\n\n`;
    
    // Combine all appendix content
    for (let i = 0; i < appendixFiles.length; i++) {
      const file = appendixFiles[i];
      let content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      
      // Process content to handle images
      content = processMarkdown(content, imageMap);
      
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
      },
      basedir: path.join(__dirname, '../static'), // Set to static directory
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
  
  console.log(`${language} content PDF generated`);
  return tempContentPath;
}

// Merge cover and content PDFs
async function mergePdfs(coverPath, contentPath, outputPath) {
  console.log(`Merging PDFs for ${outputPath}...`);
  
  // Read both PDFs
  const coverPdfBytes = fs.readFileSync(coverPath);
  const contentPdfBytes = fs.readFileSync(contentPath);
  
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
  fs.unlinkSync(coverPath);
  fs.unlinkSync(contentPath);
  
  console.log(`✅ Complete PDF generated at: ${outputPath}`);
}

// Main function to run the process
async function generateGuidePdf() {
  try {
    console.log('Generating Spiral-Aware Guide PDFs...');
    
    // Process each language
    for (const language of LANGUAGES) {
      // Create output path for this language
      const outputPath = path.join(__dirname, `../static/spiral-aware-guide-${language}.pdf`);
      
      // Generate cover PDF
      const coverPath = await generateCoverPdf(language);
      
      // Generate content PDF
      const contentPath = await generateContentPdf(language);
      
      // If we have both cover and content, merge them
      if (coverPath && contentPath) {
        await mergePdfs(coverPath, contentPath, outputPath);
      } else {
        console.warn(`Skipping PDF generation for ${language} due to missing content or cover`);
      }
    }
    
    // Clean up temporary converted images
    if (fs.existsSync(tempImagesDir)) {
      const tempFiles = fs.readdirSync(tempImagesDir);
      for (const file of tempFiles) {
        fs.unlinkSync(path.join(tempImagesDir, file));
      }
      // Remove the directory itself
      fs.rmdirSync(tempImagesDir);
    }
    
  } catch (error) {
    console.error('Error generating PDFs:', error);
  }
}

generateGuidePdf();
