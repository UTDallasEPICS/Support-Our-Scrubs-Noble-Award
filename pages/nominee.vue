<template>
    <div class="form-container">
      <h1>Nominate a Hero</h1>
      <form @submit.prevent="submitNominee">
        <!-- Nominee Information -->
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" v-model="form.firstName" required />
        </div>
  
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="form.lastName" required />
        </div>
  
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input type="tel" v-model="form.phoneNumber" required />
        </div>
  
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" v-model="form.address" required />
        </div>
  
        <div class="form-group">
          <label for="placeOfWork">Place of Work:</label>
          <input type="text" v-model="form.placeOfWork" required />
        </div>
  
        <div class="form-group">
          <label for="occupation">Occupation:</label>
          <input type="text" v-model="form.occupation" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="form.email" required />
        </div>
  
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="form.description" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="photoUrl">Photo URL:</label>
          <input type="url" v-model="form.photoUrl" required />
        </div>
  
        <!-- Submit Button -->
        <button type="submit">Submit Nominee</button>
  
        <!-- Response Message -->
        <p v-if="responseMessage">{{ responseMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  // Create a reactive form object
  const form = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    placeOfWork: '',
    occupation: '',
    email: '',
    description: '',
    photoUrl: ''
  })
  
  // Response message after form submission
  const responseMessage = ref('')
  
  // Function to handle form submission
  const submitNominee = async () => {
    try {
      const apiUrl = 'http://localhost:3000/api/nominee'
      const response = await axios.post(apiUrl, form.value)
      responseMessage.value = `Nominee ${form.value.firstName} ${form.value.lastName} has been successfully submitted!`
  
      // Clear the form
      form.value = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        placeOfWork: '',
        occupation: '',
        email: '',
        description: '',
        photoUrl: ''
      }
    } catch (error) {
      responseMessage.value = `An error occurred: ${error.response ? error.response.data.message : error.message}`
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #1a1a1a;
    color: #d4af37;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #d4af37;
    border-radius: 5px;
    background: #1a1a1a;
    color: #d4af37;
  }
  
  button {
    background-color: #d4af37;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    color: #1a1a1a;
  }
  
  button:hover {
    background-color: #b8962e;
  }
  
  p {
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  