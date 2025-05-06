import { createApp } from 'vue'
import App from '@/pages/app.vue'
import router from './router.js';  // Ensure you are importing the router



const app = createApp(App);

app.use(router);
app.mount('#app');
