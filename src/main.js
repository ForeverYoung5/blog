// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import http from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import globalVar from './globalVar/globalVar'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import store from './store'

//引入Markdown编辑器
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(mavonEditor);
Vue.use(ElementUI);
Vue.use(MuseUI);

// Vue.prototype.globalVar = globalVar;
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',

  router,
  store,
  components: {App},
  template: '<App/>'
});
