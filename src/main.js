import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import TreeTable from 'tree-table-vue'
import router from './router';
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(TreeTable)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
