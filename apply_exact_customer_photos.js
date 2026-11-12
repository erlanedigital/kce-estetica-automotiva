const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva';
const uploadedDir = 'C:/Users/ERLANE/.gemini/antigravity/brain/fab712c2-e4c4-4138-8749-363b88fd6baf/.user_uploaded';

const dirtyImgPath = path.join(uploadedDir, 'media_1794450463486_83e25898.webp'); // CARRO SUJO
const cleanImgPath = path.join(uploadedDir, 'media_1794450457497_e2c4c8ae.webp'); // CARRO LIMPO

console.log('--- COPIANDO AS FOTOS REAIS DO CLIENTE ---');
const assetsDir = path.join(projectDir, 'assets');
const distAssetsDir = path.join(projectDir, 'dist', 'assets');

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
if (!fs.existsSync(distAssetsDir)) fs.mkdirSync(distAssetsDir, { recursive: true });

fs.copyFileSync(dirtyImgPath, path.join(assetsDir, 'carro_antes_sujo.webp'));
fs.copyFileSync(dirtyImgPath, path.join(distAssetsDir, 'carro_antes_sujo.webp'));

fs.copyFileSync(cleanImgPath, path.join(assetsDir, 'carro_depois_limpo.webp'));
fs.copyFileSync(cleanImgPath, path.join(distAssetsDir, 'carro_depois_limpo.webp'));

console.log('✓ Arquivos copiados para assets/ e dist/assets/ com sucesso!');

// Converter para Base64 Data URI para garantir 100% de estabilidade
const dirtyBase64 = 'data:image/webp;base64,' + fs.readFileSync(dirtyImgPath).toString('base64');
const cleanBase64 = 'data:image/webp;base64,' + fs.readFileSync(cleanImgPath).toString('base64');

console.log('Dirty base64 length:', dirtyBase64.length);
console.log('Clean base64 length:', cleanBase64.length);

const htmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Substituir as variáveis xv e jv
// Atualmente: var xv="..."; var jv="...";
const xvRegex = /var\s+xv\s*=\s*["'][^"']+["'];/;
const jvRegex = /var\s+jv\s*=\s*["'][^"']+["'];/;

if (xvRegex.test(html)) {
    html = html.replace(xvRegex, `var xv="${dirtyBase64}";`);
    console.log('✓ xv atualizado com a foto REAL do carro sujo fornecida pelo cliente!');
} else {
    console.error('❌ xvRegex não encontrado!');
}

if (jvRegex.test(html)) {
    html = html.replace(jvRegex, `var jv="${cleanBase64}";`);
    console.log('✓ jv atualizado com a foto REAL do carro limpo fornecida pelo cliente!');
} else {
    console.error('❌ jvRegex não encontrado!');
}

// Remover filtros artificiais de cor que eram usados anteriormente na imagem do antes
// Ex: contrast-[0.75] brightness-[0.70] saturate-[0.45] sepia-[0.35]
html = html.replace(/filter contrast-\[0\.75\] brightness-\[0\.70\] saturate-\[0\.45\] sepia-\[0\.35\]/g, 'filter-none');
html = html.replace(/filter brightness-\[1\.12\] contrast-\[1\.15\] saturate-\[1\.2\]/g, 'filter-none');

// Remover a camada marrom de blend artificial
html = html.replace(/bg-amber-950\/25 mix-blend-multiply/g, 'hidden');

// Atualizar as legendas para a realidade do carro (Sedan KLP-2198)
html = html.replace(
    'Barro & terra pesada • poeira de estrada • pintura sem brilho',
    'Poeira pesada • terra acumulada • pintura opaca antes da estética KCL'
);
html = html.replace(
    'Vitrificação KCL • brilho espelhado • pintura protegida',
    'Lavagem técnica detalhada KCL • pintura limpa e espelhada'
);

// Validar sintaxe de todos os scripts
const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
let count = 0;
let allValid = true;
while ((m = scriptRegex.exec(html)) !== null) {
    const attrs = m[1];
    const code = m[2];
    if (!attrs.includes('json')) {
        try {
            new Function(code);
            console.log(`Script ${count}: Syntax OK`);
        } catch(e) {
            console.error(`❌ Script ${count} ERRO:`, e.message);
            allValid = false;
        }
    } else {
        try {
            JSON.parse(code);
            console.log(`Script ${count}: JSON OK`);
        } catch(e) {
            console.error(`❌ Script ${count} JSON ERRO:`, e.message);
            allValid = false;
        }
    }
    count++;
}

if (allValid) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    const distHtml = path.join(projectDir, 'dist', 'index.html');
    fs.writeFileSync(distHtml, html, 'utf8');
    console.log('🎉 SUCESSO! Antes e depois atualizado com as fotos reais exatas enviadas pelo cliente!');
} else {
    console.error('⛔ Gravação cancelada devido a erro de sintaxe.');
    process.exit(1);
}
