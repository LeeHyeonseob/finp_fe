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

<script setup>
import { ref } from 'vue';
import { router } from '@/router';

const post = ref({
    title: "Example Post Title",
    date: "2024-05-14",
    content: "Detailed information about the topic could be described here.",
    author: "Author Name"
});

const comments = ref([
    { id: 1, author: "User1", text: "Very interesting post!" },
    { id: 2, author: "User2", text: "Thanks for the info." }
]);

const newComment = ref("");



function addComment() {
    if (newComment.value.trim()) {
        comments.value.push({
            id: comments.value.length + 1,
            author: "CurrentUser",
            text: newComment.value
        });
        newComment.value = "";
    }
}

function rewardAuthor() {
    console.log('Reward given to the author.');
    // Implement reward logic here, possibly involving API calls to handle transactions
}
</script>