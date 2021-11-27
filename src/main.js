import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import VueAxios from 'vue-axios';

// 調用地圖
import utils from './utils'
Vue.prototype.$utils = utils

Vue.use(VueAxios, axios);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
