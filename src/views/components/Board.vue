<template>
    <v-container>
        <!-- 게시글 목록, 각 게시글은 한 줄씩 차지 -->
        <v-row>
            <v-col cols="12" v-for="post in posts" :key="post.id">
                <v-card @click="goToPostDetails(post.id)" class="mb-2">
                    <v-card-title>{{ post.title }}</v-card-title>
                    <v-card-subtitle>{{ post.author }}</v-card-subtitle>
                    <v-card-text>
                        {{ post.excerpt }}
                        <span class="float-right">Rewards: {{ post.reward }} coins</span>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- 새 게시글 작성 버튼 -->
        <v-btn fab fixed bottom right color="primary" @click="goToCreatePost">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const posts = [
    { id: 1, title: 'Post 1', author: 'Author 1', excerpt: 'This is an excerpt of the post.', reward: 150 },
    { id: 2, title: 'Post 2', author: 'Author 2', excerpt: 'This is another excerpt of a post.', reward: 100 },
    // Additional posts...
];

const router = useRouter();

function goToPostDetails(id) {
    router.push({ name: 'PostDetails', params: { id } });
}

function goToCreatePost() {
    router.push({ name: 'PostCreate' });
}
</script>