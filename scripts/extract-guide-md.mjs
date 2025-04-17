import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import sharp from 'sharp';
import { visit } from 'unist-util-visit';

const contentDir = 'src/lib/content';
const outputDir = 'static/guide';
const mdFilePath = path.join(contentDir, 'guide.md');
const outputJsonPath = path.join(contentDir, 'guide-structured.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const markdown = fs.readFileSync(mdFilePath, 'utf-8');
const { content } = matter(markdown);

const processor = unified().use(remarkParse).use(remarkStringify);
const tree = processor.parse(content);

const svgToPng = async (svgPath, pngPath) => {
  const inputBuffer = fs.readFileSync(svgPath);
  await sharp(inputBuffer)
    .png()
    .resize({ width: 1200 })
    .toFile(pngPath);
};

// Process image nodes
visit(tree, 'image', (node) => {
  if (node.url.endsWith('.svg')) {
    const svgFilename = path.basename(node.url);
    const pngFilename = svgFilename.replace(/\.svg$/, '.png');

    const svgPath = path.resolve(outputDir, svgFilename);
    const pngPath = path.resolve(outputDir, pngFilename);

    if (fs.existsSync(svgPath)) {
      svgToPng(svgPath, pngPath).then(() => {
        console.log(`Converted ${svgFilename} → ${pngFilename}`);
      }).catch(console.error);
    } else {
      console.warn(`SVG file not found: ${svgPath}`);
    }

    // Update reference in AST
    node.url = pngFilename;
  }
});

const transformedMarkdown = processor.stringify(tree);

const sections = transformedMarkdown
  .split(/^### /m)
  .map((section, index) => {
    if (index === 0) return null;
    const [titleLine, ...rest] = section.split('\n');
    const title = titleLine.trim();
    const body = rest.join('\n').trim();
    return { title, body };
  })
  .filter(Boolean);

fs.writeFileSync(outputJsonPath, JSON.stringify(sections, null, 2));
console.log(`Structured content written to ${outputJsonPath}`);
