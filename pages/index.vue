<template>
  <!-- INTRO OVERLAY -->
  <div v-if="showIntro" class="intro-overlay">
    <h1 ref="introTitle" class="intro-title">THE NOBLE AWARD</h1>
  </div>

  <!-- MAIN CONTENT -->
  <div v-show="!showIntro" ref="mainContent" class="main-content">
    <Navbar/>
    <div class="page-background">

      <!-- Welcome Section -->
      <section class="welcome">
        <div class="welcome-inner">
          <h1 class="metallic-title title-shift">THE NOBLE AWARD</h1>

          <div class="top-button-container">
            <nuxt-link to="/nominator" class="top-button">NOMINATE A HERO</nuxt-link>
            <nuxt-link to="/donate" class="top-button">DONATE</nuxt-link>
          </div>
        </div>

        <div class="carousel-container" aria-hidden="true">
          <CarouselMain :slides="slides" />
        </div>
      </section>

      <!-- Info Section -->
      <div class="container fade-in scroll-fade">
        <h1 class="metallic-title mb-40">The Noble Award:</h1>
        <h2 class="subtitle mb-60">Honoring Those Who Serve with Excellence, Dedication, and Heart</h2>

        <div class="mb-20 flex justify-center">
          <img src="assets/bg-removed-noble-award-plaque.png" class="profile-image" alt="Noble Award Plaque" />
        </div>

        <div class="info-container">
          <h1 class="metallic-title2">Recognizing Extraordinary Service & Sacrifice</h1>
          <p>
            Founded by Support Our Scrubs, the Noble Award is more than just a recognition program—it is a movement to
            honor those who dedicate their lives to serving others. With the support of our community, businesses, and donors,
            we uplift the unsung heroes who go above and beyond.
          </p>
          <p>
            Thanks to the exceptional work of the EPICS UTD team, this vision has been brought to life. Over multiple semesters,
            a talented group of students and professors at the University of Texas at Dallas have contributed their time, creativity,
            and expertise to develop this platform, ensuring that every nominee is celebrated with the honor they deserve.
          </p>
        </div>

        <div class="info-container section-gap">
          <h1 class="section-header">How It Works:</h1>

          <div class="steps">
            <!-- Step Cards -->
            <div class="step-card fade-in scroll-fade">
              <h1>Step 1: Nominate a Hero</h1>
              <p>Know someone who deserves recognition? Submit a nomination detailing their impact and dedication.</p>
            </div>

            <div class="step-card fade-in scroll-fade" style="transition-delay: 0.2s;">
              <h1>Step 2: Review & Selection</h1>
              <p>Each nomination is carefully reviewed to ensure honorees receive the recognition they have earned.</p>
            </div>

            <div class="step-card fade-in scroll-fade" style="transition-delay: 0.4s;">
              <h1>Step 3: Honoring & Celebration</h1>
              <p>Award recipients are showcased on our website and social media, receiving the Noble Award as a token of appreciation.</p>
            </div>
          </div>

          <hr class="cards-border">
        </div>

        <div class="info-container section-gap">
          <h1 class="metallic-title2 text-center">Who Can You Nominate?</h1>

          <div class="hero-grid">
            <!-- Hero Nominee Categories -->
            <div class="hero-item fade-in scroll-fade" style="transition-delay: 0s;">
              <div class="hero-frame">
                <img src="assets/healthcare.png" alt="Healthcare Heroes" class="hero-img" />
              </div>
              <p>Healthcare Heroes</p>
            </div>

            <div class="hero-item fade-in scroll-fade" style="transition-delay: 0.1s;">
              <div class="hero-frame">
                <img src="assets/police.png" alt="Police Officers" class="hero-img" />
              </div>
              <p>Police Officers</p>
            </div>

            <div class="hero-item fade-in scroll-fade" style="transition-delay: 0.2s;">
              <div class="hero-frame">
                <img src="assets/firefighter.png" alt="Firefighters" class="hero-img" />
              </div>
              <p>Firefighters</p>
            </div>

            <div class="hero-item fade-in scroll-fade" style="transition-delay: 0.3s;">
              <div class="hero-frame">
                <img src="assets/military.png" alt="Active-Duty Military or Veterans" class="hero-img" />
              </div>
              <p>Active-Duty Military<br>or Veterans</p>
            </div>

            <div class="hero-item fade-in scroll-fade" style="transition-delay: 0.4s;">
              <div class="hero-frame">
                <img src="assets/educator.png" alt="Educators" class="hero-img" />
              </div>
              <p>Educators</p>
            </div>

            <div class="hero-item fade-in scroll-fade" style="transition-delay: 0.5s;">
              <div class="hero-frame">
                <img src="assets/more3.png" alt="More" class="hero-img" />
              </div>
              <p>More!</p>
            </div>
          </div>
        </div>

        <!-- Three.js Scene Section -->
        <section class="three-js-section">
          <div class="three-js-container">
            <ThreeJsScene
              v-if="nomineeNames.length > 0 && nomineeImage.length > 0 && nomineeInfo.length > 0 && nomineeOccupations.length > 0"
              scene_type="home"
              :image="nomineeImage"
              :recepient="nomineeNames"
              :occupation="nomineeOccupations"
              :description="nomineeInfo"
            />
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import CarouselMain from '../components/CarouselMain.vue'
import Navbar from '@/components/Navbar.vue'
import ThreeJsScene from '@/components/ThreeJsScene.vue'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'HomePage',
  components: { Navbar, CarouselMain, ThreeJsScene },
  data() {
    return {
      slides: [
        'https://images.pexels.com/photos/32828955/pexels-photo-32828955.jpeg',
        'https://images.pexels.com/photos/5029859/pexels-photo-5029859.jpeg',
        'https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      nomineeInfo: [],
      nomineeNames: [],
      nomineeOccupations: [],
      nomineeEmails: [],
      nominees: [],
      nomineeImage: []
    }
  },
  methods: {
    async fetchNominees() {
      try {
        const response = await $fetch('/api/nominee?stat=APPROVED', { method: 'GET' })
        this.nominees = response
        this.nomineeNames = response.map(n => `${n.firstName} ${n.lastName}`)
        this.nomineeEmails = response.map(n => n.email)
        this.nomineeOccupations = response.map(n => n.occupation)
        this.nomineeInfo = response.map(n => n.description)
        this.nomineeImage = response.map(n => n.photoURL)
      } catch (error) {
        console.error('Error fetching nominees:', error)
      }
    }
  },
  mounted() {
    this.fetchNominees()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          if (!entry.target.classList.contains('scroll-fade')) observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
  },
  setup() {
    const showIntro = ref(true)
    const introTitle = ref(null)
    const mainContent = ref(null)

    onMounted(() => {
      gsap.fromTo(introTitle.value, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' })
      gsap.to(introTitle.value, { textShadow: '0 0 40px #d4af37', duration: 1.2, repeat: 1, yoyo: true, delay: 1.2 })
      gsap.to('.intro-overlay', {
        opacity: 0,
        duration: 0.6,
        delay: 2.0,
        onComplete: () => {
          showIntro.value = false
          gsap.fromTo('.main-content', { opacity: 0.2 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        }
      })
    })

    return { showIntro, introTitle, mainContent }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family/Cinzel:wght@400;600;700&display=swap');

/* Layout */
.page-background { 
  background: radial-gradient(circle at top, rgb(0, 0, 0), rgb(33, 33, 33) 300%);
  font-family: 'Libre Caslon Display', serif;
  min-height: 100dvh; /* account for mobile toolbars */
  padding-bottom: env(safe-area-inset-bottom);
}

/* Welcome */
.welcome {
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 100dvh;
  padding: clamp(1rem, 8vw, 3rem) 1rem;
  text-align: center;
  color: #d4af37;
}
.welcome-inner {
  position: relative;
  z-index: 10;
  display: grid;
  gap: clamp(0.5rem, 3vw, 1.25rem); /* base gap */
}

/* Title sizes tuned for mobile */
.metallic-title {
  font-family: 'Libre Caslon Display', serif;
  font-size: clamp(5.25rem, 12vw, 5rem);
  color: transparent;
  background: linear-gradient(120deg,#fff4b0 0%,#f0c75e 20%,#d4af37 40%,#f8e27d 60%,#d4af37 80%,#fff4b0 100%);
  background-clip: text; -webkit-background-clip: text;
  text-shadow: 0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.4), 0 0 20px rgba(255, 215, 0, 0.3);
  animation: metallicShine 3s infinite linear;
  margin: 0 auto;
  line-height: 1.1;
  max-width: 90vw;
}
.metallic-title2 {
  font-family: 'Libre Caslon Display', serif;
  font-size: clamp(1.5rem, 7vw, 3rem);
  color: transparent;
  background: linear-gradient(120deg,#fff4b0 0%,#f0c75e 20%,#d4af37 40%,#f8e27d 60%,#d4af37 80%,#fff4b0 100%);
  background-clip: text; -webkit-background-clip: text;
  text-align: center; margin: 0 auto; line-height: 1.1;
}

/* Avoid negative offset on small screens */
.title-shift { margin-top: 0; }
/* Desktop: no negative offset */
@media (min-width: 1024px) {
  .title-shift { margin-bottom: 3; }
}

.top-button-container{ 
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.top-button { 
  background-color: transparent;
  color: white;
  border: 2px solid white;
  font-weight: 600;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: clamp(1rem, 3.5vw, 1.25rem);
  letter-spacing: 1px;
  transition: transform .25s ease, box-shadow .25s ease, background-color .25s ease, color .25s ease;
}
.top-button:hover {
  background-color: white;
  color: black;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(255,255,255,.2);
}

/* Carousel dims and overlay */
.carousel-container{ position:absolute; inset:0; z-index: 1; }
.carousel-container::before{ content:""; position:absolute; inset:0; background: rgba(0,0,0,.45); z-index:2; }

/* Content container */
.container { 
  max-width: 1200px;
  margin: clamp(2rem, 8vw, 6rem) auto 0;
  padding: 0 clamp(1rem, 4vw, 2rem);
  color: white;
}
.container h1 { font-size: clamp(1.75rem, 6vw, 3.5rem); text-align:center; font-family: 'Libre Caslon Display', serif; margin-top: 0; }
.container h2 { font-size: clamp(1.125rem, 3.2vw, 2rem); text-align:center; font-family: 'Libre Caslon Display', serif; }

.profile-image { max-width: 100%; height: auto; display:block; filter: drop-shadow(0 0 20px rgb(255, 255, 255)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.4)); transition: transform .3s ease, filter .3s ease; }
.profile-image:hover { filter: drop-shadow(0 0 30px rgb(255,255,255)) drop-shadow(0 0 60px rgba(255,215,0,.6)); transform: scale(1); }

.info-container h1 { text-align:left; color:#d4af37; font-family:'Cinzel', serif; text-transform:uppercase; letter-spacing:2px; font-size: clamp(1.25rem, 4.5vw, 2rem); margin-bottom: 1rem; }
.info-container p { font-size: clamp(1rem, 2.9vw, 1.125rem); margin-bottom: 1.25rem; }

/* Steps: 1 → 2 → 3 columns */
.steps { display:grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 640px){ .steps { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px){ .steps { grid-template-columns: repeat(3, 1fr); } }

.step-card { border: 1px solid white; padding: 1.25rem; border-radius: 8px; color:white; font-family:'Libre Caslon Display', serif; transition: box-shadow .25s ease, transform .25s ease; min-height: 240px; }
.step-card:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,.25); }
.step-card h1 { font-size: clamp(1.125rem, 3.5vw, 1.4rem); color:#d4af37; margin: 0 0 .75rem; text-transform: uppercase; letter-spacing: 1px; }
.step-card p { font-size: clamp(.95rem, 3vw, 1.1rem); color:#ffffffcc; line-height:1.55; margin: 0; }

.section-header { display:flex; align-items:center; color:#d4af37; background:linear-gradient(120deg,#fff4b0 0%,#f0c75e 20%,#d4af37 40%,#f8e27d 60%,#d4af37 80%,#fff4b0 100%); background-clip:text; -webkit-background-clip:text; font-family:'Cinzel', serif; font-size: clamp(1rem, 4vw, 2rem); text-transform:uppercase; letter-spacing:2px; margin: 2.5rem 0 1.5rem; }
.section-header::before, .section-header::after { content:''; flex:1; border-bottom:2px solid white; margin: 0 1rem; }
.cards-border { border:none; border-bottom:2px solid white; margin: 2rem auto; }

/* Hero grid */
.hero-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap: clamp(1.5rem, 6vw, 3rem); justify-content:center; align-items:start; margin: 2rem auto; max-width: 1000px; }
@media (min-width: 900px){ .hero-grid { grid-template-columns: repeat(3, 1fr); gap: 3rem 4rem; } }
.hero-item { text-align:center; color:#fff; font-family:'Cinzel', serif; opacity:0; transform: translateY(40px); transition: opacity 1s ease, transform 1s ease; }
.hero-item.visible { opacity:1; transform: translateY(0); }
.hero-frame { display:inline-block; padding: 10px; }
.hero-img { width: 96px; height: 96px; object-fit: cover; filter: brightness(1.05) contrast(1.05); }
@media (min-width: 640px){ .hero-img { width: 120px; height: 120px; } }
.hero-item p { margin-top: .75rem; font-size: .95rem; color:#ffffff; letter-spacing:1px; text-transform:uppercase; font-weight:500; text-shadow: 0 0 10px rgba(0,0,0,.8); }

/* Three.js */
.three-js-section { margin-top: clamp(2rem, 8vw, 6rem); }
.three-js-container { width: 100%; height: clamp(320px, 60dvh, 720px); max-width: 10000px; }

/* Intro overlay */
.intro-overlay { position: fixed; inset: 0; background: black; display:flex; align-items:center; justify-content:center; z-index:2000; transition: opacity .6s ease; }
.intro-title { position: relative; font-family:'Cinzel', serif; font-size: clamp(1.5rem, 6vw, 2rem); color:#d4af37; text-transform:uppercase; letter-spacing:5px; text-shadow: 0 0 20px rgba(212,175,55,.5); opacity:0; text-align:center; }
.intro-title::before { content:''; position:absolute; top:50%; left:50%; width: 400px; height: 400px; transform: translate(-50%, -50%); background: radial-gradient(circle, rgba(212,175,55,.15) 0%, rgba(0,0,0,0) 70%); opacity:.7; filter: blur(60px); z-index:-1; animation: pulseGlow 4s infinite ease-in-out; }
@keyframes pulseGlow { 0% { opacity:.4; transform: translate(-50%, -50%) scale(.95);} 50% { opacity:.8; transform: translate(-50%, -50%) scale(1.05);} 100% { opacity:.4; transform: translate(-50%, -50%) scale(.95);} }

/* Reveal animations */
.fade-in { opacity: 0; transform: translateY(30px); transition: opacity .8s ease-in-out, transform .8s ease-out; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
.main-content { opacity: 0; transition: opacity 1.2s ease; }

/* Utilities */
.section-gap { margin-top: clamp(2rem, 8vw, 6rem); margin-bottom: clamp(2rem, 8vw, 6rem); }
.mb-20 { margin-bottom: 20px; }
.mb-40 { margin-bottom: 40px; }
.mb-60 { margin-bottom: 60px; }
.text-center { text-align: center !important; }

/* Motion prefs */
@media (prefers-reduced-motion: reduce){
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}

/* === hero title + button tweaks === */

/* Desktop: bigger title + bigger buttons + tighter gap + slightly shifted (up a bit from before) */
@media (min-width: 1024px) {
  .welcome .metallic-title {
    font-size: clamp(8rem, 18vw, 7rem); /* bigger desktop title */
  }

  .welcome-inner {
    gap: 0.25rem;       /* space between title and buttons */
    margin-top: 2rem;   /* was 2.5rem – move everything up a bit */
  }

  .top-button-container {
    margin-top: 0; /* keep buttons aligned just under title */
  }

  .top-button {
    padding: 18px 36px;          /* bigger buttons on desktop */
    font-size: 1.15rem;          /* slightly larger text */
    border-radius: 12px;
  }
}

/* Wide desktop: slightly bigger + small gap + moved up a bit */
@media (min-width: 1440px) {
  .welcome .metallic-title {
    font-size: clamp(7rem, 12.3vw, 7.4rem); /* a bit larger on big screens */
  }

  .welcome-inner {
    gap: 0.1rem;      /* tiny but clear separation */
    margin-top: .1rem; /* was lower; move block up slightly */
  }

  .top-button-container {
    margin-top: 0.8rem; /* was 1.3rem – bring buttons up a touch */
  }

  .top-button {
    font-size: 1.2rem;
    padding: 20px 40px;
  }
}

/* Mobile: big title, smaller side-by-side buttons */
@media (max-width: 640px) {
  .welcome-inner {
    gap: 0.75rem;
    margin-top: 0; /* no extra offset on mobile */
  }

  .welcome .metallic-title {
    font-size: clamp(2.75rem, 20vw, 3.25rem);
    max-width: 90vw;
  }

  .top-button-container {
    flex-wrap: nowrap;
    gap: 0.5rem;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
  }

  .top-button {
    flex: 1 1 0;
    padding: 10px 8px;
    font-size: 0.78rem;
    letter-spacing: 0.5px;
  }
}
</style>
