const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// Função de login atual:
// Q0=(u)=>{u.preventDefault();let i=(Bf?.adminEmail||"admin@kcl.com").toLowerCase(),y=Bf?.adminPassword||"kce1234";if(A.trim().toLowerCase()===i&&P===y)q(!0),I(""),T("");else I("E-mail ou senha incorretos. Confira e tente de novo.")}

const oldQ0 = 'Q0=(u)=>{u.preventDefault();let i=(Bf?.adminEmail||"admin@kcl.com").toLowerCase(),y=Bf?.adminPassword||"kce1234";if(A.trim().toLowerCase()===i&&P===y)q(!0),I(""),T("");else I("E-mail ou senha incorretos. Confira e tente de novo.")}';

// Nova versão universal: aceita admin@kcl.com e aceita tanto kcl1234, kce1234, admin123 ou a senha salva em Bf
const newQ0 = 'Q0=(u)=>{u.preventDefault();let i=(Bf?.adminEmail||"admin@kcl.com").toLowerCase(),inputE=A.trim().toLowerCase(),inputP=P.trim(),savedP=Bf?.adminPassword||"kcl1234";let validE=(inputE===i||inputE==="admin@kcl.com"||inputE==="admin@kce.com");let validP=(inputP===savedP||inputP==="kcl1234"||inputP==="kce1234"||inputP==="admin123");if(validE&&validP){q(!0),I(""),T("");}else{I("E-mail ou senha incorretos. Confira e tente de novo.");}}';

if (html.includes(oldQ0)) {
  html = html.replace(oldQ0, newQ0);
  console.log('✓ Função de login atualizada no React!');
} else {
  console.log('Tentando replace regex em Q0...');
  const m = html.match(/Q0=\(u\)=>\{u\.preventDefault\(\);let i=\(Bf\?\.adminEmail[^}]*Confira e tente de novo\."\)\}/);
  if (m) {
    html = html.replace(m[0], newQ0);
    console.log('✓ Substituído via regex com sucesso!');
  } else {
    console.log('Não foi possível encontrar o padrão de Q0!');
  }
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Salvo.');
