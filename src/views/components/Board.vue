<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from '@/axios'; // axios 인스턴스 임포트
import { useRouter } from 'vue-router';

const posts = ref([]);
const page = ref(1);
const totalPages = ref(0);
const router = useRouter();

const fetchPosts = async () => {
    try {
        const response = await axios.get('/posts', {
            params: { page: page.value - 1 } // Spring Data JPA uses 0-based page index
        });
        posts.value = response.data.content;
        totalPages.value = response.data.totalPages;
    } catch (error) {
        console.error(error);
    }
};

const goToPostDetails = (postId: number) => {
    router.push(`/posts/${postId}`);
};

onMounted(fetchPosts);
watch(page, fetchPosts);
</script>

<template>
    <v-container>
        <v-list>
            <v-list-item v-for="post in posts" :key="post.id" @click="goToPostDetails(post.id)">
                <v-list-item-content>
                    <v-list-item-title>{{ post.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ post.createdAt }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-pagination v-model="page" :length="totalPages" @input="fetchPosts"></v-pagination>
    </v-container>
</template>