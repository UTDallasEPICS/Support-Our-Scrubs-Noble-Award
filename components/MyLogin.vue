 <template>
    <form class="overlay" @click.self="close" @submit.prevent="sendMagic">
        <div class="login-box">
          <h2>Login</h2>
          <input v-model="email" type="email" placeholder="Email" required/>
          <button :disabled="loading">{{ loading ? 'Sending...' : 'Send login link' }}</button>
          <p v-if="msg">{{ msg }}</p>
        </div>
      </form>
</template> 

<script setup lang="ts">
const emit = defineEmits<(e: 'close' | 'submitted') => void>()

const supabase = useSupabaseClient()
const route = useRoute()

const email = ref('')
const loading = ref(false)
const msg = ref('')

const next = computed(() => (route.query.next as string) || '/')

type CheckEmailResponse = { ok: true } | { ok: false; error: string }

async function sendMagic() {
try {
  loading.value = true
  msg.value = ''
  // 1️⃣ Check your own API before sending magic link
  const res = await $fetch('/api/checkEmail', {
    method: 'POST',
    body: { email: email.value },
  })
  console.log(res.ok)
  // Your API should respond like: { ok: true } if found, or { ok: false }
  if (!res.ok) {
    msg.value = 'Email not found. Please use the email you registered with.'
    loading.value = false
    return
  }

  // 2️⃣ Continue with Supabase magic link sign-in
  const redirect = `${window.location.origin}/`
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: { emailRedirectTo: redirect },
  })

  if (error) throw error

  msg.value = 'Check your email for the login link.'
  emit('submitted')
} catch (e: any) {
  msg.value = e?.message ?? 'Could not send link. Try again.'
} finally {
  loading.value = false
}
}
//   try { 
//     // Redirect back to where they intended to go
//     const redirect = `${window.location.origin}/`
//     const { error } = await supabase.auth.signInWithOtp({
//       email: email.value,
//       options: { emailRedirectTo: redirect }
//     })
//     if (error) throw error
//     msg.value = 'Check your email for the login link.'
//     emit('submitted')
//   } catch (e: any) {
//     msg.value = e?.message ?? 'Could not send link. Try again.'
//   } finally {
//     loading.value = false
//   }
//  }

function close() {
  emit('close')
}
</script>

<style>
.overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      display: grid;
      place-items: center;
      z-index: 200;
      transition: opacity 0.3s ease;
    }
.login-box {
    background: #1c1c1c;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    color: white;
    width: 300px;
    text-align: center;
}
.login-box input {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #111;
  color: white;
}
.login-box button {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  background: #d4af37;
  color: #111;
  font-weight: 700;
  cursor: pointer;
}
</style>