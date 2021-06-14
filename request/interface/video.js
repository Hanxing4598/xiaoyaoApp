import request from '@/request/base.js'

/**
 * @param {Object} data 分页参数
 */
export function getVideoList(data) {
	return request('video/getVideoList', data, 'post')
}

/**
 * @param {Object} data -> {
	 likeId
 }
 */
export function like(data) {
	return request('video/like', data, 'post')
}