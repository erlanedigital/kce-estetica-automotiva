const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const scriptTags = html.match(/<script[\s\S]*?<\/script>/gi) || [];
const s6 = scriptTags[5].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');

// Vamos encontrar a posição exata por busca binária ou avaliando blocos
console.log('Tamanho do script 6:', s6.length);

// Procurar onde tem vírgula isolada ou sintaxe quebrada
// Vamos testar partes do script com new Function
let start = 0;
let end = s6.length;

// Vamos dividir em linhas
const lines = s6.split('\n');
console.log('Total de linhas:', lines.length);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('Unexpected token') || line.includes('aureonDashboard')) {
    console.log('Linha suspeita:', i + 1, line.slice(0, 100));
  }
}

// Vamos tentar analisar com Acorn se estiver instalado no node_modules
try {
  const acorn = require('acorn');
  acorn.parse(s6, { ecmaVersion: 2022, sourceType: 'module' });
  console.log('Acorn: sem erros!');
} catch (e) {
  console.log('ACORN ERRO:', e.message, 'na posição:', e.pos, 'linha:', e.loc);
  if (e.pos) {
    console.log('--- ENTORNO DO ERRO NO SCRIPT 6 ---');
    console.log(s6.slice(Math.max(0, e.pos - 150), e.pos + 150));
  }
}
