
const boxes=[...document.querySelectorAll('.rule-check')];
const counter=document.getElementById('counter');
const open=document.getElementById('open-rules');
const key='catan-actieve-regels-v1';
try{const saved=JSON.parse(localStorage.getItem(key));if(Array.isArray(saved)){boxes.forEach(b=>b.checked=saved.includes(Number(b.value)));}}catch(e){}
function update(){const active=boxes.filter(b=>b.checked).map(b=>Number(b.value));counter.textContent=`${active.length} van ${boxes.length} actief`;open.disabled=!active.length;try{localStorage.setItem(key,JSON.stringify(active))}catch(e){}}
boxes.forEach(b=>b.addEventListener('change',update));
document.getElementById('all').onclick=()=>{boxes.forEach(b=>b.checked=true);update()};
document.getElementById('none').onclick=()=>{boxes.forEach(b=>b.checked=false);update()};
open.onclick=()=>{const selected=boxes.filter(b=>b.checked).map(b=>b.value).join(',');location.href='regels.html?regels='+encodeURIComponent(selected)};
update();
