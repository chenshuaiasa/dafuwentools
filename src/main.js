import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant';
import {Dialog} from 'vant';
import 'vant/lib/index.css';
import * as datas from './data/index'
import * as data_broadcast from './data/broadcast.js'
import { Toast } from "vant";
import store from './store/index'
import eruda from 'eruda'
eruda.init()

Vue.config.productionTip = false

Vue.prototype.$datas = datas;
Vue.prototype.$datasb = data_broadcast;
Vue.use(Vant);
Vue.use(Dialog);
Vue.use(Toast);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
