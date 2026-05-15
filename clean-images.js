const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'images');
function walk(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const base = entry.name;
      if (['.js', '.css', '.html'].includes(ext) || base.startsWith('._')) {
        try {
          fs.unlinkSync(full);
          console.log('Deleted', full);
        } catch (e) {
          console.warn('Failed', full, e.message);
        }
      }
    }
  }
}
walk(root);
