import Vue from 'vue'
import App from './App'
import store from './store'
import alert from './utils/alert'
import Button from '@/components/button'

Vue.component('custom-button', Button)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.alert = alert

const app = new Vue({
    ...App,
	store
})
app.$mount()

 



