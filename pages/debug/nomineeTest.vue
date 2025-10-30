<!-- pages/debug/nomineeTest.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Nominees (API → Prisma)</h1>

    <div v-if="pending">Loading…</div>
    <div v-else-if="error" class="text-red-500">{{ error.message || error }}</div>

    <table v-else class="min-w-full border-collapse">
      <thead>
        <tr>
          <th class="border px-3 py-2 text-left">Name</th>
          <th class="border px-3 py-2 text-left">Email</th>
          <th class="border px-3 py-2 text-left">Status</th>
          <th class="border px-3 py-2 text-left">Slug</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id">
          <td class="border px-3 py-2">{{ r.lastName }}, {{ r.firstName }}</td>
          <td class="border px-3 py-2">{{ r.email }}</td>
          <td class="border px-3 py-2">{{ r.status }}</td>
          <td class="border px-3 py-2">{{ r.slug }}</td>
        </tr>
      </tbody>
    </table>

    <button class="mt-4 border px-3 py-2 rounded" @click="refresh()">Refresh</button>
  </div>
</template>

<script setup lang="ts">
type Nominee = {
  id: string; firstName: string; lastName: string;
  email: string; status: string; slug: string
}

// IMPORTANT: make sure this path matches your API file (you said /api/nominee)
const { data, pending, error, refresh } = await useFetch<Nominee[]>('/api/nominee', {
  default: () => []   // avoid null -> never[]
})

// Convenience computed so template never sees null
const rows = computed(() => data.value ?? [])
</script>
