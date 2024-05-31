<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ post.title }}</h1>
                <br />
                <h3>작성자: {{ post.username }}</h3> <!-- 작성자의 username 추가 -->
                <br />
                <p>{{ post.content }}</p>
                <br />
                <p>Reward: {{ post.reward }}</p>
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
                        <template v-slot:default>
                            <v-list-item-title>{{ comment.username }}</v-list-item-title>
                            <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Likes: {{ comment.likeCount }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Created at: {{ comment.createdAt }}</v-list-item-subtitle>
                        </template>
                        <template v-slot:actions>
                            <v-btn icon @click="likeComment(comment.id)">
                                <v-icon>mdi-thumb-up</v-icon>
                            </v-btn>
                            <v-btn icon @click="rewardComment(comment.id)">
                                <v-icon>mdi-currency-usd</v-icon>
                            </v-btn>
                        </template>
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
    username: string; // 작성자의 username 필드 추가
    content: string;
    reward: number;
}

const route = useRoute();
const store = useStore();
const postId = route.params.id;

// Post 정보와 댓글 목록을 저장할 ref 변수
const post = ref<Post>({
    id: 0,
    title: '',
    username: '', // 초기값 설정
    content: '',
    reward: 0
});

const comments = ref<Comment[]>([]);
const newComment = ref('');
const valid = ref(false);

// 필수 입력 규칙 정의
const rules = {
    required: (value: string) => !!value || 'Required.'
};

// 포스트 상세 정보를 가져오는 함수
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
    } catch (error) {
        console.error('Error fetching post details:', error);
    }
};

// 댓글 목록을 가져오는 함수
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

// 댓글을 제출하는 함수
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

// 댓글에 좋아요를 추가하는 함수
const likeComment = async (commentId: number) => {
    try {
        const token = store.state.token;
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

// 댓글에 보상을 추가하는 함수
const rewardComment = async (commentId: number) => {
    try {
        const token = store.state.token;
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

// 컴포넌트가 마운트될 때 포스트 상세 정보와 댓글을 가져옴
onMounted(() => {
    fetchPostDetails();
    fetchComments();
});
</script>

<style scoped>
/* Add your styles here */
</style>
