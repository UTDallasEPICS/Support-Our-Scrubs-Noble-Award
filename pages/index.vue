<template> 
  <!-- INTRO OVERLAY -->
  <div v-if="showIntro" class="intro-overlay">
    <h1 ref="introTitle" class="intro-title">THE NOBLE AWARD</h1>
  </div>

  <!-- MAIN CONTENT -->
  <div v-show="!showIntro" ref="mainContent" class="main-content">
    <Navbar @open-login="showLogin = true"/>
    <div class="page-background">

      <!-- Welcome Section -->
      <div class="welcome">
        <h1 class="metallic-title fade-in title-shift">THE NOBLE AWARD</h1>

        <!-- NEW SUBTITLE HERE -->
        <h2 class="welcome-subtitle fade-in">Honoring the heroes among us</h2>

        <div class="top-button-container fade-in">
          <nuxt-link to="/nominator/form" class="top-button">NOMINATE A HERO</nuxt-link>
          <nuxt-link to="/donate" class="top-button">DONATE</nuxt-link>
        </div>

        <div class="carousel-container">
          <CarouselMain :slides="slides" />
        </div>
      </div>

      <!-- Info Section -->
      <div class="container fade-in scroll-fade">

       <!-- 
        <h1 class="metallic-title mb-40">The Noble Award:</h1>
        <h2 class="subtitle mb-60">Honoring Those Who Serve with Excellence, Dedication, and Heart</h2>

        <div class="mb-20 flex justify-center">
          <img src="assets/bg-removed-noble-award-plaque.png" class="profile-image" alt="Noble Award Plaque" />
        </div>

        <div class="info-container">
          <h1 class="metallic-title2">Recognizing Extraordinary Service & Sacrifice</h1>
          <p>Founded by Support Our Scrubs, the Noble Award is more than just a recognition program—it is a movement to
            honor those who dedicate their lives to serving others. With the support of our community, businesses, and donors,
            we uplift the unsung heroes who go above and beyond.</p>
          <p>Thanks to the exceptional work of the EPICS UTD team, this vision has been brought to life. Over multiple semesters,
            a talented group of students and professors at the University of Texas at Dallas have contributed their time, creativity,
            and expertise to develop this platform, ensuring that every nominee is celebrated with the honor they deserve.</p>
        </div>
        -->

        <!-- Three.js Scene Section -->
        <!-- <div class="three-js-section">
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
        </div> -->
        <UserData/>
        <div class="info-container section-gap">
          <h1 class="section-header">How It Works:</h1>

          <div class="flex flex-col md:flex-row justify-center items-stretch gap-10 mt-8 mb-10">

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
            <div class="step-card fade-in scroll-fade" style="transition-delay: 0.4s;">
              <h1>Step 4: View & Share the Profile</h1>
              <p>Review the completed hero profile and share it with others to celebrate their achievements!</p>
            </div>
          </div>

          <hr class="cards-border">
        </div>

        <div class="info-container section-gap nominate-section">
          <h1 class="metallic-title2 text-center">Who Can You Nominate?</h1>

          <div class="flex flex-wrap justify-center items-center gap-6 mt-20">
            <!-- Hero Nominee Categories -->
            <div class="hero-grid fade-in scroll-fade">
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
        </div>

      </div>
    </div>
  </div>
    <Teleport to="body">
      <LoginModal v-if="showLogin" @close="showLogin = false" />
    </Teleport>
</template>





<script>
import CarouselMain from '../components/CarouselMain.vue';
import Navbar from '@/components/Navbar.vue';
import ThreeJsScene from '@/components/ThreeJsScene.vue';
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import UserData from '@/components/UserData.vue';
import LoginModal from '@/components/MyLogin.vue'


export default {
  name: 'HomePage',
  components: {
    Navbar,
    CarouselMain,
    ThreeJsScene,
    UserData,
    LoginModal,
  },
  data() {
    return {
      slides: [
        'https://images.pexels.com/photos/32828955/pexels-photo-32828955.jpeg?_gl=1*36xmyr*_ga*MTY4NzYwNjg1NS4xNzYwNTc1MDg1*_ga_8JE65Q40S6*czE3NjA1NzUwODQkbzEkZzEkdDE3NjA1NzUzNDgkajU5JGwwJGgw',
        'https://images.pexels.com/photos/5029859/pexels-photo-5029859.jpeg?_gl=1*1hqt2be*_ga*MTY4NzYwNjg1NS4xNzYwNTc1MDg1*_ga_8JE65Q40S6*czE3NjA1NzkwODkkbzIkZzEkdDE3NjA1NzkxODYkajQzJGwwJGgw',
        'https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      currentModelPath: '/models/frame.glb',
      loadingProgress: 0,
      modelLoadError: null,
      customObjects: [],
      nomineeInfo: [],
      nomineeNames: [],
      nomineeOccupations: [],
      nomineeEmails: [],
      nominees: [],
      nomineeImage: [],
      showLogin: false,
      // Rest of your data properties...
    };
  },
  methods: {
    async fetchNominees() {
      console.log("not calling ")
      try {
        const response = await $fetch('/api/nominee?stat=APPROVED', { method: 'GET' });
       
        // Store the full nominee list
        this.nominees = response;
       
        this.nomineeNames = response.map(n => `${n.firstName} ${n.lastName}`)
        this.nomineeEmails = response.map(n => n.email)
        this.nomineeOccupations = response.map(n => n.occupation)
        this.nomineeInfo = response.map(n => n.description)
        this.nomineeImage = response.map(n => n.photoURL)

        console.log("sorry man "+this.nomineeImage)
      } catch (error) {
        console.error('Error fetching nominees:', error);
      }
    }
  },
  mounted() {
    // Fetch data when the component is mounted
    this.fetchNominees();
    console.log("mounted"+ this.nomineeNames);

    // Set up intersection observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Keep observing step boxes for reappearing animation when scrolling back up
          if (!entry.target.classList.contains('scroll-fade')) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: 0.1, // 10% of the element must be visible
      rootMargin: '0px 0px -50px 0px' // Triggers slightly before element comes into view
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach((element) => {
      observer.observe(element);
    });

  },
  setup() {
  const showIntro = ref(true)
  const introTitle = ref(null)
  const mainContent = ref(null)

  onMounted(() => {
    // Title fade + scale in
    gsap.fromTo(introTitle.value,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    )

    // Title glow pulse
    gsap.to(introTitle.value, {
      textShadow: "0 0 40px #d4af37",
      duration: 1.5,
      repeat: 1,
      yoyo: true,
      delay: 1.5
    })

    // Fade out overlay
    gsap.to(".intro-overlay", {
      opacity: 0,
      duration: 0.7,
      delay: 2.2,
      onComplete: () => {
        showIntro.value = false

        // Smoothly fade in homepage
        gsap.fromTo(".main-content",
          { opacity: 0.25 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        )
      }
    })
  })

  return { showIntro, introTitle, mainContent }

}
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');


.three-js-container {
  width: 100%;     
  height: 60vh;   
  max-width: 10000px;
}

.metallic-title {
    font-family: 'Libre Caslon Display', serif;
    font-size: clamp(2rem, 8vw, 10rem);
    color: transparent;
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
    text-shadow:
      0 0 5px rgba(212, 175, 55, 0.5),
      0 0 10px rgba(212, 175, 55, 0.4),
      0 0 20px rgba(255, 215, 0, 0.3);
    animation: metallicShine 3s infinite linear;
    text-align: center;
    margin: 0 auto;
    z-index: 10;
    white-space: normal;
    max-width: 90vw;
    line-height: 1.1;
  }
  .metallic-title2 {
    font-family: 'Libre Caslon Display', serif;
    font-size: clamp(2rem, 15vw, 10rem);
    color: transparent;
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
    text-align: center;
    margin: 0 auto;
    z-index: 10;
    white-space: normal; 
    max-width: 90vw;
    line-height: 1.1;
  }

  .title-shift {
  margin-top: -180px;
  }


  @keyframes metallicShine {
    0% {
      background-position: 200% center;
    }
    100% {
      background-position: -200% center;
    }
  }

  .fade-in {
    opacity: 0;
    transform: translateY(30px);  
    transition: opacity 0.8s ease-in-out, transform 0.8s ease-out;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);  
  }

  .scroll-fade {
    transition-property: opacity, transform;
    transition-duration: 0.8s;
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    color: #d4af37;
    font-size: 2rem;
    font-family: 'Cormorant Garamond', serif;
    position: relative;
    overflow: hidden;
    padding: 2rem;
   
  }

  .top-button-container{
    position: absolute;
    bottom: 237px;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    z-index: 10;
  }

    .top-button {
    background-color: transparent;
    color: white;
    border: 2px solid white;
    font-weight: 600;
    text-decoration: none;
    padding: 18px 40px;
    border-radius: 8px;
    font-size: clamp(1rem, 2vw, 2rem);
    text-align: center;
    transition: all 0.3s ease;
    margin: 20px;
    letter-spacing: 1px;
  }

  .top-button:hover {
    background-color: white;
    color: black;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  .carousel-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .carousel-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }

  .container {
    max-width: 1400px;
    margin: 300px auto 0;
    padding: 1rem;
    color: white;
  }

    .container h1{
    font-size: 8em;
    text-align: center;
    font-family: 'Libre Caslon Display', serif;
    margin-top: 60px;
  }

  .container h2{
    font-size: 2rem;
    text-align: center;
    font-family: 'Libre Caslon Display', serif;
  }

  .bullet-list {
    list-style-type: disc; /* Default bullet style */
    padding-left: 20px; /* Indent list */
  }

  .bullet-list li {
    margin-bottom: 5px; /* Spacing between items */
    font-size: 1.5rem;
  }

  .info-container h1 {
    text-align: left;
    color: #d4af37;
    font-family: 'Cinzel', serif;
    text-transform: uppercase;    /* MAKE ALL CAPS */
    letter-spacing: 2px;  
    font-size: 3rem;      
    
  }

  .info-container h1{
    text-align: left;
    color: #d4af37;
    font-size: 3.3rem;
    text-align: left;
    margin-bottom: 40px;
  
  }

  .info-container p{
    font-size: 1.4rem;
    margin-bottom: 40px;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif;
  }

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
  z-index: 2;
}

.donate-button {
  display: inline-block;
  background-color: #d4af375f;
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 15px;
  border-radius: 50px;
  font-size: 60px;
  text-align: center;
  transition: background-color 0.3s;
  margin: 50px;
  align-self: flex-start;
  z-index: 2; 
}

.page-background {
  background:
  radial-gradient(circle at top, rgb(0, 0, 0), rgb(33, 33, 33) 300%);
  font-family: 'Libre Caslon Display', serif;
  min-height: 100vh;
}

.profile-image {
  width: auto;      
  height: auto;    
  max-width: 100%; 
  display: block; 
  border: none;    
  transition: transform 0.3s ease;
 
  /* Glow effect */
  filter: drop-shadow(0 0 20px rgb(255, 255, 255))
          drop-shadow(0 0 40px rgba(255, 215, 0, 0.4));
  transition: transform 0.3s ease, filter 0.3s ease;
}

.profile-image:hover {
  filter: drop-shadow(0 0 30px rgb(255, 255, 255))
          drop-shadow(0 0 60px rgba(255, 215, 0, 0.6));
  transform: scale(1); 
 }

.hero-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem 8.6rem;
  justify-content: center;
  align-items: start;
  margin: 2em auto;
  max-width: 1200px;
}

.hero-item {
  text-align: center;
  color: #fff;
  font-family: 'Cinzel', serif;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease, transform 1s ease;
}

.hero-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-frame {
  display: inline-block;
  padding: 10px;
}

.hero-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  filter: brightness(1.05) contrast(1.05);
}

.hero-item p {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 400;
}

  .step-card {
    border: 1px solid white;
    padding: 2rem;
    border-radius: 1px;
    color: white;
    font-family: 'Libre Caslon Display', serif;
    transition: all 0.4s ease;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    min-height: 290px;  
    font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif;
  }

  .step-card h1 {
    font-size: 1.5rem;
    color: #d4af37; 
    margin-top: 0;  
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
  }

  .step-card p {
    font-size: 1.1rem;
    color: #ffffff;
    line-height: 1.5;
    margin-top: 0;  
    line-height: 1.7;
  }

.section-header {
  display: flex;
  align-items: center;
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
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 4rem 0 2rem;

}

.section-header::before,
.section-header::after {
  content: '';
  flex: 1;
  border-bottom: 2px solid white;
  margin: 0 1rem;
}

.cards-border {
  border: none; 
  border-bottom: 2px solid white;
  flex: 1;
  margin: 3rem auto; 
}

.intro-overlay {
  position: fixed;
  inset: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  transition: opacity 1s ease;
}

.intro-title {
  position: relative;
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 6vw, 2rem);
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 5px;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  opacity: 0;
  z-index: 1;
  text-align: center;
}

.intro-title::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
  opacity: 0.7;
  filter: blur(60px);
  z-index: -1;
  animation: pulseGlow 4s infinite ease-in-out;
}

@keyframes pulseGlow {
  0% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(0.95);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(0.95);
  }
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease-in-out, transform 1s ease-out;
  transition-delay: 0.6s;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-content {
  opacity: 0;
  transition: opacity 1.5s ease;
}

.section-gap {
  margin-top: clamp(4rem, 10vw, 8rem);
  margin-bottom: clamp(4rem, 10vw, 8rem);
}

.mb-20 { margin-bottom: 20px; }
.mb-40 { margin-bottom: 40px; }
.mb-60 { margin-bottom: 60px; }
.mb-100 { margin-bottom: 100px; }
.mb-200 { margin-bottom: 200px; }

.nominate-section {
  margin-top: 10rem;
}

.subtitle {
  font-size: 2rem;
  text-align: center;
  font-family: 'Libre Caslon Display', serif;
}

.text-center { text-align: center!important; }

.info-container h1, .info-container h2 {
  margin-bottom: 2rem;
}
.info-container p {
  margin-bottom: 1.5rem;
}

.welcome-subtitle {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: #ffffffdd;
  margin-top: -15px;
  letter-spacing: 5px;
  z-index: 10;
  text-align: center;
  text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

/*Mobile friendly*/

@media (max-width: 600px) {

  .intro-title {
    font-size: 1.6rem !important;
    letter-spacing: 3px;
  }

  .title-shift {
    margin-top: 0 !important;
  }

  .welcome {
    padding-top: 8rem !important;
    padding-bottom: 4rem !important;
    padding: 1.4rem;
    height: auto;
  }

  .metallic-title {
    font-size: 2.8rem !important;
    max-width: 95vw;
    line-height: 1.1;
    margin-bottom: 0.8rem !important;
  }

  .metallic-title2 {
    font-size: 1.9rem !important;
    margin-bottom: 0.6rem !important;
  }

  .welcome-subtitle {
    font-size: 1rem !important;
    margin-top: 4px !important;
    padding: 0 18px;
    line-height: 1.2;
    margin-bottom: 0.6rem !important;
  }

  .top-button-container {
    position: relative !important;
    margin-top: 0.8rem !important;
    bottom: auto !important;

    display: flex;
    flex-direction: row;    
    justify-content: center;
    align-items: center;
    gap: 0.6rem; 
    flex-wrap: nowrap;   
    width: 100%;
  }

  .top-button {
    margin: 0;            
    padding: 10px 18px;
    font-size: 0.85rem;
    width: auto;
  }

  .subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .container {
    margin-top: 80px !important; 
    padding: 0.5rem;
  }

  .container h1 {
    font-size: 1.6rem !important;
    text-align: center;
  }

  .step-card {
    max-width: 100%;
    min-height: 200px;
    padding: 1rem;
  }

  .step-card h1 {
    font-size: 1.2rem !important;
  }

  .step-card p {
    font-size: 0.95rem;
  }

  .info-container p {
    font-size: 1rem;
    line-height: 1.4;
    margin-top: -0.4rem !important;
    margin-bottom: 0.8rem !important;
  }

  .profile-image {
    max-width: 68%;
    display: block;
    margin: 0 auto;
  }

  .hero-grid {
    grid-template-columns: 1fr !important;
    gap: 1.6rem !important;
  }

  .hero-img {
    width: 80px;
    height: 80px;
  }

  .hero-item p {
    font-size: 0.85rem;
  }

  .three-js-container {
    height: 34vh !important;
  }

  .mb-40 { margin-bottom: 16px; }
  .mb-60 { margin-bottom: 22px; }
}

@media (max-width: 768px) {

  .metallic-title {
    font-size: clamp(2rem, 12vw, 6rem);
    line-height: 1.05;
    margin-bottom: 1rem !important;
  }

  .welcome-subtitle {
    font-size: clamp(0.8rem, 5vw, 1.2rem);
    letter-spacing: 1px;
    margin-top: 0.4rem;
  }

  .top-button-container {
    gap: 0.8rem;
  }

  .top-button {
    padding: 10px 24px;
    font-size: 0.61rem;
    margin: 4px;
  }

  .carousel-container::before {
    background: rgba(0,0,0,0.65);
  }
}

@media (max-width: 900px) {

  .metallic-title,
  .metallic-title2 {
    font-size: 4rem;
  }

  .container {
    margin-top: 150px;
  }

  .hero-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.2rem;
  }
}

.welcome-subtitle {
  font-family: 'Cormorant Garamond', serif;
  color: white;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 1rem;
  font-size: clamp(1rem, 2.2vw, 2.2rem);
}

</style>