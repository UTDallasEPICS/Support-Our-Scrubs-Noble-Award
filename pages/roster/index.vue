<template>
  <Navbar />

      <div class="page-background">
        <div>
            <h1 class="metallic-title">Noble Award Recipients</h1>
        </div>

       <div class="three-js-container">

         <ThreeJsScene 
              v-if="nomineeNames.length > 0 && nomineeImage.length > 0 && nomineeInfo.length > 0 && nomineeOccupations.length > 0"
              scene_type="roster"
              :image="nomineeImage"
              :recepient="nomineeNames"
              :occupation="nomineeOccupations"
              :description="nomineeInfo"
              :slug="nomineeSlug"
          />
        </div>
      </div>
</template>


<script>

import ThreeJsScene from '@/components/ThreeJsScene.vue';
import axios from 'axios'


export default {
  name: 'Roster',
  components: {
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
      nomineeSlug: [],
      nomineeImage: []
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

        console.log("sorry man "+this.slug)
      } catch (error) {
        console.error('Error fetching nominees:', error);
      }
    }
  },
  mounted() {
    // Fetch data when the component is mounted
    this.fetchNominees();
    console.log("mounted"+ this.nomineeNames);
   
    
      if (this.$route.query.form) {
        const decodedData = JSON.parse(decodeURIComponent(this.$route.query.form));
        console.log("datos "+decodedData.occupation); // { name: "John Doe", ... }
      }
  },
};



</script>

<style scoped>
/* General Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.three-js-container {
  width: 100%;
  max-width: 12000px;    
  height: calc(100vh - 150px);
  margin: 0 auto;         
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}



.metallic-title {
font-family: 'Cinzel', serif;
  font-size: 70px;
  text-align: center;
  position: relative;
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
  margin-bottom: 0px;
  margin-top: -10px;

  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.4),
    0 0 10px rgba(212, 175, 55, 0.2),
    0 0 15px rgba(255, 215, 0, 0.1);

  overflow: hidden;
}



@keyframes glintSwipe {
0% {
  left: -75%;
}
50% {
  left: 100%;
}
100% {
  left: 100%;
}
}

/* Reflection Glow */
.metallic-title::before {
 content: 'Noble Award';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 70px;
  transform: scaleY(-1);
  opacity: 0.1;
  filter: blur(2px);
  background: linear-gradient(to bottom, rgba(255, 215, 0, 0.3), transparent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}



.metallic-message {
font-family: Snell Roundhand, cursive;
font-size: 30px;
margin-top:0px;
text-align: center;
color: #a77c43;
background: linear-gradient(
  120deg,
  #a77c43 0%,
  #a77c43 20%,
  #a77c43 40%,
  #a77c43 60%,
  #a77c43 80%,
  #a77c43 100%
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

.metallic-text {
font-family: 'Libre Caslon Display', serif;
  font-size: 30px;
  margin-top:0px;
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

html, body {
      width: 100%;
      height: 100%;
      background-color:rgb(0, 0, 0); /* Full black background */
      color: #a77c43; /* Gold text color */
      font-family: Times New Roman, serif;
      display: flex;
      justify-content: center;
      align-items: center;
}

/* Form and Text Styling */
h1 {
    font-size: 50px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 50px;
    font-family: Snell Roundhand, cursive;
}

p {
    font-size: 30px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 50px;
    font-family: Snell Roundhand, cursive;
}

h2 {
    font-size: 30px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 70px;
    font-family: Snell Roundhand, cursive;
}

 .page-background {
  background-color: #000;
  min-height: 100vh;
}

/* Mobile friendly */

@media (max-width: 600px) {
  .metallic-title {
    font-size: clamp(1.8rem, 7vw, 2.6rem);
    margin-top: 0px;
    margin-bottom: 10px;
  }

  .metallic-title::before {
    font-size: clamp(1.8rem, 7vw, 2.6rem);
    top: 95%;
    opacity: 0.12;
  }
}

@media (max-width: 400px) {
  .metallic-title {
    font-size: clamp(1.6rem, 8vw, 2.2rem);
  }

  .metallic-title::before {
    font-size: clamp(1.6rem, 8vw, 2.2rem);
  }
}

</style>
