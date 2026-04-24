<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
import MyLogin from '~/components/MyLogin.vue'
import { useLoginModal } from '~/composables/useLoginModal'
const { showLogin, open, close } = useLoginModal()
const route = useRoute()

onMounted(() => {
  if (route.query.login === 'true') open()
})
</script>

<template>
  <Navbar @open-login="open" />
  <slot />
  <Teleport to="body">
    <MyLogin
      v-if="showLogin"
      :allow-backdrop-close="false"
      @close="close"
    />
  </Teleport>
</template>
