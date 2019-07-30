import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex);

const state = {
  user: {},
  token: null
};

const mutations = {
  login: (state, data) => {
    if (data.userInfo) {
      state.user = data.userInfo;
      window.localStorage.setItem('user', JSON.stringify(data.userInfo));
    }
    if (data.token) {
      state.token = data.token;
      window.localStorage.setItem('token', data.token)
    }
  },
  logout: (state) => {
    state.user = {};
    state.token = null;
    console.log('已注销！');
    router.push('/login')
  }
};

export default new Vuex.Store({
  state: state,
  mutations: mutations
})
