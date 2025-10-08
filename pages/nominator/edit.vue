<template>
      <Navbar />

  <body>
  <div>
    <p class="metallic-title"> Noble Award </p>
    <p class="metallic-text"> Update Nominee Profile </p>
    
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

.metallic-title {
font-family: 'Libre Caslon Display', serif;
font-size: 70px;
text-align: center;
position: relative;
color: #a77c43;
background: linear-gradient(
  120deg,
  #a77c43 0%,
  #a77c43 20%,
  #a77c43 40%,
  #a77c43 60%,
  #a77c43 80%,
  #a77c43 100%
);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
text-shadow:
  0 0 5px rgba(212, 175, 55, 0.4),
  0 0 10px rgba(212, 175, 55, 0.2),
  0 0 15px rgba(255, 215, 0, 0.1);

overflow: hidden;
}

/* Glint Swipe Animation */
.metallic-title::after {
content: '';
position: absolute;
top: 0;
left: -75%;
width: 50%;
height: 100%;
background: linear-gradient(
  120deg,
  transparent 0%,
  rgba(255, 255, 255, 0.8) 50%,
  transparent 100%
);
transform: skewX(-20deg);
animation: glintSwipe 3s ease-in-out infinite;
}

@keyframes glintSwipe {
0% {
  left: -75%;
}
50% {
  left: 100%;
}
100% {
  left: 100%;
}
}

/* Reflection Glow */
.metallic-title::before {
content: 'Noble Award';
position: absolute;
top: 100%;
left: 0;
width: 100%;
text-align: center;
font-size: 70px;
transform: scaleY(-1);
opacity: 0.1;
filter: blur(2px);
background: linear-gradient(to bottom, rgba(255, 215, 0, 0.3), transparent);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
}

/* Metallic Text Animation */

@keyframes metallicShine {
  0% {
    text-shadow:
      0 0 5px rgba(212, 175, 55, 0.5),
      0 0 10px rgba(212, 175, 55, 0.4),
      0 0 20px rgba(255, 215, 0, 0.3);
    transform: translateY(0);
    opacity: 1;
  }
  
  50% {
    text-shadow:
      0 0 10px rgba(212, 175, 55, 0.5),
      0 0 20px rgba(212, 175, 55, 0.4),
      0 0 30px rgba(255, 215, 0, 0.3);
    transform: translateY(0);
    opacity: .9;
    
}
  100% {
    text-shadow:
      0 0 5px rgba(212, 175, 55, 0.5),
      0 0 10px rgba(212, 175, 55, 0.4),
      0 0 20px rgba(255, 215, 0, 0.3);
    transform: translateY(0);
    opacity: 1;
    
}

}
  
/* Glint Swipe Animation */
  
.metallic-text {
font-family: 'Libre Caslon Display', serif;
font-size: 30px;
margin-top:0px;
text-align: center;
color: #a77c43;
background: linear-gradient(
  120deg,
  #a77c43 0%,
  #a77c43 20%,
  #a77c43 40%,
  #a77c43 60%,
  #a77c43 80%,
  #a77c43 100%
);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
position: relative;
text-shadow:
  0 0 5px rgba(212, 175, 55, 0.5),
  0 0 10px rgba(212, 175, 55, 0.4),
  0 0 20px rgba(255, 215, 0, 0.3);
animation: metallicShine 3s infinite linear;
}

html, body {
  width: 100%;
  height: 100%;
  background-color:#222121; /* Full black background */
  color:rgb(57, 45, 45); /* Gold text color */
  font-family: Times New Roman, serif;
  display: flex;
  justify-content: center;
  align-items: center;
}


.container {
  width: 100%;
  max-width: 00px;
  background-color:rgb(45, 40, 40); /* Slightly lighter black for form background */
  padding: 20px;
  border-radius: 8px;
  color:rgb(0, 0, 0); /* Black text color */
  font-family: Times New Roman, serif;
}


/* Form and Text Styling */
p {
font-size: 50px;
    color:#a77c43;
    text-align: center;
    margin-bottom: 1px;
    font-family: Snell Roundhand, cursive;
}

cite {
    font-size: 25px;
    color:rgb(167, 124, 67);
    text-align: center;
    margin-bottom: 50px;
    font-family: Snell Roundhand, cursive;
}

form > div:first-of-type {
  margin-top: 30px;       /* Adds space before enter nominee email */
  margin-bottom: 30px;    /* Adds space after search button */
}

label {
font-size: 18px;
margin-top: 10px;
margin-bottom: 5px;
color:#d4af37; /* Gold label color */
}


input[type="text"],
input[type="tel"],
input[type="email"],
input[type="url"],
textarea {
width: 100%;
max-width: 500px;
padding: 10px;
margin-bottom: 15px;
border: 2px solid #a77c43; /* Gold border */
border-radius: 8px;
background-color:#4e4e4d; /* Gray background for text boxes */
color: #ffffff; /* White text inside the text box */
font-size: 16px;
}


/* Buttons */
button {
width: 100%;
padding: 12px;
background-color:#4e4e4d; /* Gray background for button */
color:#d4af37; /* Dark text color */
font-size: 18px;
font-weight: bold;
border: none;
border-radius: 20px;
cursor: pointer;
transition: background-color 0.3s ease;
margin-top: 12px;
/*margin-bottom: 12px;*/
}


button:hover {
background-color: #a77c43; /* Darker gold on hover */
}


button:focus {
outline: none;
}

body > div {
  width: 90%;
  max-width: 500px; /* Wider container */
  margin: 0 auto;
}



</style>
