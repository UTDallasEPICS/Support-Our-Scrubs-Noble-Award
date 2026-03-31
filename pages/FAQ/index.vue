<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { onMounted, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LoginModal from "@/components/MyLogin.vue";

gsap.registerPlugin(ScrollTrigger);


const showLogin = ref(false);

onMounted(async () => {
    await nextTick();

    const timeline = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.6 },
    });

    timeline
        .from(".metallic-title", { opacity: 0, y: -50 })
        .from(
            ".faq-header-title",
            { opacity: 0, y: 30, duration: 0.5 },
            "-=0.3",
        )
        .from(".faq-dark-box", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3");

    gsap.from(".faq-pair", {
        scrollTrigger: {
            trigger: ".faq-dark-box",
            start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.15,
    });
});
</script>

<template>
    <Navbar @open-login="showLogin = true" />
    <div
        class="contact-wrapper"
        :class="['page-background', { blurred: showLogin }]"
    >
        <section>
            <h1 class="metallic-title">Frequently Asked Questions</h1>
        </section>

        <div class="faq-dark-box">
            <section class="faq-box-section">
                <div class="faq-item fade-in scroll-fade">
                    <section class="faq-section-header">
                        <h2 class="faq-header-title">The Nomination Process</h2>
                    </section>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Who is eligible to receive The Noble
                                Award?</strong
                            >
                        </div>
                        <p>
                            The Noble Award is a recognition program honoring
                            the heroes among us. Eligible categories include
                            healthcare professionals, first responders, police,
                            firefighters, veterans, active-duty service members,
                            and teachers. In special cases, we may also consider
                            exceptional individuals whose service aligns with
                            the spirit and mission of the award.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can I nominate someone outside the United
                                States?</strong
                            >
                        </div>
                        <p>
                            Yes. Nominations are accepted worldwide. Heroism
                            knows no borders.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can someone receive The Noble Award more than
                                once?</strong
                            >
                        </div>
                        <p>
                            Each individual may receive one Noble Award in their
                            lifetime. However, if they are nominated multiple
                            times, our system will track this and their online
                            profile will display additional crown icons for each
                            nomination they receive.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Is there a cost to nominate someone?</strong
                            >
                        </div>
                        <p>
                            No. Nominations are always free. However, The Noble
                            Award is a fully donation-based program. This
                            important work — recognizing heroes, creating
                            awards, and shipping them — can only continue with
                            your support. Donations help us cover costs, expand
                            the program, and continue keeping acts of kindness
                            going.
                        </p>
                    </div>
                </div>
            </section>
        </div>

        <div class="faq-dark-box">
            <section class="faq-box-section">
                <div class="faq-item fade-in scroll-fade">
                    <section class="faq-section-header">
                        <h2 class="faq-header-title">
                            ELIGIBILITY &amp; GENERAL INFORMATION
                        </h2>
                    </section>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong>How do I nominate someone?</strong>
                        </div>
                        <p>
                            Step 1 — Submit the nomination form: Fill out the
                            official nomination form on our website. Please
                            include as many details as possible for
                            verification.
                        </p>

                        <p>
                            Step 2 — Nominee approval & email updates: Once
                            submitted, the review process begins. Both the
                            nominator and nominee will receive email updates
                            throughout the process. The nominee must confirm
                            their information, approve their photo, and grant
                            permission for online and social media recognition.
                            Nominators and honorees will also be encouraged to
                            share their recognition online to help grow the
                            program, inspire others, and spread awareness.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong>Can I nominate multiple people?</strong>
                        </div>
                        <p>
                            Yes. You may nominate as many individuals as you
                            would like.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >How many times can I nominate the same
                                person?</strong
                            >
                        </div>
                        <p>
                            We recommend one nomination per honoree per
                            nominator. If multiple people nominate the same
                            honoree, each nomination will be recorded and shown
                            using additional crown icons on their profile.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong>
                                What information do I need to submit a
                                nomination?</strong
                            >
                        </div>
                        <p>You will need:</p>
                        <p>• Full name of the nominee</p>
                        <p>
                            • Category (healthcare, first responder, police,
                            fire, veteran, active service, teacher, etc.)
                        </p>
                        <p>• Contact information and mailing address</p>
                        <p>• Place of employment or service</p>
                        <p>
                            • Either a reason or a short story explaining why
                            they deserve recognition
                        </p>
                        <p>• A photo (optional but recommended)</p>

                        <p>
                            <br />Important: When completing the nomination
                            form, you will also see a button inviting you to
                            help cover the cost of this recognition. You may
                            choose to cover the cost of your nominee’s award and
                            shipping, and/or make an additional donation to help
                            us continue recognizing more heroes and keeping this
                            program going. Because The Noble Award is 100%
                            donation-based, these contributions make it possible
                            for us to honor more individuals across our
                            communities.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can I update a nomination after submitting
                                it?</strong
                            >
                        </div>
                        <p>
                            Yes. Use the same nomination form and select “Update
                            Information.” Please write in the notes section what
                            you are updating.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can I submit photos or additional
                                documents?</strong
                            >
                        </div>
                        <p>
                            Yes. Use the nomination form again and select
                            “Update Information.”
                        </p>
                        <p>
                            However, please note that we cannot send replacement
                            plaques unless the donor covers the full cost of the
                            plaque and shipping.
                        </p>
                    </div>
                </div>
            </section>
        </div>

        <div class="faq-dark-box">
            <section class="faq-box-section">
                <div class="faq-item fade-in scroll-fade">
                    <section class="faq-section-header">
                        <h2 class="faq-header-title">
                            Review Timeline &amp; Award Delivery
                        </h2>
                    </section>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >How long does the review process take?</strong
                            >
                        </div>
                        <p>
                            Most nominations are reviewed and processed within
                            approximately 30 days, depending on volume and
                            verification needs.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >How will I know if my nominee has been
                                selected?</strong
                            >
                        </div>
                        <p>Check your email (including spam/junk).</p>
                        <p>
                            You may also follow updates on our website and
                            social media
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong>When will the award be shipped?</strong>
                        </div>
                        <p>
                            Awards are generally shipped within 2–4 weeks after
                            nomination approval.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >How will I know when the recipient receives
                                their award?</strong
                            >
                        </div>
                        <p>You will receive a shipping confirmation.</p>
                        <p>
                            Recognition may also appear on our website and
                            social media around the same time.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question"><strong></strong></div>
                        <p></p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >My nominee hasn’t received their award — what
                                should I do?</strong
                            >
                        </div>
                        <p>First, please:</p>
                        <p>
                            • Ask the nominee to check their email and spam
                            folder for the approval request
                        </p>
                        <p>
                            • Check the website and social media for recognition
                            posts
                        </p>
                        <p>
                            <br />If necessary, you may use the “Request Status
                            Update” option or contact us.
                        </p>
                    </div>
                </div>
            </section>
        </div>

        <div class="faq-dark-box">
            <section class="faq-box-section">
                <div class="faq-item fade-in scroll-fade">
                    <section class="faq-section-header">
                        <h2 class="faq-header-title">
                            Online Recognition &amp; Profiles
                        </h2>
                    </section>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >When will the honoree appear on the
                                website?</strong
                            >
                        </div>
                        <p>
                            Honorees will be featured on our website and social
                            media profiles, once they have approved their
                            information and award details.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >How do I update an honoree’s
                                information?</strong
                            >
                        </div>
                        <p>
                            Use the nomination form and select “Update
                            Information.”
                        </p>
                        <p>
                            Please fill out everything accurately. Incorrect
                            information adds significant work and may delay the
                            process.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can I update or change an honoree’s photo
                                later?</strong
                            >
                        </div>
                        <p>
                            We prefer not to make frequent updates, as they
                            require manual processing.
                        </p>
                        <p>
                            If a change is necessary, you may submit a new photo
                            through the nomination form using “Update
                            Information.”
                        </p>
                        <p><br />Important:</p>
                        <p>
                            • We cannot issue a new plaque unless the full cost
                            of the plaque and shipping/handling is covered
                            through a donation.
                        </p>
                        <p>
                            • An option to cover this cost will be included on
                            the update form.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can I request an additional or replacement
                                plaque?</strong
                            >
                        </div>
                        <p>
                            Yes. Additional or replacement plaques may be
                            requested.
                        </p>
                        <p>
                            The full cost of the plaque plus shipping and
                            handling must be covered by the requester.
                        </p>
                        <p>
                            You may request this through the nomination/update
                            form and include a note indicating that it is an
                            additional plaque request.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong>How do I set up a profile?</strong>
                        </div>
                        <p>
                            Profiles are automatically created once a nomination
                            is submitted.
                        </p>
                        <p>
                            Nominators and nominees receive email updates
                            throughout the process.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Do honorees need to submit anything to be
                                recognized?</strong
                            >
                        </div>
                        <p>
                            Honorees must confirm their photo and information
                            and approve being featured online and on social
                            media.
                        </p>
                        <p>They do not need to submit a full application.</p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >I haven not seen my nominee posted yet — what
                                should I do?</strong
                            >
                        </div>
                        <p>
                            Remind the nominee to check their email and spam
                            folder for the approval request.
                        </p>
                        <p>
                            If they have approved everything and still do not
                            appear, you may request a status update.
                        </p>
                    </div>
                </div>
            </section>
        </div>

        <div class="faq-dark-box">
            <section class="faq-box-section">
                <div class="faq-item fade-in scroll-fade">
                    <section class="faq-section-header">
                        <h2 class="faq-header-title">
                            Support, Contact, and Additional Questions
                        </h2>
                    </section>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >How do I contact The Noble Award team?</strong
                            >
                        </div>
                        <p>
                            You may use the Contact page on our website or the
                            provided email address once established.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can I check the status of a nomination?</strong
                            >
                        </div>
                        <p>Please check:</p>
                        <p>• Your email (and spam folder)</p>
                        <p>• Our website</p>
                        <p>• Our social media platforms</p>
                        <p>
                            <br />If necessary, use the status update or contact
                            options.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >I never received a confirmation email — what
                                should I do?</strong
                            >
                        </div>
                        <p>
                            Check spam/junk and ensure your email was entered
                            correctly.
                        </p>
                        <p>If needed, contact us through the website.</p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can organizations submit group
                                nominations?</strong
                            >
                        </div>
                        <p>
                            Yes. However, each honoree must be nominated
                            individually so that we can create their award and
                            profile correctly.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Do honorees receive both a physical award and
                                online recognition?</strong
                            >
                        </div>
                        <p>
                            Yes. Honorees receive a physical Noble Award and
                            will be recognized on our website and social media.
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Is there an age requirement to nominate
                                someone?</strong
                            >
                        </div>
                        <p>Yes. Nominators must be 18 or older.</p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Is The Noble Award a nonprofit program?</strong
                            >
                        </div>
                        <p>
                            Yes. The Noble Award is a mission-driven community
                            recognition program. (Formal nonprofit status
                            language can be added later.)
                        </p>
                    </div>

                    <div class="faq-pair">
                        <div class="faq-question">
                            <strong
                                >Can I donate to support The Noble
                                Award?</strong
                            >
                        </div>
                        <p>Yes. Donations are essential.</p>
                        <p>
                            The program is 100% donation-based, and we cannot
                            continue honoring heroes without your help.
                        </p>
                        <p>
                            Donations support award creation, shipping,
                            recognition efforts, and program expansion.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <Teleport to="body">
        <LoginModal v-if="showLogin" @close="showLogin = false" />
    </Teleport>
</template>

<style scoped>
.contact-wrapper {
    min-height: 100vh;
    background-color: #000000;
    color: #ffffff;
    padding: 2rem;
}

.metallic-title {
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-family: "Cinzel", serif;
    font-size: 70px;
    text-align: center;
    background: linear-gradient(
        120deg,
        #fff4b0 0%,
        #f0c75e 20%,
        #d4af37 40%,
        #f8e27d 60%,
        #d4af37 80%,
        #fff4b0 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow:
        0 0 5px rgba(212, 175, 55, 0.5),
        0 0 10px rgba(212, 175, 55, 0.4),
        0 0 20px rgba(255, 215, 0, 0.3);
    animation: metallicShine 3s infinite linear;
}

@keyframes metallicShine {
    0% {
        background-position: 200% center;
    }
    100% {
        background-position: -200% center;
    }
}

.faq-section-header {
    text-align: left;
    text-align: center;
    margin-bottom: 2rem;
}

.faq-header-title {
    font-family: "Cinzel", serif;
    font-size: 36px;
    color: #d4af37;
    letter-spacing: 1.7px;
    font-weight: 400;
    background: linear-gradient(
        120deg,
        #fff4b0 0%,
        #f0c75e 20%,
        #d4af37 40%,
        #f8e27d 60%,
        #d4af37 80%,
        #fff4b0 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.faq-dark-box {
    background: #222;
    border-radius: 3px;
    padding: 2.5rem 2rem;
    margin-top: 1rem;
    margin-bottom: 2.5rem;
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.faq-item {
    margin-bottom: 1.5rem;
    max-width: 100%;
    text-align: left;
}

.faq-pair {
    border-left: 1.6px solid #d4af37;
    padding-left: 1.5rem;
    margin-bottom: 2rem;
    letter-spacing: 0.5px;
}

.faq-question {
    font-family: "Cinzel", serif;
    font-size: 19px;
    margin-bottom: 0.4rem;
    color: #d4af37;
    font-weight: 200;
}

/* ⭐ MOBILE RESPONSIVE */
@media (max-width: 900px) {
    .faq-section-header {
        padding-left: 0;
        text-align: center;
    }

    .faq-header-title {
        font-size: 22px;
    }

    .metallic-title {
        font-size: 40px;
    }

    .faq-dark-box {
        padding: 1.5rem 1rem;
    }

    .faq-pair {
        border-left-width: 2px;
        padding-left: 1rem;
    }

    .faq-question {
        font-size: 18px;
    }

    .faq-pair p {
        font-size: 15px;
        line-height: 1.45;
    }
}
.blurred {
    filter: blur(8px);
    pointer-events: none;
    user-select: none;
    transform: translateZ(0);
}

/* Mobile friendly*/

.contact-wrapper {
    min-height: 100vh;
    background-color: #000000;
    color: #ffffff;
    padding: 2rem;
}

.metallic-title {
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-family: "Cinzel", serif;
    font-size: 70px;
    text-align: center;
    background: linear-gradient(
        120deg,
        #fff4b0 0%,
        #f0c75e 20%,
        #d4af37 40%,
        #f8e27d 60%,
        #d4af37 80%,
        #fff4b0 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow:
        0 0 5px rgba(212, 175, 55, 0.5),
        0 0 10px rgba(212, 175, 55, 0.4),
        0 0 20px rgba(255, 215, 0, 0.3);
    animation: metallicShine 3s infinite linear;
}

@keyframes metallicShine {
    0% {
        background-position: 200% center;
    }
    100% {
        background-position: -200% center;
    }
}

.faq-section-header {
    text-align: center;
    margin-bottom: 2rem;
}

.faq-header-title {
    font-family: "Cinzel", serif;
    font-size: 36px;
    letter-spacing: 1.7px;
    font-weight: 400;
    background: linear-gradient(
        120deg,
        #fff4b0 0%,
        #f0c75e 20%,
        #d4af37 40%,
        #f8e27d 60%,
        #d4af37 80%,
        #fff4b0 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.faq-dark-box {
    background: #222;
    border-radius: 3px;
    padding: 2.5rem 2rem;
    margin: 1.5rem auto 3rem auto;
    width: 100%;
    max-width: 1200px;
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.faq-item {
    margin-bottom: 1.5rem;
    width: 100%;
}

.faq-pair {
    border-left: 2px solid #d4af37;
    padding-left: 1.5rem;
    margin-bottom: 2rem;
    letter-spacing: 0.5px;
}

.faq-question {
    font-family: "Cinzel", serif;
    font-size: 19px;
    margin-bottom: 0.4rem;
    color: #d4af37;
}

@media (max-width: 900px) {
    .contact-wrapper {
        padding: 1rem;
    }

    .metallic-title {
        font-size: 38px;
        line-height: 1.2;
    }

    .faq-header-title {
        font-size: 24px;
    }

    .faq-dark-box {
        padding: 1.25rem 1rem;
        margin-bottom: 2rem;
    }

    .faq-pair {
        padding-left: 0.9rem;
        border-left-width: 2px;
    }

    .faq-question {
        font-size: 17px;
    }

    .faq-pair p {
        font-size: 15px;
        line-height: 1.5;
    }
}

@media (max-width: 480px) {
    .metallic-title {
        font-size: 32px;
        line-height: 1.15;
    }

    .faq-header-title {
        font-size: 20px;
    }

    .faq-question {
        font-size: 16px;
    }

    .faq-pair p {
        font-size: 14px;
    }
}
</style>
