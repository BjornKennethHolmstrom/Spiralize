// scripts/generate-personal-guide-pdf.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseContentDir = path.join(__dirname, '../static/content/guides/personal-growth');
const imagesDir = path.join(__dirname, '../static/content/guides/personal-growth/images');
const tempImagesDir = path.join(__dirname, '../static/temp-images');

// Language-specific configurations
const LANGUAGES = ['en', 'sv'];
const TITLES = {
  en: "Spiral-Aware Personal Growth Guide",
  sv: "Spiralmedveten Guide för Personlig Utveckling"
};
const TOC_TITLES = {
  en: "Table of Contents",
  sv: "Innehållsförteckning"
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

// Get all content files and sort them for a specific language
async function generateContentPdf(language) {
  console.log(`Generating ${language} content PDF...`);

  const contentDir = path.join(baseContentDir, language);
  const tempContentPath = path.join(__dirname, `../static/temp-content-${language}.pdf`);
  
  // Check if the language directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`No content directory found for ${language} at ${contentDir}`);
    return null;
  }

  const imageMap = await preprocessSvgImages();

  // Define the order of files to include
  const orderedFiles = [
    'preface.md',
    'chapter-01.md',
    'chapter-02.md',
    'chapter-03.md',
    'chapter-03-spiral-life-mapping-worksheet.md',
    'chapter-04.md',
    'chapter-04-beige-stabilization-card.md',
    'chapter-05.md',
    'chapter-05-purple-practice-card.md',
    'chapter-06.md',
    'chapter-06-red-embodiment-practice-card.md',
    'chapter-07-blue-personal-code-worksheet.md',
    'chapter-07.md',
    'chapter-08.md',
    'chapter-08-orange-to-green-reflection-worksheet.md',
    'chapter-09.md',
    'chapter-09-green-emotional-boundaries-and-needs-card.md',
    'chapter-10.md',
    'chapter-10-yellow-kaleidoscope-reflection-tool.md',
    'chapter-11.md',
    'chapter-11-turquoise-presence-attunement-card.md',
    'chapter-12-coral-emergence-altar-template.md',
    'chapter-12.md',
    'chapter-13.md',
    'chapter-13-stage-mismatch-reflection-worksheet.md',
    'chapter-14.md',
    'chapter-14-spiral-transition-journal-template.md',
    'chapter-15.md',
    'chapter-16.md',
    'chapter-16-spiral-dance-visualization.md',
    'chapter-17.md',
    'appendix-a.md',
    'appendix-b.md',
    'appendix-c.md',
    'appendix-d.md'
  ];

  // Filter the list to only include files that exist
  const existingFiles = orderedFiles.filter(file => {
    return fs.existsSync(path.join(contentDir, file));
  });

  if (existingFiles.length === 0) {
    console.warn(`No content files found for ${language} in ${contentDir}`);
    return null;
  }

  // Start building markdown with language-specific title
  let combinedMarkdown = `# ${TITLES[language]}\n\n## ${TOC_TITLES[language]}\n\n`;

  // Generate Table of Contents
  existingFiles.forEach((file, i) => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const titleMatch = content.match(/^#+\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : file.replace(/\.md$/, '');
    const anchorId = file.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    combinedMarkdown += `${i + 1}. [${title}](#${anchorId})\n`;
  });

  combinedMarkdown += `\n---\n\n`;

  // Append content
  existingFiles.forEach((file, i) => {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const anchorId = file.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Rewrite image paths and apply additional preprocessing
    let processed = raw.replace(/\!\[([^\]]*)\]\((images\/[^\)]+)\)/g, (_, alt, imgPath) => {
      const filename = path.basename(imgPath);
      return `![${alt}](../temp-images/${filename})`;
    });

    processed = processMarkdown(processed, imageMap);

    combinedMarkdown += `<a id="${anchorId}"></a>\n\n`;
    combinedMarkdown += processed + '\n\n';

    // Add page break unless last file
    if (i < existingFiles.length - 1) {
      combinedMarkdown += `<div style="page-break-after: always;"></div>\n\n`;
    }
  });

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
    console.log('Generating Spiral-Aware Personal Growth Guide PDFs...');
    
    // Process each language
    for (const language of LANGUAGES) {
      // Create output path for this language
      const outputPath = path.join(__dirname, `../static/spiral-personal-growth-guide-${language}.pdf`);
      
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
