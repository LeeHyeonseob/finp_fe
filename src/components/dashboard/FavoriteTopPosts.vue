<template>
    <v-card class="ma-5">
        <v-card-title class="headline">Favorite Top 10 Posts</v-card-title>
        <v-card-text>
            <v-list dense>
                <v-list-item v-for="post in favoritePosts" :key="post.id">
                    <v-list-item-content>
                        <v-list-item-title>{{ post.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ post.views }} views</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/axios'; // axios 인스턴스 임포트

interface Post {
    id: number;
    title: string;
    views: number;
}

const favoritePosts = ref<Post[]>([]);

const fetchFavoritePosts = async () => {
    try {
        const response = await axios.get('/posts/top-favorites');
        favoritePosts.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchFavoritePosts);
</script>


