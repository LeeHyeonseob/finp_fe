<template>
    <v-card class="ma-5">
        <v-card-title class="headline">Recent 10 Posts</v-card-title>
        <v-card-text>
            <v-list dense>
                <v-list-item v-for="post in recentPosts" :key="post.id">
                    <v-list-item-title>{{ post.title }}</v-list-item-title>
                    <v-list-item-subtitle>
                        작성자: {{ post.username }} - Views: {{ post.views }}
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/axios';

interface Post {
    id: number;
    title: string;
    username: string;
    views: number;
}

const recentPosts = ref<Post[]>([]);

const fetchRecentPosts = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/posts/recent', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        recentPosts.value = response.data;
    } catch (error) {
        console.error('Error fetching recent posts:', error);
    }
};

onMounted(fetchRecentPosts);
</script>
