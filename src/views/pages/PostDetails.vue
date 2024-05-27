<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ post.title }}</h1>
                <br/>
                <p>{{ post.content }}</p>
                <br/>
                <p>Reward: {{ post.reward }}</p>
                <br/><br/><br/><br/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-form v-model="valid">
                    <v-textarea
                        v-model="newComment"
                        :rules="[rules.required]"
                        label="Add a comment"
                        required
                    ></v-textarea>
                    <v-btn :disabled="!valid" @click="submitComment">Submit</v-btn>
                </v-form>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-list>
                    <v-list-item v-for="comment in comments" :key="comment.id">
                        <v-list-item-content>
                            <v-list-item-title>{{ comment.username }}</v-list-item-title>
                            <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Likes: {{ comment.likeCount }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Created at: {{ comment.createdAt }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="likeComment(comment.id)">
                                <v-icon>mdi-thumb-up</v-icon>
                            </v-btn>
                            <v-btn icon @click="rewardComment(comment.id)">
                                <v-icon>mdi-currency-usd</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import { useRoute } from 'vue-router';

interface Comment {
    id: number;
    username: string;
    content: string;
    createdAt: string;
    likeCount: number;
}

interface Post {
    id: number;
    title: string;
    content: string;
    reward: number;
}

const route = useRoute();
const postId = route.params.id;

const post = ref<Post>({
    id: 0,
    title: '',
    content: '',
    reward: 0
});

const comments = ref<Comment[]>([]);
const newComment = ref('');
const valid = ref(false);

const rules = {
    required: (value: string) => !!value || 'Required.'
};

const fetchPostDetails = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log('Fetching post details for postId:', postId);
        const response = await axios.get(`/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Post details fetched:', response.data);
        post.value = response.data;
    } catch (error) {
        console.error('Error fetching post details:', error);
    }
};

const fetchComments = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log('Fetching comments for postId:', postId);
        const response = await axios.get(`/comments/post/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Comments fetched:', response.data);
        comments.value = response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};

const submitComment = async () => {
    try {
        const username = localStorage.getItem('username') || 'anonymous';
        const token = localStorage.getItem('token');
        console.log('Submitting comment with username:', username);
        console.log('Post ID:', postId);
        console.log('Token:', token);
        const response = await axios.post('/comments', {
            content: newComment.value,
            postId: postId,
            username: username
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Comment submitted:', response.data);
        comments.value.push(response.data);
        newComment.value = '';
    } catch (error) {
        console.error('Error submitting comment:', error);
    }
};

const likeComment = async (commentId: number) => {
    try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
        const response = await axios.post(`/like-comments/${commentId}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                userId: userId
            }
        });
        console.log('Comment liked:', response.data);
        const comment = comments.value.find(comment => comment.id === commentId);
        if (comment) {
            comment.likeCount++;
        }
    } catch (error) {
        console.error('Error liking comment:', error);
    }
};

const rewardComment = async (commentId: number) => {
    try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
        const response = await axios.post(`/comments/${commentId}/reward`, { fromUserId: userId, amount: 10 }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Comment rewarded:', response.data);
        // 여기서는 보상 관련 로직을 추가할 수 있습니다.
    } catch (error) {
        console.error('Error rewarding comment:', error);
    }
};

onMounted(() => {
    fetchPostDetails();
    fetchComments();
});
</script>

