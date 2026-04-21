<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";


const route = useRoute();
const slug = route.params.slug;

// Server-side data fetching for SEO
const { data, pending, error } = await useFetch("/api/nominee", {
    query: { slug },
});
const nomiee = computed(() => data.value ?? []);

const nominee = computed(() => nomiee.value.find((n) => n.slug === slug));
// Handle errors
if (error.value || !nominee.value) {
    console.error("Error fetching nominee:", error.value);
    throw createError({
        statusCode: 404,
        statusMessage: "Nominee not found",
    });
}

// Computed properties (these replace your old computed section)
const title = computed(() => nominee.value?.name || "");
const subtitle = computed(() => nominee.value?.occupation || "");
const profileDescription = computed(() => nominee.value?.description || "");
const profileImage = computed(() => nominee.value?.photoURL || "");
const profileAboutme = computed(
    () =>
        nominee.value?.aboutme ||
        'This nominee has not added an "About Me" yet.',
);

// SEO Meta Tags - UPDATE YOUR DOMAIN HERE!
useHead({
    title: () => `${title.value} - ${subtitle.value}`,
    meta: [
        {
            name: "description",
            content: () => profileDescription.value.substring(0, 160),
        },
        // Open Graph tags for social media
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
        // Twitter Card tags
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
            href: () => `https://localhost:3000/profile/${slug}`, // UPDATE THIS!
        },
    ],
});

// Structured Data (JSON-LD) for rich snippets - manual implementation
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

// Handle browser back/forward navigation
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

<template>
    <div class="page-background">
        <div class="profile-container">
            <img
                :src="profileImage"
                :alt="`${title} - ${subtitle}`"
                class="profile-image"
            />
            <div class="profile-text">
                <h1 class="metallic-title">{{ title }}</h1>
                <p class="metallic-heading">{{ subtitle }}</p>
                <p class="profile-description">{{ profileDescription }}</p>
            </div>
        </div>

        <div class="additional-info">
            <div class="bio-text">
                <h2 class="metallic-heading">About Me</h2>
                <p class="bio-description">{{ profileAboutme }}</p>
            </div>
        </div>
    </div>
</template>

<style>
.metallic-title {
    font-family: "Libre Caslon Display", serif;
    font-size: clamp(2rem, 6.5vw, 7rem);
    margin-top: -20px;
    margin-bottom: -20px;
    position: relative;
}

.metallic-heading {
    font-family: "Libre Caslon Display", serif;
    font-size: 40px;
    margin-top: 20px;
    position: relative;
}

.page-background {
    font-family: "roboto", sans-serif;
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
    color: #d4af37;
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
