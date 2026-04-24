<script setup lang="ts">
import { computed } from "vue";
import type { NomineesWithUser } from "~/shared/types";
const route = useRoute();
const slug = String(route.params.slug);
const url = useRequestURL();

// SSR-safe fetch keyed by slug so the hydrated client matches the server render.
const { data: nominee } = await useAsyncData(`profile-${slug}`, () =>
    $fetch<NomineesWithUser>(`/api/nominee/${slug}`),
);
if (!nominee.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Nominee not found",
        fatal: true,
    });
}

const title = computed(() => getFullName(nominee.value?.user));
const subtitle = computed(() => nominee.value?.occupation || "");
const profileDescription = computed(() => nominee.value?.description || "");
const profileImage = computed(() => nominee.value?.photoURL || "");
const profileAboutme = computed(() => nominee.value?.aboutme || "This nominee has not updated their profile yet.");

const canonicalUrl = computed(() => `${url.origin}/profile/${slug}`);
const headline = computed(() => `${title.value} - ${subtitle.value}`);
const metaDescription = computed(() =>
    profileDescription.value.substring(0, 160),
);
// SEO metadata
useHead({
    title: headline,
    meta: [
        { name: "description", content: metaDescription },
        { property: "og:title", content: headline },
        { property: "og:description", content: metaDescription },
        { property: "og:image", content: profileImage },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: headline },
        { name: "twitter:description", content: metaDescription },
        { name: "twitter:image", content: profileImage },
    ],
    link: [{ rel: "canonical", href: canonicalUrl }],
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
