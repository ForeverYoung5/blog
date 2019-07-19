import axios from 'axios';
import store from './store'

axios.interceptors.request.use(
  config => {
    // let token = store.state.token;
    let token = window.localStorage.token;
    if (token) {
      config.headers.common['token'] = token;
    }
    console.log('请求拦截--->', config);
    return config;
  },
  error => {
    console.log('请求错误拦截--->', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log('响应拦截--->', response);
    return response;
  },
  error => {
    console.log('响应错误拦截--->', error);
    return Promise.reject(error);
  }
);
export default axios;
