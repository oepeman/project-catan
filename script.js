
const links=[...document.querySelectorAll('[data-target]')],cards=[...document.querySelectorAll('.rule-card')];
let timeout;
function activate(id,scroll=true){
 const card=document.getElementById(id);if(!card)return;
 cards.forEach(c=>c.classList.remove('highlight'));links.forEach(a=>a.classList.toggle('active',a.dataset.target===id));
 card.classList.add('highlight');clearTimeout(timeout);
 if(scroll)card.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 timeout=setTimeout(()=>card.classList.remove('highlight'),6500);
}
links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();let id=a.dataset.target;history.pushState(null,'','#'+id);activate(id)}));
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#regel-'))activate(decodeURIComponent(location.hash.slice(1)))});
if(location.hash.startsWith('#regel-'))setTimeout(()=>activate(decodeURIComponent(location.hash.slice(1))),200);
const search=document.getElementById('search');
search.addEventListener('input',()=>{const q=search.value.trim().toLocaleLowerCase('nl');cards.forEach(c=>c.classList.toggle('hidden',!!q&&!c.textContent.toLocaleLowerCase('nl').includes(q)));links.forEach(a=>a.classList.toggle('hidden',!!q&&!document.getElementById(a.dataset.target).textContent.toLocaleLowerCase('nl').includes(q)))});
document.getElementById('clear').addEventListener('click',()=>{search.value='';search.dispatchEvent(new Event('input'));search.focus()});

// Show only the chosen chapters, including matching navigation and images.
const chosenParam=new URLSearchParams(location.search).get('regels');
let chosen=null;
if(chosenParam!==null){chosen=new Set(chosenParam.split(',').filter(x=>/^\d+$/.test(x)));}
if(chosen){document.querySelectorAll('.rule-card').forEach(card=>card.hidden=!chosen.has(card.id.replace('regel-','')));document.querySelectorAll('[data-target]').forEach(a=>a.hidden=!chosen.has(a.dataset.target.replace('regel-','')));}
const selectedCount=document.querySelectorAll('.rule-card:not([hidden])').length;
const banner=document.createElement('div');banner.className='selection-banner';banner.innerHTML='<strong>Jullie actieve huisregels: '+selectedCount+'</strong><a href="index.html">⚙ Wijzig selectie</a>';
document.querySelector('.content').prepend(banner);
document.querySelector('.welcome h2').textContent='Jullie persoonlijke regelboek';
document.querySelector('.welcome p:last-child').textContent='Alleen de gekozen regels worden hieronder weergegeven. Klik op een hoofdstuk om het volledige blok te markeren.';
document.querySelector('.top-actions').insertAdjacentHTML('afterbegin','<a href="index.html">⚙ Regels kiezen</a>');
