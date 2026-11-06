const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const KEY='padelTrackDataV1';
let data=JSON.parse(localStorage.getItem(KEY)||'{"matches":[],"players":[],"gear":{}}');
const today=()=>new Date().toISOString().slice(0,10);
const save=()=>localStorage.setItem(KEY,JSON.stringify(data));
const escapeHTML=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate=s=>new Date(s+'T12:00:00').toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'});
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
function openModal(id){$('#'+id).classList.add('open')}
function closeModals(){$$('.modal-backdrop').forEach(m=>m.classList.remove('open'))}
function setView(name){$$('.view').forEach(v=>v.classList.toggle('active',v.id==='view-'+name));$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$('#pageTitle').textContent={home:"Vue d'ensemble",matches:'Mes matchs',team:'Mon équipe'}[name];if(name==='matches')renderMatches();if(name==='team')renderTeam();window.scrollTo(0,0)}
$$('.nav-item').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
$$('[data-goto]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.goto)));
$('#quickAdd').onclick=$('#addMatch2').onclick=()=>{ $('#matchDate').value=today();openModal('matchModal') };
$$('[data-close]').forEach(b=>b.onclick=closeModals);
$$('.modal-backdrop').forEach(b=>b.addEventListener('click',e=>{if(e.target===b)closeModals()}));
function years(){let ys=[...new Set([new Date().getFullYear(),...data.matches.map(m=>+m.date.slice(0,4))])].sort((a,b)=>b-a);$('#yearFilter').innerHTML=ys.map(y=>`<option>${y}</option>`).join('');$('#sideSeason').textContent=ys[0]}
function selectedMatches(){let y=+$('#yearFilter').value||new Date().getFullYear();return data.matches.filter(m=>+m.date.slice(0,4)===y)}
function renderHome(){
 years();let ms=selectedMatches(),wins=ms.filter(m=>m.result==='win').length,loss=ms.filter(m=>m.result==='loss').length,minutes=ms.reduce((a,m)=>a+(+m.duration||0),0);
 $('#statMatches').textContent=ms.length;$('#statWin').textContent=ms.length?Math.round(wins/ms.length*100)+'%':'—';$('#statRecord').textContent=`${wins} victoire${wins>1?'s':''} · ${loss} défaite${loss>1?'s':''}`;$('#statTime').textContent=minutes>=60?(minutes/60).toFixed(1).replace('.',',')+' h':minutes+' min';$('#statPartners').textContent=new Set(ms.map(m=>m.partner.trim()).filter(Boolean)).size;
 let counts=Array(12).fill(0);ms.forEach(m=>counts[+m.date.slice(5,7)-1]++);let max=Math.max(1,...counts);
 $('#activityChart').innerHTML=ms.length?counts.map((n,i)=>`<div class="bar-wrap"><span class="bar-count">${n||''}</span><div class="bar ${n?'current':''}" style="height:${Math.max(3,n/max*105)}px"></div></div>`).join(''):'<div class="empty-chart">Tes premiers matchs apparaîtront ici.</div>';
 let recent=[...data.matches].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4);
 $('#recentMatches').innerHTML=recent.length?recent.map(matchRow).join(''):'<div class="empty-state">Aucun match pour le moment.<br>Ajoute ta première partie !</div>';
 let best=ms.length?`Tu as joué ${ms.length} match${ms.length>1?'s':''} cette saison.`:'Enregistre ton premier match pour commencer à suivre ta progression.';
 let partnerCounts={};ms.forEach(m=>{if(m.partner)partnerCounts[m.partner]=(partnerCounts[m.partner]||0)+1});let favorite=Object.entries(partnerCounts).sort((a,b)=>b[1]-a[1])[0];
 $('#insights').innerHTML=`<div class="insight"><b>${wins?Math.round(wins/ms.length*100)+' % de victoires':'Ta saison commence'}</b><span>${best}</span></div><div class="insight"><b>${favorite?'Ton partenaire régulier':'À deux, c’est mieux'}</b><span>${favorite?`${escapeHTML(favorite[0])} apparaît dans ${favorite[1]} match(s).`:'Renseigne tes partenaires dans chaque match.'}</span></div><div class="insight"><b>${minutes?Math.round(minutes/60*10)/10+' h sur le court':'Chaque minute compte'}</b><span>Le temps cumulé de tes parties enregistrées.</span></div>`;
}
function matchRow(m){return `<div class="match-item"><div class="result-mark ${m.result}">${m.result==='win'?'✓':m.result==='loss'?'×':'·'}</div><div class="match-main"><b>${escapeHTML(m.myTeam||'Mon équipe')} <span style="color:#a0a7b2;font-weight:400">vs</span> ${escapeHTML(m.opponents||'Adversaires')}</b><span>${fmtDate(m.date)} · ${escapeHTML(m.venue||'Lieu non précisé')} ${m.partner?'· avec '+escapeHTML(m.partner):''}</span></div><div class="match-detail">${escapeHTML(m.notes||'')}</div><div class="match-score">${escapeHTML(m.score||'—')}</div></div>`}
function renderMatches(){let q=$('#matchSearch').value.toLowerCase(),f=$('#resultFilter').value;let ms=[...data.matches].sort((a,b)=>b.date.localeCompare(a.date)).filter(m=>(f==='all'||m.result===f)&&[m.myTeam,m.opponents,m.venue,m.partner,m.notes].join(' ').toLowerCase().includes(q));$('#allMatches').innerHTML=ms.length?ms.map(matchRow).join(''):'<div class="empty-state">Aucun match ne correspond à ta recherche.</div>'}
$('#yearFilter').onchange=renderHome;$('#matchSearch').oninput=renderMatches;$('#resultFilter').onchange=renderMatches;
$('#matchForm').onsubmit=e=>{e.preventDefault();data.matches.push({id:Date.now(),date:$('#matchDate').value,duration:$('#duration').value,venue:$('#venue').value,result:$('#result').value,myTeam:$('#myTeam').value,opponents:$('#opponents').value,score:$('#score').value,partner:$('#partner').value,notes:$('#notes').value});save();e.target.reset();closeModals();renderHome();toast('Match enregistré. Belle partie !');};
$('#addPlayer').onclick=()=>openModal('playerModal');
$('#playerForm').onsubmit=e=>{e.preventDefault();data.players.push({id:Date.now(),name:$('#playerName').value.trim(),note:$('#playerNote').value.trim()});save();e.target.reset();closeModals();renderTeam();toast('Joueur ajouté à ton équipe.');};
function renderTeam(){let p=data.players;$('#playersList').innerHTML=p.length?p.map(x=>`<div class="player-row"><div class="avatar">${escapeHTML(x.name.slice(0,1).toUpperCase())}</div><div><b>${escapeHTML(x.name)}</b><span>${escapeHTML(x.note||'Joueur')}</span></div><button aria-label="Supprimer ${escapeHTML(x.name)}" data-del-player="${x.id}">×</button></div>`).join(''):'<div class="empty-state">Ajoute les joueurs de tes parties.</div>';
let g=data.gear||{};let entries=[['Raquette',g.racket],['Chaussures',g.shoes],['Autre',g.other]].filter(x=>x[1]);$('#gearInfo').innerHTML=entries.length?`<div class="gear-visual">⌁</div><div class="gear-fields">${entries.map(x=>`<div class="gear-field"><small>${x[0]}</small><b>${escapeHTML(x[1])}</b></div>`).join('')}</div>`:'<div class="gear-visual">⌁</div><div><b>Aucun matériel renseigné</b><span>Ajoute ta raquette, tes chaussures ou tes accessoires.</span></div>';
$$('[data-del-player]').forEach(b=>b.onclick=()=>{data.players=data.players.filter(x=>x.id!==+b.dataset.delPlayer);save();renderTeam();toast('Joueur supprimé.')})}
$('#editGear').onclick=()=>{let g=data.gear||{};$('#gearRacket').value=g.racket||'';$('#gearShoes').value=g.shoes||'';$('#gearOther').value=g.other||'';openModal('gearModal')};
$('#gearForm').onsubmit=e=>{e.preventDefault();data.gear={racket:$('#gearRacket').value,shoes:$('#gearShoes').value,other:$('#gearOther').value};save();closeModals();renderTeam();toast('Matériel mis à jour.')};
$('#exportData').onclick=()=>{let blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='mes-donnees-padel-track.json';a.click();URL.revokeObjectURL(url);toast('Export de tes données téléchargé.')};
renderHome();