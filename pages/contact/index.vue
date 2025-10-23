<template>
  <div class="page-background { blurred: showLogin }">
    <Navbar @open-login="showLogin = true"/>
<<<<<<< HEAD
=======
  <div class="contact-wrapper">
    <!-- Removed here <Navbar /> -->

>>>>>>> a2f011bc5ab0e6dd9a579891cb9bcf4fe7e42945
    <section class="socials-section">
      <div class="socials">
        <a href="https://www.instagram.com/support_our_scrubs/?hl=en" target="_blank" rel="noopener">
          <img src="/assets/instagram.png" alt="Instagram" class="social-icon" />
        </a>
        <a href="https://x.com/ScrubsSupport" target="_blank" rel="noopener">
          <img src="/assets/threads.png" alt="Threads" class="social-icon" />
        </a>
        <a href="#">
          <img src="/assets/linkedin.png" alt="LinkedIn" class="social-icon" />
        </a>
        <a href="https://www.facebook.com/SupportOurScrubs/#" target="_blank" rel="noopener">
          <img src="/assets/facebook.png" alt="Facebook" class="social-icon" />
        </a>
      </div>
    </section>
  </div>

    <!-- Added white-title -->

    <section>
      <h1 class="metallic-title white-title">FACTS AND QUESTIONS</h1>
    </section>

    <div class="faq-item">
  <div class="faq-pair">
    <div class="faq-question">
      <span class="glow-bullet"></span>
      <strong>How can I nominate someone?</strong>
    </div>
    <p>You can submit nominations through the inquiry form below or via email.</p>
  </div>

  <div class="faq-pair">
    <div class="faq-question">
      <span class="glow-bullet"></span>
      <strong>Who is eligible to be nominated?</strong>
    </div>
    <p>Any healthcare worker is eligible to be nominated for the Noble Award.</p>
  </div>

  <div class="faq-pair">
    <div class="faq-question">
      <span class="glow-bullet"></span>
      <strong>Who can nominate a candidate?</strong>
    </div>
    <p>Any member of our society can nominate someone for the Noble Award.</p>
  </div>
</div>

  <!-- Added white-title -->

    <section>
      <h1 class="metallic-title white-title">CONTACT US</h1>
    </section>

    <section style="margin-bottom: 150px;">
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="form.name" name="name" placeholder="Your Name" required />
        <input type="email" v-model="form.email" name="email" placeholder="Your Email" required />
        <input type="text" v-model="form.subject" name="subject" placeholder="Subject" />
        <textarea v-model="form.message" name="message" placeholder="Your Message" rows="6" required></textarea>
        <button type="submit">Submit Inquiry</button>
      </form>
    </section>

  </div>
  <Teleport to="body">
    <LoginModal v-if="showLogin" @close="showLogin = false" />
  </Teleport>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import LoginModal from "@/components/MyLogin.vue"

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
</script>

<style scoped>
body {
  background-color: #0d0d0d;
  color: #d4af37;
  margin: 0;
 ;
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
  background-color: #1a1a1a;
  color: #ffffff; /* Changed #d4af37 to white */
  padding: 2rem;
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
  width: 60px;
  height: 60px;
  margin-right: 1rem;
  text-decoration: none;
  margin-top: 80px;
  margin-bottom: 80px;
}
.socials {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}
.contact-heading {
  text-align: center;
  font-size: 2rem;
  margin: 2rem 0;
  color: #d4af37;
}
.faq-item {
  margin-bottom: 1.5rem;
}
.faq-item strong {
  display: block;
  margin-bottom: 0.25rem;
}

/* Added */
.white-title {
  background: none !important;
  color: white !important;
  -webkit-background-clip: unset;
  background-clip: unset;
  text-shadow: none; /* optional, removes gold shadow */
}

.metallic-title {
  font-size: 70px;
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

.faq-item {
  margin-bottom: 1.5rem;
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
  gap: 0.6rem;
  margin-bottom: 0.4rem;
}

.glow-bullet {
  width: 10px;
  height: 10px;
  background-color: #e2d276;
  border-radius: 50%;
  box-shadow: 0 0 6px #ffd700, 0 0 12px #d4af37;
  animation: pulseGlow 1.5s infinite ease-in-out;
}

.faq-question strong {
  color: #ffd700; 
  font-weight: lighter;
  text-shadow:
    0 0 2px #dcc168,
    0 0 4px #ffd700,
    0 0 2px #fef4b0;
}


@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 6px #ffd700, 0 0 12px #d4af37;
  }
  50% {
    box-shadow: 0 0 10px #fff176, 0 0 20px #fdd835;
  }
}

.page-background {
    background:
    radial-gradient(circle at top, rgb(78, 78, 78), rgb(33, 33, 33) 100%);
    min-height: 100vh; /* Makes background cover full viewport height */
  }


</style>
