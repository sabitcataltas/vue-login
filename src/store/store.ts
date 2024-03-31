import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {

  state: () => ({
    username: '',
    accessToken: '',

  }),
  getters: {
  },
  actions: {
    getAuthHeader() {
      if (this.accessToken) {
        return "Bearer " + this.accessToken;
      } else {
        return false;
      }
    },
    setUserToken(username: string, token: string) {
      this.accessToken = token;
      this.username = username;
    },
    getToken() {
      return this.accessToken;
    }
  }
});