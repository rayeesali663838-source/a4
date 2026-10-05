(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Colour of the month
  var C=[['Camel','#B98B54','Warm and grown-up, camel lifts winter greys and pairs with every neutral.'],['Charcoal','#3F3F42','Deep and calm: the most versatile dark for tailoring.'],['Stone','#C9BFAE','A soft neutral for the first light layers of spring.'],
    ['Sage','#9AA58A','A gentle green that works with khaki, navy and white.'],['Ecru','#EDE3CF','Creamy and fresh, ideal for gabardine trousers.'],['Sky','#A9C2D6','Airy blue for shirts and summer suiting.'],
    ['Sand','#D8C3A0','The classic summer trench colour, light and easy.'],['Terracotta','#B5603E','Sun-baked warmth for late-summer accessories.'],['Olive','#6E6E45','An earthy autumn shade with military roots.'],
    ['Khaki','#B49A6E','The original gabardine colour: practical, timeless and endlessly wearable.'],['Burgundy','#6E2433','Rich and polished for knitwear and scarves.'],['Midnight','#1F2A44','A softer alternative to black for evening tailoring.']];
  var m=new Date().getMonth(),cm=document.getElementById('com');
  if(cm){cm.querySelector('.sw').style.background=C[m][1];cm.querySelector('h2').textContent=C[m][0];cm.querySelector('p').textContent=C[m][2];}
  // Weave visualizer
  var W={plain:['Plain weave',function(x,y){return (x+y)%2===0;},'None (checkerboard)','Flat, crisp','Poplin, canvas, shirting'],
    t21:['2/1 twill',function(x,y){return ((x-y)%3+3)%3<2;},'About 45°','Soft, diagonal','Chino, drill'],
    t22:['2/2 twill',function(x,y){return ((x-y)%4+4)%4<2;},'About 45°','Balanced, sturdy','Denim, serge'],
    gab:['Gabardine',function(x,y){return ((2*x-y)%5+5)%5<3;},'Steep, around 60°+','Smooth, dense, warp-faced','Trench coats, trousers, suits']};
  var lm=document.getElementById('loom'),wb=document.querySelectorAll('[data-weave]');
  function weave(k){if(!lm)return;var w=W[k],s='',N=14,c=100/N;for(var y=0;y<N;y++)for(var x=0;x<N;x++){var up=w[1](x,y);s+='<rect x="'+(x*c+.6)+'" y="'+(y*c+.6)+'" width="'+(c-1.2)+'" height="'+(c-1.2)+'" rx="1.2" fill="'+(up?'#D9C8A6':'#6B5A44')+'"/>';}
    lm.innerHTML=s;document.getElementById('w-name').textContent=w[0];document.getElementById('w-a').textContent=w[2];document.getElementById('w-f').textContent=w[3];document.getElementById('w-u').textContent=w[4];
    wb.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.weave===k?'true':'false');});}
  wb.forEach(function(x){x.addEventListener('click',function(){weave(x.dataset.weave);});});if(wb.length)weave('gab');
  // Decades
  var D={'1920s':['The 1920s','Gabardine raincoats move from the trenches into everyday city life; tailoring loosens and hemlines rise.',['#B49A6E','#2B2B2B','#E8DFC9'],['Belted trench coats','Wide-leg trousers','Cloche hats and long coats']],
    '1940s':['The 1940s','Practical, structured clothes with strong shoulders; fabric is rationed, so cuts are economical.',['#5D5B43','#8C6B4A','#2F3A4A'],['Tailored skirt suits','Gabardine utility jackets','High-waisted trousers']],
    '1950s':['The 1950s','Polished silhouettes return: nipped waists, full skirts and smart gabardine slacks.',['#1F2A44','#C9BFAE','#9A4A2E'],['Swing coats','Pleated trousers','Gabardine casual jackets']],
    '1970s':['The 1970s','Relaxed tailoring meets earthy colours; trousers widen and safari styles appear.',['#B5603E','#6E6E45','#D8C3A0'],['Flared trousers','Safari jackets','Long belted macs']],
    '1990s':['The 1990s','Minimalism takes over: clean lines, neutral palettes and slip-easy tailoring.',['#3F3F42','#EDE3CF','#7B7D80'],['Slim trench coats','Straight-leg trousers','Unstructured blazers']],
    '2020s':['The 2020s','Timeless pieces echo every decade: oversized trenches, relaxed suiting and a focus on buying fewer, better clothes.',['#B98B54','#EDE3CF','#1F2A44'],['Oversized trench','Wide, pleated trousers','Soft-shouldered blazers']]};
  var db=document.querySelectorAll('[data-dec]');
  function dec(k){var d=D[k];document.getElementById('d-name').textContent=d[0];document.getElementById('d-desc').textContent=d[1];
    document.getElementById('d-pal').innerHTML=d[2].map(function(c){return '<i style="background:'+c+'"></i>';}).join('');document.getElementById('d-list').innerHTML=d[3].map(function(x){return '<li>'+x+'</li>';}).join('');
    db.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.dec===k?'true':'false');});}
  db.forEach(function(x){x.addEventListener('click',function(){dec(x.dataset.dec);});});if(db.length)dec('1920s');
  // Fit checker
  var F={trench:['The shoulder seam sits at your natural shoulder edge','You can lift your arms without the coat riding up a lot','Sleeves cover the wrist and shirt cuff','The coat closes easily over a light knit','The hem hits your chosen length (knee or mid-calf)'],
    trousers:['The waistband sits comfortably without a belt','The seat is smooth, without pulling or sagging','Pockets lie flat rather than flaring open','The crease falls straight down the centre of the leg','The hem has a slight break on your shoe, or none for cropped styles'],
    blazer:['Shoulders are smooth with no dimple at the seam','The top button closes without an X-shaped pull','The collar sits against your shirt collar','About 1 cm of shirt cuff shows below the sleeve','The jacket covers most of your seat']};
  var gb=document.querySelectorAll('[data-g]'),cur='trench',ck=document.getElementById('checks');
  function score(){var a=ck.querySelectorAll('input'),c=0;a.forEach(function(x){if(x.checked)c++;});document.getElementById('f-n').textContent=c+'/'+a.length;document.getElementById('f-bar').style.width=(c/a.length*100)+'%';
    document.getElementById('f-t').textContent=c===a.length?'An excellent fit. This piece should look sharp for years.':c>=3?'Close. A tailor can usually fix sleeve length, hems and waistbands easily.':'Keep looking, or ask a tailor which points can be altered. Shoulders are the hardest to change.';}
  function garment(k){cur=k;ck.innerHTML=F[k].map(function(t){return '<li><label><input type="checkbox"><span>'+t+'</span></label></li>';}).join('');
    ck.querySelectorAll('input').forEach(function(x){x.addEventListener('change',score);});score();
    gb.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.g===k?'true':'false');});document.querySelectorAll('[data-gi]').forEach(function(i){i.hidden=i.dataset.gi!==k;});}
  gb.forEach(function(x){x.addEventListener('click',function(){garment(x.dataset.g);});});if(ck)garment('trench');
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('ge_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('ge_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
