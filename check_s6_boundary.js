const fs = require('fs');
let html = fs.readFileSync('dist/index.html', 'utf8');

const s6Tag = '<script type="module">';
const s6Idx = html.indexOf(s6Tag);
console.log('s6Idx:', s6Idx);

const nextScriptEnd = html.indexOf('</script>', s6Idx);
console.log('nextScriptEnd:', nextScriptEnd);

console.log('Around nextScriptEnd (-80 a +80):');
console.log(JSON.stringify(html.slice(nextScriptEnd - 80, nextScriptEnd + 80)));
