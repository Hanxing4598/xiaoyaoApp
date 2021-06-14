module.exports = {
	mysqlConfig: {
		host: '127.0.0.1',  // 远程主机名
		user: 'root',  // 数据库用户名
		port: '3306',  //  端口
		password: 'root',  // 数据库密码
		database: 'video'  ,// 数据库名称
	},
	result: {
		OK: 200, // 成功返回的状态码
		NO_LOGIN: 555  // 未登录返回的状态码
	}
}