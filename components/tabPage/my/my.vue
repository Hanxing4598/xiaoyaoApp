<template>
	<view class="wrapper">
		<view>
			<view class="header">
				<view class="left">
					<image src="../../../static/logo.png" class="head-img" @click="goMeIndex" mode="aspectFill">
					</image>
					<view class="text-wrap">
						<view class="name">生活既是如此</view>
						<view class="sub-name">这是我的个人简介</view>
					</view>
				</view>
				<i class="cuIcon-right right"></i>
			</view>
			
			<view class="cu-list menu sm-border">
				<view class="cu-item" v-for="item in 100">
					<view class="content">
						<text class="cuIcon-circlefill text-blue"></text>
						<text class="text-grey">我的订单</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		onLoad() {},
		onShow() {
			let self = this
			//self.getIsLogin()
		},
		async onPullDownRefresh() {},
		methods: {}
	}
</script>
<style lang="scss" scoped>
	image {
		background: none;
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
</style>
