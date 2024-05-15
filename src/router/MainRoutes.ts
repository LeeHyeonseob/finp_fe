import PostDetails from '@/views/pages/PostDetails.vue';
import PostCreate from '@/views/pages/PostCreate.vue';

const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'Board',
            path: '/ui/board',
            component: () => import('@/views/components/Board.vue')
        },
        {
            name: 'CoinCharge',
            path: '/ui/coinCharge',
            component: () => import('@/views/components/CoinCharge.vue')
        },

        {
            path: 'post/:id',
            name: 'PostDetails',
            component: PostDetails,
            props: true
        },
        {
            path: 'create',
            name: 'PostCreate',
            component: PostCreate
        }

    ]
};

export default MainRoutes;
