<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
export default {
    name: 'RegisterForm',
    setup() {
        const userStore = useUserStore();
        return {
            registerForm: {
                username: '',
                email: '',
                password: '',
            },
            apiUrl: 'https://ivm108.informatik.htw-dresden.de/ewa/g20/api/v1auth/',
            userStore,
        };
    },
    methods: {
        async register() {
            try {
                console.log(`${this.apiUrl}register.php`);
                const response = await axios.post(`${this.apiUrl}register.php`, this.registerForm, {
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
                this.registerForm = {
                    username: '',
                    email: '',
                    password: '',
                };
            } catch (error) {
                console.error('Error during registration:', error);
            }
        },
    },
}
</script>

<template>
    <form class="row align-items-center" @submit.prevent="register">
        <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Email</label>
            <input v-model="registerForm.email" required type="email" class="form-control" id="inputEmail4">
        </div>
        <div class="col-md-6">
            <label for="inputUsername4" class="form-label">Username</label>
            <input v-model="registerForm.username" required type="username" class="form-control" id="inputUsername4">
        </div>
        <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Password</label>
            <input v-model="registerForm.password" required type="password" class="form-control" id="inputPassword4">
        </div>
        <div class="col-12 p-3">
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
</template> 