document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // MOBILE MENU
    // =========================

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

    }


    // =========================
    // SMOOTH SCROLL
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // بستن منوی موبایل بعد از انتخاب
                if (navLinks) {
                    navLinks.classList.remove("open");
                }
            }

        });

    });


    // =========================
    // CLOSE MOBILE MENU
    // =========================

    document.addEventListener("click", (event) => {

        if (!navLinks || !menuButton) {
            return;
        }

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            navLinks.classList.remove("open");
        }

    });


    // =========================
    // ESC KEY CLOSES MENU
    // =========================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && navLinks) {
            navLinks.classList.remove("open");
        }

    });

});
