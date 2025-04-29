// scripts/copy-content-files.mjs
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Create content directories if they don't exist
fs.ensureDirSync(path.join(rootDir, 'static', 'content', 'examples', 'en'));
fs.ensureDirSync(path.join(rootDir, 'static', 'content', 'examples', 'sv'));

// Copy content files to static directory
if (fs.existsSync(path.join(rootDir, 'src', 'lib', 'content'))) {
  console.log('Copying content files to static directory...');
  fs.copySync(
    path.join(rootDir, 'src', 'lib', 'content'),
    path.join(rootDir, 'static', 'content')
  );
  console.log('Content files copied successfully.');
} else {
  console.log('No content directory found. Skipping content file copy.');
}
