<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import Logo from './logo/Logo.vue';
import { Menu2Icon, BellRingingIcon } from 'vue-tabler-icons';
import NotificationDD from './vertical-header/NotificationDD.vue';
import ProfileDD from './vertical-header/ProfileDD.vue';

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
</script>

<template>
    <!------Sidebar-------->
    <v-navigation-drawer left elevation="0"  app class="leftSidebar"  v-model="sDrawer">
        <!---Logo part -->
        <div class="pa-5">
            <Logo />
        </div>
        <div>
            <perfect-scrollbar class="scrollnavbar">
                <v-list class="pa-6">
                    <template v-for="(item, i) in sidebarMenu">
                        <NavGroup :item="item" v-if="item.header" :key="item.title" />
                        <NavItem :item="item" v-else class="leftPadding" />
                    </template>
                </v-list>
            </perfect-scrollbar>
        </div>
    </v-navigation-drawer>
    <!------Header-------->
    <v-app-bar elevation="0" height="70">
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <v-btn class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted" @click="sDrawer = !sDrawer" icon variant="flat" size="small">
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <NotificationDD />
            </div>
            <div>
                <ProfileDD />
            </div>
        </div>
    </v-app-bar>
</template>
