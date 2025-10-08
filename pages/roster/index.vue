<template>
  <Navbar />
  <div class="page-background">
    <div class="page-inner">
      <h1 class="metallic-title">Noble Award Recipients</h1>

      <div class="three-js-container">
        <!-- ThreeJs roster scene -->
        <ThreeJsScene
          v-if="nomineeNames.length && nomineeImage.length && nomineeInfo.length && nomineeOccupations.length"
          scene_type="roster"
          :image="nomineeImage"
          :recepient="nomineeNames"
          :occupation="nomineeOccupations"
          :description="nomineeInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ThreeJsScene from '@/components/ThreeJsScene.vue'

export default {
  name: 'Roster',
  components: { ThreeJsScene },
  data() {
    return {
      currentModelPath: '/models/frame.glb',
      loadingProgress: 0,
      modelLoadError: null,
      customObjects: [],
      nomineeInfo: [],
      nomineeNames: [],
      nomineeOccupations: [],
      nomineeEmails: [],
      nominees: [],
      nomineeImage: []
    }
  },
  methods: {
    async fetchNominees() {
      try {
        const response = await $fetch('/api/nominee?stat=APPROVED', { method: 'GET' })
        this.nominees = response
        this.nomineeNames = response.map(n => `${n.firstName} ${n.lastName}`)
        this.nomineeEmails = response.map(n => n.email)
        this.nomineeOccupations = response.map(n => n.occupation)
        this.nomineeInfo = response.map(n => n.description)
        this.nomineeImage = response.map(n => n.photoURL)
      } catch (error) {
        console.error('Error fetching nominees:', error)
      }
    }
  },
  mounted() {
    this.fetchNominees()
    if (this.$route?.query?.form) {
      const decodedData = JSON.parse(decodeURIComponent(this.$route.query.form))
      console.log('datos ', decodedData.occupation)
    }
  }
}
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.page-background {
  background: radial-gradient(circle at top, rgb(43,41,41), rgb(20,20,20) 100%);
  min-height: 100vh;
  padding-top: 56px; /* match your navbar height */
}

.page-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px 24px;
}

.metallic-title {
  font-family: 'Libre Caslon Display', serif;
  font-size: 70px;
  text-align: center;
  position: relative;
  background: linear-gradient(120deg,#fff4b0 0%,#f0c75e 20%,#d4af37 40%,#f8e27d 60%,#d4af37 80%,#fff4b0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 5px rgba(212,175,55,.4), 0 0 10px rgba(212,175,55,.2), 0 0 15px rgba(255,215,0,.1);
  margin-top: 12px;
  margin-bottom: 0;
  overflow: hidden;
}
.metallic-title::after {
  content: '';
  position: absolute; top: 0; left: -75%;
  width: 50%; height: 100%;
  background: linear-gradient(120deg,transparent 0%,rgba(255,255,255,.8) 50%,transparent 100%);
  transform: skewX(-20deg);
  animation: glintSwipe 3s ease-in-out infinite;
}
@keyframes glintSwipe { 0%{left:-75%} 50%{left:100%} 100%{left:100%} }
.metallic-title::before {
  content: 'Noble Award';
  position: absolute; top: 100%; left: 0; width: 100%;
  text-align: center; font-size: 70px; transform: scaleY(-1);
  opacity: .1; filter: blur(2px);
  background: linear-gradient(to bottom, rgba(255,215,0,.3), transparent);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

.three-js-container {
  width: 100%;
  max-width: 1600px;
  min-height: calc(100vh - 200px);
  margin: 0 auto;
  padding: 1rem 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.metallic-message, .metallic-text {
  font-family: 'Libre Caslon Display', serif;
  font-size: 30px; text-align: center;
  background: linear-gradient(120deg,#fff4b0 0%,#f0c75e 20%,#d4af37 40%,#f8e27d 60%,#d4af37 80%,#fff4b0 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: 0 0 5px rgba(212,175,55,.5), 0 0 10px rgba(212,175,55,.4), 0 0 20px rgba(255,215,0,.3);
  animation: metallicShine 3s infinite linear;
}
</style>
