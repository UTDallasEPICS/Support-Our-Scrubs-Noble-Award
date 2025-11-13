<template>
  <header class="nav">
    <!-- Brand -->
    <nuxt-link class="nav__brand" to="/">SUPPORT OUR SCRUBS</nuxt-link>

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
      :class="['nav__panel', { 'is-open': open }]"
      :hidden="!open && isMobile"
    >
      <nuxt-link to="/" class="nav__link" @click="close">Home</nuxt-link>
      <nuxt-link to="/nominator" class="nav__link" @click="close">Nominate a Hero</nuxt-link>
      <nuxt-link to="/roster" class="nav__link" @click="close">View Nominees</nuxt-link>
      <nuxt-link to="/donate" class="nav__link" @click="close">Donate</nuxt-link>
      <nuxt-link to="/contact" class="nav__link" @click="close">Contact Us</nuxt-link>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const open = ref(false)
const panel = ref(null)
const btn = ref(null)
const route = useRoute()

const isMobile = computed(() => matchMedia('(max-width: 768px)').matches)

function toggle(){
  open.value = !open.value
  if(open.value){
    nextTick(() => panel.value?.querySelector('a')?.focus({ preventScroll: true }))
  }
}
function close(){ open.value = false }

function onDocClick(e){
  if(!open.value) return
  if(!panel.value?.contains(e.target) && e.target !== btn.value) close()
}
function onKey(e){ if(e.key === 'Escape' && open.value) close() }

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

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
