import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null,
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearAuthData(state) {
            state.user = null;
            state.token = '';
            localStorage.removeItem('token');
        }
    },
    actions: {
        login({ commit }, authData) {
            commit('setUser', authData.user);
            commit('setToken', authData.token);
        },
        logout({ commit }) {
            commit('clearAuthData');
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token;
        },
        user(state) {
            return state.user;
        }
    }
});

export default store;