import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('') // add username to store
  const email = ref('') // add email to store

  function setUsername(newUsername) {
    username.value = newUsername
  }

  function setEmail(newEmail) {
    email.value = newEmail
  }

  // Getter
  function getUsername() {
    return username.value
  }
  function getEmail() {
    return email.value
  }

  return { username, email, setUsername, setEmail, getUsername, getEmail }
})