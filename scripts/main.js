// scripts/main.js
// Responsible for theme toggling, populating the collage, hamburger/popular panel behaviour,
// and wiring the social links and navigation behaviour.
//
// Notes: Replace social href="#" anchors with your actual profile URLs.

(function(){
  // sample data for posts (replace with real posts or fetch from API)
  const posts = [
    {id:1, title:'Why minimal design matters', excerpt:'A short essay on focus, whitespace and editorial clarity.', tag:'Art', date:'2025-08-25'},
    {id:2, title:'Under the needle: analog vs digital', excerpt:'Music production clash with synths taking over.', tag:'Music', date:'2025-08-24'},
    {id:3, title:'Street style: summer looks', excerpt:'How to mix comfort with attitude.', tag:'Style', date:'2025-08-22'},
    {id:4, title:'Mental loops: life-hacks for better focus', excerpt:'Small routines that compound.', tag:'LifeStyle', date:'2025-08-21'},
    {id:5, title:'Local derby — the city rivalry', excerpt:'A quick preview of tonight’s match.', tag:'Sports', date:'2025-08-20'},
    {id:6, title:'Portraits in green', excerpt:'A photographer plays with the accent color.', tag:'Art', date:'2025-08-19'},
  ];

  // populate popular list
  const popularList = document.getElementById('popularList');
  if(popularList){
    posts.slice(0,5).forEach(p=>{
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = `${p.title} — ${p.tag}`;
      a.onclick = (e)=>{ e.preventDefault(); alert('Open article: ' + p.title); };
      li.appendChild(a);
      popularList.appendChild(li);
    });
  }

  // hamburger toggles popular panel
  const hamburger = document.getElementById('hamburger');
  const popularPanel = document.getElementById('popularPanel');
  hamburger && hamburger.addEventListener('click', ()=>{
    if(!popularPanel) return;
    popularPanel.classList.toggle('hidden');
    const hidden = popularPanel.classList.contains('hidden');
    popularPanel.setAttribute('aria-hidden', hidden ? 'true':'false');
  });

  // populate collage with a "non-grid" arrangement
  const collage = document.getElementById('collage');
  if(collage){
    // define some arbitrary positions and sizes for a collage effect
    const layout = [
      {left:10, top:10, w:320, h:140, rot:-2, idx:0},
      {left:360, top:5, w:280, h:220, rot:3, idx:1},
      {left:150, top:160, w:240, h:140, rot:-4, idx:2},
      {left:520, top:180, w:300, h:160, rot:2, idx:3},
      {left:30, top:340, w:340, h:160, rot:1, idx:4},
    ];
    // ensure collage container height fits the layout
    collage.style.height = '520px';

    layout.forEach(layoutItem => {
      const p = posts[layoutItem.idx % posts.length];
      const card = document.createElement('article');
      card.className = 'card';
      card.style.left = layoutItem.left + 'px';
      card.style.top = layoutItem.top + 'px';
      card.style.width = layoutItem.w + 'px';
      card.style.height = layoutItem.h + 'px';
      card.style.transform = 'rotate(' + layoutItem.rot + 'deg)';
      card.innerHTML = `<h3>${p.title}</h3><p>${p.excerpt}</p><div class="featured-meta"><time>${p.date}</time><span class="tag">${p.tag}</span></div>`;
      card.onclick = ()=> alert('Open: ' + p.title);
      collage.appendChild(card);
    });
  }

  // theme toggle — switch between light and dark by toggling class on body
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  // load saved preference
  const saved = localStorage.getItem('swezzy:theme');
  if(saved === 'dark') body.classList.add('dark');
  // attach toggle
  themeToggle && themeToggle.addEventListener('click', ()=>{
    body.classList.toggle('dark');
    const mode = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('swezzy:theme', mode);
  });

  // Wire social icons to open user profiles. By default they are '#'.
  // Replace the URLs below with your real accounts.
  const socials = {
    twitter: '#',
    instagram: '#',
    facebook: '#'
  };
  document.querySelectorAll('.social').forEach(a=>{
    const name = a.dataset.name;
    if(!name) return;
    a.href = socials[name] || '#';
    // open in new tab for external profiles
    a.target = '_blank';
  });

  // Accessibility: keyboard closes popular panel with Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && popularPanel && !popularPanel.classList.contains('hidden')){
      popularPanel.classList.add('hidden');
      popularPanel.setAttribute('aria-hidden','true');
    }
  });

  // Basic navigation: pages are static .html files already created in the project.
  // No SPA routing is used here; links use standard anchors.

})();