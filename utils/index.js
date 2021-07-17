import alert from '@/utils/alert'
import host from '@/request/config'
import store from '@/store/index'
/**
 * 封装一些常用的公共方法
 */
class methods {
	constructor() {

	}
	/**
	 * 调用微信分享
	 * 支持微信朋友圈、微信好友、小程序
	 * 图文分享、图片分享、视频分享
	 */
	$share({
		type,
		title = '',
		summary = '',
		href = '',
		supportMiniProgram = false,
		mediaUrl = '',
		imageUrl = '',
		miniProgram = {},
		success
	}) {
		//#ifdef H5 || MP-WEIXIN
		alert.$downLoadApp()
		//#endif

		//#ifdef APP-PLUS
		let json = {
			provider: 'weixin',
			success(res) {
				success(res)
				alert.showToast({
					title: '分享成功！'
				})
			},
			fail(error) {
				alert.showToast({
					title: '分享失败！',
					icon: 'none'
				})
			}
		}
		let arr = []
		if (supportMiniProgram) {
			arr = ['小程序', '微信好友', '朋友圈']
		} else {
			arr = ['微信好友', '朋友圈']
		}
		uni.showActionSheet({
			itemList: arr,
			success({
				tapIndex
			}) {
				json.imageUrl = imageUrl
				json.title = title
				if (supportMiniProgram) {
					if (tapIndex == 0) {
						miniProgram.type = 2
						miniProgram.id = 'gh_e3842ab3e2fb'
						json.miniProgram = miniProgram
						json.type = 5
						json.scene = 'WXSceneSession'
					} else if (tapIndex == 1) {
						json.scene = 'WXSceneSession'
					} else if (tapIndex == 2) {
						json.scene = 'WXSenceTimeline'
					}
					if (tapIndex == 1 || tapIndex == 2) {
						json.type = type
						json.mediaUrl = mediaUrl
						json.href = href
						json.summary = summary
					}
				} else {
					if (tapIndex == 0) {
						json.scene = 'WXSceneSession'
					} else if (tapIndex == 1) {
						json.scene = 'WXSenceTimeline'
					}
					if (tapIndex == 0 || tapIndex == 1) {
						json.type = type
						json.mediaUrl = mediaUrl
						json.href = href
						json.summary = summary
					}
				}
				uni.share(json)
			}
		})
		//#endif
	}

	/**
	 * 超链接方法
	 * @param {Object} url		//	跳转地址
	 */
	$link(url) {
		// #ifdef APP-PLUS
		plus.runtime.openURL(url)
		// #endif
		// #ifdef H5
		window.open(url)
		// #endif
		//#ifdef MP-WEIXIN
		alert.showModal({
			content: '因平台限制，小程序内不可执行该操作，可以复制链接用浏览器访问地址哦',
			confirmText: '复制',
			call() {
				uni.setClipboardData({
					data: url
				})
			}
		})
		//#endif
	}

	/**
	 * 封装支付请求参数
	 */
	$callPay() {
		const self = this
		return new Promise((reslove, reject) => {
			let pays = [],
				payWayConst,
				tradeType
			//#ifdef H5
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//在微信中打开
				pays = ['微信支付']
				payWayConst = 'JS'
			} else {
				pays = ['微信支付', '支付宝支付']
				payWayConst = 'H5'
			}
			//#endif

			//#ifdef APP-PLUS
			pays = ['微信支付', '支付宝支付']
			payWayConst = 'APP'
			//#endif

			//#ifdef MP-WEIXIN
			pays = ['微信支付']
			payWayConst = 'APPLET'
			//#endif
			// pays.push('余额支付')
			uni.showActionSheet({
				itemList: pays,
				success({
					tapIndex
				}) {
					//#ifdef H5
					alert.showToast({
						title: 'H5端暂不支持支付功能',
						icon: 'none'
					})
					// return
					//#endif
					if (pays[tapIndex] == '微信支付') {
						tradeType = 'WXPAY'
					}
					if (pays[tapIndex] == '支付宝支付') {
						tradeType = 'ALIPAY'
					}
					// if(pays[tapIndex] == '余额支付'){
					// 	$http.request({
					// 		url:''
					// 	})
					// 	return
					// }

					reslove({
						payWayConst,
						tradeType
					})
				},
				fail(error) {
					uni.hideLoading()
					reject(error)
				}
			})
		})
	}

	$payMent({
		payType,
		orderInfo,
		success
	}) {
		// #ifdef APP-PLUS
		uni.requestPayment({
			provider: payType.toLowerCase(),
			orderInfo: orderInfo.payInfo,
			success: (e) => {
				console.log("success", e);
				success(e)
				uni.showToast({
					title: '支付成功！'
				})
			},
			fail: (e) => {
				console.log("fail", e);
				uni.showToast({
					title: '支付失败！',
					icon: 'none'
				})
			}
		})
		// #endif

		//#ifdef MP-WEIXIN
		orderInfo.payInfo = JSON.parse(orderInfo.payInfo)
		orderInfo.success = (e) => {
			console.log("success", e);
			success(e)
		}
		orderInfo.fail = (e) => {
			console.log(e);
		}
		uni.requestPayment(orderInfo.payInfo)
		//#endif
	}
	
	$upload({
		count = 1,
		name = 'file',
		formData = {}
	}) {
		let header = {}
		if (store.state.user.token) header.token = store.state.user.token
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count,
				success(r) {
					uni.uploadFile({
						url: `${host}/common/uploadImg`,
						filePath: r.tempFilePaths[0],
						name,
						header,
						formData,
						async success(res) {
							res.data = JSON.parse(res.data)
							if (res.data.error === 0) {
								resolve(res.data)
							} else {
								reject(res.data)
								if (error == 555) {
									alert.$toLogin()
								}
							}
						}
					})
				}
			})
		})
	}
}

export default new methods()
