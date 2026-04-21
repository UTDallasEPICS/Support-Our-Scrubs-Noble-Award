<script>
import { gsap } from "gsap";

export default {
    name: "DonatePage",
    mounted() {
        // Scroll fade effect (keep your existing IntersectionObserver)
        const els = document.querySelectorAll("[data-fade], .fade-in");
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
        );
        els.forEach((el) => io.observe(el));

        // Initial entrance animation
        const tl = gsap.timeline({
            defaults: { duration: 0.8, ease: "power2.out" },
        });
        tl.from(".metallic-title--main", { opacity: 0, y: -60 })
            .from(".header-description", { opacity: 0, y: 20 }, "-=0.4")
            .from(".image-container", { opacity: 0, x: -80 }, "-=0.3")
            .from(".donation-cta", { opacity: 0, x: 80 }, "-=0.4");
    },
};
</script>

<template>
    <div class="page-background">
        <div class="donate-container">
            <!-- Header -->
            <header class="donate-header">
                <h1 class="metallic-title metallic-title--main">
                    MAKE A DONATION
                </h1>
                <p class="header-description">
                    Your donation powers the impact of the Noble Award program —
                    helping fund engraved plaques for honorees, expand community
                    outreach, and support day-to-day operations that keep the
                    initiative running strong.
                </p>
            </header>

            <!-- Main content -->
            <section class="main-content fade-in" data-fade>
                <!-- Left: image -->
                <div class="image-container">
                    <img
                        src="https://img1.wsimg.com/isteam/ip/49b121ac-2346-4ca2-93bb-7801e38f5369/0%20(3).jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1537"
                        class="profile-image"
                        alt="Noble Award Program"
                        loading="lazy"
                    />
                </div>

                <!-- Right: CTA card -->
                <div class="donation-cta">
                    <h2
                        class="metallic-title metallic-title--small metallic-title--flat"
                    >
                        SUPPORT OUR CAUSE
                    </h2>

                    <p>
                        When you donate to our parent organization Support Our
                        Scrubs, you fuel our service projects — projects that
                        recognize healthcare heroes, promote community support,
                        and improve healthcare communities.
                    </p>

                    <a
                        href="https://paypal.me/SupportOurScrubs?locale.x=en_US"
                        class="nomination-submit-btn donate-button"
                        target="_blank"
                        rel="noopener"
                    >
                        <div class="donate-content">
                            <img
                                src="https://pngimg.com/d/paypal_PNG7.png"
                                class="paypal-logo"
                                alt="PayPal"
                            />
                            <span>DONATE</span>
                        </div>
                    </a>

                    <p>
                        Your donation supports our mission to recognize and
                        honor those who serve with excellence, dedication, and
                        heart. Funds help cover engraved plaques for honorees,
                        expand community outreach, and support operations
                        specific to our initiative — ensuring your generosity
                        creates real impact through our focused cause.
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
/* ====== Page base ====== */
.page-background {
    color: #fef08a;
    font-family:
        system-ui,
        -apple-system,
        Segoe UI,
        Roboto,
        "Helvetica Neue",
        Arial,
        "Noto Sans",
        "Liberation Sans",
        sans-serif;
}

.donate-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 20px;
}

/* ====== Metallic title variants (base lives in assets/css/theme.css) ====== */
.metallic-title {
    margin-top: 3rem;
}

.metallic-title--main {
    font-size: clamp(2rem, 6vw, 70px);
    line-height: 1.1;
}

.metallic-title--small {
    margin-top: 1rem;
    font-size: clamp(1.5rem, 3.2vw, 36px);
    line-height: 1.15;
}

/* Flat variant for subheadings (no glow/shimmer) */
.metallic-title--flat {
    text-shadow: none !important;
    animation: none !important;
    margin-top: 3rem;
    margin-bottom: 2rem;
}

/* ====== Header text ====== */
.donate-header {
    text-align: center;
    margin-bottom: 40px;
}

.header-description {
    max-width: 920px;
    margin: 12px auto 0;
    font-size: clamp(0.95rem, 2vw, 1.125rem);
    line-height: 1.7;
    color: #e5e5e5;
    margin-top: 2rem;
    margin-bottom: 4rem;
}

/* ====== Main content layout ====== */
.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: stretch;
}

/* Image block */
.image-container {
    min-width: 280px;
}

.profile-image {
    width: 100%;
    height: 110%;
    max-height: 640px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
}

/* CTA Card */
.donation-cta {
    display: flex;
    flex-direction: column;
    background: #222;
    padding: clamp(20px, 3vw, 40px);
    border-radius: 4px;
    color: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.08);
    max-width: 100%;
    height: 110%;
}

.donation-cta p {
    margin-bottom: 18px;
    line-height: 1.7;
    font-size: clamp(0.95rem, 1.8vw, 1rem);
    color: #f5f5f5;
}

/* Donate button: layout additions on top of .nomination-submit-btn (theme.css) */
.donate-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    margin: 6px 0 18px;
}

.donate-content {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.paypal-logo {
    width: 40px;
    height: 40px;
}

/* ====== Fade-in animation ====== */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition:
        opacity 0.8s ease-in-out,
        transform 0.8s ease-out;
}
.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ====== Responsive ====== */
@media (max-width: 1024px) {
    .donate-container {
        padding: 32px 16px;
    }
    .main-content {
        grid-template-columns: 1fr;
    }
    .image-container {
        order: 1;
    }
    .donation-cta {
        order: 2;
    }
    .profile-image {
        max-height: 420px;
        border-radius: 4px;
    }
}

/* === MOBILE: reduced padding in card and remove bottom gap === */
@media (max-width: 640px) {
    .donate-container {
        padding: 24px 14px;
    }

    .donation-cta {
        padding: 16px 14px;
        height: auto; /* fix extra bottom space */
        margin-bottom: 0; /* remove excess spacing below the card */
    }

    .donation-cta p {
        margin-bottom: 14px;
        line-height: 1.6;
    }

    .donate-button {
        width: 100%;
        padding: 12px 14px;
        margin-bottom: 14px;
    }

    .metallic-title--small {
        margin-top: 1.2rem;
        margin-bottom: 1.4rem;
    }
}

.donate-container {
    padding-bottom: 150px;
}
</style>
