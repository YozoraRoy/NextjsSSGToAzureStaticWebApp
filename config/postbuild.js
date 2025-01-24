const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../'); 
console.log(outputDir)

const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Redirecting...</title>    
  </head>
  <body>
      <p>Redirecting based on your language settings...</p>
  </body>
  </html>
`;
 
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}


fs.writeFileSync(path.join(outputDir, 'index.html'), htmlContent, 'utf8');
console.log('HTML file generated at out/index.html');
