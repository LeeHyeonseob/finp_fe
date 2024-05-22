<template>
    <v-container>
        <v-card>
            <v-card-title class="headline">{{ post.title }}</v-card-title>
            <v-card-subtitle>{{ post.author }} - {{ post.date }}</v-card-subtitle>
            <v-card-text>{{ post.content }}</v-card-text>
        </v-card>

        <v-divider class="my-4"></v-divider>

        <!-- Comments Section -->
        <v-card class="mb-4">
            <v-card-title>Comments</v-card-title>
            <v-card-text>
                <v-list dense>
                    <v-list-item v-for="comment in comments" :key="comment.id">
                        <v-list-item-content>
                            <v-list-item-title>{{ comment.author }}</v-list-item-title>
                            <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="rewardAuthor">
                                <v-icon>mdi-gift</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-text-field
                    v-model="newComment"
                    label="Write a comment..."
                    solo
                    append-icon="mdi-send"
                    @click:append="addComment"
                    clearable
                ></v-text-field>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/axios'; // axios 인스턴스 임포트
import { useRoute } from 'vue-router';

interface Post {
    title: string;
    author: string;
    date: string;
    content: string;
}

interface Comment {
    id: number;
    author: string;
    text: string;
}

const post = ref<Post>({
    title: '',
    author: '',
    date: '',
    content: ''
});

const comments = ref<Comment[]>([]);
const newComment = ref('');
const route = useRoute();

const fetchPostDetails = async () => {
    try {
        const response = await axios.get(`/posts/${route.params.id}`);
        post.value = response.data;
        comments.value = response.data.comments; // assuming the API response contains comments
    } catch (error) {
        console.error(error);
    }
};

const addComment = async () => {
    if (newComment.value.trim()) {
        try {
            const response = await axios.post(`/posts/${route.params.id}/comments`, {
                text: newComment.value
            });
            comments.value.push(response.data);
            newComment.value = '';
        } catch (error) {
            console.error(error);
        }
    }
};

const rewardAuthor = async () => {
    console.log('Reward given to the author.');
    // Implement reward logic here, possibly involving API calls to handle transactions
};

onMounted(fetchPostDetails);
</script>

