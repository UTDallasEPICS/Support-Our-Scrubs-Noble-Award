<template>
  <div class="slider">
    <!-- Slide Container -->
    <div class="slide-container">
      <img :src="slides[currentSlideIndex]" alt="Slider Image" class="slide-image" />
      <!-- Navigation Buttons -->
      <button class="prev-button" @click="prevSlide"><</button>
      <button class="next-button" @click="nextSlide">></button>
    </div>
    
    <!-- Dots for Navigation -->
    <div class="dots-container">
      <span v-for="(slide, index) in slides"
      :key="index"
      class="dot"
      :class="{ active: index === currentSlideIndex }"
      @click="currentSlideIndex = index">
    </span>    
  </div>
  </div>
     
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentSlideIndex: 0, 
      autoScroll: null, 
      intervalTime: 10000,
    };
  },
  methods: {
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
      } else {
        this.currentSlideIndex = this.slides.length - 1; 
      }
    },

    nextSlide() {
      if (this.currentSlideIndex < this.slides.length - 1) {
        this.currentSlideIndex++;
      } else {
        this.currentSlideIndex = 0; 
      }
    },

    startAutoScroll(){
      this.autoScroll = setInterval(() => {
        this.nextSlide();
      }, this.intervalTime);
    }
  },
  mounted(){
    this.startAutoScroll();
  },
  beforeUnmount() {
    // Clear interval when component is destroyed
    clearInterval(this.autoScroll);
  }
};
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25%; /* adjust how tall the fade is */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
  pointer-events: none; /* so buttons still clickable */
  z-index: 5; /* make sure it’s above the image but below buttons */
}


.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.2) contrast(1.1) saturate(1.1) drop-shadow(0 0 25px rgba(255, 215, 0, 0.25));
  transition: all 0.8s ease;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  width: 40px;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: background-color 0.3s;
  color: white;
  padding: 0;
  cursor: pointer;
  z-index: 10;
}

button:hover{
  background-color: rgba(255, 195, 0, 0.7);
}

.prev-button {
  left: 20px;
}

.next-button {
  right: 20px;
}

.dots-container{
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 10;
}

.dot{
  height: 8px;
  width: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.5s;
  cursor: pointer;
}

.dot.active{
  background-color: #ddaa00;
}
</style>
