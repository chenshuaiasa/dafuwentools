import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import Vuex from 'vuex'
Vue.config.productionTip = false

Vue.use(Vant);
Vue.use(Vuex);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
