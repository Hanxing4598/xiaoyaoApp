import host from './config.js'
const header = {}
const request = (url = '', data = {}, method = 'POST') => {
	header['content-type'] = "application/x-www-form-urlencoded";
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: host + url,
			data,
			header,
			dataType: 'json'
		}).then((response) => {
			let [error, res] = response;
			// 登录过期
			if (res.code == 555) {
				uni.showToast({
					title: '登录过期, 请重新登录',
					duration: 2000
				});
				uni.navigateTo({
					url: '/pages/login/login'
				})
			};
			resolve(res.data);
		}).catch((error) => {
			let [err, res] = error;
			reject(err);
		});
	});
}
export default request
