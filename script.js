/* =========================================================
   GANJNAMEH IRAN
   Main JavaScript
   ========================================================= */


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");


if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileNav.classList.toggle("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "بستن منو"
                : "باز کردن منو"
        );

    });


    /* Close menu after clicking a link */

    const mobileLinks =
        mobileNav.querySelectorAll("a");


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove(
                "is-open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "باز کردن منو"
            );

        });

    });

}


/* =========================
   HEADER SCROLL EFFECT
========================= */

const header =
    document.querySelector(".site-header");


if (header) {

    const updateHeader =
        () => {

            if (window.scrollY > 40) {

                header.classList.add(
                    "is-scrolled"
                );

            } else {

                header.classList.remove(
                    "is-scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================
   SMOOTH NAVIGATION
========================= */

const navigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navigationLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top
                +
                window.scrollY
                -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* =========================
   AUDIO BUTTONS
========================= */

const audioButtons =
    document.querySelectorAll(
        ".audio-button, .hero-audio-button"
    );


audioButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            button.classList.toggle(
                "is-active"
            );


            const active =
                button.classList.contains(
                    "is-active"
                );


            button.setAttribute(
                "aria-pressed",
                active
            );


            /*
             * فعلاً سیستم صوتی واقعی
             * به سایت متصل نشده است.
             *
             * بعداً فایل‌های صوتی بازی
             * در این قسمت قرار می‌گیرند.
             */

        }
    );

});


/* =========================
   MAP BUTTON
========================= */

const mapButton =
    document.querySelector(
        ".map-button"
    );


if (mapButton) {

    mapButton.addEventListener(
        "click",
        () => {

            const mapSection =
                document.querySelector(
                    "#map"
                );


            if (mapSection) {

                mapSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* =========================
   SIMPLE SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .story-section, .audio-step, .team-member"
    );


if (
    "IntersectionObserver" in window &&
    revealElements.length
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });

}


/* =========================
   CURRENT YEAR
========================= */

const yearElements =
    document.querySelectorAll(
        ".footer-copy"
    );


yearElements.forEach((element) => {

    const currentYear =
        new Date().getFullYear();


    element.textContent =
        `© ${currentYear} گنج‌نامه ایران`;

});
