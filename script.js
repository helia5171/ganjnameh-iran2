/* =====================================================
   GANJNAMEH IRAN
===================================================== */


/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.querySelector(".menu-button");

const mobileNav =
    document.querySelector(".mobile-nav");


if (menuButton && mobileNav) {

    menuButton.addEventListener(
        "click",
        () => {

            const open =
                mobileNav.classList.toggle(
                    "is-open"
                );

            menuButton.setAttribute(
                "aria-expanded",
                open
            );

        }
    );


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "is-open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}



/* =========================
   SMOOTH SCROLL
========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute("href");

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
                    document.querySelector(
                        ".site-header"
                    );

                const offset =
                    header
                        ? header.offsetHeight
                        : 0;

                const position =
                    target
                        .getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    offset;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }
        );

    });



/* =====================================================
   IRAN MAP
===================================================== */

const mapElement =
    document.querySelector("#iran-map");


const provinceName =
    document.querySelector("#province-name");


const provinceDescription =
    document.querySelector(
        "#province-description"
    );


const provinceStatus =
    document.querySelector(
        "#province-status"
    );


const provinceButton =
    document.querySelector(
        "#province-button"
    );



/* استان‌هایی که فعلاً داخل بازی هستند */

const activeProvinces = [
    "تهران",
    "اصفهان",
    "هرمزگان"
];



/* اطلاعات استان‌های فعال */

const provinceInformation = {

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



/* =========================
   NORMALIZE PROVINCE NAME
========================= */

function normalizeProvinceName(name) {

    if (!name) {
        return "";
    }


    return String(name)

        .replace(/ي/g, "ی")

        .replace(/ك/g, "ک")

        .replace(/استان/g, "")

        .trim();

}



/* =========================
   FIND NAME IN GEOJSON
========================= */

function getProvinceName(feature) {

    const properties =
        feature.properties || {};


    const possibleKeys = [

        "name_fa",

        "name",

        "NAME_1",

        "province",

        "Province",

        "shapeName",

        "NL_NAME_1",

        "name:fa"

    ];


    for (const key of possibleKeys) {

        if (properties[key]) {

            return normalizeProvinceName(
                properties[key]
            );

        }

    }


    /*
       اگر نام در کلیدهای بالا نبود،
       مقدارهای properties را بررسی می‌کنیم.
    */

    for (const value of Object.values(properties)) {

        const normalized =
            normalizeProvinceName(value);


        if (
            activeProvinces.includes(
                normalized
            )
        ) {

            return normalized;
        }

    }


    return "";
}



/* =========================
   PANEL
========================= */

function showProvince(name, active) {

    if (!name) {

        provinceName.textContent =
            "استان‌های ایران";

        provinceDescription.textContent =
            "هر گوشه از ایران داستانی برای شنیدن دارد.";

        provinceStatus.textContent =
            "این سرزمین به‌زودی کشف خواهد شد...";

        provinceButton.disabled = true;

        provinceButton.textContent =
            "به‌زودی";

        return;

    }


    provinceName.textContent = name;


    if (active) {

        const info =
            provinceInformation[name];


        provinceDescription.textContent =
            info.description;


        provinceStatus.textContent =
            `${info.stages} مرحله آماده کشف`;


        provinceButton.disabled = false;


        provinceButton.textContent =
            `ورود به ${name}`;


        provinceButton.dataset.province =
            name;

    }

    else {

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



/* =========================
   LOAD GEOJSON
========================= */

async function createIranMap() {

    if (!mapElement) {
        return;
    }


    try {

        const response =
            await fetch(
                "assets/data/iran-provinces.geojson"
            );


        if (!response.ok) {

            throw new Error(
                "GeoJSON file could not be loaded."
            );

        }


        const iranData =
            await response.json();



        /* Loading text را پاک می‌کنیم */

        mapElement.innerHTML = "";



        /* SVG */

        const width = 850;

        const height = 650;


        const svg =
            d3.select("#iran-map")

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
                    "aria-label",
                    "نقشه استان‌های ایران"
                );



        /* Projection */

        const projection =
            d3.geoMercator()

                .fitSize(
                    [
                        width - 60,
                        height - 60
                    ],

                    iranData
                );


        const path =
            d3.geoPath()
                .projection(projection);



        /* Provinces */

        svg
            .selectAll("path")

            .data(iranData.features)

            .enter()

            .append("path")

            .attr(
                "d",
                path
            )

            .attr(
                "class",
                feature => {

                    const name =
                        getProvinceName(
                            feature
                        );


                    const active =
                        activeProvinces.includes(
                            name
                        );


                    return active
                        ? "province active"
                        : "province locked";

                }
            )

            .attr(
                "data-name",
                feature =>
                    getProvinceName(feature)
            )

            .attr(
                "tabindex",
                feature => {

                    const name =
                        getProvinceName(
                            feature
                        );

                    return activeProvinces
                        .includes(name)
                        ? 0
                        : -1;

                }
            )



            /* Hover */

            .on(
                "mouseenter",
                function (
                    event,
                    feature
                ) {

                    const name =
                        getProvinceName(
                            feature
                        );


                    const active =
                        activeProvinces.includes(
                            name
                        );


                    showProvince(
                        name,
                        active
                    );

                }
            )



            /* Keyboard */

            .on(
                "focus",
                function (
                    event,
                    feature
                ) {

                    const name =
                        getProvinceName(
                            feature
                        );


                    const active =
                        activeProvinces.includes(
                            name
                        );


                    showProvince(
                        name,
                        active
                    );

                }
            )



            /* Click / mobile tap */

            .on(
                "click",
                function (
                    event,
                    feature
                ) {

                    const name =
                        getProvinceName(
                            feature
                        );


                    const active =
                        activeProvinces.includes(
                            name
                        );


                    svg
                        .selectAll(
                            ".province"
                        )

                        .classed(
                            "selected",
                            false
                        );


                    if (active) {

                        d3.select(this)
                            .classed(
                                "selected",
                                true
                            );

                    }


                    showProvince(
                        name,
                        active
                    );

                }
            );



        /*
           اگر کاربر موس را از کل نقشه خارج کرد
           پنل به حالت اولیه برمی‌گردد.
        */

        svg.on(
            "mouseleave",
            () => {

                if (
                    !document.querySelector(
                        ".province.selected"
                    )
                ) {

                    provinceName.textContent =
                        "یک استان را انتخاب کن";


                    provinceDescription.textContent =
                        "روی نقشه حرکت کن تا سرزمین‌های ایران را یکی‌یکی کشف کنیم.";


                    provinceStatus.textContent =
                        "سه مسیر نخست آماده کشف هستند";


                    provinceButton.disabled =
                        true;


                    provinceButton.textContent =
                        "انتخاب استان";

                }

            }
        );


    }

    catch (error) {

        console.error(error);


        mapElement.innerHTML = `

            <div class="map-loading">

                <span class="loading-symbol">
                    !
                </span>

                <p>
                    نقشه ایران بارگذاری نشد.
                </p>

                <small>
                    مسیر فایل iran-provinces.geojson را بررسی کن.
                </small>

            </div>

        `;

    }

}



/* Run map */

createIranMap();



/* =========================
   PROVINCE BUTTON
========================= */

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
               فعلاً صفحه جدا برای استان‌ها
               نساخته‌ایم.

               مرحله بعد این دکمه را
               به صفحه استان وصل می‌کنیم.
            */

            const adventure =
                document.querySelector(
                    "#adventure"
                );


            if (adventure) {

                adventure.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}



/* =========================
   AUDIO BUTTON
========================= */

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
