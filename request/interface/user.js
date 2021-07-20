import request from '@/request/base.js'

/**
 * @param {Object} data { loginName, userName, password }
 */
export function register(data) {
	return request('user/register', data, 'post')
}
