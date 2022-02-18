const LOGIN = "LOGIN";

const state = {
    authenticated: false,
    user: {},
};
const getters = {
    user: state => state.user,
    authenticated: state => state.authenticated,
};
const mutations = {
    LOGIN(state, userPayload) {
        state.user = userPayload;
        state.authenticated = true;
    }
};
const actions = {
    login({ commit }, options) {
        commit(LOGIN, options);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}