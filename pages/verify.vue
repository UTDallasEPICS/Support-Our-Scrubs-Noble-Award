<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <p class="text-lg">Verifying your magic link...</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const route = useRoute();
  const router = useRouter();
  
  onMounted(async () => {
    const token = route.query.token;
    
    if (!token || typeof token !== 'string') {
      alert('Invalid verification link');
      return router.push('/login');
    }
  
    try {
      await $fetch('/api/auth/verify', {
        method: 'POST',
        body: { token },
      });
      router.push('/');
    } catch (error) {
      alert('Invalid or expired verification link');
      router.push('/login');
    }
  });
  </script>