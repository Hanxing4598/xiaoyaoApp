<template>
	<view class="notice-wrapper">
		<view class="cu-list menu-avatar">
			<view class="cu-item " v-for="item in 20" :key="item">
				<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-pink"><view class="text-cut">莫甘娜</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut">这是个人描述</view></view>
				</view>
				<view class="action">
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round bg-blue">关注</button>
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
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.notice-wrapper {
		padding-bottom: $uni-bottom-height;
	}
	.cu-list.menu-avatar>.cu-item .action {
		width: auto;
	}
</style>
