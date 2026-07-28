const fs = require('fs');
const content = fs.readFileSync('src/components/Gallery.tsx', 'utf-8');
const newContent = content.replace(
  /return \[\n\s*`\/gallerie_\$\{num\}\.jpg`,\n\s*`\/gallerie_\$\{num\}\.jpeg`,\n\s*`\/gallérie\.jpg  \(\$\{num\}\)\.jpeg`,\n\s*img\.src\n\s*\];/g,
  `return [\n        \`/gallerie_\${num}.jpg\`,\n        \`/gallerie_\${num}.jpeg\`,\n        \`/gallérie.jpg  (\${num}).jpeg\`,\n        img.src,\n        // Fallback to high-quality unsplash medical images if local files are corrupted\n        \`https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80\`,\n        \`https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80\`\n      ];`
);
fs.writeFileSync('src/components/Gallery.tsx', newContent);
console.log('patched');
