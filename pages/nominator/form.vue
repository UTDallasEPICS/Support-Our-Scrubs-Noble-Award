<template>
<<<<<<< HEAD:pages/nominator/form.vue
      <Navbar @open-login="showLogin = true"/>
    <body>
    <div>
      <!-- GSAP animated title -->
      <p ref="nobleTitle" class="metallic-title">NOBLE AWARD</p>


      <p ref="nominationFormTitle" class="metallic-text">NOMINATION FORM</p>
       
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


        <p ref="nominatorTitle" class="metallic-text">NOMINATOR</p>
 
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

        <!-- File Upload with Hover Glow -->
        <div class="upload-section">
          <label for="photo">Upload Photo:</label>
          <div class="custom-upload">
            <input
              type="file"
              id="photo"
              ref="fileInput"
              class="hidden-file"
              @change="handlePhotoUpload"
            />
            <button
              type="button"
              class="upload-btn"
              @click="$refs.fileInput.click()"
              ref="uploadButton"
            >
              Choose File
            </button>
            <span class="file-name">{{ selectedFileName || "No file chosen" }}</span>
          </div>
        </div>


        <button type="submit">Submit</button>
      </form>
     
      <!-- Removed buttons:
      <NuxtLink to="https://supportourscrubs.org/donate" target = "blank">
        <button>Donate Here! </button>
      </NuxtLink>
      -->


      <!--
      <nuxt-link to="/nominator/viewnominees">
        <button>Go to Nominee Database</button>
      </nuxt-link>
     


      <nuxt-link to="/nominator/edit">
       <button>Edit Previous Submission</button>
     </nuxt-link>
    -->
   

    </div>
    </body>
        <Teleport to="body">
      <LoginModal v-if="showLogin" @close="showLogin = false" />
    </Teleport>
  </template>
 
  <script>


  //gsap
  import { ref, onMounted } from 'vue'
  import gsap from 'gsap'
  import { v4 as uuidv4 } from 'uuid';
  import Navbar from '@/components/Navbar.vue';
  import LoginModal from '@/components/MyLogin.vue'

=======
  <div class="min-h-screen bg-black text-amber-300">
    <Navbar />

    <main class="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <!-- Titles -->
      <p ref="nobleTitle" class="metallic-title metallic-title--main">
        NOBLE AWARD
      </p>

      <p ref="nominationFormTitle" class="metallic-title metallic-title--sub">
        NOMINATION FORM
      </p>

      <!-- Form Card -->
      <form
        @submit.prevent="submitForm"
        class="mt-8 rounded-2xl border border-zinc-800/70 bg-[#1a1a1a] backdrop-blur p-5 sm:p-6 md:p-8 shadow-xl"
      >
        <!-- Nominator fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="col-span-1">
            <label for="nominatorName" class="block text-sm font-medium mb-1">Your Name</label>
            <input
              id="nominatorName"
              v-model="nominatorName"
              type="text"
              autocomplete="name"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
              placeholder="Jane Doe"
            />
          </div>

          <div class="col-span-1">
            <label for="nominatorEmail" class="block text-sm font-medium mb-1">Your Email</label>
            <input
              id="nominatorEmail"
              v-model="nominatorEmail"
              type="email"
              autocomplete="email"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <!-- Nominee section -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium mb-1">Nominee First Name</label>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
              placeholder="Nominee first name"
            />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium mb-1">Nominee Last Name</label>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
              placeholder="Nominee last name"
            />
          </div>
        </div>

        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="phoneNumber" class="block text-sm font-medium mb-1">Phone Number</label>
            <input
              id="phoneNumber"
              v-model="phoneNumber"
              type="tel"
              autocomplete="tel"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
              placeholder="(555) 555-5555"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium mb-1">Nominee Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
              placeholder="nominee@example.com"
            />
          </div>
        </div>

        <div class="mt-4">
          <label for="address" class="block text-sm font-medium mb-1">Address</label>
          <input
            id="address"
            v-model="address"
            type="text"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                   focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
            placeholder="Street, City, State"
          />
        </div>

        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="placeOfWork" class="block text-sm font-medium mb-1">Place of Work</label>
            <input
              id="placeOfWork"
              v-model="placeOfWork"
              type="text"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
              placeholder="Company / Organization"
            />
          </div>
          <div>
            <label for="occupation" class="block text-sm font-medium mb-1">Occupation</label>
            <input
              id="occupation"
              v-model="occupation"
              type="text"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
              placeholder="Role / Title"
            />
          </div>
        </div>

        <div class="mt-4">
          <label for="description" class="block text-sm font-medium mb-1">Description</label>
          <textarea
            id="description"
            v-model="description"
            rows="5"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400
                   focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3 resize-y"
            placeholder="Why are you nominating this person?"
          ></textarea>
        </div>

        <!-- File Upload -->
        <div class="mt-6">
          <span class="block text-sm font-medium">Upload Photo</span>

          <div class="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              id="photo"
              ref="fileInput"
              type="file"
              accept="image/*"
              class="sr-only"
              @change="handlePhotoUpload"
            />
            <label
              for="photo"
              ref="uploadButton"
              class="inline-flex items-center justify-center rounded-xl border border-amber-400 px-4 py-2
                     bg-zinc-800/70 text-amber-300 font-serif cursor-pointer transition
                     hover:bg-amber-300 hover:text-zinc-900 hover:border-zinc-900"
            >
              Choose File
            </label>

            <span class="text-sm text-amber-200/80 break-all">
              {{ selectedFileName || "No file chosen" }}
            </span>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="mt-8 w-full nomination-submit-btn"
        >
          Submit
        </button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Title refs
const nobleTitle = ref<HTMLElement | null>(null)
const nominationFormTitle = ref<HTMLElement | null>(null)

// Form fields
const nominatorName = ref('')
const nominatorEmail = ref('')
const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const email = ref('')
const address = ref('')
const placeOfWork = ref('')
const occupation = ref('')
const description = ref('')

// File upload state
const selectedFile = ref<File | null>(null)
const selectedFileName = ref('')
>>>>>>> origin/mobileFriendly:pages/nominator/index.vue

// Refs to elements
const fileInput = ref<HTMLInputElement | null>(null)
const uploadButton = ref<HTMLElement | null>(null)

<<<<<<< HEAD:pages/nominator/form.vue

export default {
  name: 'Nominator',
  components: { Navbar, LoginModal },
  setup() {
  const nobleTitle = ref(null);
  const nominationFormTitle = ref(null);
  const nominatorTitle = ref(null);
  const uploadButton = ref(null);


  const addHoverShine = (element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(element, {
        textShadow: "0px 0px 35px rgba(255, 215, 0, 1)",
        duration: 0.5,
        ease: "power1.out"
      })
    })


    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        textShadow: "0px 0px 5px rgba(255, 215, 0, 0.4)",
        duration: 0.5,
        ease: "power1.out"
      });
    });
  };


  onMounted(() => {
      [nobleTitle.value, nominationFormTitle.value, nominatorTitle.value].forEach(
        (el) => {
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.7, y: -50 },
            { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" }
          );
          addHoverShine(el);
        }
      );


      // Add glow to upload button
      if (uploadButton.value) addHoverShine(uploadButton.value);
    });


    return { nobleTitle, nominationFormTitle, nominatorTitle, uploadButton };
  },


  data() {
    return {
      showLogin: false,
      nominatorName: "",
      nominatorEmail: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      placeOfWork: "",
      occupation: "",
      email: "",
      description: "",
      photoURL: "",
      selectedFileName: ""
    };
  },


    methods: {
      slugify(name) {
        return name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')  // non-alphanumerics → hyphens
          .replace(/^-+|-+$/g, '');
      },
      async submitForm() {
        const adminId = '7ce1ff18-5c4a-4eb1-aa67-d7d7f5c10be8';
        this.firstandLast = this.firstName + this.lastName
        this.slug = this.slugify(this.firstandLast)
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
          adminId: adminId,
          slug: this.slug
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
          const response = await fetch("/api/nominee", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(`Error submitting form: ${errorDetails.message}`);
        }

        const result = await response.json();
        console.log("Form submitted successfully:", result);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form.");
      }
    },
      async handlePhotoUpload(event) {
      try {
        const file = event.target.files[0];
        this.selectedFileName = file ? file.name : "No file chosen";

        const subjectImage = new FormData();
        subjectImage.append("file", file);
        subjectImage.append("upload_preset", "unsigned_uploads");

        const service = import.meta.env.VITE_IMAGE_SERVICE;
        console.log("watch");

        const res = await fetch(service, { method: "POST", body: subjectImage });
        console.log("fetch completed");
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
 
html, body {
  width: 100%;
  height: 100%;
  background-color: #222121;
  color: #d4af37;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

  .metallic-title {
  font-family: 'Libre Caslon Display', serif;
  font-size: 70px;
=======
function handlePhotoUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  selectedFile.value = file
  selectedFileName.value = file ? file.name : ''
}

// Reset form after submit
function resetForm() {
  nominatorName.value = ''
  nominatorEmail.value = ''
  firstName.value = ''
  lastName.value = ''
  phoneNumber.value = ''
  email.value = ''
  address.value = ''
  placeOfWork.value = ''
  occupation.value = ''
  description.value = ''
  selectedFile.value = null
  selectedFileName.value = ''
}

// Submit form → multipart upload
async function submitForm() {
  try {
    const formData = new FormData()

    // nominee info
    formData.append('firstName', firstName.value)
    formData.append('lastName', lastName.value)
    formData.append('phoneNumber', phoneNumber.value)
    formData.append('address', address.value)
    formData.append('placeOfWork', placeOfWork.value)
    formData.append('occupation', occupation.value)
    formData.append('email', email.value)
    formData.append('description', description.value)

    // nominator info
    formData.append('nominatorName', nominatorName.value)
    formData.append('nominatorEmail', nominatorEmail.value)

    // required but optional for logic
    formData.append('nominatorId', '')
    formData.append('adminId', '')

    // slug
    const slug = `${firstName.value}-${lastName.value}-${Date.now()}`
      .toLowerCase()
      .replace(/\s+/g, '-')
    formData.append('slug', slug)

    // file
    if (selectedFile.value) {
      formData.append('photo', selectedFile.value)
    }

    await $fetch('/api/nominee', {
      method: 'POST',
      body: formData,
    })

    alert('Nomination submitted!')
    resetForm()
  } catch (err) {
    console.error('Error submitting nomination', err)
    alert('Something went wrong submitting the nomination.')
  }
}
</script>

<style scoped>
/* your original styles – unchanged */
.metallic-title {
  font-family: 'Cinzel', serif;
>>>>>>> origin/mobileFriendly:pages/nominator/index.vue
  text-align: center;
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
<<<<<<< HEAD:pages/nominator/form.vue
    0 0 5px rgba(212, 175, 55, 0.4),
    0 0 10px rgba(212, 175, 55, 0.2),
    0 0 15px rgba(255, 215, 0, 0.1);


  overflow: hidden;
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
=======
>>>>>>> origin/mobileFriendly:pages/nominator/index.vue
    0 0 5px rgba(212, 175, 55, 0.5),
    0 0 10px rgba(212, 175, 55, 0.4),
    0 0 20px rgba(255, 215, 0, 0.3);
  animation: metallicShine 3s infinite linear;
}
<<<<<<< HEAD:pages/nominator/form.vue
 
  html, body {
      width: 100%;
      height: 100%;
      background-color: #000000; /* Full black background */
      color: #d4af37; /* Gold text color */
      font-family: 'Arial', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
  }
 
  input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #5b5b5a;
  border-radius: 4px;
  background-color: #434242;
  color: #000;
  font-size: 16px;
}


/* Submit button */
button[type="submit"] {
  width: 100%;
  padding: 12px;
  background-color: #4e4e4d;
  color: #d4af37;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Libre Caslon Display', serif;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}
button[type="submit"]:hover {
  background-color: #898989;
}


/* === Custom File Upload === */
.upload-section {
  margin: 20px 0;
  text-align: center;
}

.custom-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hidden-file { display: none; }
.upload-btn {
  background-color: #3a3a3a;
  color: #d4af37;
  font-family: "Libre Caslon Display", serif;
  border: 2px solid #d4af37;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Inverse colors on hover */
.upload-btn:hover {
  background-color: #d4af37; /* gold background */
  color: #3a3a3a; /* dark text */
  border-color: #3a3a3a;
}

.file-name {
  font-size: 16px;
  color: #d4af37;
  font-family: 'Libre Caslon Display', serif;
=======

.metallic-title--main {
  margin-top: 2rem;
  font-size: 60px;
}

.metallic-title--sub {
  margin-top: 0.5rem;
  font-size: 32px;
>>>>>>> origin/mobileFriendly:pages/nominator/index.vue
}

.nomination-submit-btn {
  background-color: #d4af37;
  color: #0d0d0d;
  font-weight: 700;
  padding: 14px 18px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  transition:
    transform 0.08s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 6px 22px rgba(245, 197, 66, 0.2);
}

<<<<<<< HEAD:pages/nominator/form.vue
  </style>
=======
.nomination-submit-btn:hover {
  background-color: #ffe08a;
  box-shadow: 0 10px 28px rgba(255, 224, 138, 0.25);
}

.nomination-submit-btn:active {
  transform: translateY(1px);
}
</style>
>>>>>>> origin/mobileFriendly:pages/nominator/index.vue
