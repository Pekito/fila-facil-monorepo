import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";
export const useConfigStore = defineStore('config', {
  state: () => ({
    integrationUrl: useLocalStorage("config.integrationUrl", process.env.SERVER_ADMIN_URL || ""),
    offlineMode: useLocalStorage("config.offlineMode", false),
    isFirstSession: useLocalStorage("config.isFirstSession", true),
    overwriteServerQueue: useLocalStorage("config.overwriteServerQueue", false),
    socketConfiguration: {
        reconnection: process.env.SOCKET_RECCONECTION || true,
        reconnectionAttempts: process.env.SOCKET_RECCONECTION_ATTEMPTS || 3,
        reconnectionDelay: process.env.SOCKET_RECCONECTION_DELAY || 2500,
        reconnectionDelayMax: process.env.SOCKET_RECCONECTION_DELAY_MAX || 10000,
      }
  }),
  actions: {
    setIntegrationUrl(integrationUrl: string) {
      this.integrationUrl = integrationUrl;
      this.offlineMode = false;
    },
    setOfflineMode() {
      this.offlineMode = true;
      this.integrationUrl = "";
    }
  },
  getters: {
    hasIntegrationUrl: (state) => state.integrationUrl !== "",
    isOnOfflineMode: (state) => state.offlineMode,
    ableToUse() {
      return this.hasIntegrationUrl || this.isOnOfflineMode;
    }
  }
});

