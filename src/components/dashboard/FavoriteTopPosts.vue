<template>
    <v-card class="ma-5">
        <v-card-title class="headline">Favorite Top 10 Posts</v-card-title>
        <v-card-text>
            <v-list dense>
                <v-list-item v-for="post in favoritePosts" :key="post.id">
                    <v-list-item-content>
                        <v-list-item-title>{{ post.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ post.views }} views</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup>
const favoritePosts = [
    { id: 1, title: 'How to Use Vue with TypeScript', views: 2548 },
    { id: 2, title: 'Advanced Vuetify Layouts', views: 2123 },
    { id: 3, title: 'Understanding Reactivity in Vue 3', views: 1567 },
    { id: 4, title: 'Building Mobile Apps with Vue and Cordova', views: 1489 },
    { id: 5, title: 'State Management with Vuex 4', views: 1367 },
    { id: 6, title: 'Unit Testing in Vue with Jest', views: 1230 },
    { id: 7, title: 'Creating Custom Directives in Vue', views: 1105 },
    { id: 8, title: 'Animation Techniques with Vue', views: 978 },
    { id: 9, title: 'Vue 3 Composition API - A Practical Guide', views: 865 },
    { id: 10, title: 'From Vue 2 to Vue 3: Migration Tips', views: 759 }
];
</script>
