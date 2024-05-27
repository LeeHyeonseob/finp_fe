<template>
    <v-container>
        <v-list>
            <v-list-item v-for="post in posts" :key="post.id" @click="goToPostDetails(post.id)">
                <v-list-item-content>
                    <v-list-item-title>{{ post.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ post.createdAt }}</v-list-item-subtitle>
                    <br>
                    <br>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-pagination v-model="page" :length="totalPages" @input="fetchPosts"></v-pagination>
        <v-btn
            color="primary"
            @click="goToCreatePost"
            style="position: fixed; bottom: 16px; right: 16px;"
        >
            Create New Post
        </v-btn>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from '@/axios'; // axios 인스턴스 임포트
import { useRouter } from 'vue-router';

interface Post {
    id: number;
    title: string;
    createdAt: string;
}

const posts = ref<Post[]>([]);
const page = ref(1);
const totalPages = ref(0);
const router = useRouter();

const fetchPosts = async () => {
    try {
        const response = await axios.get('/posts', {
            params: { page: page.value - 1 } // Spring Data JPA uses 0-based page index
        });
        posts.value = response.data;
        totalPages.value = Math.ceil(response.headers['x-total-count'] / 10); // Assuming 10 posts per page
    } catch (error) {
        console.error(error);
    }
};

const goToPostDetails = (postId: number) => {
    router.push(`/main/post/${postId}`);
};

const goToCreatePost = () => {
    router.push('/main/create');
};

onMounted(fetchPosts);
watch(page, fetchPosts);
</script>
