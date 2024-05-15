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

<script setup>
import { ref } from 'vue';

const valid = ref(false);
const post = ref({
    title: "",
    content: ""
});

const rules = {
    required: value => !!value || 'Required.'
};

const submitPost = () => {
    console.log('Post submitted:', post.value);
    // You might want to integrate an API call here
};

const resetForm = () => {
    post.value = { title: "", content: "" };
};
</script>