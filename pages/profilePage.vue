<template>
  <div class="page-background">
    <Navbar />
    <div class="profile-container">
      <img :src="image" alt="Profile Image" class="profile-image" />
      <div class="profile-text">
        <h1 class="profile-title">{{ title }}</h1>
        <p class="profile-subtitle">{{ subtitle }}</p>
        <p class="profile-description">{{ description }}</p>
      </div>
    </div>
    
    <div class="additional-info">
        <div class="bio-text">
          <h2 class="bio-title">About Me</h2>
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
  computed: {
    title() {
      return this.$route.query.title || "Default Title";
    },
    subtitle() {
      return this.$route.query.subtitle || "Default Subtitle";
    },
    description() {
      return this.$route.query.description || "Default Description";
    },
    image() {
      return this.$route.query.image || "Default Description";
    }
  }
};
</script>

<style>
  .cormorant-garamond-cormorant-garamond {
    font-family: "Cormorant Garamond", serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
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