import { defineStore } from 'pinia';
export const useConfigStore = defineStore('config', {
  state: () => ({
    integrationUrl: process.env.SERVER_CLIENT_URL,
    socketConfiguration: {
      reconnection: process.env.SOCKET_RECCONECTION || true,
      reconnectionAttempts: process.env.SOCKET_RECCONECTION_ATTEMPTS || 3,
      reconnectionDelay: process.env.SOCKET_RECCONECTION_DELAY || 2500,
      reconnectionDelayMax: process.env.SOCKET_RECCONECTION_DELAY_MAX || 10000,
    },
    offlineMode: true,
  }),
  actions: {
    updateOfflineMode(value: boolean) {
        this.offlineMode = value;
    }
  },
});

