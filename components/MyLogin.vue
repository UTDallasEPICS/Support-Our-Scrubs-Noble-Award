<template>
	<form class="overlay" @click.self="close" @submit.prevent="sendMagicLink">
		<div class="login-box">
			<h2>Login</h2>
			<input v-model="email" type="email" placeholder="Email" required />
			<button :disabled="loading">{{ loading ? 'Sending...' : 'Send login link' }}</button>
			<p v-if="msg">{{ msg }}</p>
		</div>
	</form>
</template>

<script setup lang="ts">


const emit = defineEmits<(e: 'close' | 'submitted') => void>()

const route = useRoute()

const email = ref('')
const loading = ref(false)
const msg = ref('')

const next = computed(() => (route.query.next as string) || '/')

// type CheckEmailResponse = | { ok: false; reason: 'not_found' | 'server_error' }
// 	| { ok: true; role: 'admin' | 'nominator' | 'nominee' }

// const roleState = useState<'admin' | 'nominator' | 'nominee' | null>('role', () => null)
// async function sendMagic() {

// 	try {
// 		loading.value = true
// 		msg.value = ''
// 		// 1️⃣ Check your own API before sending magic link
// 		const res = await $fetch<CheckEmailResponse>('/api/checkEmail', {
// 			method: 'POST',
// 			body: { email: email.value },
// 		})
// 		// Your API should respond like: { ok: true } if found, or { ok: false }
// 		if (!res.ok) {
// 			msg.value = 'Email not found. Please use the email you registered with.'
// 			roleState.value = null
// 			return
// 		}

// 		if (res.role === 'admin' || res.role === 'nominator' || res.role === 'nominee') {
// 			roleState.value = res.role
// 		} else {
// 			console.warn('Unexpected role from API:', res)
// 			roleState.value = null
// 		}

// 		// 2️⃣ Continue with Supabase magic link sign-in
// 		const redirect = `${window.location.origin}/`
// 		const { error } = await supabase.auth.signInWithOtp({
// 			email: email.value,
// 			options: { emailRedirectTo: redirect },
// 		})

// 		if (error) {
// 			console.error('Supabase OTP error:', error)
// 			throw error
// 		}

// 		// Normal success
// 		msg.value = 'Check your email for the login link.'
// 		emit('submitted')

// 	} catch (e: any) {
// 		console.warn('IGNORING ERROR:', e)
// 		msg.value = 'If this email exists, a login link has been sent.'
// 	} finally {
// 		loading.value = false
// 	}
// }

const sendMagicLink = async () => {
	try {
		loading.value = true
		msg.value = ''
		const response = await $fetch('/api/auth/magic-link', {
			method: 'POST',
			body: { email: email.value }
		})
		msg.value = 'Check your email for the login link.'
	} catch (error: any) {
		console.error(error.message) 
		msg.value = 'Failed to send login link.'
	} finally {
		loading.value = false
	}
}

const close = () => {
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