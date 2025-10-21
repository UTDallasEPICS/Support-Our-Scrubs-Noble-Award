
<template>
  <nav class="navbar">
    <div class="navbar-left">
      <h1 class="navbar-buttons">Support Our Scrubs</h1>
      <nuxt-link class="navbar-buttons" to="/" @click="scrollToTop">Home</nuxt-link>
      <nuxt-link class="navbar-buttons" to="/roster">View Nominees</nuxt-link>
      <nuxt-link class="navbar-buttons" to="/nominator">Submit Nomination</nuxt-link>
      <nuxt-link class="navbar-buttons" to="/contact">Contact Us</nuxt-link>
      <nuxt-link class="navbar-buttons" to="/donate">Donate</nuxt-link>
    </div>
    
    <div class="menu-anchor">
      <button v-if="!showMenu" class="login-button" @click="toggleMenu">
        Log in
      </button>

      <button
        v-else
        class="login-button caret-btn"
        @click.stop="toggleDropdown"
        :aria-expanded="dropdownOpen ? 'true' : 'false'"
        aria-haspopup="menu"
      >
      <i class="fa-solid fa-user-circle" style="font-size: 24px; padding-right: 6px;"></i>
        <span class="caret" :class="{ rotated: dropdownOpen }" >▼</span>
      </button>

      <!-- animated dropdown -->
      <transition name="dropdown">
        <div
          v-if="dropdownOpen"
          class="dropdown"
          role="menu"
        >
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

<script>
export default {
  data() {
    return {
      showMenu: false,     // Controls which button is visible
      dropdownOpen: false  // Controls dropdown visibility
    }
  },

  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', this._onClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this._onClickOutside)
  },

  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    toggleMenu() {
      this.showMenu = true;        // Hide "Log in", show ▼
      this.dropdownOpen = false;   // Start closed
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },

    logoutAndReset() {
      // Close everything and show "Log in" again
      this.showMenu = false;
      this.dropdownOpen = false;
    },

    _onClickOutside(e) {
      // Close dropdown if clicked outside navbar
      if (!this.$el.contains(e.target)) {
        this.dropdownOpen = false;
      }
    }
  }
}
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
.navbar-left{ display:flex; color:white; }
.navbar-buttons, .login-button{ padding: 10px; }

.menu-anchor {
  position: relative;          /* anchor for absolute dropdown */
  display: inline-block;       /* size to content */
  width: 110px;                /* tune to your Log in width */
  height: 40px;                /* tune to your button height */
  text-align:end;
}

/* Same styles for both states (Log in and ▼) */
.login-button{
  color: white;
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.caret {
  transition: transform 180ms ease; /* rotation anim */
  transform-origin: 50% 45%;
}
.caret.rotated { 
  transform: rotate(180deg); 
}

.caret-btn {
  font-size: 16px;   /* smaller caret size */
  justify-content: center;
  background: transparent;
  color: white;
  border: none;
  border-radius: 6px;
  transition: all 0.25s ease; /* smooth resize animation */
}

/* This is the panel, not the button */
.dropdown{
  position: absolute;
  top: calc(100% + 7px);  /* below the button */
  right: 0;               /* align to the right edge; use left:0 if you prefer */
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
  opacity:0; transform: translateY(-6px) scale(0.98);
}

.logout-button {
  background: none;
  border: none;
  color: #111;
  text-align: left;
  width: 100%;
  padding: 8px 12px;
  font: inherit;
  cursor: pointer;
}
.dropdown ul { 
  text-align: left;
  padding-left: 8px; 
  list-style:none; 
}

.dropdown li:hover { background: rgba(0,0,0,0.05); }
.dropdown a { color:#111; text-decoration:none; display:block; }
</style>
