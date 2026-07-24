// ==========================================
// Hintergrund und Fernseher positionieren
// ==========================================

function updateBackground() {
    const background = document.getElementById("background");

    if (!background) return;

    const isMobile = window.innerWidth <= 767;

    const newSource = isMobile
        ? "bilder/startseite-handy.jpg"
        : "bilder/startseite.png";

    /*
     * Das Bild nur neu laden, wenn sich die Datei wirklich ändert.
     */
    if (!background.src.endsWith(newSource)) {
        background.src = newSource;
    }

    /*
     * Falls das Bild bereits geladen ist, direkt positionieren.
     */
    if (background.complete && background.naturalWidth > 0) {
        positionVideoOnTelevision();
    }
}


function positionVideoOnTelevision() {
    const background = document.getElementById("background");
    const television = document.getElementById("tv");

    if (!background || !television) return;

    if (!background.naturalWidth || !background.naturalHeight) return;

    const intro = document.getElementById("intro");

    if (!intro) return;
    
    const introRect = intro.getBoundingClientRect();
    
    const viewportWidth = introRect.width;
    const viewportHeight = introRect.height;

    const imageRatio =
        background.naturalWidth / background.naturalHeight;

    const viewportRatio =
        viewportWidth / viewportHeight;

    let renderedWidth;
    let renderedHeight;
    let imageLeft;
    let imageTop;

    /*
     * Berechnet die tatsächliche Größe des Hintergrundbildes
     * entsprechend object-fit: cover.
     */
    if (viewportRatio > imageRatio) {
        renderedWidth = viewportWidth;
        renderedHeight = viewportWidth / imageRatio;

        imageLeft = 0;
        imageTop = (viewportHeight - renderedHeight) / 2;
    } else {
        renderedHeight = viewportHeight;
        renderedWidth = viewportHeight * imageRatio;

        imageTop = 0;
        imageLeft = (viewportWidth - renderedWidth) / 2;
    }

    /*
     * Hintergrund exakt auf die berechnete Fläche setzen.
     */
    background.style.position = "absolute";
    background.style.inset = "auto";
    background.style.left = "50%";
    background.style.top = "50%";
    background.style.transform = "translate(-50%, -50%)";
    background.style.width = `${renderedWidth}px`;
    background.style.height = `${renderedHeight}px`;
    background.style.maxWidth = "none";
    background.style.objectFit = "fill";
    background.style.display = "block";

    const isMobile = viewportWidth <= 767;

    /*
     * Position des TV-Bildschirms innerhalb der beiden Bilder.
     */
    const tvPosition = isMobile
        ? {
            left: 0.253,
            top: 0.215,
            width: 0.524,
            height: 0.226
        }
        : {
            left: 0.332,
            top: 0.17,
            width: 0.313,
            height: 0.397
        };

    /*
     * Fernseher relativ zum tatsächlich sichtbaren Bild positionieren.
     */
    television.style.position = "absolute";
    television.style.transform = "none";

    television.style.left =
        `${imageLeft + renderedWidth * tvPosition.left}px`;

    television.style.top =
        `${imageTop + renderedHeight * tvPosition.top}px`;

    television.style.width =
        `${renderedWidth * tvPosition.width}px`;

    television.style.height =
        `${renderedHeight * tvPosition.height}px`;
}

// ==========================================
// Steffis 40 - VHS Intro
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const background = document.getElementById("background");

if (background) {
    background.addEventListener("load", () => {
        positionVideoOnTelevision();
    });
}

updateBackground();

window.addEventListener("resize", () => {
    updateBackground();
    positionVideoOnTelevision();
});

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
