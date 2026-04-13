const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navbar = document.querySelector(".navbar");
const hero = document.querySelector(".hero");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("open");

        const spans = navToggle.querySelectorAll("span");
        const isActive = navMenu.classList.contains("active");

        if (spans.length === 3) {
            spans[0].style.transform = isActive ? "translateY(7.5px) rotate(45deg)" : "none";
            spans[1].style.opacity = isActive ? "0" : "1";
            spans[2].style.transform = isActive ? "translateY(-7.5px) rotate(-45deg)" : "none";
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            navToggle.classList.remove("open");

            const spans = navToggle.querySelectorAll("span");
            if (spans.length === 3) {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });
    });
}

const handleNavbarScroll = () => {
    if (!navbar) return;

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

const highlightNavigation = () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (!navLink) return;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLink.classList.add("active");
        } else {
            navLink.classList.remove("active");
        }
    });
};

window.addEventListener("scroll", highlightNavigation);
highlightNavigation();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        const target = document.querySelector(href);

        if (!target) return;

        e.preventDefault();

        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const offsetTop = target.offsetTop - navbarHeight - 10;

        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    });
});

const revealElements = document.querySelectorAll(
    ".timeline-item, .education-card, .course-card, .publication-item, .audit-item, .contact-item, .skills-column, .about-text, .info-card, .experience-note"
);

revealElements.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealElements.forEach((el) => revealObserver.observe(el));

const createScrollTopButton = () => {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "scroll-top-btn";
    button.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(button);

    const toggleScrollButton = () => {
        if (window.scrollY > 320) {
            button.classList.add("visible");
        } else {
            button.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", toggleScrollButton);
    toggleScrollButton();

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
};

createScrollTopButton();

if (hero) {
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        const offset = Math.min(scrolled * 0.18, 60);
        hero.style.backgroundPosition = `center ${offset}px`;
    });
}

const footerYear = document.querySelector(".footer-year");
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

console.log("%cProfessional Portfolio Loaded", "font-size: 16px; font-weight: bold; color: #1d4ed8;");
console.log("%cDr. Wasundara Suvimali Dissanayake", "font-size: 13px; color: #334155;");
