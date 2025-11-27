<template>
  <div class="navbar" ref="navRef">
    <h1 class="navbar-title">SUPPORT OUR SCRUBS</h1>

    <div class="navbar-center">
      <nuxt-link
        class="navbar-buttons"
        to="/"
        @click="scrollToTop"
        :class="{ active: route.path === '/' }"
      >Home</nuxt-link>

      <nuxt-link
        class="navbar-buttons"
        to="/roster"
        :class="{ active: route.path === '/roster' }"
      >View Nominees</nuxt-link>

      <nuxt-link
        class="navbar-buttons"
        to="/nominator"
        :class="{ active: route.path === '/nominator' }"
      >Submit Nomination</nuxt-link>

      <nuxt-link
        class="navbar-buttons"
        to="/contact"
        :class="{ active: route.path === '/contact' }"
      >Contact Us</nuxt-link>

      <nuxt-link
        class="navbar-buttons"
        to="/donate"
        :class="{ active: route.path === '/donate' }"
      >Donate</nuxt-link>
    </div>

    <div class="menu-anchor">
      <!-- Logged IN -->
      <button
        v-if="user"
        class="login-button caret-btn logged-in"
        @click.stop="toggleDropdown"
        :aria-expanded="dropdownOpen ? 'true' : 'false'"
        aria-haspopup="menu"
        aria-label="Account menu"
      >
        <i class="fa-solid fa-user-circle user-icon"></i>
        <span class="user-label" :title="user.email">
          {{ user.email || 'Account' }}
        </span>
        <span class="caret" :class="{ rotated: dropdownOpen }">▼</span>
      </button>

      <!-- Logged OUT -->
      <button
        v-else
        class="login-button caret-btn"
        @click.stop="handleOpenLogin"
        aria-haspopup="dialog"
      >
        Log in
      </button>

      <!-- Dropdown when logged in -->
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
            <li>
              <li v-if="isAdmin">
                <button class="dropdown-item" @click="goToAdmin">
                  Admin Panel
                </button>
              </li>
              <button class="dropdown-item" @click="redirectToViewNominees">View My Nominees</button>
              <button class="dropdown-item" @click="logoutAndReset">Log out</button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, navigateTo, useSupabaseUser, useSupabaseClient } from '#imports'

/** Emits */
const emit = defineEmits(['open-login'])

/** Supabase auth state */
const user = useSupabaseUser()
const supabase = useSupabaseClient()

/** Verify type of user */
const role = useState('role',() => null)
const isAdmin = computed(() => role.value === 'admin')

/** State */
const route = useRoute()
const showLogin = ref(false) // mirrors ?showLogin for your modal
const dropdownOpen = ref(false)
const navRef = ref(null)

/** Auto-open when ?showLogin=1 is present */
watchEffect(() => {
  // existing line:
  showLogin.value = route.query.showLogin === '1'

  // new: check admin when user is available
  if (user.value && user.value.email) {
    fetchUserRole(user.value.email)
  } else {
    role.value = null
  }
})

//** Checks if user is admin */
async function fetchUserRole(email) {
  const res = await $fetch('/api/checkAdmin', {
    method: 'POST',
    body: { email }
  })

  if (res.ok && res.role === 'admin') {
    role.value = 'admin'
  } else {
    role.value = null
  }
}

/** Add ?showLogin=1 when clicking Login */
function openLogin () {
  navigateTo({
    path: route.path,
    query: { ...route.query, showLogin: '1',next: route.fullPath },
    replace: true,
  })
}

/** Combined handler for login button */
function handleOpenLogin () {
  emit('open-login')
  openLogin()
}

function goToAdmin() {
  navigateTo('/nominator/viewnominees')
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

function toggleDropdown () {
  dropdownOpen.value = !dropdownOpen.value
}
function redirectToViewNominees(){
  navigateTo('nominator/edit')
}
async function logoutAndReset () {
  dropdownOpen.value = false
  try {
    await supabase.auth.signOut()
  } catch (e) {
    console.error('Error signing out:', e)
  } finally {
    // force refresh of UI/state after logout
    navigateTo({ path: '/', replace: true })
  }
}

/** Close dropdown when clicking outside */
function onDocClick (e) {
  if (!navRef.value) return
  if (!navRef.value.contains(e.target)) dropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
})

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
  align-items: center;
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
  flex: 1;
  text-align: left;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
}
.navbar-center{
  flex: 2;
  display: flex;
  justify-content: center;
  gap: .25rem;
  color: white;
}
.menu-anchor {
  position: relative;
  display: inline-block;
  width: 180px;
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

/* Logged-in visual variant */
.logged-in {
  background: rgba(17, 24, 39, 0.9); /* darker */
  border-radius: 5px;
  padding-inline: 0.6rem;
}

.user-icon {
  font-size: 20px;
  margin-right: 6px;
}

.user-label {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 4px;
  font-size: 0.9rem;
}

/* Dropdown panel */
.dropdown{
  position: absolute;
  top: calc(100% + 7px);
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  color: white;
  z-index: 10;
  min-width: 200px;
  padding: 8px 0;
  border-radius: 2px;
}
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity:0;
  transform: translateY(-6px) scale(0.98);
}
.dropdown ul { text-align: left; padding-left: 0; list-style:none; margin: 0; }
.dropdown li:hover { background: rgba(255,255,255,0.06); }

.dropdown-header {
  font-size: 0.8rem;
  opacity: 0.85;
  padding: 8px 12px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.dropdown-email {
  font-size: 0.85rem;
  font-weight: 600;
  word-break: break-all;
}

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

/* Lock typography so page-level CSS can't change the bar height */
.site-nav,
.site-nav * {
  line-height: 1;
}

/* Optional: normalize font size inside nav */
.inner {
  font-size: 16px;
}

/* Brand and links share consistent hit area without changing nav height */
.brand,
.navlink {
  display: inline-flex;
  align-items: center;
  height: 2.25rem;
  padding: 0 .25rem;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
}

.navlink:hover {
  color: #d1d5db;
}

/* Show an active state (Nuxt adds .router-link-active) */
.router-link-active.navlink {
  color: #fef08a;
}

/* Sheen class kept from your original (unused but safe) */
.sheen {
  background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
}
</style>