const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'assets', 'theme');

function getRelativePath(from, to) {
  const relative = path.relative(path.dirname(from), to);
  return relative.startsWith('.') ? relative : './' + relative;
}

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileDir = path.dirname(filePath);
  
  // Replace all "assets/theme/..." imports
  content = content.replace(/from\s+["']assets\/theme\/([^"']+)["']/g, (match, importPath) => {
    const targetPath = path.join(baseDir, importPath);
    const relativePath = getRelativePath(filePath, targetPath);
    return `from "${relativePath.replace(/\\/g, '/')}"`;
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${filePath}`);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.js')) {
      fixImportsInFile(filePath);
    }
  });
}

processDirectory(baseDir);
console.log('All imports fixed!');