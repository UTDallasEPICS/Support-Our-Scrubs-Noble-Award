<template>
  <div class="min-h-screen bg-black text-yellow-400">
    <Navbar />

    <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <section class="opacity-0 translate-y-8 transition-all duration-700" data-fade>
        <h1 class="metallic-title metallic-title--main">MAKE A DONATION</h1>

        <p class="mt-4 max-w-3xl mx-auto text-center text-base sm:text-lg md:text-xl text-neutral-100 font-serif">
          Your donation powers the impact of the Noble Award program — helping fund
          engraved plaques for honorees, expand community outreach, and support
          day-to-day operations that keep the initiative running strong.
        </p>
      </section>

      <!-- Donation Block -->
      <section class="mt-10 flex justify-center">
        <!-- Wider card on larger screens, mobile stays natural width -->
        <div
          class="opacity-0 translate-y-8 transition-all duration-700 w-full
                 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl"
          data-fade
        >
          <div class="flex flex-col rounded-lg bg-[#1a1a1a] text-white p-6 sm:p-8 shadow-xl ring-1 ring-white/10">
            <h2 class="metallic-title metallic-title--small">SUPPORT OUR CAUSE</h2>

            <p class="mt-4 text-sm sm:text-base leading-relaxed text-neutral-100">
              When you donate to our parent organization Support Our Scrubs, you fuel our service projects —
              projects that recognize healthcare heroes, promote community support, and improve healthcare communities.
            </p>

            <!-- PayPal button -->
            <a
              href="https://paypal.me/SupportOurScrubs?locale.x=en_US"
              class="mt-6 inline-flex items-center justify-center gap-3 rounded-md
                     bg-yellow-500 px-5 py-3 text-base font-semibold text-neutral-900
                     shadow hover:bg-yellow-400 active:bg-yellow-300 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-yellow-300"
            >
              <img
                src="https://pngimg.com/d/paypal_PNG7.png"
                alt="PayPal"
                class="h-8 w-8"
                loading="lazy"
              />
              <span>DONATE</span>
            </a>

            <!-- Image -->
            <img
              src="https://img1.wsimg.com/isteam/ip/49b121ac-2346-4ca2-93bb-7801e38f5369/0%20(3).jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1537"
              alt="Noble Award Program"
              class="my-6 w-full rounded-lg object-cover shadow-lg"
              loading="lazy"
            />

            <p class="text-sm sm:text-base leading-relaxed text-neutral-100">
              Your donation supports our mission to recognize and honor those who serve with excellence, dedication, and heart.
              Funds help cover engraved plaques for honorees, expand community outreach, and support operations specific to our initiative —
              ensuring your generosity creates real impact through our focused cause.
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  mounted() {
    const els = document.querySelectorAll('[data-fade]')
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8')
            entry.target.classList.add('opacity-100', 'translate-y-0')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach(el => io.observe(el))
  }
}
</script>

<style scoped>
/* Base metallic title styling */
.metallic-title {
  font-family: 'Cinzel', serif;
  text-align: center;
  background: linear-gradient(
    120deg,
    #fff4b0 0%,
    #f0c75e 20%,
    #d4af37 40%,
    #f8e27d 60%,
    #d4af37 80%,
    #fff4b0 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.5),
    0 0 10px rgba(212, 175, 55, 0.4),
    0 0 20px rgba(255, 215, 0, 0.3);
  animation: metallicShine 3s infinite linear;
}

/* Make a Donation – slightly less top spacing */
.metallic-title--main {
  margin-top: 2rem;
  font-size: 60px;
}

/* Support Our Cause – smaller heading */
.metallic-title--small {
  margin-top: 1rem;
  font-size: 36px;
}

@keyframes metallicShine {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

/* Responsive scaling */
@media (max-width: 768px) {
  .metallic-title--main { font-size: 42px; }
  .metallic-title--small { font-size: 28px; }
}
</style>
