import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', components: null },
  {
    path: '/coaches/:id',
    components: null,
    children: [{ path: 'contact', components: null }],
  },
  { path: '/register', components: null },
  { path: '/request', components: null },
  { path: '/:notFound(.*)', components: null },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
