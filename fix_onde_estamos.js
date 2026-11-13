const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// Título "Onde estamos em Montes Claros." em UMA LINHA SÓ sem quebra e sem palavra órfã
// Atual:
// r("h2",{className:"font-display font-extrabold text-[43px] sm:text-[53px] tracking-tight mt-3",children:r(kf,{parts:[{text:"Onde estamos",breakAfter:!0},{text:"em Montes Claros.",elegant:!0}]})})

const targetOnde = 'r("h2",{className:"font-display font-extrabold text-[43px] sm:text-[53px] tracking-tight mt-3",children:r(kf,{parts:[{text:"Onde estamos",breakAfter:!0},{text:"em Montes Claros.",elegant:!0}]})})';

// Nova versão: whitespace-nowrap, fonte proporcional, em UMA linha contínua
const replOnde = 'r("h2",{className:"font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[46px] tracking-tight mt-3 whitespace-normal sm:whitespace-nowrap",children:r(kf,{parts:[{text:"Onde estamos em "},{text:"Montes Claros.",elegant:!0}]})})';

if (html.includes(targetOnde)) {
    html = html.replace(targetOnde, replOnde);
    console.log('✓ "Onde estamos em Montes Claros." colocado em UMA linha só sem quebra!');
} else {
    console.log('Target não encontrado exato, buscando via regex...');
    const m = html.match(/r\("h2",\{className:"font-display font-extrabold[^"]*mt-3",children:r\(kf,\{parts:\[\{text:"Onde estamos"[^}]*\},\{text:"em Montes Claros\."[^}]*\}\]\}\)\}\)/);
    if (m) {
        html = html.replace(m[0], replOnde);
        console.log('✓ Substituído via regex!');
    }
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Arquivos salvos.');
