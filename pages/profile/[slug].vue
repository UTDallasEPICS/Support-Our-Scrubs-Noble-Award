
<template>
  <div class="page-background">
  <div>
    <Navbar />
    </div>
    <div class="profile-container">
      <img :src="profileImage" :alt="`${title} - ${subtitle}`" class="profile-image" /> 
      <div class="profile-text">
        <h1 class="metallic-title">{{ title }}</h1>
        <p class="metallic-heading">{{ subtitle }}</p>
        <p class="profile-description">{{ profileDescription }}</p>
      </div>
    </div>
   
    <div class="additional-info">
        <div class="bio-text">
          <h2 class="metallic-heading" >About Me</h2>
          <p class="bio-description">{{ profileAboutme }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
const route = useRoute();
const slug = route.params.slug;

// Server-side data fetching for SEO
const { data: nominee, error } = await useAsyncData(
  `nominee-${slug}`,
  async () => {
    const response = await $fetch(`/api/nominee?stat=APPROVED&slug=${slug}`);
    return response;
  }
);

// Handle errors
if (error.value) {
  console.error('Error fetching nominee:', error.value);
  throw createError({
    statusCode: 404,
    statusMessage: 'Nominee not found',
  });
}

// Computed properties (these replace your old computed section)
const title = computed(() => nominee.value ? `${nominee.value.firstName} ${nominee.value.lastName}` : '');
const subtitle = computed(() => nominee.value?.occupation || '');
const profileDescription = computed(() => nominee.value?.description || '');
const profileImage = computed(() => nominee.value?.photoURL || '');
const profileAboutme = computed(() => nominee.value?.aboutme || '');

// SEO Meta Tags - UPDATE YOUR DOMAIN HERE!
useHead({
  title: () => `${title.value} - ${subtitle.value}`,
  meta: [
    {
      name: 'description',
      content: () => profileDescription.value.substring(0, 160),
    },
    // Open Graph tags for social media
    {
      property: 'og:title',
      content: () => `${title.value} - ${subtitle.value}`,
    },
    {
      property: 'og:description',
      content: () => profileDescription.value.substring(0, 160),
    },
    {
      property: 'og:image',
      content: () => profileImage.value,
    },
    {
      property: 'og:type',
      content: 'profile',
    },
    // Twitter Card tags
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: () => `${title.value} - ${subtitle.value}`,
    },
    {
      name: 'twitter:description',
      content: () => profileDescription.value.substring(0, 160),
    },
    {
      name: 'twitter:image',
      content: () => profileImage.value,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: () => `https://localhost:3000/profile/${slug}`, // UPDATE THIS!
    },
  ],
});

// Structured Data (JSON-LD) for rich snippets - manual implementation
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: title.value,
        jobTitle: subtitle.value,
        description: profileDescription.value,
        image: profileImage.value,
      }),
    },
  ],
});

// Handle browser back/forward navigation
onMounted(() => {
  window.addEventListener('popstate', () => {
    window.location.reload();
  });
});

onUnmounted(() => {
  window.removeEventListener('popstate', () => {
    window.location.reload();
  });
});
</script>
<style>
  .metallic-title {
  font-family: 'Libre Caslon Display', serif;
  font-size: clamp(2rem, 6.5vw, 7rem);
  margin-top: -20px;
  margin-bottom: -20px;
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
  font-size: 40px;
  margin-top: 20px;
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
    font-family: 'roboto', sans-serif;
    background-color: rgb(0, 0, 0);
    min-height: 100vh; /* Makes background cover full viewport height */
  }
  .profile-container {    
    display: flex;
    padding: 20px;
    color: white;
    /* margin: 0 auto; */
  }
  .profile-image {
    width: 380px;
    height: 380px;  
    object-fit: cover;
    margin-right: 70px;
    margin-top: 0px;
    border-radius: 50%;
    border-width: 4px;
    border-style: solid;
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
    font-size: 20px;
    line-height: 1.2;
  }
  .additional-info {
    text-align: left;
    display: flex;
    justify-content: center;
    color: white;
    padding: 40px;
    margin: 0 auto;
    margin-top: -80px;
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
    line-height: 1.2;
  }
</style>
