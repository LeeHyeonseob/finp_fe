// store/index.ts
import { createStore } from 'vuex';

export default createStore({
    state: {
        token: localStorage.getItem('token') || '',
        username: localStorage.getItem('username') || '', // 사용자 이름을 저장합니다.
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        SET_USERNAME(state, username) {
            state.username = username;
            localStorage.setItem('username', username);
        },
        LOGOUT(state) {
            state.token = '';
            state.username = '';
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        logout({ commit }) {
            commit('LOGOUT');
        },
    },
});
