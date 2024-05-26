import PostDetails from '@/views/pages/PostDetails.vue';
import PostCreate from '@/views/pages/PostCreate.vue';
import CoinTransaction from '@/views/pages/CoinTransaction.vue'; // 추가된 부분

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
            name: 'CoinTransaction',
            path: '/ui/coinTransaction',
            component: CoinTransaction
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
