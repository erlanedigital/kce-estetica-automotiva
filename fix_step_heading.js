const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// Ajustar a tag h2 da seção dos 3 passos:
// Atual:
// r("h2",{className:"font-display font-extrabold text-[44px] sm:text-[62px] lg:text-[72px] leading-[0.98] tracking-tight mt-3 text-left",children:r(kf,{parts:[{text:"Três passos e zero "},{text:"estresse.",elegant:!0,elegantClass:"font-elegant text-[#2F9BFF]"}]})})

const oldPattern = /r\("h2",\{className:"font-display font-extrabold text-\[44px\] sm:text-\[62px\] lg:text-\[72px\] leading-\[0\.98\] tracking-tight mt-3 text-left",children:r\(kf,\{parts:\[\{text:"Três passos e zero "\},\{text:"estresse\.",elegant:!0,elegantClass:"font-elegant text-\[#2F9BFF\]"\}\]\}\)\}\)/;

const newH2 = 'r("h2",{className:"font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] leading-tight tracking-tight mt-3 text-left whitespace-normal sm:whitespace-nowrap",children:r(kf,{parts:[{text:"Três passos e zero "},{text:"estresse.",elegant:!0,elegantClass:"font-elegant text-[#2F9BFF]"}]})})';

if (oldPattern.test(html)) {
  html = html.replace(oldPattern, newH2);
  console.log('✓ H2 atualizado com sucesso com classes responsivas e proporcionais!');
} else {
  console.log('Old pattern não deu match direto, testando string replacement...');
  const target = 'leading-[0.98] tracking-tight mt-3 text-left",children:r(kf,{parts:[{text:"Três passos e zero "},{text:"estresse.",elegant:!0,elegantClass:"font-elegant text-[#2F9BFF]"}]})';
  const repl = 'leading-tight tracking-tight mt-3 text-left whitespace-normal sm:whitespace-nowrap",children:r(kf,{parts:[{text:"Três passos e zero "},{text:"estresse.",elegant:!0,elegantClass:"font-elegant text-[#2F9BFF]"}]})';
  if (html.includes(target)) {
    html = html.replace('text-[44px] sm:text-[62px] lg:text-[72px] ' + target, 'text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] ' + repl);
    console.log('✓ Substituído via string com sucesso!');
  }
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Salvo com sucesso.');
