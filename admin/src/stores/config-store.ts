import { defineStore } from 'pinia';
export const useConfigStore = defineStore('config', {
  state: () => ({
    integrationUrl: "",
    offlineMode: false
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
