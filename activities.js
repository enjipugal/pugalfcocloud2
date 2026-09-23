/* =========================================================
   ECOAST HUB - ACTIVITIES PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const isOpen =
            navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   ACTIVITY MODAL
   ========================================================= */

const activityModal =
    document.getElementById("activityModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");


const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalDate =
    document.getElementById("modalDate");

const modalLocation =
    document.getElementById("modalLocation");

const modalType =
    document.getElementById("modalType");

const modalDescription =
    document.getElementById("modalDescription");


const activityCards =
    document.querySelectorAll(".activity-card");


/* =========================================================
   OPEN ACTIVITY MODAL
   ========================================================= */

function openActivityModal(card) {

    if (!activityModal || !card) {
        return;
    }


    const title =
        card.dataset.title ||
        "Activity";

    const category =
        card.querySelector(
            ".activity-category"
        )?.textContent.trim() ||
        "Activity";

    const date =
        card.dataset.date ||
        "To Be Announced";

    const location =
        card.dataset.location ||
        "To Be Announced";

    const type =
        card.dataset.type ||
        category;

    const description =
        card.dataset.description ||
        "Activity details will be provided here.";


    /* Update modal content */

    if (modalTitle) {
        modalTitle.textContent = title;
    }

    if (modalCategory) {
        modalCategory.textContent = category;
    }

    if (modalDate) {
        modalDate.textContent = date;
    }

    if (modalLocation) {
        modalLocation.textContent = location;
    }

    if (modalType) {
        modalType.textContent = type;
    }

    if (modalDescription) {
        modalDescription.textContent = description;
    }


    /* Show modal */

    activityModal.classList.add("show");

    activityModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";


    if (modalClose) {
        setTimeout(() => {
            modalClose.focus();
        }, 50);
    }

}


/* =========================================================
   CLOSE ACTIVITY MODAL
   ========================================================= */

function closeActivityModal() {

    if (!activityModal) {
        return;
    }

    activityModal.classList.remove("show");

    activityModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =========================================================
   VIEW DETAILS BUTTONS
   ========================================================= */

activityCards.forEach(card => {

    const detailsButton =
        card.querySelector(".view-details");


    if (detailsButton) {

        detailsButton.addEventListener(
            "click",
            () => {

                openActivityModal(card);

            }
        );

    }

});


/* =========================================================
   CLOSE BUTTON
   ========================================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeActivityModal
    );

}


/* =========================================================
   CLOSE WHEN CLICKING OVERLAY
   ========================================================= */

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeActivityModal
    );

}


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            activityModal &&
            activityModal.classList.contains("show")
        ) {

            closeActivityModal();

        }

    }
);


/* =========================================================
   CARD ANIMATION
   ========================================================= */

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
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


    activityCards.forEach(card => {

        observer.observe(card);

    });

}


/* =========================================================
   PREVENT EMPTY LINKS
   ========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });