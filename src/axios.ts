import axios from 'axios';
import store from './store';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.request.use(
    config => {
        // 특정 경로에 대해서만 토큰을 설정하지 않도록 합니다.
        if (!config.url?.includes('/auth/register')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch('logout');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default instance;
