
/* =========================================
   GET ELEMENTS
========================================= */

const hamburger = document.getElementById("hamburger");

const menu = document.getElementById("menu");

const closeMenuButton = document.getElementById("closeMenu");



/* =========================================
   OPEN / CLOSE MENU
========================================= */

hamburger.addEventListener("click", function () {

    menu.classList.toggle("open");

    hamburger.classList.toggle("active");

});



/* =========================================
   CLOSE BUTTON
========================================= */

closeMenuButton.addEventListener("click", function () {

    menu.classList.remove("open");

    hamburger.classList.remove("active");

});



/* =========================================
   CLOSE MENU AFTER CLICKING LINK
========================================= */

const menuLinks = document.querySelectorAll(
    ".menu > a:not(.resume)"
);


menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("open");

        hamburger.classList.remove("active");

    });

});



/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        menu.classList.remove("open");

        hamburger.classList.remove("active");

    }

});



/* =========================================
   BACKGROUND MUSIC
========================================= */

const music = document.getElementById("music");

const musicSwitch =
    document.getElementById("musicSwitch");

const musicText =
    document.getElementById("musicText");


let musicOn = false;


musicSwitch.addEventListener("click", function () {

    if (musicOn) {

        music.pause();

        musicOn = false;

        musicSwitch.classList.remove("active");

        musicText.innerText = "Off";

    } else {

        music.play()
            .then(function () {

                musicOn = true;

                musicSwitch.classList.add("active");

                musicText.innerText = "On";

            })
            .catch(function () {

                musicText.innerText =
                    "Click again";

            });

    }

});



/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeSwitch =
    document.getElementById("themeSwitch");

const themeText =
    document.getElementById("themeText");


let lightMode = false;


themeSwitch.addEventListener("click", function () {

    lightMode = !lightMode;


    if (lightMode) {

        document.body.classList.add("light");

        themeSwitch.classList.add("active");

        themeText.innerText = "Light Mode";

    } else {

        document.body.classList.remove("light");

        themeSwitch.classList.remove("active");

        themeText.innerText = "Dark Mode";

    }

});



/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", function (event) {

    const clickedMenu =
        menu.contains(event.target);

    const clickedButton =
        hamburger.contains(event.target);


    if (
        menu.classList.contains("open") &&
        !clickedMenu &&
        !clickedButton
    ) {

        menu.classList.remove("open");

        hamburger.classList.remove("active");

    }

});

