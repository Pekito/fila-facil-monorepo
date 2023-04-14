import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";
export const useConfigStore = defineStore('config', {
  state: () => ({
    integrationUrl: useLocalStorage("config.integrationUrl",""),
    offlineMode: useLocalStorage("config.offlineMode", false)
  }),
  actions: {
    setIntegrationUrl(integrationUrl: string) {
      this.integrationUrl = integrationUrl;
    },
    setOfflineMode(value: boolean) {
      this.offlineMode = value;
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
