<template>yo</template>


<!-- <template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 class="text-2xl font-bold mb-6 text-center">
          {{ registrationMode ? 'Register' : 'Login' }}
        </h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="registrationMode" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  v-model="firstName"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  v-model="lastName"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
  
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ registrationMode ? 'Register' : 'Send Magic Link' }}
          </button>
        </form>
  
        <div class="mt-4 text-center">
          <button
            @click="registrationMode = !registrationMode"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            {{ registrationMode ? 'Already have an account? Login' : 'Need an account? Register' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const registrationMode = ref(false);
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  
  const handleSubmit = async () => {
    try {
        if (registrationMode.value) {
            let accountCreationResult;
            try {
                accountCreationResult = await $fetch("/api/nominator", {
                    method: "POST",
                    body: {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value
                    }
                });
            } catch (error) {
                alert("Error creating a new user account. You may already be registered.");
                return;
            }
        }

        try {
          await $fetch('/api/auth/magiclink', {
              method: 'POST',
              body: { email: email.value }
          });
          alert(`Check ${email.value} for your magic link!`);
        } catch (error) {
          alert(`Failed to send login link to ${email.value}`)
        }
        
        // Reset form if in registration mode
        if (registrationMode.value) {
            firstName.value = '';
            lastName.value = '';
            registrationMode.value = false;
        }
        email.value = '';
      
    } catch (error) {
      alert(`Error: ${error.data?.message || 'Something went wrong'}`);
    }
  };
  </script> -->