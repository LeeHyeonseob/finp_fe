import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request 인터셉터 설정
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // 토큰 저장 위치에 따라 변경
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response 인터셉터 설정
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // 로그아웃 로직 또는 로그인 페이지로 리다이렉트
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default instance;

