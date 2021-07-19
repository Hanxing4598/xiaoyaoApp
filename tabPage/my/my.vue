<template>
	<view class="wrapper">
		<view>
			<view class="header" @click="toLink(`/pages/userInfo/userInfo`)" v-if="isLogin">
				<view class="left">
					<image src="../../../static/logo.png" class="head-img" mode="aspectFill">
					</image>
					<view class="text-wrap">
						<view class="name">人间小苦瓜啊</view>
						<view class="sub-name">这是我的个人简介</view>
					</view>
				</view>
				<i class="cuIcon-right right"></i>
			</view>
			<view class="flex justify-center header">
				<view class="left">
					<view class="text-wrap">
						<view class="name">你还未登录哦</view>
						<view class="sub-name">
							<button class="cu-btn round bg-blue shadow" @click="toLink(`/pages/login/login`)" >立即登录</button>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list grid col-4 no-border" >
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="toLink(item.url)">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- <view class="box-link-wrap">
			    <view class="box" @click="goMyProfit">
			        <view class="text">
			            <text>钱包</text>
			        </view>
			        <view class="num price"><text class="s">￥</text>10000</view>
					<button class="cu-btn bg-blue shadow withdraw-button" @tap="showModal" data-target="menuModal">我要提现</button>
			    </view>
			</view> -->
			<view class="cu-list menu sm-border">
				<view class="cu-item" @click="toLink(`/pages/followList/followList`)">
					<view class="content">
						<text class="cuIcon-circlefill text-blue"></text>
						<text class="text-grey">我的关注</text>
					</view>
				</view>
				<view class="cu-item" @click="toLink(`/pages/userDetail/userDetail`)">
					<view class="content">
						<text class="cuIcon-circlefill text-blue"></text>
						<text class="text-grey">我的作品</text>
					</view>
				</view>
				<view class="cu-item" @click="toLink(`/pages/history/history`)">
					<view class="content">
						<text class="cuIcon-circlefill text-blue"></text>
						<text class="text-grey">我的足迹</text>
					</view>
				</view>
				<view class="cu-item" @click="toLink(`/pages/addProduct/addProduct`)">
					<view class="content">
						<text class="cuIcon-circlefill text-blue"></text>
						<text class="text-grey">发布商品</text>
					</view>
				</view>
				<view class="cu-item" @click="toLink(`/pages/addLookAround/addLookAround`)">
					<view class="content">
						<text class="cuIcon-circlefill text-blue"></text>
						<text class="text-grey">发布随便看</text>
					</view>
				</view>
				<view class="cu-item" @click="toLink(`/pages/upload/upload`)">
					<view class="content">
						<text class="cuIcon-circlefill text-blue"></text>
						<text class="text-grey">发布视频</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				cuIconList: [{
					cuIcon: 'pay',
					color: 'gray',
					name: '待付款',
					badge: 0,
					url: '/pages/order/list/list?type=1'
				},{
					cuIcon: 'send',
					color: 'gray',
					name: '待发货',
					badge: 2,
					url: '/pages/order/list/list?type=2'
				},{
					cuIcon: 'deliver',
					color: 'gray',
					name: '待收货',
					badge: 5,
					url: '/pages/order/list/list?type=3'
				},{
					cuIcon: 'safe',
					color: 'gray',
					name: '已完成',
					badge: 0,
					url: '/pages/order/list/list?type=4'
				}]
			}
		},
		onLoad() {},
		onShow() {
			let self = this
			//self.getIsLogin()
		},
		computed: {
			isLogin() {
				return this.$store.state.user.isLogin
			}
		},
		async onPullDownRefresh() {},
		methods: {
			toLink(url) {
				if (!url) {
					return
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	image {
		background: none;
	}
	.wrapper {
		padding-bottom: 160rpx;
	}

	.header {
		display: flex;
		justify-content: space-between;
		padding: 40rpx 20rpx;
		align-items: center;
		background-color: #fff;
		.head-img {
			width: 150rpx;
			height: 150rpx;
			margin-right: 20rpx;
			border-radius: 50%;
		}
		.left {
			display: flex;
		}
		.text-wrap {
			padding: 20rpx 0;
		}
		.name {
			font-size: 32rpx;
		}
		.sub-name {
			margin-top: 20rpx;
			font-size: 24rpx;
			color: $uni-text-color-grey;
		}
		.right {
			font-size: 40rpx;
		}
	}
	.cu-list {
		margin-top: $uni-spacing-col-lg;
	}
	.price {
		font-weight: bold;
		font-size: 32rpx;
		color: #dd514c;
	}
	
	.box-link-wrap {
		position: relative;
	    display: flex;
	    margin: 20rpx 0;
	    .box {
	        padding: 30rpx;
	        flex: 1;
	        background-color: #fff;
	        &:first-child {
	            margin-right: 20rpx;
	        }
	    }
	    .text {
	        display: flex;
	        justify-content: space-between;
	        font-size: 32rpx;
	    }
	    .num {
	        margin-top: 30rpx;
	        font-size: 36rpx;
	        font-weight: bold;
	        .s {
	            font-size: 28rpx;
	            font-weight: normal;
	        }
	    }
	}
	.withdraw-button {
		position: absolute;
		right: 60rpx;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
