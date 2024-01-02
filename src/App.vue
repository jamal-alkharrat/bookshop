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
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <!-- <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24"
              class="d-inline-block align-text-top"> -->
            <i class="bi bi-book"></i>
            Bookshop
          </a>
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
                <button class="btn btn-outline-light" v-if="isLoggedIn" @click="store.logout">Logout</button>
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

  <div class="footer bg-dark text-white py-3 mt-5">
    <div class="container">
      <div class="impressum">
        <h1 class="h4">Impressum</h1>
        <p><strong>Angaben gemäß § 5 TMG</strong></p>
        <p>Beispiel GmbH</p>
        <p>Beispiel-Straße, 99</p>
        <p>99999, Dresden</p>
        <p>+49 0199 999999</p>
        <p>+49 99999</p>
        <p>admin@admin.com</p>
        <p>bookshop.de</p>
        <p>vertreten durch die Geschäftsführer: Max Maximilian</p>
        <p>Registergericht der GmbH: Amtsgericht Dresden</p>
        <p>Registernummer der GmbH: HRB 99999</p>
        <p>USt- IDNr.: DE 999999999</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  margin-top: 7vh;
}
</style>
