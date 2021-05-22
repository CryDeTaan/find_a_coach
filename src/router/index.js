import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from '@/views/coaches/CoachesList';
import CoachDetail from '@/views/coaches/CoachDetail';
import ContactCoach from '@/views/requests/ContactCoach';
import CoachRegistration from '@/views/coaches/CoachRegistration';
import RequestsReceived from '@/views/requests/RequestsReceived';
import NotFound from '@/views/NotFound';

const routes = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: CoachesList },
  {
    path: '/coaches/:id',
    component: CoachDetail,
    children: [{ path: 'contact', component: ContactCoach }],
  },
  { path: '/register', component: CoachRegistration },
  { path: '/request', component: RequestsReceived },
  { path: '/:notFound(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
