<template>
    <v-container>
        <v-card>
            <v-row v-if="userProfile">
                <v-col cols="12">
                    <h1>{{ userProfile.username }}의 프로필</h1>
                    <br />

                    <v-list-item-title>이메일: {{ userProfile.email }}</v-list-item-title>
                    <br />
                    <p>Coin Balance: {{ userProfile.coin.balance }}</p>
                    <br />
                    <p>계정 생성일: {{ userProfile.createdAt }}</p>
                    <p>최근 갱신일: {{ userProfile.updatedAt }}</p>
                    <v-btn @click="goToUpdateProfile">Update Profile</v-btn>
                </v-col>
            </v-row>
            <v-row v-if="userProfile">
                <v-col cols="12">
                    <h2>Posts</h2>
                    <v-list>
                        <v-list-item v-for="post in userProfile.posts" :key="post.id" @click="goToPostDetails(post.id)">
                            <v-list-item-content>
                                <v-list-item-title>{{ post.title }}</v-list-item-title>
                                <v-list-item-subtitle>{{ post.content }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-row v-if="userProfile">
                <v-col cols="12">
                    <h2>Favorites</h2>
                    <v-list>
                        <v-list-item v-for="post in userProfile.favorites" :key="post.id" @click="goToPostDetails(post.id)">
                            <v-list-item-content>
                                <v-list-item-title>{{ post.title }}</v-list-item-title>
                                <v-list-item-subtitle>{{ post.content }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12">
                    <p>Loading user profile...</p>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface Coin {
    id: number;
    balance: number;
}

interface Post {
    id: number;
    title: string;
    content: string;
    username: string;
    views: number;
    reward: number;
    favoritesCount: number;
    createdAt: string;
    updatedAt: string;
}

interface UserProfile {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    coin: Coin;
    posts: Post[];
    favorites: Post[];
}

const userProfile = ref<UserProfile | null>(null);
const store = useStore();
const router = useRouter();

const fetchUserProfile = async () => {
    try {
        const username = store.state.username || localStorage.getItem('username');
        const token = store.state.token || localStorage.getItem('token');

        if (!username) {
            throw new Error('Username is not available.');
        }

        const response = await axios.get(`/users/username/${username}/details`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        userProfile.value = response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

const goToUpdateProfile = () => {
    router.push({ name: 'UserProfileUpdate' });
};

const goToPostDetails = (postId: number) => {
    router.push({ name: 'PostDetails', params: { id: postId } });
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.v-container {
    max-width: 600px;
    margin: 0 auto;
}
.v-card {
    margin-top: 20px;
    padding: 20px;
}
.v-btn {
    margin-top: 20px;
}
</style>
