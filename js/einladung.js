/* =====================================================
   STEFFIS ZEITREISE
   Einladung.js
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    startCountdown();
    initAnimations();
    initForm();

});


/* =====================================================
   COUNTDOWN
===================================================== */

function startCountdown() {

    const targetDate = new Date("2026-12-22T17:00:00").getTime();

    const countdownDisplay = document.getElementById("countdown-display");

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    function updateCountdown() {

        const now = new Date().getTime();

        const distance = targetDate - now;

        if (distance <= 0) {

            clearInterval(timer);

            countdownDisplay.innerHTML = `
                <h2>🎉 Die Zeitreise beginnt jetzt!</h2>
            `;

            return;

        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));

        const h = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const m = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const s = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        days.textContent = String(d).padStart(2, "0");
        hours.textContent = String(h).padStart(2, "0");
        minutes.textContent = String(m).padStart(2, "0");
        seconds.textContent = String(s).padStart(2, "0");

    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

}
/* =====================================================
   SCROLL ANIMATIONEN
===================================================== */

function initAnimations() {

    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: 0.15

    });

    cards.forEach(card => {

        card.classList.add("hidden");

        observer.observe(card);

    });

}


/* =====================================================
   HOVER EFFEKTE
===================================================== */

document.addEventListener("mouseover", (event) => {

    const card = event.target.closest(".card");

    if (!card) return;

    card.style.transform = "translateY(-5px)";

});

document.addEventListener("mouseout", (event) => {

    const card = event.target.closest(".card");

    if (!card) return;

    card.style.transform = "";

});


/* =====================================================
   BUTTON KLICK EFFEKT
===================================================== */

document.querySelectorAll(".submit-btn, .maps-button").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.97)";

        setTimeout(() => {

            button.style.transform = "";

        }, 150);

    });

});
/* =====================================================
   RSVP FORMULAR
===================================================== */

function initForm() {

    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const teilnahme = document.querySelector(
            'input[name="teilnahme"]:checked'
        );

        if (name === "") {

            alert("Bitte gib deinen Namen ein.");

            document.getElementById("name").focus();

            return;

        }

        if (!teilnahme) {

            alert("Bitte gib an, ob ihr dabei seid.");

            return;

        }

        showConfirmation(name);

    });

}


/* =====================================================
   BESTÄTIGUNG
===================================================== */

function showConfirmation(name) {

    alert(

        "Vielen Dank, " +
        name +
        "!\n\n" +
        "Eure Rückmeldung wurde vorbereitet.\n\n" +
        "Wir freuen uns riesig auf einen wunderschönen Abend mit euch! ❤️"

    );

}


/* =====================================================
   EINGABEFELDER
===================================================== */

document.querySelectorAll("input, textarea, select").forEach(field => {

    field.addEventListener("focus", () => {

        field.parentElement.classList.add("active");

    });

    field.addEventListener("blur", () => {

        field.parentElement.classList.remove("active");

    });

});
/* =====================================================
   SANFTES SCROLLEN
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});


/* =====================================================
   KLEINE KARTEN-ANIMATION
===================================================== */

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = "0.3s";

        card.style.boxShadow =
            "0 15px 35px rgba(94,234,212,.20)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "";

    });

});


/* =====================================================
   BUTTON RIPPLE
===================================================== */

document.querySelectorAll(".submit-btn, .maps-button").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = diameter + "px";
        circle.style.height = diameter + "px";

        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        circle.style.background = "rgba(255,255,255,.35)";
        circle.style.pointerEvents = "none";

        circle.style.left =
            e.offsetX - diameter / 2 + "px";

        circle.style.top =
            e.offsetY - diameter / 2 + "px";

        circle.style.transform = "scale(0)";
        circle.style.transition = "transform .6s, opacity .6s";

        this.style.position = "relative";
        this.style.overflow = "hidden";

        this.appendChild(circle);

        requestAnimationFrame(() => {

            circle.style.transform = "scale(4)";
            circle.style.opacity = "0";

        });

        setTimeout(() => {

            circle.remove();

        }, 600);

    });

});
/* =====================================================
   ZEITKAPSEL (Vorbereitung)
===================================================== */

function initTimeCapsule() {

    const unlockDate = new Date("2026-12-24T00:00:00").getTime();

    const capsule = document.querySelector(".capsule-card");

    if (!capsule) return;

    const now = new Date().getTime();

    if (now >= unlockDate) {

        capsule.classList.add("unlocked");

    }

}

initTimeCapsule();


/* =====================================================
   TASTATUR-NAVIGATION
===================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        document.activeElement.blur();

    }

});


/* =====================================================
   KONSOLE
===================================================== */

console.clear();

console.log("%c📼 Steffis Zeitreise", "font-size:22px;color:#8b5cf6;font-weight:bold;");
console.log("%cWillkommen auf der Einladung.", "color:#5eead4;");
console.log("%cMade with ❤️ für Steffi & Christian", "color:#ffffff;");


/* =====================================================
   INITIALISIERUNG
===================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log("Seite erfolgreich geladen.");

});