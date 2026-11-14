const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. FIX MARQUEE KEYFRAMES IN CSS
const oldMarqueeCss = `@keyframes marquee{
  to{
    transform:translateX(-50%)
  }
}

.marquee-track{
  display:flex;
  width:-moz-max-content;
  width:max-content;
  animation:marquee 26s linear infinite
}`;

const newMarqueeCss = `@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

@-webkit-keyframes marquee {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-50%, 0, 0);
  }
}

.marquee-track {
  display: flex !important;
  width: max-content !important;
  min-width: 200% !important;
  will-change: transform !important;
  animation: marquee 24s linear infinite !important;
  -webkit-animation: marquee 24s linear infinite !important;
}`;

if (html.includes(oldMarqueeCss)) {
  html = html.replace(oldMarqueeCss, newMarqueeCss);
  console.log('✓ Replaced marquee CSS keyframes.');
} else {
  console.log('Old marquee CSS not matched exactly, replacing via regex.');
  html = html.replace(/@keyframes marquee\{[\s\S]*?\.marquee-track\{[\s\S]*?\}/, newMarqueeCss);
}

// 2. FIX MARQUEE MARKUP IN REACT (8 SPANS FOR SEAMLESS 100% FULL-WIDTH CONTINUOUS ROTATION)
const oldMarqueeMarkup = 'l("div",{className:"marquee-track font-bold tracking-[.28em] text-[13px] text-[#C8D0DA]",children:[r("span",{className:"pr-4 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "}),r("span",{className:"pr-4 whitespace-nowrap",children:"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "})]})';

const newMarqueeMarkup = 'l("div",{className:"marquee-track font-bold tracking-[.28em] text-[13px] sm:text-[14px] text-[#C8D0DA]",children:Array.from({length:8}).map((_,idx)=>r("span",{key:idx,className:"pr-8 shrink-0 whitespace-nowrap"},"LAVAGEM • ESPUMA • HIGIENIZAÇÃO • POLIMENTO • VITRIFICAÇÃO •  "))})';

if (html.includes(oldMarqueeMarkup)) {
  html = html.replace(oldMarqueeMarkup, newMarqueeMarkup);
  console.log('✓ Replaced marquee markup with 8 continuous spans.');
} else {
  console.log('Old marquee markup not found exact, searching...');
  const pM = html.indexOf('className:"marquee-track');
  if (pM !== -1) {
    const pEnd = html.indexOf(']})})', pM);
    const targetSlice = html.substring(pM - 8, pEnd + 1);
    html = html.replace(targetSlice, newMarqueeMarkup);
    console.log('✓ Replaced marquee markup via slice.');
  }
}

// 3. FIX SCROLL EFFECT IN REACT (INSTANT FLUID DRIVE ON VIEWPORT ENTRY)
const oldScrollHandler = 'if(e(window.scrollY),Vf.current){let d=Vf.current.getBoundingClientRect();if(window.innerWidth<=768){let start=window.innerHeight*0.78,span=Math.max(220,window.innerHeight*0.62);_7(Math.max(0,Math.min(1,(start-d.top)/span)))}else{let _=Math.max(1,d.height-window.innerHeight);_7(Math.max(0,Math.min(1,-d.top/_)))}}}';

const newScrollHandler = 'if(e(window.scrollY),Vf.current){let d=Vf.current.getBoundingClientRect();let winH=window.innerHeight;let start=winH*0.82;let span=Math.max(100,d.height+winH*0.25);let prog=(start-d.top)/span;_7(Math.max(0,Math.min(1,prog)))}';

if (html.includes(oldScrollHandler)) {
  html = html.replace(oldScrollHandler, newScrollHandler);
  console.log('✓ Replaced scroll handler with fluid entry calculation.');
} else {
  console.log('Old scroll handler not matched exact.');
}

// 4. FIX EXPERIENCIA CONTAINER HEIGHT
html = html.replace('style:{height:"220vh"}', 'style:{height:"160vh"}');
html = html.replace(
  'className:"sticky top-0 h-[72svh] sm:h-[75svh] min-h-[460px] max-h-[580px] overflow-hidden flex items-center"',
  'className:"sticky top-0 h-[75svh] min-h-[460px] max-h-[600px] overflow-hidden flex items-center justify-center"'
);

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('Fixes saved to index.html and dist/index.html.');
