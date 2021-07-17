import Vue from 'vue'
import App from './App'
import store from './store'
import alert from './utils/alert'
import util from 'utils/index'
import Button from '@/components/button'

Vue.component('custom-button', Button)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$alert = alert
Vue.prototype.$utils = util
Vue.prototype.$store = store

const app = new Vue({
    ...App,
	store
})
app.$mount()

 



