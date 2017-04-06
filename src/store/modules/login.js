import * as types from '../mutation-types';
import auth from '../../api/auth';
import router from '../../router';

const state = {
    isLoggedIn: false
};

const getters = {
    isLoggedIn: state => {
        return state.isLoggedIn;
    }
};
const actions = {
    login({ commit, state }, credentials) {
        commit(types.LOGIN);
        auth.login(credentials)
            .then(() => commit(types.LOGIN_SUCCESS))
            .catch(() => commit(types.LOGIN_FAILURE));
    },
    logout({ commit }) {
        localStorage.removeItem('token');
        commit(types.LOGOUT);
    }
};

const mutations = {
    [types.LOGIN](state) {
        state.pending = true;
    },
    [types.LOGIN_SUCCESS](state) {
        state.isLoggedIn = true;
        router.push('quests');
    },
    [types.LOGOUT](state) {
        state.isLoggedIn = false;
        router.push('/login');
    },
    [types.LOGIN_FAILURE](state) {

    }
};
export default {
    state,
    getters,
    actions,
    mutations
};