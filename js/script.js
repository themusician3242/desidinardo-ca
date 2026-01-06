import {works1Content1, works1Content2, works3Content1, works3Content2, museCarousel, museSectionCollage,
    poem_titles, poem_1, poem_2, poem_3, poem_4, poem_5, poem_6, poem_7, poem_8, poem_9, poem_10, poem_11, poem_12
} from "./library.js";

window.addEventListener("DOMContentLoaded", () => {
    // Imagine This As The Equivalent of class main() in Python: 
    /* The function checks if a page is running. If that page is running, it only executes a particular set of code,
    so that only that code runs. It's a great way to both organize code onto one javascript file and have running,
    effective code. 

    */

    // Global Variables 
    const page = document.body.dataset.page;
    console.log(`${page}`);

    switch (page) {
        case "index":
            runIndexPage();
            break;
        case "works":
            runWorksPage();
            break;
        case "publications":
            runPublicationsPage();
            break;
        case "muse":
            runMusePage();
            break;
        default:
    }
    
    /* Header & Header Sidebar Functions: */
    const headerSidebar = document.querySelector('.header-sidebar');
    const menuIcon = document.getElementById('menu-icon');
    const header_closeButton = document.getElementById('headerCloseButton');

    // Event Listeners
    menuIcon.addEventListener("click", () => {
        headerSidebar.classList.add("is-open");
        console.log("Menu Icon Clicked");
    })
    header_closeButton.addEventListener("click", () => {
        headerSidebar.classList.remove("is-open");
    });

// WORKS.HTML JavaScript Functions

function runWorksPage() {
    // Works Sidebar
    const worksSidebar = document.getElementById('worksSidebar');
    const worksSidebarButton = document.getElementById('worksSidebarButton');
    let worksSidebarIsOpen = false;

    worksSidebarButton.addEventListener("click", () => {
        if (!worksSidebarIsOpen) {
            worksSidebar.classList.add("is-open");
            worksSidebarIsOpen = true;
            worksSidebarButton.style.transform = "translateX(135px) rotate(180deg)";
        }
        else {
            worksSidebar.classList.remove("is-open");
            worksSidebarIsOpen = false;
            worksSidebarButton.style.transform = "none";
        }
    });

    // Radio Functionality:
    const radios = document.querySelectorAll('input[name="category"]');

    const allWorks = document.querySelectorAll(
        '.works-collab, .works-poetry, .works-books'
    );

    function updateWorksView() {
        const selected = document.querySelector('input[name="category"]:checked')?.id;

        if (!selected) return;

        allWorks.forEach(el => el.style.display = 'none');

        switch (selected) {
            case 'all':
                allWorks.forEach(el => el.style.display = '');
                break;

            case 'collabs':
                document.querySelectorAll('.works-collab').forEach(el => {
                    el.style.display = '';
                });
                break;

            case 'poetry':
                document.querySelectorAll('.works-poetry').forEach(el => { 
                    el.style.display = 'flex';
                });
                break;

            case 'books':
                document.querySelectorAll('.works-books').forEach(el => {
                    el.style.display = '';
                });
                break;
        }
    }

    radios.forEach(radio =>
        radio.addEventListener('change', updateWorksView)
    );

    updateWorksView();


    // Desjardins
    const works1Content = document.getElementById('works1Content');
    const works1btn1 = document.getElementById('works1btn1');
    const works1btn2 = document.getElementById('works1btn2');

    works1btn1.addEventListener("click", () => {
        works1Content.innerHTML = works1Content2;
    });

    works1btn2.addEventListener("click", () => {
        works1Content.innerHTML = works1Content1;
    });
    works1Content.innerHTML = works1Content2;

    // Di Nardo As An Educator 
    const works3Content = document.getElementById("works3Content");
    const works3btn1 = document.getElementById("works3btn1");
    const works3btn2  = document.getElementById("works3btn2");

    works3btn1.addEventListener('click', () => {
        works3Content.innerHTML = works3Content1;
    });

    works3btn2.addEventListener('click', () => {
        works3Content.innerHTML = works3Content2;
    });

    if (window.location.hash === "#works-poetry-parade") {
        const carousel = document.querySelector("#works3Carousel");
        const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);

        const items = carousel.querySelectorAll(".carousel-item");
        items.forEach(item => item.classList.remove("active"));

        document.getElementById("works3PoetryParade").classList.add("active");
         bsCarousel.to(items.length - 3); // optional if it's last
    }

    // Rendering Poem Lines: 
    const poemContainer = document.getElementById("works7Content");
    const poemHeader = document.getElementById('poemHeader');

    const poemPrevBtn = document.getElementById('works7btn1');
    const poemNextBtn = document.getElementById('works7btn2');
    let poemIndex = 0;

    // Poem Library: 
    const poemLibrary = [
        poem_1,
        poem_2,
        poem_3,
        poem_4,
        poem_5,
        poem_6,
        poem_7,
        poem_8,
        poem_9,
        poem_10,
        poem_11,
        poem_12,
    ]

    function renderPoemLines(poemText, container) {
        if (!container) return;

        const oldLines = Array.from(container.children);

        oldLines.forEach((p, index) => {
            p.classList.remove("fade-in-animation");
            p.classList.add("fade-out-animation");
            p.style.animationDelay = `${index * 30}ms`;
        });

        const fadeOutDuration = 400 + oldLines.length * 30;

        setTimeout(() => {
            container.innerHTML = "";

            const lines = poemText
                .trim()
                .split("\n")
                .map(line => line.trim())
                .filter(Boolean);

            lines.forEach((line, index) => {
                const p = document.createElement("p");
                p.textContent = line;
                p.classList.add("poem-line", "fade-in-animation");
                p.style.animationDelay = `${index * 50}ms`;
                container.appendChild(p);
            });
        }, fadeOutDuration);
    }

    poemNextBtn.addEventListener("click", () => {
        poemIndex = (poemIndex + 1) % poem_titles.length;

        poemHeader.textContent = poem_titles[poemIndex];
        renderPoemLines(poemLibrary[poemIndex], poemContainer);

        console.log(`index: ${poemIndex}`);
    });

    poemPrevBtn.addEventListener("click", () => {
        poemIndex = (poemIndex - 1 + poem_titles.length) % poem_titles.length;

        poemHeader.textContent = poem_titles[poemIndex];
        renderPoemLines(poemLibrary[poemIndex], poemContainer);

        console.log(`index: ${poemIndex}`);
    });

    poemHeader.textContent = poem_titles[0];
    renderPoemLines(poemLibrary[0], poemContainer);
}

    // Index.HTML JavaScript Functions:

function runIndexPage() {

    // Switch Image Backgrounds
    const imageCarouselPrevBtn = document.getElementById("imageCarouselPreviousButton");
    const imageCarouselNextBtn = document.getElementById("imageCarouselNextButton");
    const introImageSection = document.getElementById("introImageSection");

    const imageBackgrounds_1 = [
        "images/bio/image-1.jpeg",
        "images/bio/image-2.jpg",
        "images/bio/image-3.jpg",
        "images/bio/image-4.jpeg"
    ];

    let introIndex = 0;

    imageCarouselNextBtn.addEventListener("click", () => {
        introIndex = (introIndex + 1) % imageBackgrounds_1.length;

        introImageSection.style.backgroundImage = `url("${imageBackgrounds_1[introIndex]}")`;
    });

    imageCarouselPrevBtn.addEventListener("click", () => {
        introIndex = (introIndex - 1 + imageBackgrounds_1.length) % imageBackgrounds_1.length;

        introImageSection.style.backgroundImage = `url("${imageBackgrounds_1[introIndex]}")`;
    });

    poetryParadeLink.addEventListener("click", () => {
        changeToPoetryParade();
    });
}

function runPublicationsPage() {
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    const dropdownIcons = document.querySelectorAll('.dropdown-icons');
    const dropdownButtons = document.querySelectorAll('.dropdown-button');

    dropdownButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            dropdownIcons[index].classList.toggle("is-open-2");

            const content = dropdownContents[index];
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });
    
    dropdownContents.forEach((item,index) => {
        item.style.display = "block";
        dropdownIcons[index].classList.add("is-open-2");
    });
}

function runMusePage() {
    const museSection = document.getElementById('museSection');
    const museContent = document.getElementById('museContent');
    const museBtn1 = document.getElementById('museBtn1');
    const museBtn2 = document.getElementById('museBtn2');

    museContent.innerHTML = museSectionCollage;
    
    museBtn1.addEventListener("click", () => {
        museContent.innerHTML = museSectionCollage;
    });

    museBtn2.addEventListener("click", () => {
        museContent.innerHTML = museCarousel;

        setupMuseCarouselBackground();
    });

    function setupMuseCarouselBackground() {
        const museCarouselPrev = document.getElementById('museCarouselPrev');
        const museCarouselNext = document.getElementById('museCarouselNext');

        if (!museCarouselPrev || !museCarouselNext) return;

        let museSectionIndex = 0;

        const museSection_imageLibrary = [
            "images/backgrounds/muse/background-1.gif",
            "images/backgrounds/muse/image-2.avif",
            "images/backgrounds/muse/image-3.avif",
            "images/backgrounds/muse/image-4.jpeg",
            "images/backgrounds/muse/image-5.avif",
            "images/backgrounds/muse/image-6.jpeg",
            "images/backgrounds/muse/image-6.jpeg",
            "images/backgrounds/muse/image-7.jpeg",
            "images/backgrounds/muse/image-8.png"
        ];

        museCarouselNext.addEventListener("click", () => {
            museSectionIndex =
                (museSectionIndex + 1) % museSection_imageLibrary.length;

            museSection.style.backgroundImage =
                `url("${museSection_imageLibrary[museSectionIndex]}")`;
        });

        museCarouselPrev.addEventListener("click", () => {
            museSectionIndex =
                (museSectionIndex - 1 + museSection_imageLibrary.length) %
                museSection_imageLibrary.length;

            museSection.style.backgroundImage =
                `url("${museSection_imageLibrary[museSectionIndex]}")`;
        });
    }
}
});

/* 
 Hero Menu & Jumbotron Effects 
const introductionHero = document.getElementById('introductionHero');
const introHeader = document.getElementById('introHeader');
const introHeaderInner = document.querySelectorAll('#introHeader div a');
const introLine = document.querySelector('#introHeader hr')
const heroWrapper = document.querySelector(".hero-wrapper");
const pageWrapper = document.querySelector('.page-wrapper');

// Jumbotron Carousel Effect
const introBackgrounds = [
    "images/backgrounds/hero-intro/background-1.gif",
    "images/backgrounds/hero-intro/background-2.gif",
    "images/backgrounds/hero-intro/background-3.gif",
    "images/backgrounds/hero-intro/background-4.gif",
    "images/backgrounds/hero-intro/background-5.gif",
]
const introBackgroundHelperOverlay_1 = document.getElementById('introBackgroundHelperOverlay_1');
const introBackgroundHelperOverlay_2 = document.getElementById('introBackgroundHelperOverlay_2');


    Background 1 fades in, then Background 2 simultaneously
    From what I remember, this will require 2 separate overlays
    Can't do this with background-image alone
    Will need fade-in classlists
    Also need a helper function that switches between fade-in and fade-out

let index = 0;
let activeLayer = introBackgroundHelperOverlay_1;
let inactiveLayer = introBackgroundHelperOverlay_2;

let carouselTimer = null;

function swapLayers() {
    index = (index + 1) % introBackgrounds.length;

    // set ONLY the layer coming in
    inactiveLayer.style.backgroundImage =
        `url("${introBackgrounds[index]}")`;

    inactiveLayer.classList.remove("fade-in", "fade-out");
    activeLayer.classList.remove("fade-in", "fade-out");

    void inactiveLayer.offsetWidth;

    inactiveLayer.classList.add("fade-in");
    activeLayer.classList.add("fade-out");

    [activeLayer, inactiveLayer] = [inactiveLayer, activeLayer];
}

function startCarousel() {
    if (carouselTimer) return;        // critical
    carouselTimer = setInterval(swapLayers, 4500);
}

function stopCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = null;
}

function resetCarousel() {
    stopCarousel();
    index = 0;

    activeLayer = introBackgroundHelperOverlay_1;
    inactiveLayer = introBackgroundHelperOverlay_2;

    activeLayer.classList.remove("fade-in", "fade-out");
    inactiveLayer.classList.remove("fade-in", "fade-out");

    // static hero image on mouse leave
    activeLayer.style.backgroundImage =
        `url("images/backgrounds/hero-intro/image-1.jpeg")`;
    inactiveLayer.style.backgroundImage = "";

    void activeLayer.offsetWidth;

    activeLayer.classList.add("fade-in");
}

// Event Listeners: 
heroWrapper.addEventListener("mouseenter", () => {
    resetCarousel(); // clears static state

    activeLayer.style.backgroundImage =
        `url("${introBackgrounds[0]}")`;
    activeLayer.classList.add("fade-in");

    index = 0;
    startCarousel();
    introHeader.classList.add("transform-text-light");
    introHeaderInner.forEach((item) => {
        item.classList.add('transform-text-light');
    });
    introLine.classList.add("transform-text-light");
    pageWrapper.classList.add("transform-bg-dark");
});

heroWrapper.addEventListener("mouseleave", () => {
    resetCarousel();
    introHeader.classList.remove("transform-text-light");
    introHeaderInner.forEach((item) => {
        item.classList.remove('transform-text-light');
    });
    introLine.classList.remove("transform-text-light");
    pageWrapper.classList.remove("transform-bg-dark");
});
*/