import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
export const auth = {
  namespaced: true,
  state: initialState,
  action: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit('loginSucces', user);
          return Promise.resolve(user);
        },
        (error) => {
          commit('loginFilure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit('registerSucces');
          return Promise.resolve(response.data);
        },
        (error) => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSucces(state, user) {
      state.status.logedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.state.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.logedIn = false;
    },
  },
};
