const fs = require('fs');
const vm = require('vm');

const indexPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html';
const distPath = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/dist/index.html';

let html = fs.readFileSync(indexPath, 'utf8');

const target = `let c=(d)=>{if(d.key==="ArrowLeft"||d.key==="a"||d.key==="A")d.preventDefault(),Wf(-1);if(d.key==="ArrowRight"||d.key==="d"||d.key==="D")d.preventDefault(),Wf(1);if(d.key===" "){if(d.preventDefault(),!re.current.running&&!re.current.over)Lr()}};`;

const replacement = `let c=(d)=>{let tg=(d.target&&d.target.tagName)?d.target.tagName.toLowerCase():"";if(tg==="input"||tg==="textarea"||tg==="select"||(d.target&&d.target.isContentEditable))return;if(d.key==="ArrowLeft"||d.key==="a"||d.key==="A"){if(re.current.running){d.preventDefault();Wf(-1)}}if(d.key==="ArrowRight"||d.key==="d"||d.key==="D"){if(re.current.running){d.preventDefault();Wf(1)}}if(d.key===" "){if(!re.current.running&&!re.current.over&&we.trim()){d.preventDefault();Lr()}}};`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  console.log('Successfully replaced keydown handler!');
} else {
  console.error('Target keydown handler NOT found!');
  process.exit(1);
}

// Bump PWA version to force refresh
html = html.replace(/kcl-pwa-v\d+/g, 'kcl-pwa-v57');

// Validate script syntax
const scriptMatches = html.match(/<script(?![^>]*type=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Validating', scriptMatches.length, 'script blocks with vm.Script...');
scriptMatches.forEach((s, idx) => {
  const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
  try {
    new vm.Script(code);
  } catch (err) {
    console.error('SYNTAX ERROR in script block', idx, err.message);
    process.exit(1);
  }
});
console.log('ALL script blocks passed syntax validation!');

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(distPath, html, 'utf8');

// Also bump sw.js
['C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/sw.js', 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/dist/sw.js'].forEach(f => {
  if (fs.existsSync(f)) {
    let sw = fs.readFileSync(f, 'utf8');
    sw = sw.replace(/kcl-pwa-v\d+/g, 'kcl-pwa-v57');
    fs.writeFileSync(f, sw, 'utf8');
    console.log('Bumped SW cache version to v57 in', f);
  }
});

console.log('Done fixing keyboard input blocking!');
