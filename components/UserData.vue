<template>
  <div class="cards-wrapper">
    <div v-for="item in items" :key="item.id" class="card">
      <img v-if="item.photoUrl" :src="item.photoUrl" class="card-img" />
      <div class="card-content">
        <h3>{{ item.firstName }} {{ item.lastName }}</h3>
        <p>{{ item.placeOfWork }}</p>
        <p>{{ item.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

export default {
  setup() {
    const supabase = useSupabaseClient()
    const items = ref([])

    onMounted(async () => {
      const { data, error } = await supabase.from('nominees').select('*')
      if (!error) items.value = data
    })

    return { items }
  }
}
</script>

<style scoped>
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
}
.card-content {
  text-align: center;
}
</style>
