// Neural network background: nodes drift, link up, and react to the cursor
(function(){
  var cv=document.getElementById("neural"),cx=cv.getContext("2d"),W,H,dpr,nodes=[];
  var m={x:-9999,y:-9999},R=170,D=140,still=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function off(){return matchMedia("(max-width: 760px), (pointer: coarse)").matches;}
  var running=false;
  function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim();}
  function rgba(c,a){var h=c.replace("#","");if(h.length===3)h=h.replace(/./g,"$&$&");return "rgba("+parseInt(h.slice(0,2),16)+","+parseInt(h.slice(2,4),16)+","+parseInt(h.slice(4,6),16)+","+a+")";}
  function size(){
    dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
    cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.min(85,Math.round(W*H/16000));
    while(nodes.length<n)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:1.5+Math.random()*1.6});
    nodes.length=n;
  }
  function frame(){
    cx.clearRect(0,0,W,H);
    if(off()){running=false;return;}
    running=true;
    var ink=css("--ink")||"#0b1220",acc=css("--accent")||"#1f7ae0";
    for(var i=0;i<nodes.length;i++){
      var a=nodes[i];
      if(!still){
        var dx=a.x-m.x,dy=a.y-m.y,d=Math.hypot(dx,dy);
        if(d<R&&d>0){var f=(1-d/R)*.9;a.x+=dx/d*f;a.y+=dy/d*f;}
        a.x+=a.vx;a.y+=a.vy;
        if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
      }
      for(var j=i+1;j<nodes.length;j++){
        var b=nodes[j],l=Math.hypot(a.x-b.x,a.y-b.y);
        if(l<D){cx.strokeStyle=rgba(ink,(1-l/D)*.1);cx.lineWidth=1;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke();}
      }
      var c=Math.hypot(a.x-m.x,a.y-m.y),near=c<R;
      if(near){cx.strokeStyle=rgba(acc,(1-c/R)*.8);cx.lineWidth=1.3;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(m.x,m.y);cx.stroke();}
      cx.fillStyle=rgba(acc,near?.95:.45);
      cx.beginPath();cx.arc(a.x,a.y,a.r+(near?(1-c/R)*2.2:0),0,6.283);cx.fill();
    }
    if(!still)requestAnimationFrame(frame);
  }
  addEventListener("pointermove",function(e){m.x=e.clientX;m.y=e.clientY;},{passive:true});
  addEventListener("pointerleave",function(){m.x=m.y=-9999;});
  addEventListener("pointerup",function(e){if(e.pointerType!=="mouse"){m.x=m.y=-9999;}});
  addEventListener("resize",function(){size();if(!off()&&(still||!running))frame();});
  size();frame();
})();

// Scroll reveal
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.1});
document.querySelectorAll(".rv").forEach(function(el){io.observe(el);});

// Highlight current section in navbar
var links=[].slice.call(document.querySelectorAll(".links a"));
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id);});}});},{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("section[id]").forEach(function(s){so.observe(s);});

// Theme toggle (remembers choice when storage is available)
var root=document.documentElement;
try{var saved=localStorage.getItem("theme");if(saved)root.setAttribute("data-theme",saved);}catch(e){}
document.getElementById("theme").addEventListener("click",function(){
  var dark=root.getAttribute("data-theme")==="dark"||(!root.getAttribute("data-theme")&&matchMedia("(prefers-color-scheme: dark)").matches);
  var next=dark?"light":"dark";root.setAttribute("data-theme",next);
  try{localStorage.setItem("theme",next);}catch(e){}
});
