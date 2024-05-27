// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import store from '@/store';

const routes = [
    {
        path: '/',
        redirect: '/auth/login',
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/pages/Error404.vue')
    },
    MainRoutes,
    AuthRoutes
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            next('/auth/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
