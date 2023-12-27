<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default {
    name: 'UserAuth',
    data() {
        return {
            user: null,
            token: null,
            registerForm: {
                username: '',
                email: '',
                password: '',
            },
            loginForm: {
                email: '',
                password: '',
            },
            apiUrl: 'http://localhost/v1auth/'
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
                    console.log("Register Received:  " + data.token);
                    this.token = data.token;
                    this.setUserFromToken();
                    const userStore = useUserStore()
                    userStore.setUser(data.userID, data.username, data.email, data.token)
                    console.log("User from store: ", userStore.getUser);
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
        async login() {
            try {
                const response = await axios.post(`${this.apiUrl}login.php`, this.loginForm, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data;
                if (data.token) {
                    console.log("Login Received:  " + data.token);
                    this.token = data.token;
                    this.setUserFromToken();
                    const userStore = useUserStore()
                    userStore.setUser(data.userID, data.username, data.email, data.token)
                    console.log("User from store: ", userStore.getUser);
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
        logout() {
            this.token = null;
            this.user = null;
            const userStore = useUserStore()
            userStore.resetUser()
        },
        setUserFromToken() {
            if (this.token) {
                const decodedToken = this.parseJwt(this.token);
                this.user = decodedToken;
            }
        },
        parseJwt(token) {
            console.log(token);
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            console.log(jsonPayload);
            return JSON.parse(jsonPayload);
        },
    },
    created() {
        this.setUserFromToken();
    },
};
</script>

<template>
    <div>
        <h1>Vue.js Authentication</h1>

        <!-- Benutzerinformationen -->
        <div v-if="user">
            <p>Welcome, {{ user.username }}!</p>
            <button @click="logout">Logout</button>
        </div>

        <!-- Registrierungsformular -->
        <div v-else>
            <h2>Register</h2>
            <form @submit.prevent="register">
                <label>Username: <input v-model="registerForm.username" type="text" required></label><br>
                <label>Email: <input v-model="registerForm.email" type="email" required></label><br>
                <label>Password: <input v-model="registerForm.password" type="password" required></label><br>
                <button type="submit">Register</button>
            </form>

            <!-- Loginformular -->
            <h2>Login</h2>
            <form @submit.prevent="login">
                <label>Email: <input v-model="loginForm.email" type="email" required></label><br>
                <label>Password: <input v-model="loginForm.password" type="password" required></label><br>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>