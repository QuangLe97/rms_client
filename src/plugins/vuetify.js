import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-
// Import for multi language

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  fontFamily: 'DM Sans'
}

export default new Vuetify(opts)
