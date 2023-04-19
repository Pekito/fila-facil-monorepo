import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect(to) {
      return '/config';
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'painel', component: () => import('src/pages/dashboard/DashboardPage.vue') },
      { path: 'config', component: () => import('src/pages/config/ConfigurationPage.vue') }
  ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect() {
      return "/painel";
    }
  },
];

export default routes;
