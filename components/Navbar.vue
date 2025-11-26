<template>
  <div class="flex flex-nowrap justify-start items-center text-white text-lg font-bold py-3 px-6" style="background: linear-gradient(45deg, #1C1C1C, #292929, #0F0F0F)">
  <div style="margin-right: 30px;"></div>
  <div>
  <nuxt-link to="/">
      <p class="cursor-pointer hover:text-gray-300 transition font-semibold duration-300 text-gray">Home</p>
   </nuxt-link>
  </div>
  <div style="margin-right: 30px;"></div>
  <div style="margin-right: 30px;">
   <nuxt-link to="/roster">
    <p class="cursor-pointer hover:text-gray-300 transition font-semibold duration-300 text-gray">View Nominees</p>
   </nuxt-link>
  </div>
  <div style="margin-right: 30px;">
    <nuxt-link to="/nominator">
    <p class="cursor-pointer hover:text-gray-300 transition font-semibold duration-300 text-gray">Submit Nomination</p>
    </nuxt-link>
  </div>
  <div style="margin-right: 30px;">
  <nuxt-link to="/contact">
    <p class="cursor-pointer hover:text-gray-300 transition font-semibold duration-300 text-gray">Contact Us</p>
  </nuxt-link>
  </div>
  <div>
  <nuxt-link to="/donate">
      <p class="cursor-pointer hover:text-gray-300 transition font-semibold duration-300 text-gray">Donate</p>
   </nuxt-link>
  </div>


</div>

</template>


  
  
<style>

.sheen {
  background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
}

</style>