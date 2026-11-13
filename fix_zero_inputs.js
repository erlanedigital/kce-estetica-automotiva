const fs = require('fs');

let html = fs.readFileSync('dist/index.html', 'utf8');

// Modificar os inputs de número para não prefixar com 0 quando o usuário digita
// Exemplo: value:Mn.totalSpent -> value:Mn.totalSpent===0?"":Mn.totalSpent
// E no onChange: u.target.value===""?0:Number(u.target.value)

// 1. TOTAL GASTO (R$)
// r("input",{type:"number",value:Mn.totalSpent,onChange:(u)=>vf({...Mn,totalSpent:Number(u.target.value)}),className:`${O} mt-1`})
const oldTotalSpent = 'r("input",{type:"number",value:Mn.totalSpent,onChange:(u)=>vf({...Mn,totalSpent:Number(u.target.value)}),className:`${O} mt-1`})';
const newTotalSpent = 'r("input",{type:"number",value:Mn.totalSpent||"",placeholder:"0",onFocus:(u)=>{if(u.target.value==="0")u.target.value=""},onChange:(u)=>vf({...Mn,totalSpent:u.target.value===""?"":Number(u.target.value)}),className:`${O} mt-1`})';

if (html.includes(oldTotalSpent)) {
  html = html.replace(oldTotalSpent, newTotalSpent);
  console.log('✓ TOTAL GASTO atualizado para não travar zero inicial!');
}

// 2. VALOR (R$) em Contas a Pagar e a Receber:
// r("input",{type:"number",value:De.value,onChange:(u)=>Au({...De,value:Number(u.target.value)}),className:`${O} mt-1`})
const oldDeValue = 'r("input",{type:"number",value:De.value,onChange:(u)=>Au({...De,value:Number(u.target.value)}),className:`${O} mt-1`})';
const newDeValue = 'r("input",{type:"number",value:De.value||"",placeholder:"0",onFocus:(u)=>{if(u.target.value==="0")u.target.value=""},onChange:(u)=>Au({...De,value:u.target.value===""?"":Number(u.target.value)}),className:`${O} mt-1`})';

if (html.includes(oldDeValue)) {
  html = html.replace(oldDeValue, newDeValue);
  console.log('✓ VALOR de contas atualizado para não travar zero inicial!');
}

// 3. JÁ PAGO NO MÊS / PRÓ-LABORE:
const oldPaid = 'r("input",{type:"number",value:W.paid,onChange:(on)=>J({paid:Number(on.target.value)}),className:`${O} mt-1`})';
const newPaid = 'r("input",{type:"number",value:W.paid||"",placeholder:"0",onFocus:(u)=>{if(u.target.value==="0")u.target.value=""},onChange:(on)=>J({paid:on.target.value===""?"":Number(on.target.value)}),className:`${O} mt-1`})';
if (html.includes(oldPaid)) {
  html = html.replace(oldPaid, newPaid);
  console.log('✓ Já Pago no mês atualizado!');
}

// 4. Injetar script global para limpar o '0' automaticamente ao focar em qualquer input de número do Admin:
const autoClearZeroScript = `
<script>
document.addEventListener('focusin', function(e) {
  if (e.target && e.target.type === 'number' && (e.target.value === '0' || e.target.value === '0.00')) {
    e.target.value = '';
  }
});
</script>
`;

if (html.includes('</body>')) {
  html = html.replace('</body>', autoClearZeroScript + '\n</body>');
  console.log('✓ Script global para limpar o zero de inputs de número injetado!');
}

fs.writeFileSync('dist/index.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Salvo com sucesso.');
