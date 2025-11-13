
<template>
  <div class="page-background">
  <div>
    <Navbar />
    </div>
    <div class="profile-container">
      <img :src="profileImage" alt="" class="profile-image" /> 
      <div class="profile-text">
        <h1 class="metallic-title">{{ title }}</h1>
        <p class="metallic-heading">{{ subtitle }}</p>
        <p class="profile-description">{{ profileDescription }}</p>
      </div>
    </div>
   
    <div class="additional-info">
        <div class="bio-text">
          <h1 class="metallic-heading" >About Me</h1>
          <p class="bio-description">{{ profileAboutme }}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "profilePage",
  data() {
      return {
        nominatorName: '',
        nominatorEmail: '',
        name: '',
        phoneNumber: '',
        address: '',
        placeOfWork: '',
        occupation: '',
        email: '',
        description: '',
        aboutme: '',
        photoURL: '',
        slug: '',
      };
    },
  computed: {
    title() { // I have these comments below so the default strings are not shown when a user clicks on a profile
      return this.name;// || "Default Name";
    },
    subtitle() {
      return this.occupation;// || "Default Occupation";
    },
    profileDescription() {
      return this.description;// || "Default Description";
    },
    profileImage() {
      return this.photoURL;// || "Default Image";
    },
    profileAboutme(){
      return this.aboutme;// || "Default About Me";
    }
  },
  methods: {
    async fetchNomineeBySlug(slug) {
      try {
      // Fetch nominee data from the backend API using the slug
      const nominee = await $fetch(`/api/nominee?stat=APPROVED&slug=${slug}`);
      console.log(nominee);

      if (nominee){
        this.photoURL = nominee.photoURL || "";
        this.name = `${nominee.firstName} ${nominee.lastName}` || "";
        this.occupation = nominee.occupation || "";
        this.description = nominee.description || "";
        this.aboutme = nominee.aboutme || "";
        this.slug = nominee.slug || "";
      } else {
        console.warn('Nominee not found for slug:', slug);
      }
    } catch (error) {
      console.error('Error parsing form data:', error);
    }
    // handle back/forward browser navigation to reload the page
    window.addEventListener('popstate', () => {
      window.location.reload();
    });
    }
  },
  mounted() {
    const slug = this.$route.params.slug;
    console.log("Slug from URL: "+slug);
    this.fetchNomineeBySlug(slug);
    
  }
};
</script>
<style>
  .metallic-title {
  font-family: 'Libre Caslon Display', serif;
  font-size: clamp(2rem, 10vw, 7rem);
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
  font-family: 'Libre Caslon Display', serif;
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
  .page-background {
    font-family: 'Cormorant Garamond', serif;
    background:
    radial-gradient(circle at top, rgb(61, 61, 61), rgb(34, 34, 34) 100%);
    min-height: 100vh; /* Makes background cover full viewport height */
  }
  .profile-container {    
    display: flex;
    padding: 40px;
    color: white;
    /* margin: 0 auto; */
  }
  .profile-image {
    width: 500px;
    height: 500px;  
    object-fit: cover;
    margin-right: 70px;
    border-radius: 50%;
  }
  .profile-text {
    text-align: center;
    padding-right: 1.5rem;
    flex: 1;
  }
  .profile-title {
    color:#d4af37;
    font-size: 80px;
    font-weight: bold;
    margin: 0;
  }
  .profile-subtitle {
    font-size: 18px;
    color: gray;
    margin: 5px 0;
  }
  .profile-description {
    text-align: left;
    font-size: 30px;
    line-height: 1.5;
  }
  .additional-info {
    display: flex;
    color:white;
    align-items: flex;
    padding: 40px;
    margin-top: 60px;
    width: 100%;
  }
  .extra-image {
    width: 300px;
    height: 300px;
    margin-right: 40px;
    object-fit: cover;
    margin-left: 100px;
    border-radius: 50%;
  }
  .bio-text {
    flex: 1;
  }
  .bio-title {
    font-size: 30px;
    font-weight: bold;
    display: flex;
    color: #d4af37;
    margin: 0;
  }
  .bio-description {
    font-size: 20px;
    line-height: 1.5;
  }
</style>