import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/main/router';
import Categories from '@/views/categories/router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/logout',
    name: 'logout',
  },
  {
    path: '/',
    name: 'home',
    redirect: { name: 'main' },
    meta: { requiresAuth: true },
    component: () => import('@/views/Home'),
    children: [
      ...Main,
      ...Categories,
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, _, next) => {
  store.commit('global/setLoading', true);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    store.dispatch('auth/detail')
      .then(() => next())
      .catch(() => next({ name: 'login' }));
  } else if (to.name === 'logout') {
    store.dispatch('auth/logout')
      .finally(() => next({ name: 'login' }));
  } else {
    next();
  }
});

router.afterEach(() => {
  store.commit('global/setLoading', false);
});

export default router;
