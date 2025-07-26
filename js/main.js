// ========================= Scroll to Top Button =========================
const scrollTopBtn = document.querySelector('.scroll-top');

window.onscroll = () => {
    if (window.scrollY > 200) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
};

scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ========================= Page Loader =========================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
});

// ========================= Counter on Scroll =========================
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".cont");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

function startCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const duration = 2000;
    const increment = target / duration * 16;
    let current = 0;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        counter.textContent = '+' + Math.floor(current).toLocaleString();
    }, 16);
}

// ========================= Swiper Initialization =========================
function initSwiper(selector, options) {
    return new Swiper(selector, options);
}

document.addEventListener("DOMContentLoaded", () => {
    initSwiper('.swiper-section-1', {
        loop: true,
        spaceBetween: 30,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        rtl: true,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    initSwiper('.swiper-our-work', {
        loop: true,
        spaceBetween: 30,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    initSwiper('.portfolio-swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 2000, disableOnInteraction: false },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        },
        on: {
            init() {
                const section = document.getElementById('portfolio');
            },
            slideChange() {
                const section = document.getElementById('portfolio');
                section.style.transition = 'background-color 0.6s ease';
            }
        }
    });
});

// ========================= Contact Form =========================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                const alert = document.getElementById('success-alert');
                if (response.ok) {
                    alert?.classList.remove('d-none');
                    form.reset();
                    setTimeout(() => alert?.classList.add('d-none'), 5000);
                } else {
                    alert('حدث خطأ أثناء الإرسال.');
                }
            })
            .catch(error => {
                alert('فشل الإرسال: ' + error.message);
            });
    });
});

// ========================= Mobile Menu =========================
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    let isMenuOpen = false;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            isMenuOpen = !isMenuOpen;
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';

            // ✅ عند فتح القائمة: إذا كان المستخدم في أعلى الصفحة، فعّل فقط رابط الرئيسية
            if (isMenuOpen) {
                const scrollPos = window.scrollY + 150;
                const sections = document.querySelectorAll('section[id]');
                let currentSectionId = null;

                if (window.scrollY < 50) {
                    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#home') {
                            link.classList.add('active');
                        }
                    });
                    return;
                }

                sections.forEach(section => {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        currentSectionId = section.getAttribute('id');
                    }
                });

                document.querySelectorAll('.mobile-nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            document.body.style.overflow = '';
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            document.body.style.overflow = '';
        });
    }
});

// ========================= Scroll Effects & Active Links =========================
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const scrollTop = window.scrollY;

    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    const sections = document.querySelectorAll("section[id]");
    const scrollPos = scrollTop + 100;

    // ✅ إذا كان المستخدم في أعلى الصفحة، فعّل فقط رابط الرئيسية
    if (scrollTop < 50) {
        document.querySelectorAll(".nav-links a, .mobile-nav-links a").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute('href') === "#home") {
                link.classList.add("active");
            }
        });
        return;
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll(".nav-links a, .mobile-nav-links a").forEach(link => {
                link.classList.remove("active");
            });
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add("active");
            const activeMobileLink = document.querySelector(`.mobile-nav-links a[href="#${sectionId}"]`);
            if (activeMobileLink) activeMobileLink.classList.add("active");
        }
    });
});

// ========================= Scroll Indicator & Hero Animation =========================
document.addEventListener("DOMContentLoaded", () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    scrollIndicator?.addEventListener('click', () => {
        window.scrollBy({ top: window.innerHeight - 200, behavior: 'smooth' });
    });

    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .btn');
    const animateOnScroll = () => {
        heroElements.forEach(el => {
            const pos = el.getBoundingClientRect().top;
            if (pos < window.innerHeight - 100) {
                el.classList.add('animate__animated');
                if (el.classList.contains('hero-title')) el.classList.add('animate__fadeInDown');
                else if (el.classList.contains('hero-description')) el.classList.add('animate__fadeInUp');
                else if (el.classList.contains('btn-primary')) el.classList.add('animate__fadeInLeft');
                else if (el.classList.contains('btn-secondary')) el.classList.add('animate__fadeInRight');
            }
        });
    };

    window.addEventListener("load", animateOnScroll);
    window.addEventListener("scroll", animateOnScroll);
});

// ========================= Mobile Links Active Toggle =========================
document.addEventListener("DOMContentLoaded", () => {
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });
});

// ========================= Desktop Nav Active Toggle =========================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
