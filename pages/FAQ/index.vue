<template>
  <Navbar @open-login="showLogin = true"/>
  <div class="contact-wrapper" :class="['page-background', { blurred: showLogin }]">
    
    <section>
      <h1 class="metallic-title">Frequently Asked Questions</h1>
    </section>
  
  <section class="faq-box-section">
    <!-- <h1 class="faq-title">Facts and Questions</h1>-->
    
    <div class="faq-item fade-in scroll-fade">
    
    <div class="faq-pair">
      <div class="faq-question"><strong>How can I nominate someone?</strong></div>
      <p>You can submit nominations through the inquiry form below or via email.</p>
    </div>

    <div class="faq-pair">
      <div class="faq-question"><strong>Who is eligible to be nominated?</strong></div>
      <p>Any healthcare worker is eligible to be nominated for the Noble Award.</p>
    </div>

    <div class="faq-pair">
      <div class="faq-question"><strong>Who can nominate a candidate?</strong></div>
      <p>Any member of our society can nominate someone for the Noble Award.</p>
    </div>

  </div>
    <Teleport to="body">
    <LoginModal v-if="showLogin" @close="showLogin = false" />
  </Teleport>
</section>

</div>

</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Navbar from '@/components/Navbar.vue';
import nobleImage from '@/assets/nobleaward.png';
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import LoginModal from '@/components/MyLogin.vue'

gsap.registerPlugin(ScrollTrigger)



definePageMeta({});

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const showLogin = ref(false);

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

  gsap.from(".faq-title", {
    scrollTrigger: {
      trigger: ".faq-box-section",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".faq-item", {
    scrollTrigger: {
      trigger: ".faq-box-section",
      start: "top 75%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 60,
    duration: 1.1,
    ease: "power2.out",
    delay: 0.2
  });
});

</script>

<style scoped>

.contact-wrapper {
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff; 
  padding: 2rem;
}

.faq-item {
  margin-bottom: 1.5rem;
  max-width: 1320px;
  text-align: left;
  padding-left: 15rem;
}

.faq-item strong {
  display: block;
  margin-bottom: 0.25rem;
}

.metallic-title {
  margin-top: 3rem;
  font-family: 'Cinzel', serif;
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
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

.faq-box-section {
  margin-top: 3rem;
}

.faq-pair {
  border-left: 1.6px solid #d4af37;
  font-size: 16px;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.6s ease-in forwards;
  opacity: 0;
  transform: translateY(10px);
  background-color: #000000;
  letter-spacing: 0.5px;
}

.faq-pair:nth-child(1) { animation-delay: 0.1s; }
.faq-pair:nth-child(2) { animation-delay: 0.3s; }
.faq-pair:nth-child(3) { animation-delay: 0.5s; }

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-question {
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  font-family: 'Cinzel', serif;
  font-size: 25px;
}

.faq-question strong {
  color: #d4af37;
  font-weight: lighter;
}

/* Mobile Friendly */

@media (max-width: 768px) {

  .contact-wrapper {
    padding: 1.2rem;
  }

  .metallic-title {
    font-size: 38px;
    margin-top: 1.2rem;
    line-height: 1.2;
    padding: 0 1rem;
  }

  .faq-item {
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto;
    max-width: 100%;
  }

  .faq-pair {
    padding: 1rem 1.2rem;
    border-left-width: 2px;
  }

  .faq-question {
    font-size: 19px;
    line-height: 1.3;
  }

  .faq-pair p {
    font-size: 15px;
    line-height: 1.45;
  }

  .faq-box-section {
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .metallic-title {
    font-size: 32px;
  }

  .faq-question {
    font-size: 18px;
  }

  .faq-pair {
    padding: 0.9rem 1rem;
  }
}
.blurred {
  filter: blur(8px);
  pointer-events: none;
  user-select: none;
  transform: translateZ(0);
}


</style>