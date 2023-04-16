import { defineStore } from 'pinia';
export const useConfigStore = defineStore('config', {
  state: () => ({
    integrationUrl: "http://localhost:3000/client",
    socketConfiguration: {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        reconnectionDelayMax: 10000,
      },
    offlineMode: true,
  }),
  actions: {
    updateOfflineMode(value: boolean) {
        this.offlineMode = value;
    }
  },
});

