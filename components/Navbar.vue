<template>
  <nav class="navbar" ref="navRef">
    <div class="navbar-left">
      <h1 class="navbar-title">SUPPORT OUR SCRUBS</h1>

      <nuxt-link class="navbar-buttons" to="/" @click="scrollToTop" :class="{ active: route.path === '/' }">Home</nuxt-link>

      <nuxt-link class="navbar-buttons" to="/roster" :class="{ active: route.path === '/roster' }">View Nominees</nuxt-link>

      <nuxt-link class="navbar-buttons" to="/nominator" :class="{ active: route.path === '/nominator' }">Submit Nomination</nuxt-link>

      <nuxt-link class="navbar-buttons" to="/contact" :class="{ active: route.path === '/contact' }">Contact Us</nuxt-link>

      <nuxt-link class="navbar-buttons" to="/donate" :class="{ active: route.path === '/donate' }">Donate</nuxt-link>
    </div>

    <div class="menu-anchor">
      <!-- Logged in -->
      <button v-if="user" class="login-button caret-btn" @click.stop="toggleDropdown" :aria-expanded="dropdownOpen ? 'true' : 'false'" aria-haspopup="menu">
        <i class="fa-solid fa-user-circle" style="font-size: 24px; padding-right: 6px;"></i>
        <span class="caret" :class="{ rotated: dropdownOpen }" >▼</span>
      </button>
      <!-- Logged out -->
      <button v-else class="login-button caret-btn" @click.stop="emit('open-login'); openLogin()" aria-haspopup="dialog">Log in</button>

      <!-- Optional: user dropdown (kept scaffolded; toggle when you want) -->
      <transition name="dropdown">
        <div v-if="dropdownOpen && user" class="dropdown" role="menu">
          <ul>
            <li>
              <button class="dropdown-item" @click="logoutAndReset">Log out</button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, navigateTo } from '#imports'

/** Props & emits */
const props = defineProps({
  user: { type: [Object, Boolean], default: null },
})
const emit = defineEmits(['open-login'])

/** State */
const route = useRoute()
const showLogin = ref(false)         // for your modal to read if desired
const dropdownOpen = ref(false)
const navRef = ref(null)

/** Auto-open when ?showLogin=1 is present */
watchEffect(() => {
  showLogin.value = route.query.showLogin === '1'
})

/** Add ?showLogin=1 when clicking Login */
function openLogin () {
  navigateTo({
    path: route.path,
    query: { ...route.query, showLogin: '1', next: route.fullPath },
    replace: true,
  })
}

/** Call this from your modal on close (optional helper) */
function closeLoginFlag () {
  const { showLogin: _drop, ...rest } = route.query
  navigateTo({ path: route.path, query: rest, replace: true })
}

/** UI bits */
function scrollToTop () {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
function logoutAndReset () {
  dropdownOpen.value = false
  // add your actual logout logic here
}

/** Close dropdown when clicking outside */
function onDocClick (e) {
  if (!navRef.value) return
  if (!navRef.value.contains(e.target)) dropdownOpen.value = false
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

/** Optional: expose to parent if you want to call it */
defineExpose({ closeLoginFlag })
</script>

<style>
.navbar {
  display: flex;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  justify-content: space-between;
  width: 100%;
  z-index: 100;
  font-weight: bold;
  font-size: 18px;
}
.navbar-left { display: flex; color: white; }
.navbar-buttons, .login-button, .navbar-title { 
  padding: 10px; 
}
.navbar-title{
  margin-right: 40px;
}
.menu-anchor {
  position: relative;
  display: inline-block;
  width: 110px;
  height: 40px;
  text-align: end;
}
.navbar-buttons.active {
  color: gold;
  text-shadow: 0 0 10px gold, 0 0 0px gold, 0 0 0px gold;
}
.navbar-buttons:hover {
  color: gold;
  text-shadow: 0 0 0px gold;
}

.login-button{
  color: white;
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.caret { transition: transform 180ms ease; transform-origin: 50% 45%; }
.caret.rotated { transform: rotate(180deg); }
.caret-btn {
  font-size: 16px;
  justify-content: center;
  background: transparent;
  color: white;
  border: none;
  border-radius: 6px;
  transition: all 0.25s ease;
}

/* Dropdown panel */
.dropdown{
  position: absolute;
  top: calc(100% + 7px);
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  color: white;
  z-index: 10;
  min-width: 160px;
  padding: 8px 0;
}
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity:0;
  transform: translateY(-6px) scale(0.98);
}
.dropdown ul { text-align: left; padding-left: 8px; list-style:none; }
.dropdown li:hover { background: rgba(255,255,255,0.06); }
.dropdown-item {
  background: none;
  border: none;
  color: white;
  text-align: left;
  width: 100%;
  padding: 8px 12px;
  font: inherit;
  cursor: pointer;
}
</style>
