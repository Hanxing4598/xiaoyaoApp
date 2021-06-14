<template>
	<view class="content">
		<view class="logo">
			<image src="/static/logo.png" mode="aspectFit"></image>
		</view>
		<form class="form" @submit="submit">
			<view class="item">
				<view class="icon cuIcon-people"></view>
				<input :value="record?record.phone:''" name="phone" type="phone" placeholder="请输入手机号码" />
			</view>
			<view class="item">
				<view class="icon cuIcon-lock"></view>
				<input name="password" :value="record?record.password:''" :type="hasPWD?'text':'password'" placeholder="请输入登录密码" />
				<view class="isShow">
					<view :class="hasPWD?'cuIcon-attentionforbid':'cuIcon-attention'" style="font-size: 20px;" @tap="showPassword"></view>
				</view>
			</view>
			<view class="is-rember">
				<label @tap="hasRember">
					<checkbox color="#41a0fc" :checked="isRember?true:false" /><text>记住密码</text>
				</label>
			</view>
			<button form-type="submit" type="primary">登录</button>
			<view class="other">
				<navigator url="/pages/login/register">立即注册</navigator>
				<navigator url="/pages/login/forgetPass">忘记密码</navigator>
			</view>
		</form>

		<!-- #ifndef H5 -->
		<view class="other-login">
			<!-- #ifdef APP-PLUS -->
			<!--<view class="item" @tap="wxLogin">
				<uni-icons color="#3cb035" size="35" type="weixin"></uni-icons>
				<view>微信登录</view>
			</view>
			<uni-popup type="bottom" ref="userToken">
				<view class="user-token">
					<view class="tip">
						<text>验证</text>
						<text class="cancel" @tap="cancel">取消</text>
					</view>
					<view class="item">
						<view class="title">平台账号：</view>
						<view class="input">
							<input placeholder="您在本平台注册时的账号" v-model="account" type="number" value="" />
						</view>
					</view>
					<view class="item">
						<view class="title">密码：</view>
						<view class="input" style="border-bottom: none;">
							<input placeholder="您在本平台注册时的密码" type="password" v-model="accountPassword" value="" />
						</view>
					</view>
					<view class="btn">
						<button type="primary" @tap="bindLogin">验证</button>
					</view>
				</view>
			</uni-popup>-->

			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
<!--			<button class="item" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">
				<uni-icons color="#3cb035" size="35" type="weixin"></uni-icons>
				<view>微信登录</view>
			</button>-->
			<!-- #endif -->
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	// import base64 from '@/common/base64/base64'
	import RSAUtils from '../../utils/security'
	export default {
		data() {
			return {
				isRember: false,
				hasPWD: false,
				account: '',
				accountPassword: '',
				wxInfo: '',
				record: false
			}
		},
		onShow() {
			if (uni.getStorageSync('userAccount')) {
				this.isRember = true
				this.record = uni.getStorageSync('userAccount')
			} else {
				this.isRember = false
				this.record = false
			}
		},
		onLoad() {
			// this.$http.get(this.API.getRsaKey, {
			// 	data: {}
			// }).then(data => {
			// 	if (data.code === 0) {
			// 		this.rsaData = data.result
			// 	}
			// })
		},
		methods: {
			$getUserInfo(token, callback) {
				this.$http.request({
					url: 'customer/userInfo',
					options: {
						'Authorization': token
					}
				}).then(res => {
					uni.setStorageSync('userInfo', res)
					callback()
				})
			},
			getUserInfo(e) {
				console.log(e)
			},
			cancel() {
				this.$refs['userToken'].close()
			},
			bindLogin() {
				if (this.account == '' || this.accountPassword == '') {
					uni.showToast({
						title: '请完善上方信息',
						icon: 'none'
					})
					return
				}
				this.wxInfo.type = '10B'
				this.wxInfo.account = this.account
				this.wxInfo.password = base64.encode(encodeURI(this.accountPassword))
				uni.showLoading({
					title: '正在验证...',
					mask: true
				})
				this.$http.request({
					url: 'customer/wxLogin',
					data: this.wxInfo
				}).then(result => {
					uni.setStorageSync('token', result.content)
					this.$getUserInfo(result.content, () => {
						this.alert.showToast({
							title: result.message,
							callback() {
								uni.navigateBack()
							}
						})
					})
				})
			},
			wxLogin() {
				const self = this
				uni.login({
					provider: 'weixin',
					success() {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success({
								userInfo
							}) {
								self.wxInfo = {
									platformNo: self.appVersion,
									openid: userInfo.openId,
									nickname: userInfo.nickName,
									gender: userInfo.gender,
									province: userInfo.province,
									city: userInfo.city,
									country: userInfo.country,
									avatarUrl: userInfo.avatarUrl,
									unionid: userInfo.unionId,
									clientid: uni.getStorageSync('pinf').clientid,
									device: uni.getSystemInfoSync().brand
								}
								uni.showLoading({
									title: '正在登录...',
									mask: true
								})
								self.$http.request({
									url: 'customer/wxLogin',
									data: self.wxInfo
								}).then(result => {
									uni.setStorageSync('token', result.content)
									self.$getUserInfo(result.content, () => {
										self.alert.showToast({
											title: '登录成功！',
											callback() {
												uni.navigateBack()
											}
										})
									})
								}).catch(error => {
									if (error.code == 127) {
										uni.navigateTo({
											url: 'getPhone/getPhone?wxInfo=' + JSON.stringify(self.wxInfo)
										})
										return
										self.alert.showModal({
											content: '检测到您在本平台未使用该登录方式\n若您在本平台已有账号，可直接绑定该账号',
											confirmText: '我有账号',
											cancelText: '我没有账号',
											call() {
												self.alert.showModal({
													content: '我们需要验证您的账号密码，请如实填写',
													call() {
														self.$nextTick(() => {
															self.$refs['userToken'].open()
														})
													}
												})
											},
											cancel() {
												uni.navigateTo({
													url: 'getPhone/getPhone?wxInfo=' + JSON.stringify(self.wxInfo)
												})
											}
										})
									}
								})
							}
						});
					}
				});
			},
			hasRember() {
				this.isRember = !this.isRember
			},
			showPassword() {
				this.hasPWD = !this.hasPWD
			},
			_toRegister() {
				uni.navigateTo({
					url: './register'
				})
			},
			_toForget() {
				uni.navigateTo({
					url: './forgetPass'
				})
			},
			submit({
				detail
			}) {
				if (detail.value.phone == '') {
					uni.showToast({
						title: '请填写用户名！',
						icon: 'none'
					})
					return
				}
				if (detail.value.password == '') {
					uni.showToast({
						title: '请填写密码',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '正在登录...',
					mask: true
				})

				let submitParams = {
					mobile: detail.value.phone
				};
				submitParams.loginType = 4
				const key = RSAUtils.getKeyPair(this.rsaData.exponent, '', this.rsaData.modulus)
				submitParams.password = RSAUtils.encryptedString(key, detail.value.password)
				this.$http.post(this.API.loginSubmit,{
					data: submitParams
				}).then(result => {
					if (result.code === 0) {
						wx.setStorageSync('sessionid', result.result.session) // 存储sessionid进cookie后续用
						wx.setStorageSync('customerCode', result.result.customerCode) // 分享code
						wx.setStorageSync('isLogin', true)
						this.alert.showToast({
							title: '登录成功！',
							callback() {
								uni.navigateBack()
							}
						})
						if (this.isRember) {
							uni.setStorageSync('userAccount', {
								phone: detail.value.phone,
								password: detail.value.password
							})
						} else {
							uni.getStorageSync('userAccount') ? uni.removeStorageSync('userAccount') : ''
						}
						uni.setStorageSync('token', result.result.token)
						this.$getUserInfo(result.result.token)
					} else {
						this.alert.showToast({
							title: result.message
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	.content {
		.user-token {
			background-color: #FFFFFF;
			padding: $uni-spacing-col-base $uni-spacing-row-base;

			.tip {
				text-align: center;
				position: relative;

				text {
					&:first-child {
						color: $uni-theme-color;
						font-size: $uni-font-size-lg;
					}

					&.cancel {
						position: absolute;
						top: 50%;
						right: $uni-spacing-row-base;
						font-size: $uni-font-size-sm;
						transform: translateY(-50%);
						color: gray;
					}
				}
			}

			.item {
				margin-top: $uni-spacing-col-base;

				.input {
					padding: $uni-spacing-col-base 0;
					border-bottom: 1rpx solid $uni-border-color;

					input {
						padding-left: $uni-spacing-row-base;
						font-size: $uni-font-size-base;
					}
				}
			}

			.btn {
				margin-top: $uni-spacing-col-lg;
				padding-bottom: constant(safe-area-inset-bottom);
				padding-bottom: env(safe-area-inset-bottom);
			}
		}

		.other-login {
			display: flex;
			padding-top: 100rpx;
			padding-bottom: $uni-spacing-col-lg;
			justify-content: center;

			>button {
				line-height: normal;
				background: none;

				&::after {
					border: none;
				}
			}

			>.item {
				text-align: center;

				view {
					font-size: $uni-font-size-sm;
					color: gray;
				}
			}
		}

		.logo {
			text-align: center;
			padding: 120rpx 0;

			image {
				width: 210rpx;
				height: 210rpx;
				background: none;
			}
		}

		.form {
			padding: 0 $uni-spacing-row-lg;
			display: block;
			.icon {
				font-size: 20px;
			}
			.item {
				display: flex;
				align-items: center;
				padding: $uni-spacing-col-lg 0;
				border-bottom: 1rpx solid $uni-border-color;
				margin: 0 $uni-spacing-row-base;

				.icon {
					padding-right: $uni-spacing-row-base;
				}

				input {
					width: 100%;
					font-size: $uni-font-size-base;
				}
			}

			.is-rember {
				padding-bottom: $uni-spacing-col-lg;
				margin-left: $uni-spacing-row-base;
				margin-top: $uni-spacing-col-sm;

				label {
					display: flex;
					align-items: center;

					checkbox {
						transform: scale(.7);
					}

					text {
						font-size: $uni-font-size-sm;
					}
				}
			}

			.other {
				display: flex;
				justify-content: space-between;
				padding: $uni-spacing-col-lg 0;
				color: #b9b9b9;
			}
		}
	}
</style>
