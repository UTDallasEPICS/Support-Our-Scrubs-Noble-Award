<template>
  <div>
    <Navbar />
    <router-view />
    <p>Hello</p>
     <nuxt-link to="/nominator">
      <button>Go to Nominee Page</button>
    </nuxt-link> 
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>

</style>
