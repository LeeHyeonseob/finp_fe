<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/axios';
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
        router.push('/auth/login');
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">이름</v-label>
            <v-text-field v-model="username" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">이메일</v-label>
            <v-text-field v-model="email" variant="outlined" type="email" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">비밀번호</v-label>
            <v-text-field v-model="password" variant="outlined" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-btn @click="register" color="primary" size="large" block flat>회원가입하기</v-btn>
        </v-col>
    </v-row>
</template>
