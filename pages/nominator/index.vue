<template>
  <div>
    <div :class="['page-background', { blurred: showLogin }]">
      <Navbar @open-login="showLogin = true"/>

      <p class="metallic-title">NOBLE AWARD</p>
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
    </div>
  </div>

  <Teleport to="body">
    <LoginModal v-if="showLogin" @close="showLogin = false" />
  </Teleport>
</template>

<script>
// --- imports must be at top-level ---
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { v4 as uuidv4 } from 'uuid'
import Navbar from '@/components/Navbar.vue'
import LoginModal from '@/components/MyLogin.vue'

// Stable id for this session's nominator
const nominatorId = uuidv4()

export default {
  name: 'Nominator',
  components: { Navbar, LoginModal },

  setup() {
    const nobleTitle = ref(null)
    const nominationFormTitle = ref(null)
    const nominatorTitle = ref(null)
    const uploadButton = ref(null)

    const addHoverShine = (element) => {
      if (!element) return
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          textShadow: '0px 0px 35px rgba(255, 215, 0, 1)',
          duration: 0.5,
          ease: 'power1.out'
        })
      })
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          textShadow: '0px 0px 5px rgba(255, 215, 0, 0.4)',
          duration: 0.5,
          ease: 'power1.out'
        })
      })
    }

    onMounted(() => {
      ;[nobleTitle.value, nominationFormTitle.value, nominatorTitle.value].forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.7, y: -50 },
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out' }
        )
        addHoverShine(el)
      })

      if (uploadButton.value) addHoverShine(uploadButton.value)
    })

    return { nobleTitle, nominationFormTitle, nominatorTitle, uploadButton }
  },

  data() {
    return {
      showLogin: false,
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
      selectedFileName: ''
    }
  },

  methods: {
    slugify(name) {
      return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // non-alphanumerics → hyphens
        .replace(/^-+|-+$/g, '')
    },

    async submitForm() {
      const adminId = '7ce1ff18-5c4a-4eb1-aa67-d7d7f5c10be8'
      const firstAndLast = `${this.firstName} ${this.lastName}`
      const slug = this.slugify(firstAndLast)

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
        slug,
        nominatorId: nominatorId,
        adminId: adminId
      }

      try {
        const response = await fetch('/api/nominee', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        if (!response.ok) {
          const errorDetails = await response.json().catch(() => ({}))
          throw new Error(`Error submitting form: ${errorDetails.message || response.statusText}`)
        }

        const result = await response.json()
        console.log('Form submitted successfully:', result)
        alert('Form submitted successfully!')
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error submitting the form. Please check the console for details.')
      }
    },

    async handlePhotoUpload(event) {
      try {
        const file = event.target.files?.[0]
        this.selectedFileName = file ? file.name : 'No file chosen'
        if (!file) return

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

    if (this.$route?.query?.form) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(this.$route.query.form))
        console.log('datos', decodedData.occupation)
      } catch (e) {
        console.warn('Invalid form query payload')
      }
    }
  }
}
</script>

<style scoped>
/* General Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }

.blurred { filter: blur(8px); pointer-events: none; user-select: none; transform: translateZ(0); }

html, body { width: 100%; height: 100%; background-color: #222121; color: #d4af37; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; }

.metallic-title { font-family: 'Libre Caslon Display', serif; font-size: 70px; text-align: center; position: relative; background: linear-gradient(120deg, #fff4b0 0%, #f0c75e 20%, #d4af37 40%, #f8e27d 60%, #d4af37 80%, #fff4b0 100%); background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 0 0 5px rgba(212, 175, 55, 0.4), 0 0 10px rgba(212, 175, 55, 0.2), 0 0 15px rgba(255, 215, 0, 0.1); overflow: hidden; }
.metallic-title::before { content: 'Noble Award'; position: absolute; top: 100%; left: 0; width: 100%; text-align: center; font-size: 70px; transform: scaleY(-1); opacity: 0.1; filter: blur(2px); background: linear-gradient(to bottom, rgba(255, 215, 0, 0.3), transparent); -webkit-background-clip: text; background-clip: text; color: transparent; }

.metallic-text { font-family: 'Libre Caslon Display', serif; font-size: 30px; text-align: center; background: linear-gradient(120deg, #fff4b0 0%, #f0c75e 20%, #d4af37 40%, #f8e27d 60%, #d4af37 80%, #fff4b0 100%); background-clip: text; -webkit-background-clip: text; color: transparent; position: relative; text-shadow: 0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.4), 0 0 20px rgba(255, 215, 0, 0.3); animation: metallicShine 3s infinite linear; }

input, textarea { width: 100%; padding: 10px; margin-bottom: 15px; border: 2px solid #5b5b5a; border-radius: 8px; background-color: #434242; color: #000; font-size: 16px; }

button[type="submit"] { width: 100%; padding: 12px; background-color: #4e4e4d; color: #d4af37; font-size: 18px; font-weight: bold; font-family: 'Libre Caslon Display', serif; border: none; border-radius: 20px; cursor: pointer; margin-top: 10px; transition: background-color 0.3s ease; }
button[type="submit"]:hover { background-color: #898989; }

/* === Custom File Upload === */
.upload-section { margin: 20px 0; text-align: center; }
.custom-upload { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
.hidden-file { display: none; }
.upload-btn { background-color: #3a3a3a; color: #d4af37; font-family: 'Libre Caslon Display', serif; border: 2px solid #d4af37; padding: 10px 20px; border-radius: 10px; cursor: pointer; transition: all 0.3s ease; }
.upload-btn:hover { background-color: #d4af37; color: #3a3a3a; border-color: #3a3a3a; }
.file-name { font-size: 16px; color: #d4af37; font-family: 'Libre Caslon Display', serif; }
</style>
