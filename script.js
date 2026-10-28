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
