<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { setUserFromToken } from '@/utils/auth.js';
import LoginForm from '@/components/LoginForm.vue';
export default {
    name: 'UserAuth',
    components: {
        LoginForm,
    },
    setup() {
        const userStore = useUserStore();
        return {
            registerForm: {
                username: '',
                email: '',
                password: '',
            },
            loginForm: {
                email: '',
                password: '',
            },
            apiUrl: 'http://localhost/v1auth/',
            userStore,
        };
    },
    data() {
        return {
            user: null,
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
                    let user = {
                        id: data.userID,
                        username: data.username,
                        email: data.email,
                    }
                    this.userStore.login(data.token, user);
                    setUserFromToken(this);
                    console.log("User from store: ", this.userStore.getUser);
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
        // async login() {
        //     try {
        //         const response = await axios.post(`${this.apiUrl}login.php`, this.loginForm, {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         });

        //         const data = response.data;
        //         if (data.token) {
        //             console.log("Login Received:  " + data.token);
        //             let user = {
        //                 id: data.userID,
        //                 username: data.username,
        //                 email: data.email,
        //             }
        //             this.userStore.login(data.token, user);
        //             setUserFromToken(this);
        //         } else if (data.error) {
        //             console.error('Error from PHP:', data.error);
        //         }
        //         this.loginForm = {
        //             email: '',
        //             password: '',
        //         };
        //     } catch (error) {
        //         console.error('Error during login:', error);
        //     }
        // },
        logout() {
            this.user = null;
            this.userStore.logout();
        },
    },
    created() {
        setUserFromToken(this);
    },
    // mounted() {
    //     // console.log(this.isLoggedIn)
    //     // this.isLoggedIn = this.userStore.isLoggedIn;
    //     // console.log(this.isLoggedIn)
    //     // console.log("User from store: ", this.userStore.getUser);
    // },

};
</script>

<template>
    <p class="d-inline-flex gap-1">
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
            aria-expanded="false" aria-controls="collapseExample">
            Button with data-bs-target
        </button>
    </p>
    <div class="collapse" id="collapseExample">
        <div class="card card-body">
            <div class="container">
                <h1>Vue.js Authentication</h1>

                <!-- Benutzerinformationen -->
                <div v-if="user">
                    <p>Welcome, {{ userStore.getUsername }}!</p>
                    <button @click="logout">Logout</button>
                </div>

                <!-- Registrierungsformular -->
                <div v-else>


                    <!-- Loginformular -->
                    <LoginForm />
                </div>
            </div>
        </div>
    </div>
</template>