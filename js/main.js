document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("siteHeader");
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mainNav = document.getElementById("mainNav");
    const backTop = document.getElementById("backTop");

    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function handleScroll() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (backTop) {
            if (window.scrollY > 500) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }
        }

    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileBtn) {

        mobileBtn.addEventListener("click", function () {

            if (mainNav) mainNav.classList.toggle("mobile-active");

            document.body.classList.toggle("menu-open");

            mobileBtn.classList.toggle("active");

        });

    }


    /* =====================================================
       MOBILE NAV LINK
    ===================================================== */

    document.querySelectorAll(".main-nav .nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 1050) {

                mainNav.classList.remove("mobile-active");

                document.body.classList.remove("menu-open");

                mobileBtn.classList.remove("active");

            }

        });

    });


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        if (!question) return;

        question.addEventListener("click", function () {

            const wasActive = item.classList.contains("active");

            faqItems.forEach(function (faq) {
                faq.classList.remove("active");
            });

            if (!wasActive) {
                item.classList.add("active");
            }

        });

    });


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;

                const target = Number(
                    counter.getAttribute("data-target")
                );

                let current = 0;

                const duration = 1600;

                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const easeOut =
                        1 - Math.pow(1 - progress, 3);

                    current = Math.floor(target * easeOut);

                    counter.textContent = current;

                    if (progress < 1) {

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.textContent = target;

                    }

                }

                requestAnimationFrame(updateCounter);

                observer.unobserve(counter);

            });

        },

        {
            threshold: 0.6
        }

    );


    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const navObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.getAttribute("id");

                navLinks.forEach(function (link) {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + id
                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }

    );


    sections.forEach(function (section) {

        navObserver.observe(section);

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backTop) {

        backTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {

            link.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#" ||
                    targetId === ""
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header.offsetHeight;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        }
    );


    /* =====================================================
       CONTACT FORM BASIC VALIDATION
    ===================================================== */

    const contactForm =
        document.querySelector(".modern-contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                const phone =
                    contactForm.querySelector(
                        'input[name="phone"]'
                    );

                if (phone) {

                    const phoneValue =
                        phone.value.replace(/\D/g, "");

                    if (phoneValue.length !== 10) {

                        event.preventDefault();

                        alert(
                            "Please enter a valid 10-digit phone number."
                        );

                        phone.focus();

                    }

                }

            }
        );

    }

});

document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("careerHeader");
    const menuBtn = document.getElementById("careerMenuBtn");
    const nav = document.getElementById("careerNav");

    const backTop = document.getElementById("careerBackTop");

    if (!header) return;

    const modal = document.getElementById("jobModal");
    const modalClose = document.getElementById("modalClose");
    const selectedJob = document.getElementById("selectedJob");
    const modalApply = document.getElementById("modalApply");

    const jobSelect = document.getElementById("jobSelect");


    /* HEADER */

    function handleScroll() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }


    window.addEventListener("scroll", handleScroll);

    handleScroll();


    /* MOBILE MENU */

    if (menuBtn) {

        menuBtn.addEventListener("click", function () {

            nav.classList.toggle("mobile-active");

        });

    }


    document.querySelectorAll(".career-nav a").forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("mobile-active");

        });

    });


    /* JOB MODAL */

    document.querySelectorAll(".apply-job-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const job = this.getAttribute("data-job");

            selectedJob.textContent = job;

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    function closeModal() {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    document.querySelector(".modal-overlay")
        .addEventListener(
            "click",
            closeModal
        );


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    });


    /* MODAL → APPLICATION FORM */

    if (modalApply) {

        modalApply.addEventListener("click", function () {

            const selected =
                selectedJob.textContent.trim();

            if (jobSelect) {

                const option =
                    Array.from(jobSelect.options)
                    .find(function (item) {

                        return item.value === selected;

                    });

                if (option) {

                    jobSelect.value = selected;

                }

            }


            closeModal();

        });

    }


    /* BACK TO TOP */

    backTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    /* YEAR */

    const year =
        document.getElementById("careerYear");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* FORM VALIDATION */

    const form =
        document.getElementById("careerForm");

    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                const phone =
                    form.querySelector(
                        'input[name="phone"]'
                    );

                if (phone) {

                    const value =
                        phone.value.replace(/\D/g, "");

                    if (value.length !== 10) {

                        event.preventDefault();

                        alert(
                            "Please enter a valid 10-digit phone number."
                        );

                        phone.focus();

                    }

                }

            }
        );

    }

});
/* GLOBAL COUNTRY SWITCHER */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".global-switcher-toggle").forEach(function (button) {
        button.addEventListener("click", function () {
            const wrapper = button.closest(".global-switcher");
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            wrapper.classList.toggle("open", !expanded);
        });
    });

    document.addEventListener("click", function (event) {
        document.querySelectorAll(".global-switcher.open").forEach(function (wrapper) {
            if (!wrapper.contains(event.target)) {
                wrapper.classList.remove("open");
                const button = wrapper.querySelector(".global-switcher-toggle");
                if (button) button.setAttribute("aria-expanded", "false");
            }
        });
    });
});
