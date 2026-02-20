<template>
  <div class="flex items-center justify-center h-screen">
    <p class="text-xl animate-pulse">Signing you in…</p>
  </div>
</template>


<script setup>
const client = useSupabaseClient()
const route = useRoute()

onMounted(async () => {
  await client.auth.getUser()

  await client.auth.getUser()
  
  navigateTo((Array.isArray(route.query.next) ? route.query.next[0] : route.query.next) || '/')
})  
</script>

