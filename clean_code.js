const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');
const originalLen = html.length;

// 1. Remover Style 5 duplicado
html = html.replace(/<style id="kcl-final-polish">[\s\S]*?<\/style>/i, '');

// 2. No Style 3: remover regras do botão flutuante #kcl-admin-float-btn que não existe mais
html = html.replace(/\/\* BOTÃO FLUTUANTE DISCRETO DE ACESSO AO ADMIN PARA NUNCA SUMIR \*\/[\s\S]*?#kcl-admin-float-btn:hover\s*\{[\s\S]*?\}/i, '');

// 3. Garantir limpeza de qualquer elemento fantasma com kcl-admin-launcher ou kcl-admin-float-btn no body
html = html.replace(/<[^>]*id="kcl-admin-launcher"[^>]*>[\s\S]*?<\/[^>]+>/gi, '');
html = html.replace(/<[^>]*id="kcl-admin-float-btn"[^>]*>[\s\S]*?<\/[^>]+>/gi, '');

// 4. Salvar dist/index.html e index.html
fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');

console.log('Clean complete. Original size:', originalLen, '-> New size:', html.length);
