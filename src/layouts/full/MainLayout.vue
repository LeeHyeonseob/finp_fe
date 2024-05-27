<template>
    <v-app>
        <v-navigation-drawer left app>
            <Logo />
            <v-list>
                <NavGroup v-for="item in sidebarItems" :key="item.header" :item="item" />
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app>
            <NotificationDD />
            <ProfileDD />
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Logo from './logo/Logo.vue';
import NotificationDD from './vertical-header/NotificationDD.vue';
import ProfileDD from './vertical-header/ProfileDD.vue';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
</script>

