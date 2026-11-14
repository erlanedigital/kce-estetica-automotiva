const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// 1. Inspect marquee in markup
const pMarquee = html.indexOf('marquee-track');
console.log('=== MARQUEE IN CSS ===\n', html.substring(pMarquee - 100, pMarquee + 250));

const pMarqueeMarkup = html.indexOf('className:"marquee-track');
console.log('=== MARQUEE IN REACT ===\n', html.substring(pMarqueeMarkup - 120, pMarqueeMarkup + 450));

// 2. Inspect scroll handler for Vf in React
const pScroll = html.indexOf('if(e(window.scrollY),Vf.current)');
console.log('=== SCROLL HANDLER ===\n', html.substring(pScroll - 50, pScroll + 450));
