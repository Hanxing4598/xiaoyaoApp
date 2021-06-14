var {
	mysqlConfig
} = require('./config')
var {
	init,
	exec,
	sql
} = require('mysqls')
var mysql = require('mysql');

init(mysqlConfig)
var mysql = {
	select(tableName, fieldStr, where) {
		return sql.table(tableName).field(fieldStr).where(where).select(true).exec()
	},
	/**
	 * 分页查询
	 * 
	 * @param {Object} tableName
	 * @param {Object} fieldStr
	 * @param {Object} where
	 * @param {Object} limit
	 */
	selectPager(tableName, limit, fieldStr, where) {
		return new Promise((resolve, rej) => {
			console.log(sql.table(tableName).field(fieldStr).where(where).limit(limit[0], limit[1]).select())
			sql.table(tableName).field(fieldStr).where(where).limit(limit[0], limit[1]).select(true).exec().then(data => {
				exec('select count(*) as total from ' + tableName).then(totalData => {
					resolve({
						page: Number(limit[0]),
						pageNum: Number(limit[1]),
						total: totalData[0].total,
						data
					})
				})
			})
		})
	},
	update(tableName, data, where) {
		return sql.table(tableName).data(data).where(where).update(true).exec()
	},
	insert(tableName, data, where) {
		return sql.table(tableName).data(data).where(where).insert(true).exec()
	},
	delete(tableName, data, where) {
		return sql.table(tableName).where(data).delete(true).exec()
	},
	getSendResult(code, result, message) {
		return {
			code,
			result,
			message
		}
	}
}

module.exports = mysql
