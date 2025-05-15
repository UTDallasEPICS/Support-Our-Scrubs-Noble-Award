<template>
      <Navbar />
    <body>
    <div>
      <p class="metallic-title">NOBLE AWARD</p>

       <p class="metallic-text">NOMINATION FORM</p>
       
      <form @submit.prevent="submitForm">
      <div>
          <label for="nominatorName">Your Name:</label>
          <input type="text" v-model="nominatorName" id="nominatorName" />
        </div>
        <div>
          <label for="nominatorEmail">Your Email:</label>
          <input type="text" v-model="nominatorEmail" id="nominatorEmail" />
        </div>
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
        <div class="upload-section">
        <label for="photo">Upload Photo:</label>
        <input type="file" @change="handlePhotoUpload" />
        </div>
        <button type="submit">Submit</button>
      </form>
      
      <NuxtLink to="https://supportourscrubs.org/donate" target = "blank">
        <button>Donate Here! </button>
      </NuxtLink>
      <nuxt-link to="/nominator/viewnominees">
        <button>Go to Nominee Database</button>
      </nuxt-link>

      <nuxt-link to="/nominator/edit">
       <button>Edit Previous Submission</button>
     </nuxt-link>
    </div>
    </body>
  </template>
  
  <script>

  import { v4 as uuidv4 } from 'uuid';
  import Navbar from '@/components/Navbar.vue';

  //import prisma from './prisma';
  const nominatorId = uuidv4();

  export default {
    name: 'Nominator',
    data() {
      return {
        nominatorName: '',
        nominatorEmail: '',
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
        const adminId = '7ce1ff18-5c4a-4eb1-aa67-d7d7f5c10be8';
  
        const formData = {
          nominatorName: this.nominatorName,
          nominatorEmail: this.nominatorEmail,
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

        /**let nominator = await prisma.nominator.findUnique({
          where: { id: nominatorId }
        });

        if (!nominator) {
          nominator = await prisma.nominator.create({
            data: {
              id: nominatorId,
              firstName: this.nominatorName,
              lastName: this.nominatorName,
              email: this.nominatorEmail
           //   Nominee: {
             // create: formData
            //}
            }
          });
        }**/
          console.log("idk "+nominatorId);
          const response = await fetch('/api/nominee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          console.log("failed");
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
      },
      async handlePhotoUpload(event) {
      console.log("failed2")
      try {
        const file = event.target.files[0];

        // === Simulated Cloudinary Upload ===
        const subjectImage = new FormData();
        subjectImage.append("file", file);
        subjectImage.append("upload_preset", "unsigned_uploads");

        const service = import.meta.env.VITE_IMAGE_SERVICE;                 
        console.log("watch")
        const res = await fetch(service, {
          method: "POST",
          body: subjectImage,
        });
        console.log("this doesnt call")

        const data = await res.json();
        this.photoURL = data.secure_url;
        console.log("RIIIIIGHT HEERE "+this.photoURL)
        } catch (err){
          console.error("Upload error:", err);

        }
        // Now this.photoURL will go into your database as part of the nominee object
        }
    },
    mounted() {
      window.addEventListener('popstate', () => {
      window.location.reload(); // Fallback for broken history
      });
    
      if (this.$route.query.form) {
        const decodedData = JSON.parse(decodeURIComponent(this.$route.query.form));
        console.log("datos "+decodedData.occupation);
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
  color: #d4af37;
  background: linear-gradient(
    120deg,
    #fff4b0 0%,
    #f0c75e 20%,
    #d4af37 40%,
    #f8e27d 60%,
    #d4af37 80%,
    #fff4b0 100%
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


/* <!-- <p style= "font-family: 'Libre Caslon Display', serif; font-size: 30px;
  margin-top:0px; margin-bottom: 50px;"> NOMINATION FORM</p> --> */


.metallic-text {
  font-family: 'Libre Caslon Display', serif;
  font-size: 30px;
  margin-top:0px;
  text-align: center;
  color: #d4af37;
  background: linear-gradient(
    120deg,
    #fff4b0 0%,
    #f0c75e 20%,
    #d4af37 40%,
    #f8e27d 60%,
    #d4af37 80%,
    #fff4b0 100%
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
      background-color: #222121; /* Full black background */
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
    font-family: 'Libre Caslon Display', serif; /* font-family: 'Mrs Saint Delafield', cursive !important; This is supposed to be the font arrhhhh rarrrr*/
    font-size: 70px;
    color: #d4af37;
    text-align: center;
    margin-bottom:3px;  
    margin-top: 70px;
    
  }
  
  label {
    font-size: 18px;
    margin-bottom: 5px;
    font-family: 'Libre Caslon Display', serif;
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
    border: 2px solid #5b5b5a; /* Gold border */
    border-radius: 8px;
    background-color: #434242; /* Gold background for text boxes */
    color: #000; /* Black text inside the text box */
    font-size: 16px;
  }
  
  /* Buttons */
  button {
    width: 100%;
    padding: 12px;
    background-color: #4e4e4d; /* Gold background for button */
    color: #d4af37; /* Dark text color */
    font-size: 18px;
    font-weight: bold;
    font-family: "Libre Caslon Display", serif;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #898989; /* Darker gold on hover */
  }
  
  button:focus {
    outline: none;
  }
  
.upload-section {
  margin: 16px 0; /* space above and below the whole section */
}

.upload-section label {
  display: block;
  margin-bottom: 8px; /* space between label and input */
}


  </style>
