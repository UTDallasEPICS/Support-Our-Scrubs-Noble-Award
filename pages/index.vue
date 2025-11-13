<template>
  <div>
    <div class="page-background">
      <div>
        <Navbar/>
      </div>
      <div class="welcome">
        <h1 class="metallic-title fade-in">THE NOBLE AWARD</h1>
        
        <div class="top-button-container fade-in">
          <nuxt-link to="/nominator" class="top-button">NOMINATE A HERO</nuxt-link>
          <nuxt-link to="/donate" class="top-button">DONATE</nuxt-link>
        </div>

        <div class="carousel-container">
          <CarouselMain :slides="slides" />
        </div>
        </div>
      
        <div class="container fade-in scroll-fade">
          <h1 class= "metallic-title">The Noble Award:</h1>
          <h2 style="margin-bottom: 100px; ">Honoring Those Who Serve with Excellence, Dedication, and Heart</h2>
          <div class="mb-20" style="display: flex; justify-content: center;">
            <img src="assets/bg-removed-noble-award-plaque.png" class="profile-image" alt="Noble Award Plaque" />
          </div>
          <div class="info-container">
            <h1 class= "metallic-title">Recognizing Extraordinary Service & Sacrifice</h1>
            <p>Founded by Support Our Scrubs, the Noble Award is more than just a recognition program—it is a movement to 
              honor those who dedicate their lives to serving others. With the support of our community, businesses, and donors,
              we uplift the unsung heroes who go above and beyond.</p>
            <p>Thanks to the exceptional work of the EPICS UTD team, this vision has been brought to life. Over multiple semesters, 
              a talented group of students and professors at the University of Texas at Dallas have contributed their time, creativity, 
              and expertise to develop this platform, ensuring that every nominee is celebrated with the honor they deserve.</p>
          </div>
        
          <div class="info-container">
            <h1 class= "metallic-title" style="text-align: center;">How It Works:</h1>

            <div class="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-20 mb-20">
              <!-- Card 1 -->
              <div class="bg-amber-300 p-6 w-full md:w-1/3 rounded-lg fade-in scroll-fade">
                <div class="mb-4">
                  <h1 style="color: #4E4E4E;">Step 1: Nominate a Hero</h1>
                  <p style="color: #4E4E4E;">Know someone who deserves recognition? Submit a nomination detailing their impact and dedication.</p>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="bg-amber-300 p-6 w-full md:w-1/3 rounded-lg fade-in scroll-fade" style="transition-delay: 0.2s;">
                <div class="mb-4">
                  <h1 style="color: #4E4E4E;">Step 2: Review & Selection</h1>
                  <p style="color: #4E4E4E;">Each nomination is carefully reviewed to ensure honorees receive the recognition they have earned.</p>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="bg-amber-300 p-6 w-full md:w-1/3 rounded-lg fade-in scroll-fade" style="transition-delay: 0.4s;">
                <div class="mb-4">
                  <h1 style="color: #4E4E4E;">Step 3: Honoring & Celebration</h1>
                  <p style="color: #4E4E4E;">Award recipients are showcased on our website and social media, receiving the Noble Award as a token of appreciation.</p>
                </div>
              </div>
            </div>
          <!-- End of Card Section -->

          <h1 class= "metallic-title" style="text-align: center;">Who Can You Nominate?</h1>
            <div class="flex flex-wrap justify-center items-center gap-6 mt-20">
            <!-- Reusable Card Class -->
            <div class="bg-amber-300 p-6 rounded-full fade-in scroll-fade flex items-center justify-center text-center text-white"
                style="transition-delay: 0.4s; aspect-ratio: 1 / 1; width: 350px; min-width: 180px;">
              <h1 class="text-sm md:text-base" style="color: white;">Healthcare<br><br>Heroes</h1>
            </div>

            <div class="bg-amber-300 p-6 rounded-full fade-in scroll-fade flex items-center justify-center text-center text-white"
                style="transition-delay: 0.4s; aspect-ratio: 1 / 1; width: 350px; min-width: 180px;">
              <h1 class="text-sm md:text-base" style="color: white;">Police Officers</h1>
            </div>

            <div class="bg-amber-300 p-6 rounded-full fade-in scroll-fade flex items-center justify-center text-center text-white"
                style="transition-delay: 0.4s; aspect-ratio: 1 / 1; width: 350px; min-width: 180px;">
              <h1 class="text-sm md:text-base" style="color: white;">Firefighters</h1>
            </div>

            <div class="bg-amber-300 p-6 rounded-full fade-in scroll-fade flex items-center justify-center text-center text-white"
                style="transition-delay: 0.4s; aspect-ratio: 1 / 1; width: 350px; min-width: 180px;">
              <h1 class="text-sm md:text-base" style="color: white;">Active-Duty<br><br>Military or<br><br>Veterans</h1>
            </div>

            <div class="bg-amber-300 p-6 rounded-full fade-in scroll-fade flex items-center justify-center text-center text-white"
                style="transition-delay: 0.4s; aspect-ratio: 1 / 1; width: 350px; min-width: 180px;">
              <h1 class="text-sm md:text-base" style="color: white;">Educators</h1>
            </div>

            <div class="bg-amber-300 p-6 rounded-full fade-in scroll-fade flex items-center justify-center text-center text-white"
                style="transition-delay: 0.4s; aspect-ratio: 1 / 1; width: 350px; min-width: 180px;">
              <h1 class="text-sm md:text-base" style="color: white;">More!</h1>
            </div>
          </div>
        </div>
      </div>
      
       <!-- Three.js Scene Section -->
      <div class="three-js-section">
        <div class="three-js-container">
          <ThreeJsScene 
              v-if="nomineeNames.length > 0 && nomineeImage.length > 0 && nomineeInfo.length > 0 && nomineeOccupations.length > 0"
              scene_type="home"
              :image="nomineeImage"
              :recepient="nomineeNames"
              :occupation="nomineeOccupations"
              :description="nomineeInfo"
              :slug="nomineeSlug"
              ;
          />
        </div>
      </div>

    </div>
  </div>
</template>



 

<script>
import CarouselMain from '../components/CarouselMain.vue';
import Navbar from '@/components/Navbar.vue';
import ThreeJsScene from '@/components/ThreeJsScene.vue';
import caesarImage from '../assets/caeser_bust.png';
import axios from 'axios'

export default {
  name: 'HomePage',
  components: {
    Navbar,
    CarouselMain,
    ThreeJsScene
  },
  data() {
    return {
      slides: [
        'https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      nomineeAboutMe: [],
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
        this.nomineeAboutMe = response.map(n => n.aboutme)
        this.nomineeSlug = response.map(n => n.slug)

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
};



</script>


<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap');

  

.three-js-container {
  width: 100%;     /* 50% of parent width */
  height: 60vh;   /* 60% of viewport height */
  max-width: 10000px; /* Optional: maximum size */
}

.metallic-title {
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
    text-shadow:
      0 0 5px rgba(212, 175, 55, 0.5),
      0 0 10px rgba(212, 175, 55, 0.4),
      0 0 20px rgba(255, 215, 0, 0.3);
    animation: metallicShine 3s infinite linear;
    text-align: center;
    margin: 0 auto;
    z-index: 10;
    padding: 1rem;
    white-space: normal; /* allow wrapping */
    max-width: 90vw;
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
    bottom: 10px; 
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    z-index: 10;
  }

    .top-button{
    background-color: #d4af37;
    color: white;
    font-weight: 500;
    text-decoration: none;
    padding: 20px;
    border-radius: 50px;
    font-size: clamp(0.5rem, 2vw, 4rem); 
    text-align: center;
    transition: background-color 0.3s ease;
    margin: 50px;
    align-self: flex-start;
  }

  .top-button:hover {
    background-color: #fff5d6; /* Change to a lighter shade on hover */
    color: #d4af37;
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


    .info-container {
    text-align: left; 
    padding-left: 5rem;
    padding-right: 5rem;
    color: white;
    padding-bottom: 100px;
  }

  .info-container h1{
    text-align: left; 
    color: #d4af37;
    font-size: 3rem;
    text-align: left;
  }
    .info-container p{
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40%;
    z-index: 2; /* Ensure it's above the background */  
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
    z-index: 2; /* Ensure it's above the background */
  }

    .page-background {
    background:
    radial-gradient(circle at top, rgb(78, 78, 78), rgb(33, 33, 33) 100%);
    font-family: 'Libre Caslon Display', serif;
    min-height: 100vh; /* Makes background cover full viewport height */
  }


  
</style>
