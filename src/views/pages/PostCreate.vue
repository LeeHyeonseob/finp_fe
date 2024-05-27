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
                    <v-text-field
                        v-model="post.reward"
                        label="Reward"
                        type="number"
                        :rules="[rules.required, rules.number]"
                        required
                    ></v-text-field>
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
import axios from '@/axios';
import { useRouter } from 'vue-router';

const valid = ref(false);
const post = ref({
    title: '',
    content: '',
    reward: 0
});
const router = useRouter();

const rules = {
    required: value => !!value || 'Required.',
    number: value => !isNaN(value) || 'Must be a number.'
};

const submitPost = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/posts', post.value, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Post submitted:', response.data);
        router.push(`/main/post/${response.data.id}`);
    } catch (error) {
        console.error('Error submitting post:', error);
    }
};

const resetForm = () => {
    post.value = { title: '', content: '', reward: 0 };
};
</script>
