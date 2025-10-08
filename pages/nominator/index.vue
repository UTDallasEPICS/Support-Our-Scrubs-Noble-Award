<template>
  <Navbar />
  <div class="page">
    <div class="page-inner">
      <p class="metallic-title">NOBLE AWARD</p>
      <p class="metallic-text">NOMINATION FORM</p>

      <form @submit.prevent="submitForm" class="form">
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

        <p class="metallic-text section-label">NOMINATOR</p>

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

        <nuxt-link to="/nominator/viewnominees">
          <button type="button">Go to Nominee Database</button>
        </nuxt-link>

        <nuxt-link to="/nominator/edit">
          <button type="button">Edit Previous Submission</button>
        </nuxt-link>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import Navbar from '@/components/Navbar.vue'

const nominatorId = uuidv4()

export default {
  name: 'Nominator',
  components: { Navbar },
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
      photoURL: ''
    }
  },
  methods: {
    async submitForm() {
      const adminId = '7ce1ff18-5c4a-4eb1-aa67-d7d7f5c10be8'
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
        nominatorId,
        adminId
      }

      try {
        const response = await fetch('/api/nominee', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (!response.ok) {
          const errorDetails = await response.json()
          throw new Error(errorDetails.message || 'Submit failed')
        }
        alert('Form submitted successfully!')
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error submitting the form. Please check the console for details.')
      }
    },
    async handlePhotoUpload(event) {
      try {
        const file = event.target.files[0]
        const subjectImage = new FormData()
        subjectImage.append('file', file)
        subjectImage.append('upload_preset', 'unsigned_uploads')

        const service = import.meta.env.VITE_IMAGE_SERVICE
        const res = await fetch(service, { method: 'POST', body: subjectImage })
        const data = await res.json()
        this.photoURL = data.secure_url
      } catch (err) {
        console.error('Upload error:', err)
      }
    }
  },
  mounted() {
    window.addEventListener('popstate', () => {
      window.location.reload()
    })
    if (this.$route.query.form) {
      const decodedData = JSON.parse(decodeURIComponent(this.$route.query.form))
      console.log('datos ', decodedData.occupation)
    }
  }
}
</script>

<style scoped>
/* ========== Layout wrapper (instead of styling <body>) ========== */
.page {
  min-height: 100vh;
  background: radial-gradient(circle at top, rgb(43, 41, 41), rgb(20, 20, 20) 100%);
  display: flex;
  justify-content: center;
  padding: 24px 16px 64px;
}

.page-inner {
  width: 100%;
  max-width: 760px;
}

/* ========== Typography & headings ========== */
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
  margin-top: 24px;
  margin-bottom: 6px;
  background: linear-gradient(120deg, #fff4b0 0%, #f0c75e 20%, #d4af37 40%, #f8e27d 60%, #d4af37 80%, #fff4b0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 5px rgba(212, 175, 55, 0.4), 0 0 10px rgba(212, 175, 55, 0.2), 0 0 15px rgba(255, 215, 0, 0.1);
  overflow: hidden;
}
.metallic-title::after {
  content: '';
  position: absolute; top: 0; left: -75%;
  width: 50%; height: 100%;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%);
  transform: skewX(-20deg);
  animation: glintSwipe 3s ease-in-out infinite;
}
@keyframes glintSwipe { 0% { left: -75%; } 50% { left: 100%; } 100% { left: 100%; } }

.metallic-title::before {
  content: 'Noble Award';
  position: absolute;
  top: 100%; left: 0; width: 100%;
  text-align: center;
  font-size: 70px;
  transform: scaleY(-1);
  opacity: 0.1; filter: blur(2px);
  background: linear-gradient(to bottom, rgba(255,215,0,0.3), transparent);
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
}

.metallic-text {
  font-family: 'Libre Caslon Display', serif;
  font-size: 30px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
  background: linear-gradient(120deg, #fff4b0 0%, #f0c75e 20%, #d4af37 40%, #f8e27d 60%, #d4af37 80%, #fff4b0 100%);
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
  text-shadow: 0 0 5px rgba(212,175,55,0.5), 0 0 10px rgba(212,175,55,0.4), 0 0 20px rgba(255,215,0,0.3);
}
.section-label { margin-top: 24px; }

/* ========== Form ========== */
.form {
  color: #d4af37;
  font-family: Arial, sans-serif;
}

label {
  display: block;
  font-size: 18px;
  margin-bottom: 6px;
  font-family: 'Libre Caslon Display', serif;
  color: #d4af37;
}

input[type="text"],
input[type="tel"],
input[type="email"],
input[type="url"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #5b5b5a;
  border-radius: 8px;
  background-color: #434242;
  color: #000;
  font-size: 16px;
}

.upload-section { margin: 16px 0; }
.upload-section label { margin-bottom: 8px; }

button {
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
  transition: background-color .3s ease;
  margin-top: 10px;
}
button:hover { background-color: #898989; }
button:focus { outline: none; }
</style>
