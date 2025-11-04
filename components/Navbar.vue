<template>
  <!-- Wrap in a real <nav>, pin to top, and lock height -->
  <nav class="site-nav sticky top-0 z-50 w-full bg-black text-white">
    <div class="inner mx-auto max-w-7xl h-14 min-h-14 px-4 md:px-6 flex items-center gap-6">
      <!-- Brand -->
      <NuxtLink to="/" class="brand font-extrabold tracking-wide whitespace-nowrap">
        SUPPORT OUR SCRUBS
      </NuxtLink>

      <!-- Links -->
      <ul class="links list-none m-0 p-0 flex items-center gap-6 sm:gap-8">
        <li>
          <NuxtLink class="navlink" to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink class="navlink" to="/roster">View Nominees</NuxtLink>
        </li>
        <li>
          <NuxtLink class="navlink" to="/nominator">Submit Nomination</NuxtLink>
        </li>
        <li>
          <NuxtLink class="navlink" to="/contact">Contact Us</NuxtLink>
        </li>
        <li>
          <NuxtLink class="navlink" to="/donate">Donate</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// no script needed
</script>

<style scoped>
/* Lock typography so page-level CSS can't change the bar height */
.site-nav,
.site-nav * {
  line-height: 1;         /* stop inherited tall line-heights */
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
  height: 2.25rem;         /* visual touch area; nav is 3.5rem (h-14) */
  padding: 0 .25rem;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
}

.navlink:hover {
  color: #d1d5db;          /* Tailwind gray-300 */
}

/* Show an active state (Nuxt adds .router-link-active) */
.router-link-active.navlink {
  color: #fef08a;          /* Tailwind yellow-200-ish */
}

/* Sheen class kept from your original (unused but safe) */
.sheen {
  background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
}
</style>