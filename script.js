document.addEventListener("DOMContentLoaded", () => {

    // منوی موبایل
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }


    // اسکرول نرم
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (navLinks) {
                    navLinks.classList.remove("open");
                }
            }
        });

    });

});
