var Mysql = require('../mysql')
var {
	result
} = require('../config')
module.exports = {
	/**
	 * 获取视频列表
	 */
	getVideoList(req, res) {
		Mysql.selectPager('hx_video_list', [req.body.page, req.body.pageNum]).then(data => {
			res.send(Mysql.getSendResult(result.OK, data, '查询成功'));
		})
	},
	/**
	 * 视频点赞
	 */
	like(req, res) {
		Mysql.update('hx_video_list', { islike: 1 }, ).then(data => {
			res.send(Mysql.getSendResult(result.OK, data, '查询成功'));
		})
	}
}
