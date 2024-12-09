<template>
    <div>
      <p>Hello, please fill out the form below:</p>
      <form @submit.prevent="submitForm">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" v-model="firstName" id="firstName" />
        </div>
  
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="lastName" id="lastName" />
        </div>
  
        <div>
          <label for="phoneNumber">Phone Number:</label>
          <input type="tel" v-model="phoneNumber" id="phoneNumber" />
        </div>
  
        <div>
          <label for="address">Address:</label>
          <input type="text" v-model="address" id="address" />
        </div>
  
        <div>
          <label for="placeOfWork">Place of Work:</label>
          <input type="text" v-model="placeOfWork" id="placeOfWork" />
        </div>
  
        <div>
          <label for="occupation">Occupation:</label>
          <input type="text" v-model="occupation" id="occupation" />
        </div>
  
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" />
        </div>
  
        <div>
          <label for="description">Description:</label>
          <textarea v-model="description" id="description"></textarea>
        </div>
  
        <div>
          <label for="photoURL">Photo URL:</label>
          <input type="url" v-model="photoURL" id="photoURL" />
        </div> 
  
        <button type="submit">Submit</button>
      </form>
      
      <NuxtLink to="https://supportourscrubs.org/donate" target = "blank">
        <button>Donate Here! </button>
      </NuxtLink>
      <nuxt-link to="/nominator/viewnominees">
        <button>Go to Nominator Page</button>
      </nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'YourComponentName',
    data() {
      return {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        placeOfWork: '',
        occupation: '',
        email: '',
        description: '',
        photoURL: '',
      };
    },
    methods: {
      async submitForm() {
        const nominatorId = '9f2a7a02-5849-4c4a-841a-bbd9d28ddf08';
        const adminId = '7ce1ff18-5c4a-4eb1-aa67-d7d7f5c10be8';
  
        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          address: this.address,
          placeOfWork: this.placeOfWork,
          occupation: this.occupation,
          email: this.email,
          description: this.description,
          photoURL: this.photoURL,
          nominatorId: nominatorId,
          adminId: adminId
        };
  
        try {
          const response = await fetch('http://localhost:3000/api/nominee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
            const errorDetails = await response.json();
            console.log('Error details:', errorDetails);
            throw new Error(`Error submitting form: ${errorDetails.message}`);
          }
  
          const result = await response.json();
          console.log('Form submitted successfully:', result);
          alert('Form submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('There was an error submitting the form. Please check the console for details.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* General Styles */
  
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  
  html, body {
      width: 100%;
      height: 100%;
      background-color: #000; /* Full black background */
      color: #d4af37; /* Gold text color */
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .container {
      width: 100%;
      max-width: 500px;
      background-color: #1a1a1a; /* Slightly lighter black for form background */
      padding: 20px;
      border-radius: 8px;
      color: #d4af37; /* Gold text color */
      font-family: Arial, sans-serif;
  }
  
  /* Form and Text Styling */
  p {
    font-size: 18px;
    color: #d4af37;
    text-align: center;
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
    margin-bottom: 5px;
    color: #d4af37; /* Gold label color */
  }
  
  input[type="text"],
  input[type="tel"],
  input[type="email"],
  input[type="url"],
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid #d4af37; /* Gold border */
    border-radius: 8px;
    background-color: #d4af37; /* Gold background for text boxes */
    color: #000; /* Black text inside the text box */
    font-size: 16px;
  }
  
  /* Buttons */
  button {
    width: 100%;
    padding: 12px;
    background-color: #d4af37; /* Gold background for button */
    color: #1a1a1a; /* Dark text color */
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #b8860b; /* Darker gold on hover */
  }
  
  button:focus {
    outline: none;
  }
  
  </style>