<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore';
// import { watch } from 'vue';
const store = useUserStore();
// computed property to check if the user is an admin
const isAdmin = computed(() => store.getUsername === 'admin');
const isLoggedIn = computed(() => store.isLoggedIn);
</script>

<template>
  <header>
    <div class="container">
      <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">Bookshop</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink class="nav-link active" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about">About</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" v-if="isAdmin" to="/admin">Admin View</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" v-if="!isLoggedIn" to="/login">Login</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" v-if="!isLoggedIn" to="/register">Register</RouterLink>
              </li>
              <li class="nav-item">
                <button class="btn btn-primary" v-if="isLoggedIn" @click="store.logout">Logout</button>
              </li>
              <li class="nav-item">
                <p v-if="store.isLoggedIn">Willkomen, {{ store.getUsername }}!</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  </header>

  <div class="body">
    <RouterView />
  </div>
</template>

<style scoped>
.body {
  margin-top: 7vh;
}
</style>
