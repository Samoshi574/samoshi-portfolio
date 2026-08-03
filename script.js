"use strict";

/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");

function updateMenuIcon(isOpen) {
    if (!menuButton) {
        return;
    }

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
}

function closeMobileMenu() {
    if (!navMenu) {
        return;
    }

    navMenu.classList.remove("active");
    updateMenuIcon(false);
}

if (menuButton && navMenu) {
    menuButton.addEventListener("click", function () {
        const menuIsOpen =
            navMenu.classList.toggle("active");

        updateMenuIcon(menuIsOpen);
    });
}

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        closeMobileMenu();
    });
});

document.addEventListener("click", function (event) {
    if (!menuButton || !navMenu) {
        return;
    }

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        closeMobileMenu();
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
        closeMobileMenu();
    }
});


/* ========================================
   SMOOTH SCROLLING
======================================== */

const internalLinks =
    document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetSection =
            document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        event.preventDefault();

        const header =
            document.querySelector(".header");

        const headerHeight = header
            ? header.offsetHeight
            : 0;

        const sectionPosition =
            targetSection.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

        window.scrollTo({
            top: sectionPosition,
            behavior: "smooth"
        });
    });
});


/* ========================================
   ACTIVE NAVIGATION LINK
======================================== */

const pageSections =
    document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
    const scrollPosition =
        window.scrollY + 180;

    pageSections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        const matchingLink =
            document.querySelector(
                `.nav-menu a[href="#${sectionId}"]`
            );

        if (!matchingLink) {
            return;
        }

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {
            navLinks.forEach(function (link) {
                link.classList.remove("active");
            });

            matchingLink.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

window.addEventListener(
    "load",
    updateActiveNavigation
);

/* ========================================
   EDUCATION SEMESTER ACCORDION
======================================== */

const semesterButtons =
    document.querySelectorAll(".semester-button");

semesterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        const selectedItem =
            button.closest(".semester-item");

        if (!selectedItem) {
            return;
        }

        const wasOpen =
            selectedItem.classList.contains("open");

        /* Close all semesters */
        document
            .querySelectorAll(".semester-item")
            .forEach(function (item) {
                item.classList.remove("open");
            });

        /* Open selected semester */
        if (!wasOpen) {
            selectedItem.classList.add("open");
        }
    });
});

/* ========================================
   CONTACT FORM
======================================== */

const contactForm =
    document.getElementById("contactForm");

const contactFormMessage =
    document.getElementById(
        "contactFormMessage"
    );

if (contactForm && contactFormMessage) {
    contactForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const nameInput =
                document.getElementById(
                    "contactName"
                );

            const emailInput =
                document.getElementById(
                    "contactEmail"
                );

            const subjectInput =
                document.getElementById(
                    "contactSubject"
                );

            const messageInput =
                document.getElementById(
                    "contactMessage"
                );

            if (
                !nameInput ||
                !emailInput ||
                !subjectInput ||
                !messageInput
            ) {
                contactFormMessage.textContent =
                    "Contact form fields could not be found.";

                contactFormMessage.style.color =
                    "#ff8f8f";

                return;
            }

            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const subject =
                subjectInput.value.trim();

            const message =
                messageInput.value.trim();

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {
                contactFormMessage.textContent =
                    "Please complete all the fields.";

                contactFormMessage.style.color =
                    "#ff8f8f";

                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                contactFormMessage.textContent =
                    "Please enter a valid email address.";

                contactFormMessage.style.color =
                    "#ff8f8f";

                return;
            }

            const emailBody =
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`;

            const mailLink =
                "mailto:samoshirupasinghe9@gmail.com" +
                "?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(emailBody);

            contactFormMessage.textContent =
                "Opening your email application...";

            contactFormMessage.style.color =
                "#93f2c1";

            window.location.href = mailLink;
        }
    );
}


/* ========================================
   SCROLL REVEAL ANIMATION
======================================== */

const revealElements =
    document.querySelectorAll(
        ".project-card, " +
        ".skill-card, " +
        ".education-card, " +
        ".activity-card, " +
        ".contact-information, " +
        ".contact-form"
    );

if ("IntersectionObserver" in window) {
    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "show"
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

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}


/* ========================================
   CURRENT FOOTER YEAR
======================================== */

const footerYear =
    document.getElementById("currentYear");

if (footerYear) {
    footerYear.textContent =
        new Date().getFullYear();
}