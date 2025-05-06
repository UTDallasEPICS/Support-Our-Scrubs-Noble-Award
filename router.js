import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/index.vue';
import ProfilePage from '@/pages/profile/index.vue';
import Nominator from '@/pages/nominator/index.vue';
import roster from '@/pages/roster/index.vue';
import donate from '@/pages/donate/index.vue';
import contact from '@/pages/contact/index.vue';

const routes = [
  { path: '/', name: 'NoblesGrid', component: HomePage },
  { path: '/profile-page', name: 'ProfilePage', component: ProfilePage },
  { path: '/nominator', name: 'Nominator', component: Nominator },
  { path: '/roster', name: 'Roster', component: roster }
  { path: '/contact', name: 'Contact', component: contact }


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
