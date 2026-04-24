<template>
	<form class="overlay" @click.self="onBackdropClick" @submit.prevent="sendMagicLink">
		<div class="login-box">
			<h2>Login</h2>
			<input v-model="email" type="email" placeholder="Email" required />
			<button type="submit" :disabled="loading">{{ loading ? 'Sending...' : 'Send login link' }}</button>
			<button type="button" class="login-cancel" @click="close">Cancel</button>
			<p v-if="msg">{{ msg }}</p>
		</div>
	</form>
</template>

<script setup lang="ts">

const props = withDefaults(
	defineProps<{
		allowBackdropClose?: boolean;
	}>(),
	{ allowBackdropClose: true },
);

const emit = defineEmits<(e: "close" | "submitted") => void>();

const email = ref("");
const loading = ref(false);
const msg = ref("");

function onBackdropClick() {
	if (props.allowBackdropClose) close();
}

const sendMagicLink = async () => {
	try {
		loading.value = true
		msg.value = ''
		await $fetch('/api/auth/magic-link', {
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

function close() {
	navigateTo('/')
	emit("close");
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

.login-box button[type="submit"] {
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

.login-cancel {
	width: 100%;
	margin-top: 0.75rem;
	padding: 0.5rem;
	border-radius: 8px;
	border: 1px solid #444;
	background: transparent;
	color: #aaa;
	font-size: 0.875rem;
	cursor: pointer;
}

.login-cancel:hover {
	color: #fff;
	border-color: #666;
}
</style>