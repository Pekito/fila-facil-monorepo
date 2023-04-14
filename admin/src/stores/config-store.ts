import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";
export const useConfigStore = defineStore('config', {
  state: () => ({
    integrationUrl: useLocalStorage("config.integrationUrl",""),
    offlineMode: useLocalStorage("config.offlineMode", false),
    isFirstSession: useLocalStorage("config.isFirstSession", true)
  }),
  actions: {
    setIntegrationUrl(integrationUrl: string) {
      if (this.isFirstSession) this.isFirstSession = false; 
      this.integrationUrl = integrationUrl;
      this.offlineMode = false;
    },
    setOfflineMode() {
      if (this.isFirstSession) this.isFirstSession = false; 
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
