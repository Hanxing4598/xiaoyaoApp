import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
/**
 * 实现store模块自动导入
 * */
let modules = {}
const storeContext = require.context('./modules', false, /.js$/)
storeContext.keys().forEach(item => {
  const storeModule = storeContext(item).default
  const fileName = item.split('/').pop()
  const storePropName = fileName.split('.').shift()
  modules[storePropName] = storeModule
})

const store = new Vuex.Store({
	modules,
	getters
})

export default store