const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const p1 = html.indexOf('catch{}return[{id:"pt-1"');
const p1End = html.indexOf(']}', p1);
console.log('p1 full:', html.substring(p1, p1End + 2));

const p2 = html.indexOf('localStorage.setItem("kce_seeded_team"');
const p2End = html.indexOf('await Promise.all(Q.map', p2);
const p2EndFull = html.indexOf(')))', p2End);
console.log('p2 full:', html.substring(p2, p2EndFull + 3));

const p3 = html.indexOf('if(!u?.records?.length){let zn=[');
const p3End = html.indexOf('await Promise.all(zn.map', p3);
const p3EndFull = html.indexOf(')))', p3End);
console.log('p3 full:', html.substring(p3, p3EndFull + 4));
