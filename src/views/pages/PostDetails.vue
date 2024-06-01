<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ post.title }}</h1>
                <br />
                <h3>작성자: {{ post.username }}</h3>
                <br />
                <p>{{ post.content }}</p>
                <br />
                <p>Reward: {{ post.reward }}</p>
                <br />
                <v-btn @click="toggleFavorite" :color="isFavorite ? 'red' : 'grey'">
                    <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                    {{ isFavorite ? 'Unfavorite' : 'Favorite' }}
                </v-btn>
                <br /><br /><br /><br />
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
import { useStore } from 'vuex';

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
    username: string;
    content: string;
    reward: number;
    views: number;
    favoritesCount: number;
    createdAt: string;
    updatedAt: string;
    isFavorite: boolean; // 추가: 즐겨찾기 상태를 포함
}

const route = useRoute();
const store = useStore();
const postId = route.params.id as string;

const post = ref<Post>({
    id: 0,
    title: '',
    username: '',
    content: '',
    reward: 0,
    views: 0,
    favoritesCount: 0,
    createdAt: '',
    updatedAt: '',
    isFavorite: false // 초기값 설정
});

const comments = ref<Comment[]>([]);
const newComment = ref('');
const valid = ref(false);
const isFavorite = ref(false);

const rules = {
    required: (value: string) => !!value || 'Required.'
};

const fetchPostDetails = async () => {
    try {
        const token = store.state.token;
        console.log('Fetching post details for postId:', postId);
        const response = await axios.get(`/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Post details fetched:', response.data);
        post.value = response.data;
        isFavorite.value = response.data.isFavorite; // 초기 즐겨찾기 상태 설정
    } catch (error) {
        console.error('Error fetching post details:', error);
    }
};

const fetchComments = async () => {
    try {
        const token = store.state.token;
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
        const username = store.state.username || 'anonymous';
        const token = store.state.token;
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

const toggleFavorite = async () => {
    try {
        const token = store.state.token;
        const username = localStorage.getItem('username');

        if (!username) {
            console.error('Username is null or undefined.');
            return;
        }

        if (isFavorite.value) {
            await axios.delete(`/favorites`, {
                data: { username, postId: post.value.id },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            isFavorite.value = false;
            post.value.favoritesCount--;
        } else {
            await axios.post(`/favorites`, {
                username,
                postId: post.value.id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            isFavorite.value = true;
            post.value.favoritesCount++;
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
};

const likeComment = async (commentId: number) => {
    try {
        const token = store.state.token;
        const username = localStorage.getItem('username');
        console.log(`Liking comment with id ${commentId} by user ${username}`);

        if (!username) {
            console.error('Username is null. Please ensure the user is logged in and the username is stored in localStorage.');
            return;
        }

        const response = await axios.post(`/like-comments/${commentId}`, {
            username: username
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
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
        const token = store.state.token;
        const fromUsername = store.state.username || localStorage.getItem('username');

        if (!fromUsername) {
            console.error('Username is null. Please ensure the user is logged in and the usernames are available.');
            return;
        }

        console.log(`Rewarding comment with id ${commentId} from user ${fromUsername}`);

        const response = await axios.post(`/comments/${commentId}/reward`, {
            fromUsername: fromUsername
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Comment rewarded:', response.data);
    } catch (error) {
        console.error('Error rewarding comment:', error);
    }
};

onMounted(() => {
    fetchPostDetails();
    fetchComments();
});
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
