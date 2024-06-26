import PostDetails from '@/views/pages/PostDetails.vue';
import PostCreate from '@/views/pages/PostCreate.vue';
import CoinTransaction from '@/views/pages/CoinTransaction.vue';
import CoinCharge from '@/views/pages/CoinCharge.vue';
import UserProfile from '@/views/pages/UserProfile.vue';
import UserProfileUpdate from '@/views/pages/UserProfileUpdate.vue';

const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main/dashboard',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: 'dashboard',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'Board',
            path: 'board',
            component: () => import('@/views/components/Board.vue')
        },
        {
            name: 'CoinCharge',
            path: 'coinCharge',
            component: CoinCharge
        },
        {
            name: 'CoinTransaction',
            path: 'coinTransaction',
            component: CoinTransaction
        },
        {
            name: 'UserProfile',
            path: 'profile',
            component: UserProfile
        },
        {
            name: 'UserProfileUpdate',
            path: 'profile/update',
            component: UserProfileUpdate
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
