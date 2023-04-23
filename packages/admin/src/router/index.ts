import { route } from 'quasar/wrappers';
import SocketClient from '@/composables/SocketClient';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useConfigStore } from '@/stores/config-store';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  const configStore = useConfigStore();
  if(configStore.hasIntegrationUrl && SocketClient.connectionState === 'offline') SocketClient.connect();
  Router.beforeEach((to, from, next) => {
    if(!configStore.ableToUse && to.path !== '/config') return next('/config');
    return next();
  })
  return Router;
});
