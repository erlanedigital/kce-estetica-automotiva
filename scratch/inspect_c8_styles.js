const { execSync } = require('child_process');
const fs = require('fs');

const htmlC8 = execSync('git show c849b49:index.html', { cwd: 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva', maxBuffer: 50*1024*1024 }).toString();
const styles = htmlC8.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];

styles.forEach((st, idx) => {
  console.log(`=== C849B49 STYLE ${idx} (len: ${st.length}) ===`);
  console.log(st.substring(0, 800));
  console.log('...\n', st.substring(st.length - 800));
});
