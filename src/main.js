import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant';
import {Dialog} from 'vant';
import 'vant/lib/index.css';
import Vuex from 'vuex'
import * as datas from './data/index'
import { Toast } from "vant";
Vue.config.productionTip = false

Vue.prototype.$datas = datas;
Vue.use(Vant);
Vue.use(Vuex);
Vue.use(Dialog);
Vue.use(Toast);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
