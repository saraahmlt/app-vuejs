import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user, token) {
      this.user = user;
      this.token = token;
      this.isAuthenticated = true;
      this.persistState();
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.persistState();
    },
    persistState() {
      localStorage.setItem('authStore', JSON.stringify(this.$state));
    },
    initState() {
      const savedState = localStorage.getItem('authStore');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        Object.assign(this.$state, parsedState);
      }
    },
  },
  created() {
    this.initState();
  },
});