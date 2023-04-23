import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect() {
      return '/painel-cliente'
    },
    children: [
      { path: '/painel-cliente', component: () => import('pages/CustomerPage.vue') }],
  },
  {
    path: '/painel-loja',
    component: () => import('pages/StorePage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    redirect() {
      return '/painel-cliente';
    }
  },
];

export default routes;
