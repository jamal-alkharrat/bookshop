<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { reactive } from 'vue';
export default {
    name: 'LoginForm',
    setup() {
        const userStore = useUserStore();
        const loginForm = reactive({
            email: '',
            password: '',
        })
        return {
            loginForm,
            apiUrl: 'https://ivm108.informatik.htw-dresden.de/ewa/g20/api/v1auth/',
            userStore,
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post(`${this.apiUrl}login.php`, this.loginForm, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data;
                if (data.token) {
                    let user = {
                        id: data.userID,
                        username: data.username,
                        email: data.email,
                    }
                    this.userStore.login(data.token, user);
                    // Redirect to home page
                    this.$router.push('/');
                } else if (data.error) {
                    console.error('Error from PHP:', data.error);
                }
                this.loginForm = {
                    email: '',
                    password: '',
                };
            } catch (error) {
                console.error('Error during login:', error);
            }
        },
    },
}
</script>

<template>
    <form class="row align-items-center" @submit.prevent="login">
        <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Email</label>
            <input v-model="loginForm.email" required type="email" class="form-control" id="inputEmail4">
        </div>
        <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Password</label>
            <input v-model="loginForm.password" required type="password" class="form-control" id="inputPassword4">
        </div>
        <div class="col-12 p-3">
            <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
    </form>
</template>

<style scoped></style>