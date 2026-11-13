const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. TÍTULO: "Onde estamos" em cima, e "em Montes Claros." embaixo, tudo em uma linha só cada!
// Atualmente o título quebra "Montes" na primeira linha e "Claros." na segunda (como na primeira imagem enviada).
// Queremos:
// Linha 1: "Onde estamos"
// Linha 2: "em Montes Claros." (tudo em uma linha só, sem quebrar Montes e Claros)
// Para garantir isso no CSS e JSX:
// Usamos whitespace-nowrap na segunda linha ou formatamos em 2 blocos limpos.

// 2. ENDEREÇO: "Rua Belo Horizonte, 80 — Bairro São José" em cima e "Montes Claros - MG" embaixo (tudo em uma linha só, sem quebrar Montes na primeira linha!)
// Conforme a segunda imagem enviada:
// Estava: "Rua Belo Horizonte, 80 — Bairro São José, Montes" e "Claros - MG" quebrado embaixo.
// Deve ficar:
// Linha 1: "Rua Belo Horizonte, 80 — Bairro São José"
// Linha 2: "Montes Claros - MG"

console.log('Buscando ocorrências para ajuste visual de quebras de linha...');

// Ajuste do Endereço
const targetAddr = 'Rua Belo Horizonte, 80 — Bairro São José, Montes Claros - MG';
if (html.includes(targetAddr)) {
  console.log('Encontrado targetAddr exato!');
  html = html.replace(targetAddr, 'Rua Belo Horizonte, 80 — Bairro São José\\nMontes Claros - MG');
} else {
  // Substitui no JSX onde monta o endereço
  html = html.replace(
    /Rua Belo Horizonte,\s*80\s*—\s*Bairro São José,\s*Montes Claros - MG/g,
    'Rua Belo Horizonte, 80 — Bairro São José<br>Montes Claros - MG'
  );
}

// Vamos adicionar uma regra no <style> para garantir que tanto o título quanto o endereço nunca quebrem palavras órfãs
const typographyStyles = `
<style>
  /* FORÇAR DIAGRAMAÇÃO PERFEITA EM DUAS LINHAS SEM PALAVRAS ÓRFÃS */
  .title-onde-estamos {
    display: block !important;
  }
  .title-montes-claros {
    display: block !important;
    white-space: nowrap !important;
  }
  .address-line-1 {
    display: block !important;
    white-space: nowrap !important;
  }
  .address-line-2 {
    display: block !important;
    white-space: nowrap !important;
    color: #2F9BFF !important;
  }
</style>
`;

if (!html.includes('FORÇAR DIAGRAMAÇÃO PERFEITA EM DUAS LINHAS SEM PALAVRAS ÓRFÃS')) {
  html = html.replace('</head>', typographyStyles + '\n</head>');
}

// Ajustar o título "Onde estamos em Montes Claros." no script
// Procurar no script module
html = html.replace(
  /parts:\[\{text:"Onde estamos em "\},\{text:"Montes Claros\.",elegant:!0\}\]/g,
  'parts:[{text:"Onde estamos",block:!0},{text:"em Montes Claros.",elegant:!0,nowrap:!0}]'
);

// Salvar no dist e na raiz
fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');

console.log('Ajuste de quebras de linha concluído com sucesso!');
