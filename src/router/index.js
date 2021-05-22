import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from '@/views/coaches/CoachesList';
import CoachDetail from '@/views/coaches/CoachDetail';
import ContactCoach from '@/views/requests/ContactCoach';
import CoachRegistration from '@/views/coaches/CoachRegistration';
import RequestsReceived from '@/views/requests/RequestsReceived';
import NotFound from '@/views/NotFound';

const routes = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', components: CoachesList },
  {
    path: '/coaches/:id',
    components: CoachDetail,
    children: [{ path: 'contact', components: ContactCoach }],
  },
  { path: '/register', components: CoachRegistration },
  { path: '/request', components: RequestsReceived },
  { path: '/:notFound(.*)', components: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
