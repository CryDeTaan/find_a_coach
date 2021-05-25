import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';
import CoachesList from '@/views/coaches/CoachesList';
import CoachDetail from '@/views/coaches/CoachDetail';
import ContactCoach from '@/views/requests/ContactCoach';
import CoachRegistration from '@/views/coaches/CoachRegistration';
import RequestsReceived from '@/views/requests/RequestsReceived';
import NotFound from '@/views/NotFound';
import UserAuth from '@/views/auth/UserAuth';

const routes = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: CoachesList },
  {
    path: '/coaches/:id',
    props: true,
    component: CoachDetail,
    children: [{ path: 'contact', component: ContactCoach }],
  },
  {
    path: '/register',
    component: CoachRegistration,
    meta: { requiresAuth: true },
  },
  {
    path: '/requests',
    component: RequestsReceived,
    meta: { requiresAuth: true },
  },
  { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
  { path: '/:notFound(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
