// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from '@/router'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import './plugins'
import i18n from './i18n'
import FlagIcon from 'vue-flag-icon'
import VueResource from 'vue-resource'
import vPage from 'v-page'

Vue.config.productionTip = false
Vue.use(FlagIcon)
Vue.use(VueResource)
Vue.use(vPage)
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify,
  i18n,
  template: '<App/>'
})
