const fs = require('fs');
const path = require('path');

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// Copy icons
copyDir('src/icons', 'build/icons');

// Copy manifest
copyFile('src/manifest-chrome.json', 'build/manifest.json');

// Copy options.html
copyFile('src/options/options.html', 'build/options.html');

// Copy assets icons
['icon16.png', 'icon32.png', 'icon48.png', 'icon64.png', 'icon128.png'].forEach(icon =>
  copyFile(`assets/${icon}`, `build/${icon}`)
);

console.log('Assets copied successfully.');