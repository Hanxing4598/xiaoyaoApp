<template>
	<view class="content">
		<view class="status-bar">
			<image class="bg-img" :src="userInfo.bgImg" mode="aspectFill"></image>
		</view>
		<!-- <view class="type-tab">
			<view :class="['tab-item ', curTypeTab === 0 ? 'active':'']">视频</view>
			<view :class="['tab-item ', curTypeTab === 1 ? 'active':'']">直播</view>
		</view> -->
		<view class="user-info" style="margin-bottom: 0;">
			<view class="left">
				<view class="user-image">
<!--					<uni-user-tag v-if="userInfo!=''" :type="userInfo.roleName"></uni-user-tag>-->
					<image class="image" @click="preview(userInfo.avatar)" :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
			</view>
<!--			<view class="right" v-if="!hide">
				<uni-tag :circle="true" @tap="follow" :inverted="!userInfo.follow" :text="userInfo.follow?'取消关注':'关注'" type="primary"
				 @click="setInverted" />
			</view>-->
<!-- 			<view class="right" v-if="!hide">
				<view class="follow-tag" @click="follow">
					<uni-icons class="icon" type="plusempty" color="#ffffff" v-if="!userInfo.follow"></uni-icons><text class="text">{{userInfo.follow?'取消关注':'关注'}}</text>
				</view>
			</view> -->
            
            
            <view class="right" v-if="!hide">
            	<view class="follow-tag" @click="follow">
            		<text class="icon cuIcon-favor"></text><text class="text">{{userInfo.follow?'取消关注':'关注'}}</text>
            	</view>
                <view class="chat-tag" @click="toChat">
                    <text class="icon cuIcon-mail"></text><text class="text">私信</text>
                </view>
            </view>
		</view>
        <view class="user-info user-text-info">
			<view class="left">
				<view class="user-view">
					<view class="name" v-text="userInfo.nickname"></view>
					<view class="concat">ID:{{userInfo.customerNo}}</view>
				</view>
			</view>
		</view>
		<view class="autograph">
			<text>{{userInfo.description==''?'Ta还什么都没写':userInfo.description}}</text>
		</view>
		<view class="total">
			<view>
				<view>获赞</view>
				<text v-text="userInfo.praiseNum"></text>
			</view>
			<view @tap="toList(1)">
				<view>关注</view>
				<text v-text="userInfo.followersNum"></text>
			</view>
			<view @tap="toList(2)">
				<view>粉丝</view>
				<text v-text="userInfo.fansNum"></text>
			</view>
		</view>
		<view class="nav-wrap">
			<view :class="['nav-item', curTab === 1 ? 'active':'']" @click="changeTab(1)">作品  {{userInfo.vodNum}}</view>
			<view :class="['nav-item', curTab === 2 ? 'active':'']" @click="changeTab(2)">喜欢  {{userInfo.praiseVodNum}}</view>
			<view :class="['nav-item', curTab === 3 ? 'active':'']" @click="changeTab(3)">随便看  {{userInfo.praiseVodNum}}</view>
			<view :class="['nav-item', curTab === 4 ? 'active':'']" @click="changeTab(4)">商品  {{userInfo.praiseVodNum}}</view>
		</view>
		<view class="list">
			<block v-if="videoList!='' && (curTab === 1 || curTab === 2)" v-for="(item,index) in videoList" :key="item.id">
				<view class="item" @tap="previewVideo(item,index)">
					<view class="box">
						<view>
							<text class="lg text-white cuIcon-like"></text>
							<view v-text="item.praiseNum"></view>
						</view>
						<image :src="item.coverUrl==''?'/static/logo.png':item.coverUrl" mode="aspectFill"></image>
					</view>
				</view>
			</block>
			<lookAroundList :list="lookAroundList" v-if="lookAroundList && curTab === 3"></lookAroundList>
		</view>
		<uni-empty v-if="videoList==''"></uni-empty>
		<view class="no-text" v-if="showEmpty">没有更多了</view>
	</view>
</template>

<script>
	import LookAroundList from '@/components/lookAroundList'
	export default {
		data() {
			return {
				videoList: [
					{
						id: 1,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					},
					{
						id: 2,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					},
					{
						id: 3,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					},
					{
						id: 4,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					},
					{
						id: 5,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					},
					{
						id: 6,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					},
					{
						id: 7,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					},
					{
						id: 8,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					},
					{
						id: 9,
						coverUrl: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						praiseNum: 2
					}
					
				],
				lookAroundList: [{}, {}, {}],
				videoListLoaded: false,
				total: 0,
				likeTotal: 0,
				userInfo: {
					bgImg: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
					avatar: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
					follow: false,
					nickname: '人间小苦瓜',
					customerNo: '21231231',
					praiseNum: 10,
					followersNum: 20,
					fansNum: 100,
					description: ''
				},
				hide: false,
				page: 1,
				curTab: 1,
				curTypeTab: 0,
				showEmpty: false
			};
		},
		onLoad(options) {
			if (options.type) {
				this.curTab = Number(options.type)
			}
			// this.userId = options.userId
			// if (this.userId == uni.getStorageSync('userInfo').id) {
			// 	this.hide = true
			// }
			// this.$getUserInfo()
			// this.refreshData()
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
			this.$getUserInfo()
			this.refreshData()
		},
		onReachBottom() {
			if (this.videoListLoaded) {
				return
			}
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			this.page++
			this.getVideoList(result => {
				uni.hideLoading()
				if (result.records != '') {
					this.videoList = [...this.videoList, ...result.records]
				} else {
					this.videoListLoaded = true
					this.showEmpty = true
				}
			})
		},
		components: {
			LookAroundList
		},
		methods: {
            toChat() {
                // 手动拼接数据结构
                this.chatUserInfo.nickName = this.chatUserInfo.nickname
                this.chatUserInfo.photo = this.chatUserInfo.avatar
                uni.setStorageSync('chatTarget', this.chatUserInfo)
                uni.navigateTo({
                    url: '/pages/chat/chat'
                })
            },
			preview(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			/**
			 * 调用iOS打开第三方应用API
			 * @param {Object} action
			 */
			$iOSPartake(action) {
				plus.runtime.launchApplication({
					action: action
				}, ({
					message
				}) => {
					// alert("Open system default browser failed: " + e.message);
					self.alert.showModal({
						content: message,
						showCancel: false
					})
				});
			},
			/**
			 * 调用Android打开第三方应用API
			 * @param {Object} pname
			 * @param {Object} action
			 */
			$andriodPartake(pname, action) {
				plus.runtime.launchApplication({
					pname: pname,
					extra: {
						url: action
					}
				}, ({
					message
				}) => {
					// alert("Open system default browser failed: " + e.message);
					self.alert.showModal({
						content: message,
						showCancel: false
					})
				});
			},
			openWeChat() {
				let self = this
				//#ifdef APP-PLUS
				//	打开微信
				let pname = 'com.tencent.mm',
					action = 'weixin://'
				//	检测微信应用是否安装
				if (plus.runtime.isApplicationExist({
						pname: pname,
						action: action
					})) {
					// 微信应用已安装
					if (plus.os.name == "Android") {
						uni.setClipboardData({
							data: self.userInfo.wecatAccount,
							success() {
								self.alert.showModal({
									content: '微信号已复制！\n打开微信即可添加Ta为好友',
									showCancel: false,
									call() {
										self.$andriodPartake()
									}
								})
							}
						})
					} else if (plus.os.name == "iOS") {
						self.alert.showModal({
							content: '微信号已复制！\n打开微信即可添加Ta为好友',
							showCancel: false,
							call() {
								self.$iOSPartake(action)
							}
						})
					}
				} else {
					//	未安装
					self.alert.showModal({
						content: '微信应用未安装',
						showCancel: false
					})
				}
				//#endif
				//#ifdef H5
				let text = h5Copy(self.userInfo.wecatAccount)

				this.alert.showToast({
					title: text ? '复制成功！' : '复制失败！'
				})

				//#endif
			},
			toList(type) {
				uni.navigateTo({
					url: '/pages/friend/friend?type=' + type
				})
			},
			$getUserInfo() {
				this.$http.request({
					url: 'customer/userById',
					data: {
						followUserId: this.userId,
						userId: uni.getStorageSync('userInfo').id
					}
				}).then(result => {
                    this.chatUserInfo = result
					result.praiseNum == '' ? result.praiseNum = 0 : result.praiseNum
					result.followersNum == '' ? result.followersNum = 0 : result.followersNum
					result.fansNum == '' ? result.fansNum = 0 : result.fansNum
					result.nickname == '' ? result.nickname = '还没有昵称' : result.nickname
					this.userInfo = result
					uni.setNavigationBarTitle({
						title: this.userInfo.nickname
					})
				})
			},
			follow() {
				let self = this
				self.token({
					success(token) {
						if (self.userInfo.follow) {
							self.$http.request({
								url: 'userFollow/delete/' + self.userId,
								options: {
									'Authorization': token
								}
							}).then(({
								message
							}) => {
								self.alert.showToast({
									title: message
								})
								self.userInfo.follow = false
							})
						} else {
							self.$http.request({
								url: 'userFollow/push',
								data: {
									followUserId: self.userId,
									type: '10A'
								},
								options: {
									'Authorization': token
								}
							}).then(({
								message
							}) => {
								self.userInfo.follow = true
							})
						}
					}
				})
			},
			refreshData() {
				this.page = 1
				this.showEmpty = false
				this.videoListLoaded = false
				this.getVideoList()
			},
			previewVideo(item) {
				uni.setStorageSync('videoInfo',item)
				uni.navigateTo({
					animationType: 'slide-in-bottom',
					url: './detail/detail'
				})
			},
			/**
			 * @param {Object} tab 1 -> 作品 2 -> 喜欢 3 -> 随便看 4 -> 商品
			 */
			changeTab(tab) {
				this.curTab = tab
				this.page = 1
				this.showEmpty = false
				this.videoListLoaded = false
				// this.getVideoList()
			},
			getVideoList(callback) {
				uni.showLoading({
					title: '加载中..'
				})
				this.$http.request({
					url: 'vod/query',
					data: {
						queryType: this.curTab,
						userId: this.userId,
						current: this.page,
						size: 9
					}
				}).then(result => {
					uni.hideLoading()
					if (callback) {
						callback(result)
						return
					}
					this.videoList = [...result.records]
					this.total = result.total
				})
			},
			setInverted() {
				this.inverted = !this.inverted;
			}
		}
	}
</script>

<style lang="scss">
	.autograph {
		padding: $uni-spacing-col-base $uni-spacing-row-base 0 $uni-spacing-row-base;

		text {
			color: #FFFFFF;
			font-size: $uni-font-size-lg;
		}
	}

	.shopWindow {
		display: flex;
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		align-items: center;
		border: 1rpx solid #fff;
		border-radius: $uni-border-radius-lg;
		margin: 0 $uni-spacing-row-base;
		justify-content: space-between;

		.left,
		.right {
			display: flex;
			align-items: center;
		}
		view {
			color: #ffbc0b;
		}
		image {
			margin-right: $uni-spacing-row-base;
			width: 40rpx;
			height: 40rpx;
			background: none;
		}
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 5rpx;

		.item {
			width: 33.333%;
			height: 330rpx;

			.box {
				padding: 5rpx;
				height: 100%;
				width: 100%;
				position: relative;

				>view {
					position: absolute;
					bottom: $uni-spacing-col-base;
					left: $uni-spacing-row-base;
					z-index: 1;
					display: flex;
					align-items: center;

					view {
						color: #FFFFFF;
					}
				}
			}

			image {
				height: 100%;
				width: 100%;
			}
		}
	}

	.tip {
		padding: $uni-spacing-col-base $uni-spacing-row-base $uni-spacing-col-lg $uni-spacing-row-base;
		color: #FFFFFF;
	}

	.total {
		display: flex;
		align-items: center;
		padding: 32rpx $uni-spacing-row-base $uni-spacing-col-base $uni-spacing-row-base;

		>view {
			display: flex;
			line-height: 34rpx;
			color: #FFFFFF;
			margin-left: 76rpx;

			&:first-child {
				margin-left: 0;
			}

			text {
				vertical-align: top;
				margin-left: 12rpx;
				font-size: 34rpx;
				font-weight: bold;
			}

			view {
				vertical-align: top;
				color: #aaaaaa;
			}
		}
	}

	.status-bar {
		height: var(--status-bar-height)
	}

	.user-info {
		position: relative;
		padding-top: 210rpx;
		padding-right: 240rpx;
		margin-bottom: 36rpx;
        &.user-text-info {
            padding-top: 0;
        }
		.left {
			display: flex;
			align-items: center;

			.user-image {
				.image {
					margin-left: $uni-spacing-row-base;
					border-radius: $uni-border-radius-circle;
					width: 140rpx;
					height: 140rpx;
				}

				position: relative;
			}


			.concat {
				color: #FFFFFF;
				margin-left: $uni-spacing-row-base;
				margin-top: $uni-spacing-col-sm;
			}

			.name {
				width: 50vw;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-top: 20rpx;
				font-size: 42rpx;
				margin-left: $uni-spacing-row-base;
				color: #FFFFFF;
			}
		}

		.right {
			position: absolute;
			right: $uni-spacing-row-base;
			bottom: 20rpx;
			margin-top: 26rpx;
			padding-right: $uni-spacing-row-base;
		}
		.user-view {
			width: 100%;
			flex: 1;
		}
	}

	page {
		background-color: #202328;
	}
	.bg-img {
		width: 100%;
		height: 240rpx;
	}
	.follow-tag {
        display: inline-block;
		line-height: 64rpx;
		height: 64rpx;
        width: 200rpx;
		padding: 0 24rpx;
		border-radius: 60rpx;
		background-color: $uni-color-primary;
		color: #fff;
        text-align: center;
		.icon {
			margin-right: 8rpx;
		}
	}
    .chat-tag {
        display: inline-block;
        line-height: 64rpx;
        width: 200rpx;
        height: 64rpx;
        padding: 0 24rpx;
        margin-left: 20rpx;
        border-radius: 60rpx;
        color: #fff;
        background-color: rgba($color: #fff, $alpha: .3);
        text-align: center;
		.icon {
			margin-right: 8rpx;
		}
    }
	.nav-wrap {
		display: flex;
		margin-top: 70rpx;
		margin-bottom: 15rpx;
		border-bottom: 1px solid #999999;
		color: #fff;
		text-align: center;
		.nav-item {
			padding: 22rpx 40rpx;
			flex: 1;
			font-size: 28rpx;
			color: #aaaaaa;
			&.active {
				position: relative;
				color: #fff;
				font-weight: 500;
				&::after {
					content: '';
					position: absolute;
					left: 50%;
					width: 160rpx;
					margin-left: -80rpx;
					bottom: 0;
					height: 5rpx;
					border-radius: 10rpx;
					background-color: #ffc000;
				}
			}
		}
	}
	.no-text {
		height: 112rpx;
		line-height: 112rpx;
		text-align: center;
		color: #aaa;
		font-size: 24rpx;
	}
</style>
