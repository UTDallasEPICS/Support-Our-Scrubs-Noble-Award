<template>
      <Navbar @open-login="showLogin = true" />
  <div :class="['page-background', { blurred: showLogin }]">
          <!-- Titles -->
    <p ref="nobleTitle" class="metallic-title">NOBLE AWARD</p>
    <p ref="nominationFormTitle" class="metallic-text">NOMINATION FORM</p>

    <!-- Form -->
    <form @submit.prevent="submitForm">
      <p ref="nominatorTitle" class="metallic-text">NOMINATOR</p>

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

    <Teleport to="body">
      <LoginModal v-if="showLogin" @close="showLogin = false" />
    </Teleport>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { v4 as uuidv4 } from 'uuid'
import Navbar from '@/components/Navbar.vue'
import LoginModal from '@/components/MyLogin.vue'

// stable id for this session's nominator (saved into data())
const generatedNominatorId = uuidv4()

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
      // form fields
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
      selectedFileName: '',
      // ids
      nominatorId: generatedNominatorId,
    }
  },

  methods: {
    slugify(name) {
      return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')   // non-alphanumerics → hyphens
        .replace(/^-+|-+$/g, '')
    },
    
    async submitForm() {
      // use the id from data(), do not shadow it
      const { nominatorId, adminId } = this

      const fullName = `${this.firstName || ''} ${this.lastName || ''}`.trim()
      const slug = this.slugify(fullName)

      // quick required-field guard
      const required = {
        nominatorName: this.nominatorName,
        nominatorEmail: this.nominatorEmail,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        address: this.address,
        placeOfWork: this.placeOfWork,
        occupation: this.occupation,
        email: this.email,
        description: this.description
      }
      for (const [k, v] of Object.entries(required)) {
        if (!v || String(v).trim() === '') {
          alert(`Please fill out: ${k}`)
          return
        }
      }

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
        nominatorId,
        adminId
      }

      try {
        const response = await fetch('/api/nominee', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        const payload = await response.json().catch(() => null)
        if (!response.ok) {
          const msg = (payload && (payload.message || payload.error)) || response.statusText
          throw new Error(msg || 'Submission failed')
        }

        console.log('Form submitted successfully:', payload)
        alert('Form submitted successfully!')
        // this.$router.push(`/nominee/${slug}`)
      } catch (error) {
        console.error('Error submitting form:', error)
        alert(`There was an error submitting the form: ${error.message}`)
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

        const service = import.meta?.env?.VITE_IMAGE_SERVICE
        if (!service) throw new Error('Image upload endpoint is not configured')

        const res = await fetch(service, { method: 'POST', body: subjectImage })
        const data = await res.json()

        if (!res.ok) {
          const msg = data?.error?.message || res.statusText
          throw new Error(msg || 'Upload failed')
        }

        this.photoURL = data.secure_url
      } catch (err) {
        console.error('Upload error:', err)
        alert(`Upload failed: ${err.message}`)
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
      } catch {
        console.warn('Invalid form query payload')
      }
    }
  }
};
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.page-background {
  background: radial-gradient(circle at top, rgb(78, 78, 78), rgb(33, 33, 33) 100%);
  min-height: 100vh;
  padding: 24px;
}

.blurred {
  filter: blur(8px);
  pointer-events: none;
  user-select: none;
  transform: translateZ(0);
}

/* Titles */
.metallic-title {
  font-size: 70px;
  text-align: center;
  position: relative;
  background: linear-gradient(120deg, #fff4b0 0%, #f0c75e 20%, #d4af37 40%, #f8e27d 60%, #d4af37 80%, #fff4b0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.4),
    0 0 10px rgba(212, 175, 55, 0.2),
    0 0 15px rgba(255, 215, 0, 0.1);
  overflow: hidden;
  margin-bottom: 10px;
}
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

.metallic-text {
  font-size: 30px;
  text-align: center;
  background: linear-gradient(120deg, #fff4b0 0%, #f0c75e 20%, #d4af37 40%, #f8e27d 60%, #d4af37 80%, #fff4b0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.5),
    0 0 10px rgba(212, 175, 55, 0.4),
    0 0 20px rgba(255, 215, 0, 0.3);
  animation: metallicShine 3s infinite linear;
  margin: 12px 0;
}

/* Inputs */
label { font-size: 18px; margin-bottom: 5px; color: #d4af37; display: block; }
input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #5b5b5a;
  border-radius: 8px;
  background-color: #434242;
  color: #000; /* consider #fff if you want light text on dark bg */
  font-size: 16px;
}

/* Buttons */
button {
  width: 100%;
  padding: 12px;
  background-color: #4e4e4d;
  color: #d4af37;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}
button:hover { background-color: #898989; }
button:focus { outline: none; }

/* Upload */
.upload-section { margin: 20px 0; text-align: center; }
.custom-upload { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
.hidden-file { display: none; }
.upload-btn {
  background-color: #3a3a3a;
  color: #d4af37;
  border: 2px solid #d4af37;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.upload-btn:hover {
  background-color: #d4af37;
  color: #3a3a3a;
  border-color: #3a3a3a;
}
.file-name { font-size: 16px; color: #d4af37;}

/* Optional keyframes used by .metallic-text */
@keyframes metallicShine {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
  100% { filter: brightness(1); }
}
</style>
