<template>
  
  <!-- If the user is not authenticated -->
  <div v-if="!token" class="text-center min-h-screen bg-black text-white flex flex-col items-center justify-center">
    <h2 class="text-3xl mb-4">You must log in to view this page</h2>
    <button @click="login" class="bg-blue-500 px-4 py-2 rounded text-white">
      Login
    </button>
  </div>

  <div v-if="token" class="text-[#d4af37] min-h-screen bg-black">
    <!-- Header -->
    <div>
      <h2 class="text-center text-3xl font-bold">View Nominees</h2>
      <br />
    </div>

    <!-- Logout Button -->
    <div class="text-right px-4">
      <button @click="logout" class="bg-red-500 px-4 py-2 rounded text-white">
        Logout
      </button>
    </div>

    <nuxt-link to="/nominator">
      <button>Go To Nomination Page</button>
    </nuxt-link>

      <div>
      <input 
        v-model="searchQuery" 
        @input="debouncedSearch" 
        type="text" 
        class="bg-gray-700 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Search entries..." 
      />
      </div>

      <div v-if="nominees == null" class="text-center text-gray-500">
       No results found
     </div>
  
      <!-- Dropdown Button -->
      <div class="relative inline-block text-left w-1/4 py-5" >
        <div>
          <button
            type="button"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            @click="toggleDropdown"
          >
            Filter By
          </button>
        </div>
  
        <!-- Dropdown Menu -->
        <div
          class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          v-show="dropdownOpen"
        >
        <div class="py-1 space-y-2" role="none"> <!-- Added space-y-2 to create vertical space -->
          <!-- Menu Items (now as buttons for button-like appearance) -->
          <button class="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-700" role="menuitem" @click="nomineesCreated">CREATED</button>
          <button class="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-700" role="menuitem" @click="nomineesConfirmed">CONFIRMED</button>
          <button class="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-700" role="menuitem" @click="nomineesVerified">VERIFIED</button>
          <button class="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-700" role="menuitem" @click="nomineesApproved">APPROVED</button>
          <button class="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-700" role="menuitem" @click="nomineesDenied">DENIED</button>
          <button class="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-700" role="menuitem" @click="nomineesSent">SENT</button>
        </div>
        </div>
      </div>
  
      <!-- Display Table of Nominees -->
      <div class="mt-4 mx-0">
        <div class="relative overflow-x-auto rounded-lg">
          <table class="w-full text-sm text-center">
            <thead class="text-sm  uppercase bg-gray-700">
              <tr class="h-9">
                <th scope="col" class="px-12 py-3">Expanded View</th>
                <th scope="col" class="px-12 py-3">First Name</th>
                <th scope="col" class="px-12 py-3">Last Name</th>
                <th scope="col" class="px-12 py-3">Phone Number</th>
                <th scope="col" class="px-12 py-3">Address</th>
                <th scope="col" class="px-12 py-3">Place of Work</th>
                <th scope="col" class="px-12 py-3">Occupation</th>
                <th scope="col" class="px-12 py-3">Email</th>
                <th scope="col" class="px-12 py-3">Description</th>
                <th scope="col" class="px-12 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <!-- Render each nominee -->
              <tr class="h-9" v-for="(u, index) in nominees" :key="index">
                <td>
                <!-- Button to open the modal -->
                <button @click="openModal(u)" class="hover:text-gray-700">
                  View Nominee
                </button>
                </td>
                <td>{{ u.firstName }}</td>
                <td>{{ u.lastName }}</td>
                <td>{{ u.phoneNumber }}</td>
                <td>{{ u.address }}</td>
                <td>{{ u.placeOfWork }}</td>
                <td>{{ u.occupation }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.description }}</td>
                <td>
                  <!-- Dropdown for status -->
                <div class="relative inline-block">
                  <button
                    type="button"
                    class="inline-flex justify-center w-32 bg-gray-700 px-3 py-2 text-sm font-semibold text-[#d4af37] shadow-sm ring-1 ring-inset ring-gray-300"
                    @click="toggleStatusDropdown(u)"
                  >
                    {{ u.status }}
                  </button>

                  <!-- Dropdown Menu for Status -->
                  <div
                    class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    v-show="u.isDropdownOpen"
                  >
                    <div class="py-1 space-y-2">
                      <button class="block w-full text-center px-4 py-2 text-sm hover:bg-gray-700" @click="updateStatus(u, 'CREATED')">CREATED</button>
                      <button class="block w-full text-center px-4 py-2 text-sm hover:bg-gray-700" @click="updateStatus(u, 'CONFIRMED')">CONFIRMED</button>
                      <button class="block w-full text-center px-4 py-2 text-sm hover:bg-gray-700" @click="updateStatus(u, 'VERIFIED')">VERIFIED</button>
                      <button class="block w-full text-center px-4 py-2 text-sm hover:bg-gray-700" @click="updateStatus(u, 'APPROVED')">APPROVED</button>
                      <button class="block w-full text-center px-4 py-2 text-sm hover:bg-gray-700" @click="updateStatus(u, 'DENIED')">DENIED</button>
                      <button class="block w-full text-center px-4 py-2 text-sm hover:bg-gray-700" @click="updateStatus(u, 'SENT')">SENT</button>
                    </div>
                  </div>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-700 rounded-lg w-96 rounded-lg px-4">
        <h3 class="text-2xl font-bold mb-4">Nominee Details</h3>
        <p><strong>First Name:</strong> {{ selectedNominee.firstName }}</p>
        <p><strong>Last Name:</strong> {{ selectedNominee.lastName }}</p>
        <p><strong>Email:</strong> {{ selectedNominee.email }}</p>
        <p><strong>Phone Number:</strong> {{ selectedNominee.phoneNumber }}</p>
        <p><strong>Address:</strong> {{ selectedNominee.address }}</p>
        <p><strong>Place of Work:</strong> {{ selectedNominee.placeOfWork }}</p>
        <p><strong>Occupation:</strong> {{ selectedNominee.occupation }}</p>
        <p><strong>Description:</strong> {{ selectedNominee.description }}</p>
        <p><strong>Status:</strong> {{ selectedNominee.status }}</p>
        <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">Close</button>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref,watchEffect } from "vue";
  
  const token = useCookie("token") || ""

  //Login function
  async function login() {
    window.location.href = "/api/auth0/login"
  }
  // Logout function
  async function logout() {
  window.location.href = "/api/auth0/logout";
}
  
  // The state for nominees data and dropdown visibility
  const nominees = ref([]);
  const dropdownOpen = ref(false);
  const searchQuery = ref("");
  const isModalOpen = ref(false);
  let debounceTimeout = null;
  const selectedNominee = ref(null);

  const debouncedSearch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(fetchResults, 500); // Wait 500ms after the user stops typing
};

// Update the nominee's status
async function updateStatus(nominee, status) {
  try {
    // Create an object with the updated status
    const updatedNominee = { ...nominee, status };
    nominee.status = status;

    // Send a PUT request to update the nominee's status
    const response = await $fetch('/api/nominee', {
      method: 'PUT',
      body: updatedNominee,
    });
    
    // Optionally, close the dropdown after updating the status
    nominee.isDropdownOpen = false;

  } catch (error) {
    console.error('Error updating status:', error);
  }
}


async function fetchResults() {
  try {
    const query = searchQuery.value.trim();
    if(query === "") 
    {
      // If search query is empty, fetch all nominees
      getNominees();
    } 
    else 
    {
      // Otherwise, fetch search results
      const data = await $fetch(`/api/search?searchTerm=${encodeURIComponent(query)}`, { method: 'GET' });
      if (data.results.length === 0) 
      {
        nominees.value = null;
      } 
      else 
      {
        nominees.value = data.results;
      }
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}
  function openModal(nominee) {
    selectedNominee.value = nominee;
    isModalOpen.value = true;
  }

  // Close the modal
  function closeModal() {
    isModalOpen.value = false;
    selectedNominee.value = null; // Clear selected nominee
  }

  function toggleStatusDropdown(nominee) {
  nominee.isDropdownOpen = !nominee.isDropdownOpen;
}

  // Toggle the visibility of the dropdown
  function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
  }
  
  // Fetch nominees based on different statuses
  async function nomineesCreated() {
    const nomineeList = await $fetch('/api/nominee?stat=CREATED', { method: 'GET' });
    nominees.value = nomineeList;
    dropdownOpen.value = false;
  }
  
  async function nomineesConfirmed() {
    const nomineeList = await $fetch('/api/nominee?stat=CONFIRMED', { method: 'GET' });
    nominees.value = nomineeList;
    dropdownOpen.value = false;
  }
  
  async function nomineesVerified() {
    const nomineeList = await $fetch('/api/nominee?stat=VERIFIED', { method: 'GET' });
    nominees.value = nomineeList;
    dropdownOpen.value = false;
  }
  
  async function nomineesApproved() {
    const nomineeList = await $fetch('/api/nominee?stat=APPROVED', { method: 'GET' });
    nominees.value = nomineeList;
    dropdownOpen.value = false;
  }
  
  async function nomineesDenied() {
    const nomineeList = await $fetch('/api/nominee?stat=DENIED', { method: 'GET' });
    nominees.value = nomineeList;
    dropdownOpen.value = false;
  }
  
  async function nomineesSent() {
    const nomineeList = await $fetch('/api/nominee?stat=SENT', { method: 'GET' });
    nominees.value = nomineeList;
    dropdownOpen.value = false;
  }
  
  // Initial data fetch on page load
  async function getNominees() {
    const nomineeList = await $fetch('/api/nominee', { method: 'GET' });
    nominees.value = nomineeList;
  }
  
  // Fetch the nominees when the page loads
  getNominees();
  </script>
  
  