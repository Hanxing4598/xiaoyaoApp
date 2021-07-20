var Mysql = require('../mysql')
var {
	result
} = require('../config')

/**
 * 根据登录账号查用户信息
 */
function _getUserById(loginName, selector) {
	return new Promise((resolve, reject) => {
		Mysql.select('hx_user', selector, `login_name='${loginName}'`).then(data => {
			resolve(data[0] || {})
		})
	})
}
module.exports = {
	login(req, res) {},

	/**
	 * 用户注册
	 */
	async register(req, res) {
		const r_login_name = req.body.loginName
		const r_password = req.body.password
		const { login_name, password } = await _getUserById(r_login_name)
		if (typeof login_name !== 'undefined') {
			res.send(Mysql.getSendResult(-1, null, '该用户名已存在！'));
		}
	}
}
