<template>
    <div>
      <!-- Header -->
      <div>
        <h2 class="text-center text-3xl font-bold mt-4" style="margin-top: 35px">View Database</h2>
        <br>
      </div>
  
      <!-- Dropdown Button -->
      <div class="relative inline-block text-left">
        <div>
          <button
            type="button"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          v-show="dropdownOpen"
        >
        <div class="py-1 space-y-2" role="none"> <!-- Added space-y-2 to create vertical space -->
          <!-- Menu Items (now as buttons for button-like appearance) -->
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="nomineesCreated">CREATED</button>
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="nomineesConfirmed">CONFIRMED</button>
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="nomineesVerified">VERIFIED</button>
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="nomineesApproved">APPROVED</button>
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="nomineesDenied">DENIED</button>
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="nomineesSent">SENT</button>
        </div>
        </div>
      </div>
  
      <!-- Display Table of Nominees -->
      <div class="mt-4 mx-10">
        <div class="relative overflow-x-auto rounded-lg">
          <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr class="h-9">
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
                <td>{{ u.firstName }}</td>
                <td>{{ u.lastName }}</td>
                <td>{{ u.phoneNumber }}</td>
                <td>{{ u.address }}</td>
                <td>{{ u.placeOfWork }}</td>
                <td>{{ u.occupation }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.description }}</td>
                <td>{{ u.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // The state for nominees data and dropdown visibility
  const nominees = ref([]);
  const dropdownOpen = ref(false);
  
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
  
  