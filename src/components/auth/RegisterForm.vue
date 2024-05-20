<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/axios'; // axios 인스턴스 임포트
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
    try {
        const response = await axios.post('/auth/register', {
            username: username.value,
            email: email.value,
            password: password.value,
        });
        console.log(response.data);
        router.push('/auth/login'); // 회원가입 후 로그인 페이지로 리다이렉트
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Name</v-label>
            <v-text-field v-model="username" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Email Address</v-label>
            <v-text-field v-model="email" variant="outlined" type="email" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field v-model="password" variant="outlined" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-btn @click="register" color="primary" size="large" block flat>Sign up</v-btn>
        </v-col>
    </v-row>
</template>
