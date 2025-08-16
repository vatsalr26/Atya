const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'static');

// Find all HTML files
const htmlFiles = [];
function findHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}

findHtmlFiles(htmlDir);

// Update each HTML file
for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if the file imports api.js but not config.js before it
  if (content.includes('api.js') && !content.includes('config.js')) {
    content = content.replace(
      /(<script[^>]*src=["']js\/api\.js["'][^>]*>)/,
      '<script src="js/config.js"></script>\n    $1'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
}

console.log('Update complete!');
