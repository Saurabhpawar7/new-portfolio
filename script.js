/* =========================================
   NAVBAR: sliding pill + active section
========================================= */
const navLinks = document.getElementById("navLinks");
const navPill = document.getElementById("navPill");
const links = [...navLinks.querySelectorAll("a")];
let activeLink = null;

function movePill(link) {
    if (!link) {
        navPill.style.opacity = 0;
        return;
    }
    navPill.style.opacity = 1;
    navPill.style.width = link.offsetWidth + "px";
    navPill.style.transform = "translateX(" + link.offsetLeft + "px)";
}

function setActive(link) {
    activeLink = link;
    links.forEach(function (l) { l.classList.toggle("active", l === link); });
    movePill(link);
    if (link) {
        // keep the active link visible when the bar scrolls on small screens
        link.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
}

links.forEach(function (link) {
    link.addEventListener("mouseenter", function () { movePill(link); });
});
navLinks.addEventListener("mouseleave", function () { movePill(activeLink); });
window.addEventListener("resize", function () { movePill(activeLink); });

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            setActive(navLinks.querySelector('a[href="#' + entry.target.id + '"]'));
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

document.querySelectorAll("section[id]").forEach(function (s) { sectionObserver.observe(s); });

// Clear highlight when back in the hero
window.addEventListener("scroll", function () {
    if (window.scrollY < window.innerHeight * 0.4 && activeLink) setActive(null);
}, { passive: true });


/* =========================================
   SCROLL PROGRESS BAR
========================================= */
const progress = document.getElementById("progress");

function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();


/* =========================================
   SCROLL REVEAL
========================================= */
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal, .stagger").forEach(function (el) { revealObserver.observe(el); });


/* =========================================
   TYPING EFFECT (hero role)
========================================= */
const typed = document.getElementById("typed");
const roles = ["Java Full Stack Developer", "AI & ML Enthusiast", "Problem Solver"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
    typed.textContent = roles[0];
} else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    (function type() {
        const word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        typed.textContent = word.slice(0, charIndex);

        let delay = deleting ? 35 : 75;

        if (!deleting && charIndex === word.length) {
            deleting = true;
            delay = 1800;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }
        setTimeout(type, delay);
    })();
}


/* =========================================
   CARD SPOTLIGHT (follows cursor)
========================================= */
document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
    });
});


/* =========================================
   BACKGROUND MUSIC
========================================= */
const music = document.getElementById("music");
const musicSwitch = document.getElementById("musicSwitch");

function setMusicUI(on) {
    musicSwitch.classList.toggle("active", on);
    musicSwitch.setAttribute("aria-pressed", on);
}

musicSwitch.addEventListener("click", function () {
    if (!music.paused) {
        music.pause();
        setMusicUI(false);
    } else {
        music.play().then(function () { setMusicUI(true); }).catch(function () { setMusicUI(false); });
    }
});


/* =========================================
   DARK / LIGHT MODE (remembered)
========================================= */
const themeSwitch = document.getElementById("themeSwitch");

function setTheme(light) {
    document.body.classList.toggle("light", light);
    themeSwitch.textContent = light ? "☀" : "☾";
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved === "light");

themeSwitch.addEventListener("click", function () {
    setTheme(!document.body.classList.contains("light"));
});
