<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6">
                <FavoriteTopPosts />
            </v-col>
            <v-col cols="12" md="6">
                <RecentPosts />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import FavoriteTopPosts from '@/components/dashboard/FavoriteTopPosts.vue';
import RecentPosts from '@/components/dashboard/RecentPosts.vue';
</script>
