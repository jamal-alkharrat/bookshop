import { defineStore } from 'pinia'
export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    userID: '',
    username: '',
    email: '',
    token: '',
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
    },
    setUser(userID, username, email, token) {
      this.userID = userID
      this.username = username
      this.email = email
      this.token = token
    },
    resetUser() {
      this.userID = ''
      this.username = ''
      this.email = ''
      this.token = ''
    },
  },
  getters: {
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