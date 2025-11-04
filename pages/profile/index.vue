<template>
  <Navbar />
  <div class="page-background">
  <div>
    </div>
    <div class="profile-container">
      <img :src="image" alt="Profile Image" class="profile-image" />
      <div class="profile-text">
        <h1 class="metallic-title">{{ title }}</h1>
        <p class="metallic-heading">{{ subtitle }}</p>
        <p class="profile-description">{{ description }}</p>
      </div>
    </div>
    
    <div class="additional-info">
        <div class="bio-text">
          <h1 class="metallic-heading" >About Me</h1>
          <p class="bio-description">John Doe is a passionate and driven professional dedicated to making a meaningful impact in his field and community. 
            With a career spanning over a decade, he has developed a deep expertise in his work, earning the respect of colleagues and peers alike. Known 
            for his strong leadership, problem-solving abilities, and unwavering commitment to excellence, John has played a pivotal role in numerous projects
             that have brought innovation and positive change.
             
             Beyond his professional achievements, John is a firm believer in the power of mentorship and lifelong learning. He actively seeks opportunities to 
             guide and support others, whether through professional development programs, community outreach, or simply offering a helping hand to those in need.
             His ability to connect with people and foster meaningful relationships has made him a valued mentor and collaborator.</p>
      </div>
      <img src="https://i.insider.com/5980b7ca87543302234a1a57?width=800&format=jpeg&auto=webp" class="extra-image "/>
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
        photoURL: '',
      };
    },
  computed: {
    title() {
      return this.name || "Default Title";
    },
    subtitle() {
      return this.occupation || "Default Subtitle";
    },
    description() {
      return this.description || "Default Description";
    },
    image() {
      return this.photoURL || "Default Description";
    }
  },
  mounted() {
      window.addEventListener('popstate', () => {
      window.location.reload(); // Fallback for broken history
      });
    
      if (this.$route.query.form) {
        const decodedData = JSON.parse(decodeURIComponent(this.$route.query.form));
        console.log("datos "+decodedData.occupation);
        this.photoURL = decodedData.image
        this.name = decodedData.recepient
        this.occupation = decodedData.occupation
        console.log("change now")
        this.description = decodedData.description
      }

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
