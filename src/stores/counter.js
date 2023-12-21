import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const username = ref('') // add username to store
  const email = ref('') // add email to store

  function increment() {
    count.value++
  }

  function setUsername(newUsername) {
    username.value = newUsername
  }

  function setEmail(newEmail) {
    email.value = newEmail
  }

  return { count, doubleCount, increment, username, email, setUsername, setEmail }
})