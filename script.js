/* =========================================================
   GANJNAMEH IRAN
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.querySelector(".menu-button");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuButton && mobileNav) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.toggle("is-open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        mobileNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("is-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const id = link.getAttribute("href");

                if (!id || id === "#") {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header =
                    document.querySelector(".site-header");

                const offset =
                    header ? header.offsetHeight : 0;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       MAP SETTINGS
    ===================================================== */

    const mapElement =
        document.querySelector("#iran-map");

    const provinceNameElement =
        document.querySelector("#province-name");

    const provinceDescription =
        document.querySelector("#province-description");

    const provinceStatus =
        document.querySelector("#province-status");

    const provinceButton =
        document.querySelector("#province-button");


    const ACTIVE_PROVINCES = [
        "تهران",
        "اصفهان",
        "هرمزگان"
    ];


    const provinceInfo = {

        "تهران": {
            stages: 8,
            description:
                "از قلب پایتخت، سرنخ‌های تازه‌ای از گنج‌نامه آغاز می‌شوند."
        },

        "اصفهان": {
            stages: 8,
            description:
                "در میان معماری، هنر و داستان‌های اصفهان، بخشی از راز گنج‌نامه پنهان شده است."
        },

        "هرمزگان": {
            stages: 8,
            description:
                "صدای خلیج فارس و فرهنگ جنوب، مسیر تازه‌ای از ماجراجویی را آشکار می‌کند."
        }

    };


    /* =====================================================
       NORMALIZE TEXT
    ===================================================== */

    function normalizeText(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        return String(value)

            .replace(/ي/g, "ی")
            .replace(/ى/g, "ی")
            .replace(/ك/g, "ک")

            .replace(/\u200c/g, " ")
            .replace(/\u200f/g, "")
            .replace(/\u200e/g, "")

            .replace(/استان/g, "")

            .replace(/\s+/g, " ")

            .trim();
    }


    /* =====================================================
       ENGLISH -> PERSIAN PROVINCE NAMES
    ===================================================== */

    const englishProvinceNames = {

        "tehran": "تهران",

        "isfahan": "اصفهان",
        "esfahan": "اصفهان",

        "hormozgan": "هرمزگان",

        "alborz": "البرز",

        "ardabil": "اردبیل",

        "bushehr": "بوشهر",
        "boushehr": "بوشهر",

        "chaharmahal and bakhtiari":
            "چهارمحال و بختیاری",

        "east azerbaijan":
            "آذربایجان شرقی",

        "west azerbaijan":
            "آذربایجان غربی",

        "fars": "فارس",

        "gilan": "گیلان",
        "guilan": "گیلان",

        "golestan": "گلستان",

        "hamadan": "همدان",
        "hamedan": "همدان",

        "ilam": "ایلام",

        "kerman": "کرمان",

        "kermanshah": "کرمانشاه",

        "khuzestan": "خوزستان",

        "kohgiluyeh and boyer-ahmad":
            "کهگیلویه و بویراحمد",

        "kurdistan": "کردستان",

        "lorestan": "لرستان",

        "markazi": "مرکزی",

        "mazandaran": "مازندران",

        "north khorasan":
            "خراسان شمالی",

        "razavi khorasan":
            "خراسان رضوی",

        "south khorasan":
            "خراسان جنوبی",

        "qazvin": "قزوین",

        "qom": "قم",

        "semnan": "سمنان",

        "sistan and baluchestan":
            "سیستان و بلوچستان",

        "yazd": "یزد",

        "zanjan": "زنجان"
    };


    /* =====================================================
       FIND PROVINCE NAME
    ===================================================== */

    function getProvinceName(feature) {

        if (!feature || !feature.properties) {
            return "";
        }

        const properties = feature.properties;


        /*
         * اول تمام مقادیر properties را بررسی می‌کنیم.
         * این باعث می‌شود به اسم خاص یک فیلد وابسته نباشیم.
         */

        for (const value of Object.values(properties)) {

            if (
                typeof value !== "string" &&
                typeof value !== "number"
            ) {
                continue;
            }

            const normalized =
                normalizeText(value);


            /* Persian */

            const allPersianNames = [
                "تهران",
                "اصفهان",
                "هرمزگان",
                "البرز",
                "اردبیل",
                "بوشهر",
                "چهارمحال و بختیاری",
                "آذربایجان شرقی",
                "آذربایجان غربی",
                "فارس",
                "گیلان",
                "گلستان",
                "همدان",
                "ایلام",
                "کرمان",
                "کرمانشاه",
                "خوزستان",
                "کهگیلویه و بویراحمد",
                "کردستان",
                "لرستان",
                "مرکزی",
                "مازندران",
                "خراسان شمالی",
                "خراسان رضوی",
                "خراسان جنوبی",
                "قزوین",
                "قم",
                "سمنان",
                "سیستان و بلوچستان",
                "یزد",
                "زنجان"
            ];


            for (const province of allPersianNames) {

                if (
                    normalized === province ||
                    normalized.includes(province)
                ) {
                    return province;
                }

            }


            /* English */

            const english =
                normalized.toLowerCase();


            for (
                const [key, persian]
                of Object.entries(
                    englishProvinceNames
                )
            ) {

                if (
                    english === key ||
                    english.includes(key)
                ) {
                    return persian;
                }

            }

        }


        return "";
    }


    /* =====================================================
       SHOW PROVINCE INFO
    ===================================================== */

    function showProvince(name) {

        if (!name) {

            provinceNameElement.textContent =
                "استان‌های ایران";

            provinceDescription.textContent =
                "هر گوشه از ایران داستانی برای شنیدن دارد.";

            provinceStatus.textContent =
                "این سرزمین به‌زودی کشف خواهد شد...";

            provinceButton.disabled = true;

            provinceButton.textContent =
                "به‌زودی";

            delete provinceButton.dataset.province;

            return;
        }


        const active =
            ACTIVE_PROVINCES.includes(name);


        provinceNameElement.textContent = name;


        if (active) {

            const info =
                provinceInfo[name];

            provinceDescription.textContent =
                info.description;

            provinceStatus.textContent =
                `${info.stages} مرحله آماده کشف`;

            provinceButton.disabled = false;

            provinceButton.textContent =
                `ورود به ${name}`;

            provinceButton.dataset.province =
                name;

        } else {

            provinceDescription.textContent =
                "این بخش از ایران هنوز در حال آماده‌سازی برای سفر گنج‌نامه است.";

            provinceStatus.textContent =
                "این سرزمین به‌زودی کشف خواهد شد...";

            provinceButton.disabled = true;

            provinceButton.textContent =
                "به‌زودی";

            delete provinceButton.dataset.province;
        }

    }


    /* =====================================================
       CREATE MAP
    ===================================================== */

    async function createIranMap() {

        if (!mapElement) {
            console.error(
                "Element #iran-map was not found."
            );
            return;
        }


        /*
         * مطمئن می‌شویم D3 واقعاً لود شده.
         */

        if (typeof d3 === "undefined") {

            mapElement.innerHTML = `
                <div class="map-loading">
                    <span class="loading-symbol">!</span>
                    <p>کتابخانه نقشه بارگذاری نشد.</p>
                </div>
            `;

            console.error(
                "D3 library is not loaded."
            );

            return;
        }


        try {

            /*
             * فایل خودت در GitHub:
             *
             * assets/data/iran-provinces.geojson
             */

            const response =
                await fetch(
                    "./assets/data/iran-provinces.geojson",
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `GeoJSON HTTP error: ${response.status}`
                );

            }


            const iranData =
                await response.json();


            /*
             * GeoJSON باید FeatureCollection باشد.
             */

            if (
                !iranData ||
                !Array.isArray(iranData.features) ||
                iranData.features.length === 0
            ) {

                throw new Error(
                    "The GeoJSON does not contain features."
                );

            }


            console.log(
                "Iran GeoJSON loaded:",
                iranData
            );


            console.log(
                "Number of provinces/features:",
                iranData.features.length
            );


            console.log(
                "First feature properties:",
                iranData.features[0]?.properties
            );


            mapElement.innerHTML = "";


            /* =============================================
               SVG SIZE
            ============================================= */

            const width = 900;
            const height = 650;


            const svg =
                d3.select(mapElement)

                    .append("svg")

                    .attr(
                        "viewBox",
                        `0 0 ${width} ${height}`
                    )

                    .attr(
                        "preserveAspectRatio",
                        "xMidYMid meet"
                    )

                    .attr(
                        "role",
                        "img"
                    )

                    .attr(
                        "aria-label",
                        "نقشه استان‌های ایران"
                    );


            /* =============================================
               PROJECTION

               fitExtent خودش نقشه را وسط SVG قرار می‌دهد.
            ============================================= */

            const projection =
                d3.geoMercator()

                    .fitExtent(
                        [
                            [45, 45],
                            [
                                width - 45,
                                height - 45
                            ]
                        ],

                        iranData
                    );


            const geoPath =
                d3.geoPath()
                    .projection(projection);


            /* =============================================
               DRAW PROVINCES
            ============================================= */

            const provinces =
                svg
                    .append("g")

                    .attr(
                        "class",
                        "iran-provinces"
                    )

                    .selectAll("path")

                    .data(
                        iranData.features
                    )

                    .join("path")

                    .attr(
                        "d",
                        geoPath
                    )

                    .attr(
                        "data-province",
                        feature =>
                            getProvinceName(
                                feature
                            )
                    )

                    .attr(
                        "class",
                        feature => {

                            const name =
                                getProvinceName(
                                    feature
                                );

                            const active =
                                ACTIVE_PROVINCES
                                    .includes(name);

                            return active
                                ? "province active"
                                : "province locked";
                        }
                    );


            /* =============================================
               HOVER
            ============================================= */

            provinces.on(
                "mouseenter",
                function(event, feature) {

                    const name =
                        getProvinceName(
                            feature
                        );

                    showProvince(name);

                }
            );


            /* =============================================
               CLICK / TOUCH
            ============================================= */

            provinces.on(
                "click",
                function(event, feature) {

                    event.stopPropagation();


                    const name =
                        getProvinceName(
                            feature
                        );


                    svg
                        .selectAll(
                            ".province"
                        )
                        .classed(
                            "selected",
                            false
                        );


                    if (
                        ACTIVE_PROVINCES
                            .includes(name)
                    ) {

                        d3.select(this)
                            .classed(
                                "selected",
                                true
                            );
                    }


                    showProvince(name);

                }
            );


            /* =============================================
               KEYBOARD
            ============================================= */

            provinces

                .attr(
                    "tabindex",
                    feature => {

                        const name =
                            getProvinceName(
                                feature
                            );

                        return ACTIVE_PROVINCES
                            .includes(name)
                            ? 0
                            : -1;
                    }
                )

                .on(
                    "focus",
                    function(event, feature) {

                        const name =
                            getProvinceName(
                                feature
                            );

                        showProvince(name);
                    }
                );


            /* =============================================
               CLICK EMPTY MAP
            ============================================= */

            svg.on("click", event => {

                if (
                    event.target.tagName
                        .toLowerCase()
                    === "svg"
                ) {

                    svg
                        .selectAll(
                            ".province"
                        )
                        .classed(
                            "selected",
                            false
                        );

                    resetProvincePanel();
                }

            });


            console.log(
                "Iran map successfully created."
            );

        }

        catch (error) {

            console.error(
                "Iran map error:",
                error
            );


            mapElement.innerHTML = `

                <div class="map-loading">

                    <span class="loading-symbol">
                        !
                    </span>

                    <p>
                        نقشه ایران بارگذاری نشد.
                    </p>

                    <small>
                        فایل نقشه پیدا شد اما
                        هنگام خواندن آن مشکلی پیش آمد.
                    </small>

                </div>

            `;
        }

    }


    /* =====================================================
       RESET PANEL
    ===================================================== */

    function resetProvincePanel() {

        if (!provinceNameElement) {
            return;
        }

        provinceNameElement.textContent =
            "یک استان را انتخاب کن";

        provinceDescription.textContent =
            "روی نقشه حرکت کن تا سرزمین‌های ایران را یکی‌یکی کشف کنیم.";

        provinceStatus.textContent =
            "سه مسیر نخست آماده کشف هستند";

        provinceButton.disabled = true;

        provinceButton.textContent =
            "انتخاب استان";

        delete provinceButton.dataset.province;
    }


    /* =====================================================
       PROVINCE BUTTON
    ===================================================== */

    if (provinceButton) {

        provinceButton.addEventListener(
            "click",
            () => {

                const province =
                    provinceButton
                        .dataset
                        .province;


                if (!province) {
                    return;
                }


                /*
                 * بعداً این قسمت به صفحه مخصوص
                 * تهران / اصفهان / هرمزگان وصل می‌شود.
                 */

                const adventure =
                    document.querySelector(
                        "#adventure"
                    );


                if (adventure) {

                    adventure.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       AUDIO BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".audio-button, .hero-audio-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "is-active"
                    );

                }
            );

        });


    /* =====================================================
       START MAP
    ===================================================== */

    createIranMap();

});
