<template>
  <div class="min-h-screen flex justify-center items-center bg-black">
    <!-- Form Container -->
    <div class="w-11/12 max-w-lg p-8 rounded-lg">
      <h1 class="text-2xl font-bold text-white mb-6 text-left">
        Hello, please fill out the form below:
      </h1>
      <form>
        <!-- Nominator First Name -->
        <div class="mb-4">
          <label for="nominatorFirstName" class="block text-lg text-yellow-500 mb-2">Nominator First Name:</label>
          <input
            type="text"
            id="nominatorFirstName"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominator Last Name -->
        <div class="mb-4">
          <label for="nominatorLastName" class="block text-lg text-yellow-500 mb-2">Nominator Last Name:</label>
          <input
            type="text"
            id="nominatorLastName"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominator Email -->
        <div class="mb-4">
          <label for="nominatorEmail" class="block text-lg text-yellow-500 mb-2">Nominator Email:</label>
          <input
            type="email"
            id="nominatorEmail"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominee First Name -->
        <div class="mb-4">
          <label for="nomineeFirstName" class="block text-lg text-yellow-500 mb-2">Nominee First Name:</label>
          <input
            type="text"
            id="nomineeFirstName"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominee Last Name -->
        <div class="mb-4">
          <label for="nomineeLastName" class="block text-lg text-yellow-500 mb-2">Nominee Last Name:</label>
          <input
            type="text"
            id="nomineeLastName"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominee Phone Number -->
        <div class="mb-4">
          <label for="nomineePhone" class="block text-lg text-yellow-500 mb-2">Nominee Phone Number:</label>
          <input
            type="tel"
            id="nomineePhone"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominee Address -->
        <div class="mb-4">
          <label for="nomineeAddress" class="block text-lg text-yellow-500 mb-2">Nominee Address:</label>
          <input
            type="text"
            id="nomineeAddress"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominee Place of Work -->
        <div class="mb-4">
          <label for="nomineeWork" class="block text-lg text-yellow-500 mb-2">Nominee Place of Work:</label>
          <input
            type="text"
            id="nomineeWork"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominee Occupation -->
        <div class="mb-4">
          <label for="nomineeOccupation" class="block text-lg text-yellow-500 mb-2">Nominee Occupation:</label>
          <input
            type="text"
            id="nomineeOccupation"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Nominee Email -->
        <div class="mb-4">
          <label for="nomineeEmail" class="block text-lg text-yellow-500 mb-2">Nominee Email:</label>
          <input
            type="email"
            id="nomineeEmail"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Photo URL -->
        <div class="mb-6">
          <label for="photo" class="block text-lg text-yellow-500 mb-2">Photo URL:</label>
          <input
            type="url"
            id="photo"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Reason for Nomination -->
        <div class="mb-6">
          <label for="reason" class="block text-lg text-yellow-500 mb-2">Reason for Nomination:</label>
          <textarea
            id="reason"
            rows="4"
            class="w-full p-3 border-2 border-yellow-500 rounded-md bg-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Please describe why you are nominating this individual..."
          ></textarea>
        </div>


        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* No additional styles needed; Tailwind handles it all! */
</style>
