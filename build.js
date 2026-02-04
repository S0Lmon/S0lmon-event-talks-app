const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf-8');
const js = fs.readFileSync(path.join(srcDir, 'scripts.js'), 'utf-8');
const talks = fs.readFileSync(path.join(srcDir, 'talks.json'), 'utf-8');

const finalJs = js.replace("'%%TALKS_DATA%%'", talks);

const finalHtml = html
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  .replace('<script src="scripts.js"></script>', `<script>${finalJs}</script>`);

fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);

console.log('Website built successfully!');
