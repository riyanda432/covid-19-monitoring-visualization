import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "@/plugins/echarts";
import "chart.js";
import "hchs-vue-charts";
import VueRouter from 'vue-router';
import { ClientTable } from 'vue-tables-2';
import router from './router'
import * as VueSpinnersCss from "vue-spinners-css";
import VueGoogleCharts from 'vue-google-charts'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBlcZDocU3zs-2nbQZTFyE-JcpEW68",
    libraries: "places" // necessary for places input
  }
});
Vue.use(VueGoogleCharts)
Vue.use(VueSpinnersCss)
Vue.use(ClientTable);
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(window.VueCharts);
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
