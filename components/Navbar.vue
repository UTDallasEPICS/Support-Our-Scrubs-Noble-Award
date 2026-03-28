<template>
  <header class="nav" ref="navRef">
    <!-- Brand with image -->
    <nuxt-link class="nav__brand" to="/">
      <img src="/assets/bg-removed-noble-award-plaque.png" alt="Support Our Scrubs Logo" class="nav__brand-logo" />
      <span>THE NOBLE AWARD</span>
    </nuxt-link>

    <!-- Mobile toggle (moved to right) -->
    <button
      ref="btn"
      class="nav__toggle"
      :aria-expanded="open ? 'true' : 'false'"
      aria-controls="mainmenu"
      aria-label="Open menu"
      @click="toggle"
    >☰</button>

    <!-- Links -->
    <nav
      id="mainmenu"
      ref="panel"
      :class="['nav__panel', { 'is-open': open }] "
      :hidden="!open && isMobile"
    >
      <nuxt-link to="/" class="nav__link" @click="close">Home</nuxt-link>
      <nuxt-link to="/nominator/form" class="nav__link" @click="close">Nominate a Hero</nuxt-link>
      <nuxt-link to="/roster" class="nav__link" @click="close">View Nominees</nuxt-link>
      <nuxt-link to="/donate" class="nav__link" @click="close">Donate</nuxt-link>
      <nuxt-link to="/contact" class="nav__link" @click="close">Contact Us</nuxt-link> 
      <nuxt-link to="/FAQ" class="nav__link" @click="close">FAQ</nuxt-link>
      <nuxt-link to="/aboutUs" class="nav__link" @click="close">About Us</nuxt-link>
      <button v-if="user"
        class="login-button caret-btn logged-in"
        @click.stop="toggleDropdown"
        :aria-expanded="dropdownOpen ? 'true' : 'false'"
        aria-haspopup="menu"
        aria-label="Account menu">
        <i class="fa-solid fa-user-circle user-icon"></i>
        <span class="user-label" :title="user.email">
          {{ user.email || 'Account' }}
        </span>
        <span class="caret" :class="{ rotated: dropdownOpen }">▼</span>
      </button>
       <button
        v-else
        class="login-button caret-btn"
        @click.stop="handleOpenLogin"
        aria-haspopup="dialog"
      >
        Log in
      </button>
      <transition name="dropdown">
        <div
          v-if="dropdownOpen && user"
          class="dropdown"
          role="menu"
          @click.stop
        >
          <ul>
            <li class="dropdown-header">
              Signed in as
              <div class="dropdown-email">
                {{ user.email }}
              </div>
            </li>
              <li v-if="isAdmin">
                <button class="dropdown-item" @click="goToAdmin">Admin Panel</button>
              </li>
              <li>
                <button class="dropdown-item" @click="redirectToEditMyProfile">Edit My Profile</button>
              </li>
              <li>
                <button class="dropdown-item" @click="redirectToViewNominees">View My Nominees</button>
              </li>
              <li>
                <button class="dropdown-item" @click="redirectToEditMyNominees">Edit Nominees</button>
              </li>
              
              <li>
                <button class="dropdown-item" @click="logoutAndReset">Log out</button>
              </li>
          </ul>
        </div>
      </transition>
    </nav>
  </header>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'
import { useRoute, navigateTo } from '#imports'
import { authClient } from '~/utils/auth-client'

const emit = defineEmits(['open-login'])

/* STATE */
const open = ref(false)
const dropdownOpen = ref(false)
const isMobile = ref(false)
if (process.client) {
  const isMobile = window.matchMedia("(max-width: 600px)").matches
}
const panel = ref(null)
const btn = ref(null)
const navRef = ref(null)

const route = useRoute()

const { data: session } = await authClient.useSession(useFetch)
const user = computed(() => session.value?.user)

/* ROLE / ADMIN */
const role = useState('role', () => null)
const isAdmin = computed(() => role.value === 'admin')

async function fetchUserRole(email) {
  const res = await $fetch('/api/checkAdmin', {
    method: 'POST',
    body: { email }
  })

  role.value = res.role === 'admin' ? 'admin' : null
}

/* --- MOBILE MENU LOGIC --- */
function toggle() {
  open.value = !open.value

  if (open.value) {
    nextTick(() => {
      panel.value?.querySelector('a')?.focus({ preventScroll: true })
    })
  }
}

function close() {
  open.value = false
}

/* --- DROPDOWN LOGIC --- */
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function closeDropdown() {
  dropdownOpen.value = false
}

/* --- LOGIN BUTTON --- */
function handleOpenLogin() {
  emit('open-login')
}

/* --- ADMIN BUTTON --- */
function goToAdmin() {
  navigateTo('/nominator/viewnominees')
}

/* --- VIEW MY NOMINEES --- */
function redirectToViewNominees() {
  navigateTo('/nominator/myNominees')
}
function redirectToEditMyNominees() {
  navigateTo('/nominator/edit')
}

function redirectToEditMyProfile(){
  navigateTo('/nominator/myProfile')
}

/* --- LOGOUT --- */
async function logoutAndReset() {
  dropdownOpen.value = false

  try {
    await authClient.signOut()
  } catch (e) {
    console.error('Error signing out:', e)
  }

  navigateTo({ path: '/', replace: true })
}

/* --- CLICK OUTSIDE + ESCAPE KEY --- */
function onDocClick(e) {
  // Close mobile menu
  if (open.value && !panel.value?.contains(e.target) && e.target !== btn.value) {
    close()
  }

  // Close dropdown
  if (navRef.value && !navRef.value.contains(e.target)) {
    closeDropdown()
  }
}

function onKey(e) {
  if (e.key === 'Escape') {
    close()
    closeDropdown()
  }
}

/* --- LIFECYCLE --- */
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)

  const mq = window.matchMedia('(max-width: 768px)')
  isMobile.value = mq.matches
  mq.addEventListener('change', e => (isMobile.value = e.matches))
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

watch(user, (newUser) => {
  if (newUser?.email) {
    fetchUserRole(newUser.email)
  } else {
    role.value = null
  }
}, { immediate: true })

/* Close mobile nav on route change */
watch(() => route.fullPath, close)
</script>


<style scoped>
:root { --gap: .75rem; --radius: 14px; --border: rgba(255,255,255,.15); }

/* Sticky, black bar */
.nav {
  position: sticky;
  top: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: space-between; /* moved toggle to right */
  gap: var(--gap);
  padding: .5rem .75rem;
  color: #fff;
  background: #000;
}

/* brand */
.nav__brand {
  font-weight: 800;
  letter-spacing: .02em;
  text-decoration: none;
  color: #fff;
}

/* Toggle button (visible on mobile only) */
.nav__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
}
.nav__toggle:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

/* Panel styles */
.nav__panel {
  position: absolute;
  top: calc(100% + .35rem);
  left: .75rem;
  right: .75rem;
  display: grid;
  gap: .25rem;
  padding: .5rem;
  background: #000;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 10px 30px rgba(0,0,0,.3);
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity .15s ease, transform .15s ease;
}
.nav__panel.is-open { opacity: 1; transform: none; pointer-events: auto; }

/* Links */
.nav__link, .login-button {
  display: block;
  padding: .7rem .85rem;
  border-radius: 10px;
  color: #fff;
  text-decoration: none;
  transition: color .2s ease;
}
.nav__link.router-link-active, .login-button:hover { background: rgba(255,255,255,.1); }
.nav__link:focus-visible,
.nav__link:hover,
.login-button:hover {
  color: gold;
  background: rgba(255,255,255,.12);
}

/* Desktop */
@media (min-width: 769px){
  .nav { gap: 1rem; }
  .nav__toggle { display: none; }
  .nav__panel {
    position: static;
    display: flex;
    gap: .5rem;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
  .nav__link, .login-button { padding: .5rem .75rem; border-radius: 8px; }
}
/* === Dropdown transition === */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* === Dropdown panel styling === */
.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: .3rem;
  background: #111;
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0,0,0,.4);
  padding: .5rem;
  width: 210px;
  z-index: 200;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  padding: .6rem .8rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.dropdown-item:hover {
  background: rgba(255,255,255,.12);
}
.dropdown-header {
  font-size: .8rem;
  opacity: .7;
  margin-bottom: .25rem;
}
.dropdown-email {
  font-size: .85rem;
  word-break: break-all;
  margin-bottom: .6rem;
}

/* Toggle button (visible on mobile only) */
.nav__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
}
.nav__toggle:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

/* Panel styles */
.nav__panel {
  position: absolute;
  top: calc(100% + .35rem);
  left: .75rem;
  right: .75rem;
  display: grid;
  gap: .25rem;
  padding: .5rem;
  background: #000;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 10px 30px rgba(0,0,0,.3);
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity .15s ease, transform .15s ease;
}
.nav__panel.is-open { opacity: 1; transform: none; pointer-events: auto; }

/* Links */
.nav__link {
  display: block;
  padding: .7rem .85rem;
  border-radius: 10px;
  color: #fff;
  text-decoration: none;
  transition: color .2s ease;
}
.nav__link.router-link-active { background: rgba(255,255,255,.1); }
.nav__link:focus-visible,
.nav__link:hover {
  color: gold;
  background: rgba(255,255,255,.12);
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* space between image and text */
  font-weight: 800;
  letter-spacing: .02em;
  text-decoration: none;
  color: #fff;
}

.nav__brand-logo {
  height: 36px; /* adjust as needed */
  width: auto;
}


/* Desktop */
@media (min-width: 769px){
  .nav { gap: 1rem; }
  .nav__toggle { display: none; }
  .nav__panel {
    position: static;
    display: flex;
    gap: .5rem;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
  .nav__link { padding: .5rem .75rem; border-radius: 8px; }
}
</style>
