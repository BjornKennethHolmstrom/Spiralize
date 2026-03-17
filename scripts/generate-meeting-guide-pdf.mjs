// scripts/generate-meeting-guide-pdfs.mjs
//
// Generates 4 PDFs for the Tier 2 Meeting Protocol guide:
//   - tier-2-meeting-protocol.en.pdf
//   - tier-2-meeting-protocol.sv.pdf
//   - appendix-difficult-questions.en.pdf
//   - appendix-difficult-questions.sv.pdf
//
// Usage: node scripts/generate-meeting-guide-pdfs.mjs
// Dependencies: md-to-pdf, pdf-lib, sharp

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guidesDir = path.join(__dirname, '../static/content/guides/meeting');
const tempDir = path.join(__dirname, '../static/temp-meeting-pdf');

// Ensure temp directory
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// ─── Cover SVG generation ───────────────────────────────────────────────────

function generateCoverSvg({ title, subtitle, description, lang }) {
  const author = 'Björn Kenneth Holmström';
  const aiCredit = lang === 'sv' ? 'med Claude, ChatGPT, DeepSeek, Gemini och Grok' : 'with Claude, ChatGPT, DeepSeek, Gemini and Grok';
  const website = 'Spiralize.org';

  // Word-wrap title if needed (split into lines of ~28 chars max)
  const titleLines = wrapText(title, 30);
  const titleStartY = 540 - (titleLines.length - 1) * 30;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="850" height="1100" viewBox="0 0 850 1100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8f4ff"/>
      <stop offset="100%" stop-color="#e9e1f9"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9B6B9E"/>
      <stop offset="100%" stop-color="#4A72B2"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="850" height="1100" fill="url(#bg)"/>

  <!-- Decorative wave shapes -->
  <path d="M0,1100 C200,1000 650,1050 850,950 V1100 H0Z" fill="#7c3aed" opacity="0.08"/>
  <path d="M850,0 C650,100 200,50 0,150 V0 H850Z" fill="#7c3aed" opacity="0.08"/>

  <!-- Decorative arcs (spiral color palette) -->
  <g transform="translate(425, 420)">
    <path d="M-260,0 A260,260 0 0,1 260,0" stroke="#E25A53" stroke-width="2.5" fill="none" opacity="0.25"/>
    <path d="M-210,40 A210,210 0 0,1 210,40" stroke="#FF7F27" stroke-width="2.5" fill="none" opacity="0.25"/>
    <path d="M-160,80 A160,160 0 0,1 160,80" stroke="#FFD700" stroke-width="2.5" fill="none" opacity="0.3"/>
    <path d="M-110,120 A110,110 0 0,1 110,120" stroke="#7AB55C" stroke-width="2.5" fill="none" opacity="0.25"/>
    <path d="M-60,160 A60,60 0 0,1 60,160" stroke="#40E0D0" stroke-width="2.5" fill="none" opacity="0.25"/>
  </g>

  <!-- Spiralize logo -->
  <g transform="translate(425, 280) scale(2.2)">
    <path d="m 39.82,71.92 q 30,0 30,-30 0,-30 -30,-30 -30,0 -30,30" fill="none" stroke="#ff6f61" stroke-width="8" stroke-linecap="round"/>
    <path d="m 9.82,41.92 q 0,30 30,30" fill="none" stroke="#40e0d0" stroke-width="8" stroke-linecap="round"/>
    <path d="m 39.82,71.92 q 15,0 15,-15 0,-15 -15,-15 -15,0 -15,15" fill="none" stroke="#ffd700" stroke-width="8" stroke-linecap="round"/>
    <path d="m 24.82,56.92 q 0,15 15,15" fill="none" stroke="#7ab55c" stroke-width="8" stroke-linecap="round"/>
    <path d="m 39.82,71.92 q 8,0 8,-8 0,-8 -8,-8 -8,0 -8,8" fill="none" stroke="#ff7f27" stroke-width="8" stroke-linecap="round"/>
    <path d="m 31.82,63.92 q 0,8 8,8" fill="none" stroke="#4a72b2" stroke-width="8" stroke-linecap="round"/>
    <path d="m 39.82,71.92 q 4,0 4,-4 0,-4 -4,-4 -4,0 -4,4" fill="none" stroke="#e25a53" stroke-width="8" stroke-linecap="round"/>
    <path d="m 35.82,67.92 q 0,4 4,4" fill="none" stroke="#9b6b9e" stroke-width="8" stroke-linecap="round"/>
    <circle cx="39.82" cy="71.92" r="4" fill="#e5d0ba"/>
  </g>

  <!-- Title -->
  ${titleLines.map((line, i) => `
  <text x="425" y="${titleStartY + i * 58}" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-weight="bold" text-anchor="middle" fill="#614685">${escapeXml(line)}</text>`).join('')}

  <!-- Subtitle -->
  <text x="425" y="${titleStartY + titleLines.length * 58 + 10}" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-style="italic" text-anchor="middle" fill="#614685" opacity="0.85">${escapeXml(subtitle)}</text>

  <!-- Description -->
  ${description ? `<text x="425" y="${titleStartY + titleLines.length * 58 + 50}" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#614685" opacity="0.7">${escapeXml(description)}</text>` : ''}

  <!-- Divider -->
  <rect x="300" y="770" width="250" height="2.5" fill="url(#accent)" rx="1"/>

  <!-- Author -->
  <text x="425" y="820" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#614685" opacity="0.7">${lang === 'sv' ? 'Av' : 'By'}</text>
  <text x="425" y="852" font-family="Georgia, 'Times New Roman', serif" font-size="26" font-weight="bold" text-anchor="middle" fill="#614685">${escapeXml(author)}</text>
  <text x="425" y="888" font-family="Arial, sans-serif" font-size="17" text-anchor="middle" fill="#614685" opacity="0.7">${escapeXml(aiCredit)}</text>

  <!-- Website -->
  <text x="425" y="960" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#614685" opacity="0.6">${website}</text>
</svg>`;
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if (current && (current + ' ' + word).length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── Cover PDF from SVG ─────────────────────────────────────────────────────

async function createCoverPdf(coverConfig) {
  const svgContent = generateCoverSvg(coverConfig);
  const svgPath = path.join(tempDir, `cover-${coverConfig.lang}.svg`);
  fs.writeFileSync(svgPath, svgContent);

  const pngBuffer = await sharp(svgPath)
    .resize({ width: 850, height: 1100, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([850, 1100]);
  const image = await pdfDoc.embedPng(pngBuffer);
  page.drawImage(image, { x: 0, y: 0, width: 850, height: 1100 });

  return pdfDoc.save();
}

// ─── Content PDF from Markdown ──────────────────────────────────────────────

// Write CSS to a temp file (md-to-pdf expects a file path, not inline CSS)
const cssContent = `
body {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 11pt;
  line-height: 1.65;
  color: #1a1a2e;
}
h1 {
  font-size: 26pt;
  color: #614685;
  margin-top: 2em;
  margin-bottom: 0.5em;
  page-break-after: avoid;
}
h2 {
  font-size: 18pt;
  color: #4a3770;
  margin-top: 1.8em;
  margin-bottom: 0.4em;
  border-bottom: 1px solid #e9e1f9;
  padding-bottom: 0.3em;
  page-break-after: avoid;
}
h3 {
  font-size: 14pt;
  color: #4a3770;
  margin-top: 1.4em;
  margin-bottom: 0.3em;
  page-break-after: avoid;
}
blockquote {
  border-left: 3px solid #9B6B9E;
  padding-left: 1em;
  margin-left: 0;
  color: #555;
  font-style: italic;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5em 0;
  font-size: 10pt;
}
th {
  background-color: #f3eff8;
  color: #4a3770;
  font-weight: bold;
  text-align: left;
  padding: 8px 10px;
  border: 1px solid #d6cce6;
}
td {
  padding: 8px 10px;
  border: 1px solid #e0dae8;
  vertical-align: top;
}
tr:nth-child(even) {
  background-color: #faf8fd;
}
code {
  background: #f5f0fa;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.9em;
}
strong {
  color: #2d1f4e;
}
em {
  color: #555;
}
hr {
  border: none;
  border-top: 1px solid #e0dae8;
  margin: 2em 0;
}
ul, ol {
  padding-left: 1.5em;
}
li {
  margin-bottom: 0.3em;
}
a {
  color: #7c3aed;
  text-decoration: none;
}
`;

const cssPath = path.join(tempDir, 'pdf-styles.css');
fs.writeFileSync(cssPath, cssContent);

async function createContentPdf(markdownPath) {
  const markdown = fs.readFileSync(markdownPath, 'utf-8');

  const result = await mdToPdf(
    { content: markdown },
    {
      pdf_options: {
        format: 'A4',
        margin: { top: '2.2cm', bottom: '2.2cm', left: '2.4cm', right: '2.4cm' },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
          <div style="width: 100%; text-align: center; font-size: 9px; color: #999; padding: 0 2cm;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        `
      },
      stylesheet_paths: [cssPath],
      marked_options: {
        smartypants: true
      },
      launch_options: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: 'new',
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
      }
    }
  );

  return result.content; // Buffer
}

// ─── Merge cover + content ──────────────────────────────────────────────────

async function mergePdfs(coverBytes, contentBytes) {
  const coverPdf = await PDFDocument.load(coverBytes);
  const contentPdf = await PDFDocument.load(contentBytes);
  const merged = await PDFDocument.create();

  const coverPages = await merged.copyPages(coverPdf, coverPdf.getPageIndices());
  coverPages.forEach(p => merged.addPage(p));

  const contentPages = await merged.copyPages(contentPdf, contentPdf.getPageIndices());
  contentPages.forEach(p => merged.addPage(p));

  return merged.save();
}

// ─── Document definitions ───────────────────────────────────────────────────

const documents = [
  {
    id: 'protocol',
    filename: 'tier-2-meeting-protocol',
    covers: {
      en: {
        title: 'Meeting and Deciding at Tier 2',
        subtitle: 'A Protocol for Integrative Coordination',
        description: 'Yellow/Turquoise decision-making — and how to include everyone on the spiral',
        lang: 'en'
      },
      sv: {
        title: 'Möten och beslut på Tier 2',
        subtitle: 'Ett protokoll för integrativ koordinering',
        description: 'Yellow/Turquoise-beslutsfattande — och hur man inkluderar alla på spiralen',
        lang: 'sv'
      }
    }
  },
  {
    id: 'appendix',
    filename: 'appendix-difficult-questions',
    covers: {
      en: {
        title: 'Difficult Questions for Tier 2 Meetings',
        subtitle: 'Appendix: Questions organized by which stage they challenge',
        description: 'A companion to the Tier 2 Meeting Protocol',
        lang: 'en'
      },
      sv: {
        title: 'Svåra frågor för Tier 2-möten',
        subtitle: 'Bilaga: Frågor ordnade efter vilket stadium de utmanar',
        description: 'En bilaga till Tier 2-mötesprotokollet',
        lang: 'sv'
      }
    }
  }
];

// ─── Main ───────────────────────────────────────────────────────────────────

async function generateAll() {
  console.log('Generating Tier 2 Meeting Protocol PDFs...\n');

  for (const doc of documents) {
    for (const lang of ['en', 'sv']) {
      const label = `${doc.id} (${lang})`;
      console.log(`── ${label} ──`);

      // Resolve markdown file: try lang-suffixed first, fall back to base
      const langMdPath = path.join(guidesDir, `${doc.filename}.sv.md`);
      const baseMdPath = path.join(guidesDir, `${doc.filename}.md`);

      let mdPath;
      if (lang === 'sv' && fs.existsSync(langMdPath)) {
        mdPath = langMdPath;
      } else if (lang === 'en' && fs.existsSync(baseMdPath)) {
        mdPath = baseMdPath;
      } else if (fs.existsSync(baseMdPath)) {
        console.warn(`  ⚠ Swedish markdown not found, falling back to English`);
        mdPath = baseMdPath;
      } else {
        console.error(`  ✗ No markdown found for ${doc.filename}, skipping`);
        continue;
      }

      console.log(`  → markdown: ${path.basename(mdPath)}`);

      // Generate cover
      console.log('  → generating cover...');
      const coverBytes = await createCoverPdf(doc.covers[lang]);

      // Generate content
      console.log('  → rendering content...');
      const contentBytes = await createContentPdf(mdPath);

      // Merge
      console.log('  → merging...');
      const finalBytes = await mergePdfs(coverBytes, contentBytes);

      // Write output
      const outputFilename = `${doc.filename}.${lang}.pdf`;
      const outputPath = path.join(guidesDir, outputFilename);
      fs.writeFileSync(outputPath, finalBytes);
      console.log(`  ✓ ${outputFilename}\n`);
    }
  }

  // Cleanup temp
  if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach(f => fs.unlinkSync(path.join(tempDir, f)));
    fs.rmdirSync(tempDir);
  }

  console.log('✅ All PDFs generated in static/content/guides/meeting/');
}

generateAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
