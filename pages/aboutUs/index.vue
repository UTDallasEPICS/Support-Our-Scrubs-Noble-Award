<template>
  <Navbar/>
  <div class="page-background">
    <div class="container fade-in scroll-fade">
      <h1 class="metallic-title mb-40">The Noble Award:</h1>
      <h2 class="subtitle mb-60">Honoring Those Who Serve with Excellence, Dedication, and Heart</h2>

      <div class="mb-20 flex justify-center">
        <img src="assets/bg-removed-noble-award-plaque.png" class="profile-image" alt="Noble Award Plaque" />
      </div>

      <div class="info-container">
        <h1 class="metallic-title2">Recognizing Extraordinary Service & Sacrifice</h1>
        <p>
          Founded by Support Our Scrubs, the Noble Award is more than just a recognition program — it is a movement to
          honor those who dedicate their lives to serving others. With the support of our community, businesses, and donors,
          we uplift the unsung heroes who go above and beyond.
        </p>
        <p>
          Thanks to the exceptional work of the EPICS UTD team, this vision has been brought to life. Over multiple semesters,
          a talented group of students and professors at the University of Texas at Dallas have contributed their time, creativity,
          and expertise to develop this platform, ensuring that every nominee is celebrated with the honor they deserve.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ThreeJsScene from '@/components/ThreeJsScene.vue';
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'HomePage',
  components: {
    Navbar,
    ThreeJsScene
  },
  data() {
    return {
      currentModelPath: '/models/frame.glb',
      loadingProgress: 0,
      modelLoadError: null,
      customObjects: [],
      nomineeInfo: [],
      nomineeNames: [],
      nomineeOccupations: [],
      nomineeEmails: [],
      nominees: [],
      nomineeImage: []
    };
  },
  methods: {
    async fetchNominees() {
      try {
        const response = await $fetch('/api/nominee?stat=APPROVED', { method: 'GET' });
        this.nominees = response;
        this.nomineeNames = response.map(n => `${n.firstName} ${n.lastName}`);
        this.nomineeEmails = response.map(n => n.email);
        this.nomineeOccupations = response.map(n => n.occupation);
        this.nomineeInfo = response.map(n => n.description);
        this.nomineeImage = response.map(n => n.photoURL);
      } catch (error) {
        console.error('Error fetching nominees:', error);
      }
    }
  },
  mounted() {
    this.fetchNominees();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (!entry.target.classList.contains('scroll-fade')) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach((element) => {
      observer.observe(element);
    });
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  background-color: black;
}

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

.page-background {
  min-height: 100vh;
  background-color: black;
  color: white;
  font-family: 'Libre Caslon Display', serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.metallic-title,
.metallic-title2 {
  font-family: 'Libre Caslon Display', serif;
  font-size: clamp(1.5rem, 6vw, 4rem);
  color: transparent;
  background: linear-gradient(120deg, #fff4b0 0%, #f0c75e 20%, #d4af37 40%, #f8e27d 60%, #d4af37 80%, #fff4b0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  text-shadow:
    0 0 3px rgba(212, 175, 55, 0.5),
    0 0 6px rgba(212, 175, 55, 0.4),
    0 0 12px rgba(255, 215, 0, 0.3);
  text-align: center;
  margin: 0 auto 20px;
  line-height: 1.1;
}

.subtitle {
  font-size: clamp(0.9rem, 3vw, 1.3rem);
  text-align: center;
  font-family: 'Libre Caslon Display', serif;
  margin-bottom: 60px;
}

.info-container {
  max-width: 800px;
  margin: 0 auto;
}

.info-container h1 {
  text-align: left;
  color: #d4af37;
  font-family: 'Cinzel', serif;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: clamp(1.5rem, 4.5vw, 2.2rem);
  margin-bottom: 25px;
}

.info-container p {
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  margin-bottom: 20px;
  line-height: 1.5;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
}

.profile-image {
  max-width: 60%;
  display: block;
  margin: 0 auto 10px;
  filter: drop-shadow(0 0 15px rgb(255, 255, 255)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.4));
  transition: transform 0.3s ease, filter 0.3s ease;
  border: none;
}

.profile-image:hover {
  filter: drop-shadow(0 0 20px rgb(255, 255, 255)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.6));
  transform: scale(1);
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}


/* Mobile friendly */

@media (max-width: 900px) {
  .container {
    padding: 1rem;
    overflow-x: hidden;
  }
  .profile-image {
    max-width: 100%;
    height: auto;
  }
}

@media (max-width: 600px) {

  .container {
    padding: 0.8rem;
    overflow-x: hidden;
  }

  .metallic-title,
  .metallic-title2 {
    font-size: clamp(1.5rem, 8vw, 2.2rem);
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .profile-image {
    max-width: 100%;
    height: auto;
    margin-bottom: -30px;
  }

  .info-container h1 {
    font-size: 1.3rem;
    margin-top: 0; 
    margin-bottom: 0.8rem;
  }

  .info-container p {
    font-size: 0.9rem;
    line-height: 1.35;
    margin-bottom: 15px;
  }
}
</style>
