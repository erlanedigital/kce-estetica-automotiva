const fs = require('fs');
const content = fs.readFileSync('C:/Users/ERLANE/.gemini/antigravity/scratch/kce-estetica-automotiva/index.html', 'utf8');

function printDetailed(name, startStr, endStr) {
  const start = content.indexOf(startStr);
  if (start === -1) {
    console.log('NOT FOUND start:', startStr);
    return;
  }
  const end = content.indexOf(endStr, start);
  if (end === -1) {
    console.log('NOT FOUND end:', endStr);
    return;
  }
  console.log('=== ' + name + ' ===');
  console.log(content.substring(start, end + endStr.length));
  console.log('\n');
}

printDetailed('RANKING SECTION', 'Nenhuma corrida salva ainda', 'voltas"]})]},d))})]}),');
printDetailed('PASSOS SECTION', 'id:"passos"', 'children:"Lava-jato KCL • espuma, cuidado e brilho"})]}),l("div"');
printDetailed('PASSOS HEADING', 'children:"Lava-jato KCL • espuma, cuidado e brilho"})]}),l("div"', 'text-[11px] font-bold tracking-[.3em]');
printDetailed('AGENDAR LEFT DETAIL', 'id:"agendar"', 'children:"Agende online"');
printDetailed('LOCALIZACAO FULL', 'id:"localizacao"', 'mapa oficial de Montes Claros');
printDetailed('EXPERIENCIA FULL', 'id:"experiencia"', 'id:"passos"');
