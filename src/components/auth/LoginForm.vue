<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">이름</v-label>
            <v-text-field v-model="username" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">비밀번호</v-label>
            <v-text-field v-model="password" variant="outlined" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <div class="d-flex flex-wrap align-center ml-n2">
                <div class="ml-sm-auto">
                    <RouterLink to="/" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                        비밀번호를 잊으셨나요?
                    </RouterLink>
                </div>
            </div>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn @click="login" color="primary" size="large" block flat>로그인</v-btn>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const username = ref('');
const password = ref('');
const rememberMe = ref(true);
const router = useRouter();
const store = useStore();

const login = async () => {
    try {
        const response = await axios.post('/auth/login', {
            username: username.value,
            password: password.value,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            store.commit('SET_TOKEN', response.data.token);
            router.push('/main/dashboard'); // 로그인 성공 시 대시보드로 리디렉션
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error(error);
        alert('Login failed');
    }
};
</script>
