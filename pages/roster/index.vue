<template>
<<<<<<< HEAD
  <div class="page-background { blurred: showLogin }">
    <Navbar @open-login="showLogin = true"/>
    <div>
      <h1 class="metallic-title">Noble Award Recipients</h1>
    </div>
        <div class="three-js-container">
          <ThreeJsScene 
=======
  <Navbar />

      <div class="page-background">
        <div>
            <h1 class="metallic-title">Noble Award Recipients</h1>
        </div>

       <div class="three-js-container">

         <ThreeJsScene 
>>>>>>> regalSocial
              v-if="nomineeNames.length > 0 && nomineeImage.length > 0 && nomineeInfo.length > 0 && nomineeOccupations.length > 0"
              scene_type="roster"
              :image="nomineeImage"
              :recepient="nomineeNames"
              :occupation="nomineeOccupations"
              :description="nomineeInfo"
          />
        </div>
      </div>
       <Teleport to="body">
    <LoginModal v-if="showLogin" @close="showLogin = false" />
  </Teleport>
</template>


<script>

import ThreeJsScene from '@/components/ThreeJsScene.vue';
import LoginModal from "@/components/MyLogin.vue"


// definePageMeta({
//   middleware: ['auth'] // this runs middleware/auth.ts
// })

export default {
  name: 'Roster',
  components: {
    ThreeJsScene,
    LoginModal
  },
  data() {
    return {
      showLogin: false,
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
      // Rest of your data properties...
    };
  },
  methods: {
    async fetchNominees() {
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

.blurred {
  filter: blur(8px);
  pointer-events: none; 
  user-select: none;
  transform: translateZ(0); 
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

  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.4),
    0 0 10px rgba(212, 175, 55, 0.2),
    0 0 15px rgba(255, 215, 0, 0.1);

  overflow: hidden;
}


.metallic-message {
font-size: 30px;
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
  font-size: 30px;
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

/* Form and Text Styling */
h1 {
    font-size: 50px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 50px;
}

p {
    font-size: 30px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 50px;
}

h2 {
    font-size: 30px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 70px;
}

 .page-background {
    background:
    radial-gradient(circle at top, rgb(78, 78, 78), rgb(33, 33, 33) 100%);  
    min-height: 100vh; /* Makes background cover full viewport height */
  }

</style>
