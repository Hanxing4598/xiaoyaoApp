const state = {
	token: '',
	isLogin: false
}

const mutations = {
  SET_TOKEN(state, token) {
  	  state.token = token
  },
  SET_ISLOGIN(state, isLogin) {
  	  state.isLogin = isLogin
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
