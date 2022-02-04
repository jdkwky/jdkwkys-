import Vue from 'vue'
import App from './App.vue';
import { router , VueRouter} from './router';
import './single-spa.config.js';



Vue.config.productionTip = false;
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
