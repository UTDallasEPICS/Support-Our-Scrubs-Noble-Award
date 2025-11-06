<template>
  <div class="page-background { blurred: showLogin }">
    <Navbar @open-login="showLogin = true"/>
  <div class="contact-wrapper">
    
    <section>
      <h1 class="metallic-title">CONTACT US</h1>
    </section>

    <section class="socials-section">
      <div class="socials">
        <a href="https://www.instagram.com/support_our_scrubs/?hl=en" target="_blank" rel="noopener">
          <img src="/assets/instagram.png" alt="Instagram" class="social-icon" />
        </a>
        <a href="https://x.com/ScrubsSupport" target="_blank" rel="noopener">
          <img src="/assets/x.png" alt="Threads" class="social-icon" />
        </a>
        <a href="https://www.linkedin.com/company/support-our-scrubs/" target="_blank" rel="noopener">
          <img src="/assets/linkedin.png" alt="LinkedIn" class="social-icon" />
        </a>
        <a href="https://www.facebook.com/SupportOurScrubs/#" target="_blank" rel="noopener">
          <img src="/assets/facebook.png" alt="Facebook" class="social-icon" />
        </a>
      </div>
    </section>
  </div>

    <section class="form-section" style="margin-bottom: 150px; text-align: center;">
      <h3 class="contact-subtitle"> If you have any questions,</h3>
      <h3 class="contact-subtitle"> please do not hesitate to send us a message.</h3>

      <form @submit.prevent="handleSubmit">
            <input type="text" v-model="form.name" name="name" placeholder="Your Name" required />
            <input type="email" v-model="form.email" name="email" placeholder="Your Email" required />
            <input type="text" v-model="form.subject" name="subject" placeholder="Subject" />
            <textarea v-model="form.message" name="message" placeholder="Your Message" rows="6" required></textarea>
            <button type="submit">Submit Inquiry</button>
          </form>
    </section>
  
  <section class="faq-box-section">
    <h1 class="faq-title">Facts and Questions</h1>
    
    <div class="faq-box">
      <div class="faq-item">
        <div class="faq-pair">
          <div class="faq-question">
            <strong>How can I nominate someone?</strong>
          </div>
          <p>You can submit nominations through the inquiry form below or via email.</p>
        </div>

        <div class="faq-pair">
          <div class="faq-question">
            <strong>Who is eligible to be nominated?</strong>
          </div>
          <p>Any healthcare worker is eligible to be nominated for the Noble Award.</p>
        </div>

        <div class="faq-pair">
          <div class="faq-question">
            <strong>Who can nominate a candidate?</strong>
          </div>
          <p>Any member of our society can nominate someone for the Noble Award.</p>
        </div>
      </div>
    </div>
</section>

</div>

  <Teleport to="body">
    <LoginModal v-if="showLogin" @close="showLogin = false" />
  </Teleport>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import LoginModal from "@/components/MyLogin.vue"
import nobleImage from '@/assets/nobleaward.png';
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)



definePageMeta({});

const showLogin = ref(false);

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = async () => {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const result = await res.json();
    if (result.success) {
      alert('Inquiry submitted and saved to file.');
    } else {
      alert('Failed to save inquiry: ' + result.error);
    }
  } catch (error) {
    console.error('Submit error:', error);
    alert('Submission failed due to network/server issue.');
  }
};

onMounted(async () => {
  await nextTick();

  const timeline = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });

  timeline
  .from(".metallic-title", { opacity: 0, y: -50 })
  .from(".socials a", { opacity: 0, scale: 0.5, stagger: 0.05}, "-=0.2")
  .from(".contact-subtitle", { opacity: 0, y: 30, stagger: 0.1}, "-=0.1")
  .from("form", { opacity: 0, y: 30, duration: 0.3, ease: "power2.out" }, "-=0.1")
  .from("form input, form textarea, form button", { opacity: 0, y: 20, stagger: 0.05, duration: 0.4 }, "-=0.2");


  //Animation for FAQ section
  gsap.from([".faq-title", ".faq-box"], {
    scrollTrigger: {
      trigger: ".faq-box",
      start: "top 85%", // start when box enters viewport
      toggleActions: "play none none none", // only play once
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".faq-pair", {
    scrollTrigger: {
      trigger: ".faq-box-section",
      start: "top 75%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.5,
    ease: "power2.out"
  });
});



</script>

<style scoped>
body {
  background-color: #0d0d0d;
  color: #d4af37;
  margin: 0;
}
header {
  text-align: center;
  padding: 2rem;
  background-color: #1a1a1a;
}
header h1 {
  text-align: center;
  font-weight: bold;
  font-size: 10rem;
}
header img {
  width: 550px;
  height: auto;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 0 5px #d4af37);
  transition: transform 0.3s ease;
}
.container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
}
.blurred {
  filter: blur(8px);
  pointer-events: none; 
  user-select: none;
  transform: translateZ(0);
  }
h2 {
  border-bottom: 1px solid #d4af37;
  padding-bottom: 0.5rem;
}

.contact-wrapper {
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff; 
  padding: 2rem;
}
.contact-subtitle:last-of-type {
  margin-bottom: 3rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
}
input, textarea {
  padding: 0.8rem;
  background-color: #333;
  border: none;
  border-radius: 5px;
  color: #d4af37;
}
button {
  background-color: #d4af37;
  color: #0d0d0d;
  font-weight: bold;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.socials a {
  width: 45px;
  height: 45px;
  margin-right: 1rem;
  text-decoration: none;
  margin-top: 40px;
  margin-bottom: 70px;
  color: transparent;
}
.socials {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.social-icon {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;;
}

.social-icon:hover {
  transform: scale(1.2);
}

.contact-heading {
  text-align: center;
  font-size: 2rem;
  margin: 2rem 0;
  margin: 2rem;
  font-family: 'Playfair Display', serif;
  color: #d4af37;
}
.faq-item {
  margin-bottom: 1.5rem;
   max-width: 800px; /* optional — keeps text from stretching too wide */
  text-align: left; /* ensures left alignment */
  padding-left: 8rem; /* shifts it a bit to the left visually */
}
.faq-item strong {
  display: block;
  margin-bottom: 0.25rem;
}

.metallic-title {
  margin-top: 3rem;
  font-family: 'Cinzel', serif;
  font-size: 80px;
  text-align: center;
  /* Metallic gradient */
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

  /* Glow & animation */
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

.metallic-heading {
  font-size: 50px;
  text-align: center;
  color: #d4af37;
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
  position: relative;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.5),
    0 0 10px rgba(212, 175, 55, 0.4),
    0 0 20px rgba(255, 215, 0, 0.3);
  animation: metallicShine 3s infinite linear;
}

.faq-title {
  font-family: 'Cinzel', serif;
  text-align: center;
  font-size: 50px; 
  margin-top: 4rem;
  margin-bottom: 2rem;
  /* Metallic gradient */
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
    0 0 3px rgba(212, 175, 55, 0.3),
    0 0 6px rgba(255, 215, 0, 0.2);
}

.faq-item {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
}

.faq-pair {
  border-left: 4px solid #d4af37;
  font-size: 20px;;
  padding-left: 1rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.6s ease-in forwards;
  opacity: 0;
  transform: translateY(10px);
}

.faq-pair:nth-child(1) {
  animation-delay: 0.1s;
}
.faq-pair:nth-child(2) {
  animation-delay: 0.3s;
}
.faq-pair:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.faq-question {
  display: flex;
  align-items: center;
  /*gap: 0.6rem;*/
  margin-bottom: 0.4rem;
  font-family: 'Cinzel', serif;
}

.faq-question strong {
  color: #ffd700; 
  font-weight: lighter;
  /*text-shadow:
    0 0 2px #dcc168,
    0 0 4px #ffd700,
    0 0 2px #fef4b0;*/
}

.faq-box {
  background-color: #000000;  /* Dark background for contrast */
  border: 2px solid #d4af37;  /* Golden border */
  padding: 2rem 3rem;          /* Space inside the box */
  max-width: 1100px;
  margin: 2rem auto;           /* Center the box */
  
}


@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 6px #ffd700, 0 0 12px #d4af37;
  }
  50% {
    box-shadow: 0 0 10px #fff176, 0 0 20px #fdd835;
  }
}

.contact-subtitle {
  font-family: 'Cinzel', serif;
  font-size: 1.5rem;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0.5px;
  text-shadow: 0 0 4px rgba(212, 175, 55, 0.4);
}

.form-section form {
  max-width: 1100px; /* Adjust width here */
  margin: 0 auto; /* Center horizontally */
}

* {
  transform-origin: center;
}

.pop-in {
  animation: popIn 0.6s ease-out forwards;
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}





</style>