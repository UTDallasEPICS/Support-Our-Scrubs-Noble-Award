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
      <div class="bio-text bio-box">
        <h2 class="bio-title">About Me</h2>
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
  console.error("Error fetching nominee:", error.value);
  throw createError({
    statusCode: 404,
    statusMessage: "Nominee not found",
  });
}

// Computed properties
const title = computed(() =>
  nominee.value ? `${nominee.value.firstName} ${nominee.value.lastName}` : ""
);
const subtitle = computed(() => nominee.value?.occupation || "");
const profileDescription = computed(() => nominee.value?.description || "");
const profileImage = computed(() => nominee.value?.photoURL || "");
const profileAboutme = computed(() => nominee.value?.aboutme || "");

// SEO Meta Tags
useHead({
  title: () => `${title.value} - ${subtitle.value}`,
  meta: [
    {
      name: "description",
      content: () => profileDescription.value.substring(0, 160),
    },
    {
      property: "og:title",
      content: () => `${title.value} - ${subtitle.value}`,
    },
    {
      property: "og:description",
      content: () => profileDescription.value.substring(0, 160),
    },
    {
      property: "og:image",
      content: () => profileImage.value,
    },
    {
      property: "og:type",
      content: "profile",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: () => `${title.value} - ${subtitle.value}`,
    },
    {
      name: "twitter:description",
      content: () => profileDescription.value.substring(0, 160),
    },
    {
      name: "twitter:image",
      content: () => profileImage.value,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: () => `https://localhost:3000/profile/${slug}`,
    },
  ],
});

// Structured Data
useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: title.value,
        jobTitle: subtitle.value,
        description: profileDescription.value,
        image: profileImage.value,
      }),
    },
  ],
});

// Handle back/forward navigation
onMounted(() => {
  window.addEventListener("popstate", () => {
    window.location.reload();
  });
});

onUnmounted(() => {
  window.removeEventListener("popstate", () => {
    window.location.reload();
  });
});
</script>

<style>
.metallic-title {
  font-family: "Cinzel", serif;
  font-size: clamp(2rem, 6.5vw, 7rem);
  margin-top: -10px;
  margin-bottom: -20px;
  text-align: center;
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
}

.metallic-heading {
  font-family: "Cinzel", serif;
  font-size: 33px;
  margin-top: 1px;
  margin-bottom: 20px;
  text-align: center;
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
}

.page-background {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif;
  background-color: #000;
  min-height: 100vh;
  overflow-x: hidden;
}

.profile-container {
  display: flex;
  padding: 30px;
  color: white;
  width: 100%;
  box-sizing: border-box;
}

.profile-image {
  width: 380px;
  height: 380px;
  object-fit: cover;
  margin-right: 70px;
  border-radius: 50%;
  border-width: 4px;
  border-style: solid;
}

.profile-text {
  text-align: center;
  padding-right: 1.5rem;
  flex: 1;
}

.profile-description {
  text-align: left;
  font-size: 18px;
  line-height: 1.7;
}

.additional-info {
  text-align: left;
  display: flex;
  justify-content: center;
  color: white;
  padding: 40px;
  margin-top: -80px;
  width: 100%;
  box-sizing: border-box;
}

.bio-text {
  flex: 1;
}

.bio-title {
  font-family: "Cinzel", serif;
  font-size: 50px;
  margin-top: 10px;
  margin-bottom: 25px;
  text-align: center;
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
}

.bio-description {
  font-size: 18px;
  line-height: 1.7;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}

.bio-box {
  background: #171717;
  padding: 40px 50px 80px;
  border-radius: 1px;
  max-width: 1600px;
  margin: 60px auto 30px auto;
}

/* Mobile friendly */

@media (max-width: 1024px) {

  .profile-container {
    flex-direction: column; 
    align-items: center;
    padding: 20px;
    text-align: center;
  }

  .profile-image {
    width: 260px;
    height: 260px;
    margin: 0 auto 25px auto;
  }

  .profile-text {
    padding: 0;
  }

  .metallic-heading {
    font-size: 26px;
  }

  .profile-description {
    font-size: 17px;
    text-align: center;
    padding: 0 20px;
  }

  .additional-info {
    padding: 20px;
  }

  .bio-box {
    max-width: 95%;
    padding: 30px 20px 60px;
  }

  .bio-title {
    font-size: 36px;
  }

  .bio-description {
    font-size: 17px;
    padding: 0 5px;
  }
}

@media (max-width: 600px) {
  .metallic-title {
    font-size: 3rem;
  }

  .metallic-heading {
    font-size: 17.8px;
    margin-top: 7px;
  }

  .profile-image {
    width: 200px;
    height: 200px;
  }

  .profile-description {
    font-size: 16px;
    line-height: 1.6;
  }

  .bio-title {
    font-size: 30px;
  }

  .bio-description {
    font-size: 16px;
    line-height: 1.6;
  }
}


</style>
