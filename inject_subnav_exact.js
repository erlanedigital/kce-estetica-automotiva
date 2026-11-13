const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

const target = `r("a",{href:"#corrida",children:"Corrida"}),r("a",{href:"#agendar",children:"Agendar"})]})]})]}),l("main",{id:"top"`;

const subNavJSX = `l("nav",{className:"kcl-subnav-bar mx-auto mt-2 sm:mt-2.5 flex max-w-6xl items-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap px-3 py-1.5 text-[11px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#93A3BC]",children:[
  r("a",{href:"#servicos",className:"kcl-subnav-item",children:"Serviços"}),
  r("a",{href:"#experiencia",className:"kcl-subnav-item",children:"Experiência"}),
  r("a",{href:"#galeria",className:"kcl-subnav-item",children:"Galeria"}),
  r("a",{href:"#pacotes",className:"kcl-subnav-item",children:"Pacotes"}),
  r("a",{href:"#localizacao",className:"kcl-subnav-item",children:"Localização"}),
  r("a",{href:"#corrida",className:"kcl-subnav-item",children:"Corrida"}),
  r("a",{href:"#agendar",className:"kcl-subnav-item !text-[#2F9BFF]",children:"Agendar"})
]})`;

const replacement = `r("a",{href:"#corrida",children:"Corrida"}),r("a",{href:"#agendar",children:"Agendar"})]})]})],${subNavJSX}),l("main",{id:"top"`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  console.log('Successfully injected kcl-subnav-bar into header container!');
} else {
  console.log('Target not found!');
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved to dist/index.html and index.html!');
