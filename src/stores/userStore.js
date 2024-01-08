import { defineStore } from 'pinia'
export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    userID: JSON.parse(localStorage.getItem('user'))?.id || null,
    username: JSON.parse(localStorage.getItem('user'))?.username || null,
    email: JSON.parse(localStorage.getItem('user'))?.email || null,
    token: localStorage.getItem('user-token') || null,
    isLoggedIn: localStorage.getItem('user-token') ? true : false,
  }),
  actions: {
    setUserID(userID) {
      this.userID = userID
    },
    setUsername(username) {
      this.username = username
    },
    setEmail(email) {
      this.email = email
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('user-token', token);
    },
    setUser(user) {
      this.userID = user.id;
      this.username = user.username;
      this.email = user.email;
      localStorage.setItem('user', JSON.stringify(user));
    },
    
    resetUser() {
      this.userID = null;
      this.username = null;
      this.email = null;
      localStorage.removeItem('user');
    },
    login(token, user) {
      this.token = token;
      this.setUser(user);
      localStorage.setItem('user-token', token);
      this.isLoggedIn = true;
      // set the token to expire after 3600 seconds
      setTimeout(() => {
        this.logout();
      }, 3600 * 1000);
    },
    logout() {
      this.resetUser();
      localStorage.removeItem('user-token');
      this.isLoggedIn = false;
    },
  },
  getters: {
    // isLoggedIn: state => !!state.token,
    getUserID() {
      return this.userID
    },
    getUsername() {
      return this.username
    },
    getEmail() {
      return this.email
    },
    getToken() {
      return this.token
    },
    getUser() {
      return {
        userID: this.userID,
        username: this.username,
        email: this.email,
        token: this.token,
      }
    },
  },
})