<template>
  <div class="cards-container">
    <div
      v-for="nominee in displayNominees"
      :key="nominee.id"
      class="card"
      @click="navigateTo(`/profile/${nominee.slug}`)" 
      >

      <!-- TOP ROW: Circle + Name -->
      <div class="card-top">
        <div class="avatar">
          <img :src="nominee.photoURL || defaultAvatar" alt="photo" />
        </div>
        <div class="card-content">
          <h1 class="name">{{ getFullName(nominee.user) }}</h1>
          <h2 class="role">{{ nominee.occupation }}</h2>
          <h2 class="role">{{ nominee.placeOfWork }}</h2>
        </div>
      </div>

      <!-- DESCRIPTION NEAR BOTTOM -->
      <p class="description">{{ nominee.description }}</p>
    </div>
  </div>
</template>

<script setup>
import defaultAvatar from '@/assets/avatar.png';

// Accept nominees as a prop from parent
const props = defineProps({
  nominees: {
    type: Array,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: null
  },
  rotate: {
    type: Boolean,
    default: false
  },
  rotateInterval: {
    type: Number,
    default: 5000 // 5 seconds by default
  }
});

// If no nominees prop provided, fetch all approved nominees
const { data: fetchedNominees } = await useFetch('/api/nominee');

// Current rotation index
const currentIndex = ref(0);


// Get all nominees (either from props or fetched)
const allNominees = computed(() => {
  let nominees = [];
  
  if (props.nominees !== null) {
    nominees = props.nominees;
  } else {
    nominees = fetchedNominees.value || [];
  }
  
  // Always ensure name and place properties exist
  return nominees.map(n => ({
    ...n,
    name: getFullName(n.user),
    place: n.placeOfWork
  }));
});

// Display nominees with rotation
const displayNominees = computed(() => {
  const nominees = allNominees.value;
  
  if (!props.limit) {
    return nominees;
  }
  
  if (!props.rotate || nominees.length <= props.limit) {
    return nominees.slice(0, props.limit);
  }
  
  // Rotate through nominees
  const startIndex = currentIndex.value;
  const endIndex = startIndex + props.limit;
  
  // Handle wrap-around
  if (endIndex <= nominees.length) {
    return nominees.slice(startIndex, endIndex);
  } else {
    return [
      ...nominees.slice(startIndex),
      ...nominees.slice(0, endIndex - nominees.length)
    ];
  }
});

// Set up rotation interval
onMounted(() => {
  if (props.rotate && props.limit) {
    setInterval(() => {
      const maxIndex = allNominees.value.length;
      currentIndex.value = (currentIndex.value + 1) % maxIndex;
    }, props.rotateInterval);
  }
});
</script>

<style>

/* === GRID LAYOUT === */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  justify-items: center;
  padding: 20px;
  width: 100%;
  margin-top: -50px;
  margin-bottom: -25px;
}

/* === CARD === */
.card {
  width: 350px;
  height: 200px;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* name top, desc bottom */
  background: #222;
}

.card-content{
  display: block;
  max-width: 230px;
  overflow: hidden;
}
/* === TOP SECTION (CIRCLE + NAME) === */
.card-top {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* === CIRCLE AVATAR === */
.avatar {
  width: 90px;
  height: 90px;
  border: 1px solid black;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* === NAME === */
.name {
  font-size: 24px;
  font-weight: bold;
  max-width: 220px; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role {
  font-size: 16px;
  font-weight: 500;
  max-width: 220px; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* === DESCRIPTION === */
.description {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;   /* number of lines allowed */
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-height: 1.4em;
  max-height: calc(1.4em * 2);
  color: #ffffff;
}
</style>
