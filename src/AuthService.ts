import axios from '@/axios';

export const login = async (credentials: { username: string; password: string }) => {
    const response = await axios.post('/auth/login', credentials);
    const { token, userId, username } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = '/auth/login';
};