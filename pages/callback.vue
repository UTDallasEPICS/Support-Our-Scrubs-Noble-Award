<script setup>
const route = useRoute();

onMounted(async () => {
    await useFetch("api/auth/magic-link/verify", {
        query: {
            token: route.query.token,
            callbackURL: route.query.callbackURL,
        },
    });
});
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <p class="text-xl animate-pulse">Signing you in…</p>
    </div>
</template>
