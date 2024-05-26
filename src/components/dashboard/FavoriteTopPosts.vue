<template>
    <v-card class="ma-5">
        <v-card-title class="headline">Favorite Top 10 Posts</v-card-title>
        <v-card-text>
            <v-list dense>
                <v-list-item v-for="post in favoritePosts" :key="post.id">
                    <v-list-item-content>
                        <v-list-item-title>{{ post.title }}</v-list-item-title>
                        <v-list-item-subtitle>
                            작성자: {{ post.user }} - Favorites: {{ post.favoriteCount }} - Views: {{ post.viewCount }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/axios';

const favoritePosts = ref([]);

const fetchFavoritePosts = async () => {
    try {
        const response = await axios.get('/api/posts/favorite/top10');
        favoritePosts.value = response.data;
    } catch (error) {
        console.error('Error fetching favorite posts:', error);
    }
};

onMounted(fetchFavoritePosts);
</script>


