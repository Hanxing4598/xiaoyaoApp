import Vue from 'vue'
import App from './App'
import store from './store'
import alert from './utils/alert'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.alert = alert

const app = new Vue({
    ...App,
	store
})
app.$mount()

 



