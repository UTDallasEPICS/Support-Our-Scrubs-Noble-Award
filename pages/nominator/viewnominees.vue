<template>
  <div>
    <div v-if="isAuthenticated">
      <!-- Database Table -->
      <div class="text-[#d4af37] h-screen bg-black">
        <div>
          <h2 class="text-center text-3xl font-bold">Nominee Database</h2>
          <br />
        </div>

        <!-- Dropdown Button -->
        <div class="relative inline-block text-left w-1/4">
          <button
            type="button"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300"
            @click="toggleDropdown"
          >
            Filter By
          </button>
          <div
            class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            v-show="dropdownOpen"
          >
            <div class="py-1 space-y-2">
              <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" @click="filterNominees('CREATED')">CREATED</button>
              <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" @click="filterNominees('CONFIRMED')">CONFIRMED</button>
              <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" @click="filterNominees('VERIFIED')">VERIFIED</button>
              <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" @click="filterNominees('APPROVED')">APPROVED</button>
              <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" @click="filterNominees('DENIED')">DENIED</button>
              <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" @click="filterNominees('SENT')">SENT</button>
            </div>
          </div>
        </div>

        <!-- Display Table of Nominees -->
        <div class="mt-4 mx-0">
          <div class="relative overflow-x-auto rounded-lg">
            <table class="w-full text-sm text-center">
              <thead class="text-sm uppercase bg-gray-50 dark:bg-gray-700">
                <tr class="h-9">
                  <th scope="col" class="px-4 py-3">First Name</th>
                  <th scope="col" class="px-4 py-3">Last Name</th>
                  <th scope="col" class="px-4 py-3">Phone Number</th>
                  <th scope="col" class="px-4 py-3">Address</th>
                  <th scope="col" class="px-4 py-3">Place of Work</th>
                  <th scope="col" class="px-4 py-3">Occupation</th>
                  <th scope="col" class="px-4 py-3">Email</th>
                  <th scope="col" class="px-4 py-3">Description</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(nominee, index) in nominees" :key="index" class="h-9">
                  <td>{{ nominee.firstName }}</td>
                  <td>{{ nominee.lastName }}</td>
                  <td>{{ nominee.phoneNumber }}</td>
                  <td>{{ nominee.address }}</td>
                  <td>{{ nominee.placeOfWork }}</td>
                  <td>{{ nominee.occupation }}</td>
                  <td>{{ nominee.email }}</td>
                  <td>{{ nominee.description }}</td>
                  <td>{{ nominee.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Error Handling for Not Logged In -->
      <div class="flex items-center justify-center min-h-screen bg-black text-gold">
        <div class="bg-gray-900 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <h1 class="text-2xl font-bold mb-4">Login Required</h1>
          <p class="text-lg mb-6">Please login to continue.</p>
          <button 
            @click="login" 
            class="bg-gold text-black font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 hover:bg-gold-dark focus:outline-none"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { ref, onMounted } from "vue";

export default {
  setup() {
    let isAuthenticated = ref(false);
    let user = ref(null);
    const nominees = ref([]);
    const dropdownOpen = ref(false);

    if (process.client) {
      const { isAuthenticated: authState, user: authUser, getAccessTokenSilently, loginWithRedirect } = useAuth0();

      isAuthenticated = authState;
      user = authUser;

      const fetchNominees = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`/api/nominees?email=${user.value.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          nominees.value = await response.json();
        } catch (error) {
          console.error("Error fetching nominees:", error);
        }
      };

      const login = async () => {
        await loginWithRedirect();
      };

      const filterNominees = async (status) => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`/api/nominees?email=${user.value.email}&status=${status}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          nominees.value = await response.json();
        } catch (error) {
          console.error("Error filtering nominees:", error);
        }
      };

      onMounted(() => {
        if (isAuthenticated.value) fetchNominees();
      });

      return {
        isAuthenticated,
        user,
        login,
        nominees,
        dropdownOpen,
        toggleDropdown: () => {
          dropdownOpen.value = !dropdownOpen.value;
        },
        filterNominees,
      };
    }

    return {
      isAuthenticated,
      user,
      nominees,
    };
  },
};
</script>

<style>
.text-gold {
  color: #d4af37;
}
.bg-gold {
  background-color: #d4af37;
}
.bg-gold-dark {
  background-color: #b8860b;
}
</style>