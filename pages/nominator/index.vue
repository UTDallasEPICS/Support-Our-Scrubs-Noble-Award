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

    <nuxt-link to="/nominator">
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
      // Hardcoded nominatorId and adminId
      const nominatorId = '71d6c0f7-a066-4578-ba79-674107ec6ca5'; // Replace with actual nominator ID
      const adminId = 'your-hardcoded-admin-id'; // Replace with actual admin ID
      

      // Form data including hardcoded IDs
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
/* Add any scoped styling you want here */
</style>
