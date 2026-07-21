// ==========================================
// Hintergrund je nach Gerät
// ==========================================

function updateBackground() {
    const bg = document.getElementById("background");

    if (!bg) return;

    if (window.innerWidth <= 767) {
        bg.src = "bilder/startseite-handy.jpg";
    } else if (window.innerWidth <= 1199) {
        bg.src = "bilder/startseite-tablet.jpg";
    } else {
        bg.src = "bilder/startseite.png";
    }
}

// ==========================================
// Steffis 40 - VHS Intro
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    updateBackground();
    window.addEventListener("resize", updateBackground);

    const noise = document.getElementById("noise");
    const tracking = document.getElementById("tracking");
    const videoContainer = document.getElementById("video");
    const welcome = document.getElementById("welcome");
    const intro = document.getElementById("intro");
    const bgMusic = document.getElementById("bgMusic");

    // VHS-Rauschen einschalten
    setTimeout(() => {
        noise.style.opacity = "1";
        tracking.style.opacity = "1";
    }, 500);

    // Intro starten
    setTimeout(() => {

        videoContainer.innerHTML = `
            <video id="introMovie" autoplay muted playsinline>
                <source src="videos/intro.mp4" type="video/mp4">
            </video>

            <div id="slideshow">
                <img id="slide" src="" alt="Erinnerungen">
            </div>
        `;

        videoContainer.style.opacity = "1";

        const movie = document.getElementById("introMovie");
        const slide = document.getElementById("slide");

        if (bgMusic) {
            bgMusic.volume = 0.3;
        }

        const bilder = [
            "bilder/01.jpg",
            "bilder/02.jpg",
            "bilder/03.jpg",
            "bilder/04.jpg",
            "bilder/05.jpg",
            "bilder/06.jpg",
            "bilder/07.jpg",
            "bilder/08.jpg",
            "bilder/09.jpg",
            "bilder/10.jpg",
            "bilder/11.jpg",
            "bilder/12.jpg",
            "bilder/13.jpg",
            "bilder/14.jpg",
            "bilder/15.jpg",
            "bilder/16.jpg"
        ];

        movie.style.width = "100%";
        movie.style.height = "100%";
        movie.style.objectFit = "cover";

        movie.play();

        let index = 0;

        function zeigeBild() {

            if (index >= bilder.length) {
                slide.classList.remove("show");
                return;
            }

            slide.src = bilder[index];
            slide.classList.add("show");

            setTimeout(() => {

                slide.classList.remove("show");

                setTimeout(() => {
                    index++;
                    zeigeBild();
                }, 400);

            }, 1800);
        }

        setTimeout(() => {

            zeigeBild();

            if (bgMusic) {
                bgMusic.volume = 0.3;
                bgMusic.play().catch(err => console.log(err));
            }

        }, 2000);

        movie.addEventListener("ended", () => {

            if (bgMusic) {

                const fade = setInterval(() => {

                    if (bgMusic.volume > 0.03) {
                        bgMusic.volume -= 0.03;
                    } else {
                        clearInterval(fade);
                        bgMusic.pause();
                        bgMusic.currentTime = 0;
                    }

                }, 100);

            }

            intro.style.transition = "opacity 1.5s ease";
            intro.style.opacity = "0";

            setTimeout(() => {

                intro.style.display = "none";
                welcome.classList.add("show");

            }, 1500);

        });

    }, 1500);

});

/* ============================
   Countdown bis 22.12.2026
============================ */

const timer = document.getElementById("timer");

if (timer) {

    const eventDate = new Date("2026-12-22T18:00:00");

    function updateCountdown() {

        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            timer.innerHTML = "🎉 Heute ist es endlich soweit! 🎉";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        timer.innerHTML =
            `<strong>${days}</strong> Tage<br>
             <strong>${hours}</strong> Stunden<br>
             <strong>${minutes}</strong> Minuten<br>
             <strong>${seconds}</strong> Sekunden`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ============================
   Antwort per E-Mail
============================ */

const mailButton = document.getElementById("mailButton");

if (mailButton) {

    mailButton.addEventListener("click", () => {

        const name = document.getElementById("name").value;

        const status =
            document.querySelector('input[name="status"]:checked').value;

        const message =
            document.getElementById("message").value;

        const subject = "Antwort auf Steffis Geburtstagseinladung";

        const body =
`Name: ${name}

Antwort:
${status}

Nachricht:
${message}`;

        window.location.href =
            `mailto:bettihro-w2499@hotmail.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    });

}

// ============================
// Button zur Einladung
// ============================

const startButton = document.getElementById("startInvitation");

if (startButton) {

    startButton.addEventListener("click", () => {

        window.location.href = "einladung.html";

    });

}
