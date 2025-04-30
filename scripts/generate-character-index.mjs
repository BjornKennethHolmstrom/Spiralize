// scripts/generate-character-index.mjs
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Paths for character content
const srcContentDir = path.join(rootDir, 'src', 'lib', 'content', 'gallery');
const targetContentDir = path.join(rootDir, 'static', 'content', 'gallery');

// Make sure target directories exist
fs.ensureDirSync(path.join(targetContentDir, 'en'));
fs.ensureDirSync(path.join(targetContentDir, 'sv'));

// Generate index for each language
function generateIndex(languageDir, language) {
  // Read all .md files in the language directory
  try {
    const files = fs.readdirSync(languageDir)
      .filter(file => file.endsWith('.md') && file !== 'index.md');
    
    // Write the index.json file
    const indexPath = path.join(targetContentDir, language, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(files, null, 2));
    
    console.log(`Generated ${language} character index with ${files.length} characters`);
    return files;
  } catch (error) {
    console.error(`Error generating index for ${language}:`, error);
    return [];
  }
}

// Main function to copy files and generate indexes
function processCharacterFiles() {
  // Create target directories if they don't exist
  fs.ensureDirSync(targetContentDir);
  fs.ensureDirSync(path.join(targetContentDir, 'en'));
  fs.ensureDirSync(path.join(targetContentDir, 'sv'));
  
  // Check if source directory exists
  if (!fs.existsSync(srcContentDir)) {
    console.log('Source directory for character gallery does not exist, creating...');
    fs.ensureDirSync(srcContentDir);
    fs.ensureDirSync(path.join(srcContentDir, 'en'));
    fs.ensureDirSync(path.join(srcContentDir, 'sv'));
    return;
  }
  
  // Copy files for English
  if (fs.existsSync(path.join(srcContentDir, 'en'))) {
    fs.copySync(
      path.join(srcContentDir, 'en'),
      path.join(targetContentDir, 'en')
    );
    const enFiles = generateIndex(path.join(srcContentDir, 'en'), 'en');
    console.log(`Copied ${enFiles.length} English character files`);
  } else {
    console.log('No English character directory found. Creating empty one.');
    fs.ensureDirSync(path.join(srcContentDir, 'en'));
  }
  
  // Copy files for Swedish
  if (fs.existsSync(path.join(srcContentDir, 'sv'))) {
    fs.copySync(
      path.join(srcContentDir, 'sv'),
      path.join(targetContentDir, 'sv')
    );
    const svFiles = generateIndex(path.join(srcContentDir, 'sv'), 'sv');
    console.log(`Copied ${svFiles.length} Swedish character files`);
  } else {
    console.log('No Swedish character directory found. Creating empty one.');
    fs.ensureDirSync(path.join(srcContentDir, 'sv'));
  }
  
  console.log('Character gallery processing complete.');
}

// Execute the main function
processCharacterFiles();
