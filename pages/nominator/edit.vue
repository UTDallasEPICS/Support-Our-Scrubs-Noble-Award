<template>
    <body>
    <div>
      <p>Edit the Form Below:</p>
      <form @submit.prevent="submitForm">
        <div>
          <label for="emailSearch">Enter Nominee Email:</label>
          <input type="text" v-model="emailSearch" id="emailSearch" />
          <button type="button" @click="fetchNominee">Search</button>
        </div>

        <div>
          <label for="firstName">First Name:</label>
          <input type="text" v-model="formData.firstName" id="firstName" />
        </div>
  
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="formData.lastName" id="lastName" />
        </div>
  
        <div>
          <label for="phoneNumber">Phone Number:</label>
          <input type="tel" v-model="formData.phoneNumber" id="phoneNumber" />
        </div>
  
        <div>
          <label for="address">Address:</label>
          <input type="text" v-model="formData.address" id="address" />
        </div>
  
        <div>
          <label for="placeOfWork">Place of Work:</label>
          <input type="text" v-model="formData.placeOfWork" id="placeOfWork" />
        </div>
  
        <div>
          <label for="occupation">Occupation:</label>
          <input type="text" v-model="formData.occupation" id="occupation" />
        </div>
  
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="formData.email" id="email" />
        </div>
  
        <div>
          <label for="description">Description:</label>
          <textarea v-model="formData.description" id="description"></textarea>
        </div>
  
        <div>
          <label for="photoURL">Photo URL:</label>
          <input type="url" v-model="formData.photoURL" id="photoURL" />
        </div>
  
        <button type="submit">Submit</button>
      </form>
  
      <nuxt-link to="/nominator/viewnominees">
        <button>Go to Nominator Page</button>
      </nuxt-link>

      <nuxt-link to="/nominator">
        <button>Go To Nomination Page</button>
      </nuxt-link>
    </div>
</body>
</template>

<script>
export default {
    name: 'YourComponentName',
    data() {
      return {
        emailSearch: '',
        formData: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          placeOfWork: '',
          occupation: '',
          email: '',
          description: '',
          photoURL: '',
        },
      };
    },
    methods: {
      async fetchNominee() {
        try {
          const response = await fetch(`http://localhost:3000/api/nominee?email=${encodeURIComponent(this.emailSearch)}`);

          if (!response.ok) {
            const errorDetails = await response.json();
            console.log('Error details:', errorDetails);
            throw new Error(`Error fetching nominee: ${errorDetails.statusMessage || 'Unknown error'}`);
          }

          const data = await response.json();
          if (data && data.length > 0) {
            this.formData = { ...data[0] };
          } 
        } catch (error) {
          console.log(error);
          throw createError({
            statusCode: 500,
            statusMessage: "Error getting nominee",
          });
        }
      },
      async submitForm() {
        try {
          const response = await fetch('http://localhost:3000/api/nominee', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.formData),
          });

          if (!response.ok) {
            const errorDetails = await response.json();
            console.log('Error details:', errorDetails);
            throw new Error(`Error updating nominee: ${errorDetails.statusMessage || 'Unknown error'}`);
          }
        } catch (error) {
          console.log(error);
          throw createError({
            statusCode: 500,
            statusMessage: "Error updating nominee",
          });
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
    background-color: #000; 
    color: #d4af37; 
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
