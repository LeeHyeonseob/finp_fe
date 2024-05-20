<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-card class="mb-4">
                <v-card-title class="headline">Create New Post</v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="post.title"
                        label="Post Title"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="post.content"
                        label="Content"
                        :rules="[rules.required]"
                        required
                    ></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" :disabled="!valid" @click="submitPost">Submit</v-btn>
                    <v-btn color="error" @click="resetForm">Reset</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/axios'; // axios 인스턴스 임포트
import { useRouter } from 'vue-router';

const valid = ref(false);
const post = ref({
    title: '',
    content: ''
});
const router = useRouter();

const rules = {
    required: value => !!value || 'Required.'
};

const submitPost = async () => {
    try {
        const response = await axios.post('/posts', {
            title: post.value.title,
            content: post.value.content
        });
        console.log('Post submitted:', response.data);
        router.push(`/posts/${response.data.id}`); // 게시글 상세보기 페이지로 리다이렉트
    } catch (error) {
        console.error(error);
    }
};

const resetForm = () => {
    post.value = { title: '', content: '' };
};
</script>