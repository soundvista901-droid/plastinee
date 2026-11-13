const INK="#1b1740",SUN="#ffc93c";
const P=[
{id:1,n:"Monstera Morning",c:"Botanical",p:349,m:"leaf",a:"#1fa79a",b:"#cff1ec"},
{id:2,n:"Golden Hour",c:"Abstract",p:299,m:"sun",a:"#ff8a3d",b:"#ffe9c7"},
{id:3,n:"Peak Season",c:"Landscape",p:449,m:"mountain",a:"#5b4bc4",b:"#dcd7f7"},
{id:4,n:"Night Owl Moon",c:"Kids",p:329,m:"moon",a:"#ffc93c",b:"#2a2468"},
{id:5,n:"Arch Rainbow",c:"Abstract",p:399,m:"arch",a:"#f25c8a",b:"#ffdce8"},
{id:6,n:"Tide Lines",c:"Landscape",p:379,m:"wave",a:"#2a8fd6",b:"#d4ecfb"},
{id:7,n:"Desert Friend",c:"Botanical",p:299,m:"cactus",a:"#3f9d5a",b:"#f9e3b8"},
{id:8,n:"Little Bluebird",c:"Kids",p:349,m:"bird",a:"#3aa0e8",b:"#e1f3ff"}];
const SZ={"10 cm":1,"20 cm":1.8,"40 cm":3};
const inr=n=>"₹"+Math.round(n).toLocaleString("en-IN");
function motif(m,a){
 if(m=="leaf")return `<path d="M100 170V100" stroke="${a}" stroke-width="6" stroke-linecap="round"/><path d="M100 150C36 144 28 80 68 46c20 20 32 42 32 74 0-32 12-54 32-74 40 34 32 98-32 104z" fill="${a}"/><path d="M100 150V90" stroke="#fff" stroke-width="3" opacity=".6"/>`;
 if(m=="sun"){let r="";for(let i=0;i<12;i++){const t=i*Math.PI/6;r+=`<line x1="${100+52*Math.cos(t)}" y1="${100+52*Math.sin(t)}" x2="${100+72*Math.cos(t)}" y2="${100+72*Math.sin(t)}" stroke="${a}" stroke-width="8" stroke-linecap="round"/>`}return r+`<circle cx="100" cy="100" r="36" fill="${a}"/>`}
 if(m=="mountain")return `<path d="M26 150L78 66l30 46 24-30 42 68z" fill="${a}"/><path d="M78 66l-14 22 14-6 10 8z" fill="#fff" opacity=".8"/><circle cx="144" cy="56" r="16" fill="${SUN}"/>`;
 if(m=="moon")return `<path d="M120 40a60 60 0 1 0 40 92A64 64 0 0 1 120 40z" fill="${a}"/><circle cx="150" cy="60" r="5" fill="#fff"/><circle cx="168" cy="96" r="3.5" fill="#fff"/><circle cx="60" cy="52" r="3" fill="#fff"/>`;
 if(m=="arch")return `<path d="M40 160V100a60 60 0 0 1 120 0v60z" fill="${a}"/><path d="M64 160v-60a36 36 0 0 1 72 0v60z" fill="${SUN}"/><path d="M86 160v-60a14 14 0 0 1 28 0v60z" fill="#fff"/>`;
 if(m=="wave")return [70,100,130].map((y,i)=>`<path d="M26 ${y}q18-24 37 0t37 0 37 0 37 0" fill="none" stroke="${i==1?SUN:a}" stroke-width="12" stroke-linecap="round"/>`).join("");
 if(m=="cactus")return `<rect x="84" y="50" width="32" height="104" rx="16" fill="${a}"/><path d="M84 112H70a12 12 0 0 1-12-12V84M116 96h14a12 12 0 0 0 12-12V68" stroke="${a}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M70 150h60l-8 22H78z" fill="#e0675a"/>`;
 return `<ellipse cx="100" cy="112" rx="46" ry="32" fill="${a}"/><circle cx="136" cy="84" r="21" fill="${a}"/><path d="M154 80l22 7-22 9z" fill="${SUN}"/><circle cx="141" cy="81" r="3.5" fill="${INK}"/><path d="M58 106L28 88l10 34z" fill="${a}"/><path d="M80 112q22 18 44 0" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>`;
}
const art=p=>`<svg viewBox="0 0 200 200" role="img" aria-label="${p.n} sticker"><rect x="4" y="4" width="192" height="192" rx="50" fill="#fff"/><rect x="12" y="12" width="176" height="176" rx="43" fill="${p.b}"/>${motif(p.m,p.a)}</svg>`;

/* hero wall */
const wall=document.getElementById("wall");
[[1,"6%","8%","-8deg",.2],[4,"58%","6%","7deg",.55],[5,"30%","36%","-3deg",.9],[3,"62%","50%","6deg",1.25],[8,"4%","58%","-9deg",1.6]].forEach(([id,l,t,r,d])=>{
 const p=P.find(x=>x.id==id),e=document.createElement("div");e.className="hs";e.style.cssText=`left:${l};top:${t};--r:${r};--d:${d}s`;e.innerHTML=art(p);
 e.onclick=()=>{e.classList.add("peel");setTimeout(()=>{e.classList.remove("peel");e.style.animation="none";e.offsetWidth;e.style.animation="";e.style.setProperty("--d","0s")},1100)};
 wall.appendChild(e)});

/* shop */
let cat="All",cart=[],promo=false;
try{cart=JSON.parse(localStorage.getItem("pl-cart")||"[]")}catch(e){}
const $=id=>document.getElementById(id);
function chips(){const cs=["All",...new Set(P.map(p=>p.c))];$("chips").innerHTML=cs.map(c=>`<button class="chip" aria-pressed="${c==cat}" data-c="${c}">${c}</button>`).join("");
 $("chips").querySelectorAll("button").forEach(b=>b.onclick=()=>{cat=b.dataset.c;chips();grid()})}
function grid(){let l=P.filter(p=>cat=="All"||p.c==cat);const s=$("sort").value;
 if(s=="l")l.sort((a,b)=>a.p-b.p);if(s=="h")l.sort((a,b)=>b.p-a.p);
 $("grid").innerHTML=l.map((p,i)=>`<article class="card" style="animation-delay:${i*.05}s"><div class="art">${art(p)}</div><h3>${p.n}</h3>
 <div class="meta"><span>${p.c}</span><span class="price" data-p="${p.id}">${inr(p.p)}</span></div>
 <div class="row"><select aria-label="Size for ${p.n}" data-s="${p.id}">${Object.keys(SZ).map(k=>`<option>${k}</option>`).join("")}</select><button class="add" data-a="${p.id}">Add</button></div></article>`).join("");
 $("grid").querySelectorAll("select").forEach(s=>s.onchange=()=>{const p=P.find(x=>x.id==s.dataset.s);$("grid").querySelector(`[data-p="${p.id}"]`).textContent=inr(p.p*SZ[s.value])});
 $("grid").querySelectorAll(".add").forEach(b=>b.onclick=()=>{const id=+b.dataset.a,sz=$("grid").querySelector(`[data-s="${id}"]`).value;add(id,sz);b.textContent="Added";b.classList.add("ok");setTimeout(()=>{b.textContent="Add";b.classList.remove("ok")},1100)})}
$("sort").onchange=grid;

/* cart */
const save=()=>{try{localStorage.setItem("pl-cart",JSON.stringify(cart))}catch(e){}};
function add(id,sz){const it=cart.find(c=>c.id==id&&c.sz==sz);it?it.q++:cart.push({id,sz,q:1});save();render();toast("Added to cart");const c=$("count");c.classList.remove("bump");c.offsetWidth;c.classList.add("bump")}
function totals(){const sub=cart.reduce((s,c)=>s+P.find(p=>p.id==c.id).p*SZ[c.sz]*c.q,0),disc=promo?sub*.1:0,ship=sub-disc>=999||!sub?0:79;return{sub,disc,ship,tot:sub-disc+ship}}
function render(){
 $("count").textContent=cart.reduce((s,c)=>s+c.q,0);
 $("items").innerHTML=cart.length?cart.map((c,i)=>{const p=P.find(x=>x.id==c.id);return `<div class="it">${art(p)}<div><b>${p.n}</b><small>${c.sz} · ${inr(p.p*SZ[c.sz])}</small><div class="qty"><button data-d="${i}" data-v="-1" aria-label="Decrease">−</button>${c.q}<button data-d="${i}" data-v="1" aria-label="Increase">+</button></div></div><div><b>${inr(p.p*SZ[c.sz]*c.q)}</b><br><button class="rm" data-r="${i}">Remove</button></div></div>`}).join(""):`<div class="empty">Your cart is empty.<br>Add a sticker to get started.</div>`;
 const t=totals(),left=Math.max(0,999-(t.sub-t.disc));
 $("sum").innerHTML=cart.length?`<small>${left?`Add ${inr(left)} more for free shipping`:"You’ve unlocked free shipping"}</small><div class="ship"><i style="width:${Math.min(100,(t.sub-t.disc)/9.99)}%"></i></div>
 <div class="promo"><input id="pc" placeholder="Promo code" value="${promo?"PEEL10":""}"><button class="chip" id="pa">Apply</button></div>
 <div><span>Subtotal</span><span>${inr(t.sub)}</span></div>${promo?`<div><span>Discount (10%)</span><span>−${inr(t.disc)}</span></div>`:""}<div><span>Shipping</span><span>${t.ship?inr(t.ship):"Free"}</span></div><div class="tot"><span>Total</span><span>${inr(t.tot)}</span></div>
 <button class="btn" id="co" style="width:100%;margin-top:12px">Checkout</button>`:"";
 $("items").querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{const c=cart[b.dataset.d];c.q+=+b.dataset.v;if(c.q<1)cart.splice(b.dataset.d,1);save();render()});
 $("items").querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{cart.splice(b.dataset.r,1);save();render()});
 if($("pa"))$("pa").onclick=()=>{if($("pc").value.trim().toUpperCase()=="PEEL10"){promo=true;toast("Code applied: 10% off")}else{promo=false;toast("That code isn’t valid. Try PEEL10")}render()};
 if($("co"))$("co").onclick=checkout}
function open(on){$("drawer").classList.toggle("on",on);$("ov").classList.toggle("on",on)}
function checkout(){const t=totals();open(false);$("ov").classList.add("on");$("modal").classList.add("on");
 $("modal").innerHTML=`<h2>Delivery details</h2><form id="cf"><input required placeholder="Full name"><input required type="email" placeholder="Email"><input required placeholder="Address"><input required pattern="[0-9]{6}" placeholder="PIN code" inputmode="numeric"><button class="btn" type="submit">Place order · ${inr(t.tot)}</button></form><p style="color:var(--mute);font-size:13px">Demo store: no payment is taken.</p>`;
 $("cf").onsubmit=e=>{e.preventDefault();const n="PL"+Math.floor(10000+Math.random()*90000);cart=[];promo=false;save();render();
  $("modal").innerHTML=`<div class="done">${art(P[4])}<h2 style="margin:14px 0 8px">Order placed</h2><p>Your order <b>#${n}</b> is confirmed. We’ve sent the details to your email.</p><button class="btn" id="ok">Keep browsing</button></div>`;$("ok").onclick=closeAll}}
function closeAll(){open(false);$("modal").classList.remove("on")}
$("cartBtn").onclick=()=>open(true);$("close").onclick=closeAll;$("ov").onclick=closeAll;
document.addEventListener("keydown",e=>{if(e.key=="Escape")closeAll()});
let tt;function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2000)}
$("nf").onsubmit=e=>{e.preventDefault();promo=false;toast("Your code is PEEL10. Apply it in the cart");e.target.reset()};
$("theme").onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};
chips();grid();render();
