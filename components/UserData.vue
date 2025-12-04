<template>
  <div class="cards-container">
    <div
      v-for="nominee in nominees"
      :key="nominee.id"
      class="card"
    >

      <!-- TOP ROW: Circle + Name -->
      <div class="card-top">
        <div class="avatar">
          <img v-if="nominee.photoURL" :src="nominee.photoURL" alt="photo" />
          <div class ="no-photo"v-else>No Photo</div>
        </div>
        <div class="card-content">
          <h1 class="name">{{ nominee.name }}</h1>
          <h2 class="name">{{ nominee.occupation }}</h2>
          <h2 class="name">{{  nominee.placeOfWork }}</h2>
        </div>
      </div>

      <!-- DESCRIPTION NEAR BOTTOM -->
      <p class="description">{{ nominee.description }}</p>
    </div>
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/nominee')
const nominees = data
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
}

/* === CARD === */
.card {
  width: 350px;
  height: 200px;
  border: 3px solid black;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* name top, desc bottom */
  background: rgb(58, 57, 57);
}

.card-content{
  display: block;
}
/* === TOP SECTION (CIRCLE + NAME) === */
.card-top {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* === CIRCLE AVATAR === */
.avatar {
  width: 70px;
  height: 70px;
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

.no-photo{

}
/* === NAME === */
.name {
  font-size: 18px;
  font-weight: bold;
}

/* === DESCRIPTION === */
.description {
  font-size: 14px;
}
</style>
