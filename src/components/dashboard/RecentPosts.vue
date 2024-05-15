<template>
    <v-card class="ma-5">
        <v-card-title class="headline">Recent 10 Posts</v-card-title>
        <v-card-text>
            <v-list dense>
                <v-list-item v-for="post in recentPosts" :key="post.id">
                    <v-list-item-content>
                        <v-list-item-title>{{ post.title }}</v-list-item-title>

                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup>
const recentPosts = [
    { id: 1, title: 'Exploring the new Vue DevTools', date: '2024-05-10' },
    { id: 2, title: 'Tips for Efficient Component Design in Vue', date: '2024-05-07' },
    { id: 3, title: 'How to Build Scalable Apps with Vue', date: '2024-05-05' },
    { id: 4, title: 'Integrating Vue with Headless CMSs', date: '2024-05-01' },
    { id: 5, title: 'Using Vue 3 Teleport Feature', date: '2024-04-28' },
    { id: 6, title: 'Dynamic Forms with Vue', date: '2024-04-25' },
    { id: 7, title: 'Vue Router: Beyond Basics', date: '2024-04-22' },
    { id: 8, title: 'Server-Side Rendering with Vue and Nuxt', date: '2024-04-19' },
    { id: 9, title: 'Building Real-time Apps with Vue and Socket.io', date: '2024-04-16' },
    { id: 10, title: 'Vue 3 Performance Optimization Techniques', date: '2024-04-13' }
];
</script>