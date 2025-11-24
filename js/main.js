// Lightweight helper
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

// Days together counter
function daysTogether(startDateStr){
  const start = new Date(startDateStr);
  const now = new Date();
  const diff = Math.floor((now - start) / (1000*60*60*24));
  return diff;
}

// Audio toggle
function setupAudio(){
  const audio = $('#bg-audio');
  const btn = $('#audio-toggle');
  if(!audio || !btn) return;
  btn.addEventListener('click', ()=>{
    if(audio.paused){ audio.play(); btn.textContent = 'Pause music'; }
    else { audio.pause(); btn.textContent = 'Play music'; }
  });
}

// Lightbox gallery
function setupLightbox(){
  const lightbox = $('#lightbox');
  if(!lightbox) return;
  const lbImg = $('#lightbox-img');
  $$('.gallery img').forEach(img=>{
    img.addEventListener('click', ()=>{
      lbImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });
  $('#lightbox-close').addEventListener('click', ()=> lightbox.style.display='none');
  lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.style.display='none'; });
}

// Confetti (simple canvas)
function confettiBurst(){
  const canvas = document.createElement('canvas');
  canvas.style.position='fixed';canvas.style.inset='0';canvas.style.pointerEvents='none';canvas.width=innerWidth;canvas.height=innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const pieces = Array.from({length:150}).map(()=>({
    x: Math.random()*canvas.width,
    y: -20*Math.random(),
    r: 4+Math.random()*6,
    c: ['#ff79c6','#8be9fd','#50fa7b','#f1fa8c'][Math.floor(Math.random()*4)],
    vx: -2+Math.random()*4,
    vy: 2+Math.random()*4
  }));
  let t = 0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.02;
      ctx.fillStyle=p.c; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    });
    t++; if(t<180) requestAnimationFrame(draw); else document.body.removeChild(canvas);
  }
  draw();
}

// Quiz logic
function setupQuiz(){
  const form = $('#quiz-form');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const answers = {
      firstDate: $('#first-date').value.trim(),
      favSnack: $('#fav-snack').value.trim().toLowerCase(),
      song: $('#song').value.trim().toLowerCase(),
    };
    let score = 0;
    if(answers.firstDate === '2022-12-19') score++;        // customize
    if(answers.favSnack.includes('fries') || answers.favSnack.includes('potcor') || answers.favSnack.includes('potato corner')) score++;
    if(answers.song.includes('daylight') || answers.song.includes('wishlist')) score++;
    $('#score').textContent = `Score: ${score}/3`;
    if(score >= 2){
      $('#reveal').classList.remove('hidden');
      confettiBurst();
    }
  });
}

// Page init
document.addEventListener('DOMContentLoaded', ()=>{
  // Counter
  const counter = $('#days-counter');
  if(counter){ counter.textContent = `${daysTogether('2022-12-20')} days together`; } // customize date

  setupAudio();
  setupLightbox();
  setupQuiz();
});
