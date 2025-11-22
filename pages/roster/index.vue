<template>

      <div class="page-background">
        <div>
            <h1 class="metallic-title">Noble Award Recipients</h1>

            

        </div>
              <Navbar />

              <!-- Search Section -->
              <div class="search-section" @click.stop>
                <div class="search-input-container">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by name, occupation, workplace..."
                    @keyup.enter="performSearch"
                    class="search-input"
                  />
                  <button @click.stop.prevents="performSearch" :disabled="searchLoading" class="search-button">
                    <span v-if="searchLoading">Searching...</span>
                    <span v-else>Search</span>
                  </button>
                  <button v-if="hasSearched" @click.stop.prevent="clearSearch" class="clear-button">Clear</button>
                </div>
                <div v-if="searchError" class="search-error">{{ searchError }}</div>
              </div>

       <div class="three-js-container">

         <ThreeJsScene 
              v-if="nomineeNames.length > 0 && nomineeImage.length > 0 && nomineeInfo.length > 0 && nomineeOccupations.length > 0"
              :key="nomineeNames.join(',')"
              scene_type="roster"
              :image="nomineeImage"
              :recepient="nomineeNames"
              :occupation="nomineeOccupations"
              :description="nomineeInfo"
              :aboutme="nomineeAboutMe"
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
      nomineeImage: [],
      // Search state
      searchQuery: '',
      searchLoading: false,
      searchError: '',
      hasSearched: false,
      // Rest of your data properties...
    };
  },
  methods: {
    async performSearch() {
      if (!this.searchQuery.trim()) return;
      
      this.searchLoading = true;
      this.searchError = '';
      this.hasSearched = true;

      try {
        const response = await $fetch(`/api/search?searchTerm=${encodeURIComponent(this.searchQuery)}`);
    
        // Filter to only show approved nominees
        const results = response.results.filter(n => n.status === 'APPROVED');

        // Update the nominee arrays with search results
        this.nominees = results;
        this.nomineeNames = results.map(n => `${n.firstName} ${n.lastName}`);
        this.nomineeEmails = results.map(n => n.email);
        this.nomineeOccupations = results.map(n => n.occupation);
        this.nomineeInfo = results.map(n => n.description || '');
        this.nomineeImage = results.map(n => n.photoURL);
        this.nomineeAboutMe = results.map(n => n.aboutme || '');
        this.nomineeSlug = results.map(n => n.slug);
      } catch (e) {
        this.searchError = 'Failed to search nominees. Please try again.';
        console.error(e);
      } finally {
        this.searchLoading = false;
      }
    },

    clearSearch() {
      this.searchQuery = '';
      this.hasSearched = false;
      this.searchError = '';
      this.fetchNominees(); // Reload all nominees
    },
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
font-family: 'Libre Caslon Display', serif;
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

/* Glint Swipe Animation */
.metallic-title::after {
content: '';
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
  transform: skewX(-20deg);
  animation: glintSwipe 3s ease-in-out infinite;
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
    background:
    radial-gradient(circle at top, rgb(43, 41, 41), rgb(20, 20, 20) 100%);
    
    min-height: 100vh; /* Makes background cover full viewport height */
  }

  /* Search Section Styles */
  .search-section {
    max-width: 700px;
    margin: 0 auto 20px;
    padding: 0 20px;
  }

  .search-input-container {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .search-input {
    flex: 1;
    min-width: 200px;
    max-width: 400px;
    padding: 12px 20px;
    border: 2px solid #d4af37;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s, background 0.3s;
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .search-input:focus {
    border-color: #fff5d6;
    background: rgba(255, 255, 255, 0.15);
  }

  .search-button {
    padding: 12px 25px;
    background: #d4af37;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .search-button:hover:not(:disabled) {
    background: #fff5d6;
    color: #d4af37;
  }

  .search-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .clear-button {
    padding: 12px 20px;
    background: transparent;
    color: #d4af37;
    border: 2px solid #d4af37;
    border-radius: 50px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .clear-button:hover {
    background: #d4af37;
    color: white;
  }

  .search-error {
    color: #ff6b6b;
    text-align: center;
    margin-top: 10px;
  }

</style>
