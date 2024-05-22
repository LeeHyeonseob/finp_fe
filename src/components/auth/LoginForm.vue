<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const rememberMe = ref(true);
const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post('/auth/login', {
            username: username.value,
            password: password.value,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            router.push('/');
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error(error);
        alert('Login failed');
    }
};
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Username</v-label>
            <v-text-field v-model="username" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field v-model="password" variant="outlined" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <div class="d-flex flex-wrap align-center ml-n2">
                <div class="ml-sm-auto">
                    <RouterLink to="/" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                        Forgot Password?
                    </RouterLink>
                </div>
            </div>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn @click="login" color="primary" size="large" block flat>Sign in</v-btn>
        </v-col>
    </v-row>
</template>
