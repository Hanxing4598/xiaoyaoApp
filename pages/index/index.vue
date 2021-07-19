<template>
	<view>
		<my v-if="PageCur === 'my'"></my>
		<Notice v-if="PageCur === 'notice'"></Notice>
		<Pic v-if="PageCur === 'pic'"></Pic>
		<Video v-if="PageCur === 'video'"></Video>
		<view class="cu-bar tabbar footer" :class="{ black: PageCur === 'video' }">
			<view class="action text-white" @click="navChange" data-cur="video">
				<view :class="PageCur === 'video' ? 'cuIcon-videofill': 'cuIcon-video'"></view> 视频
			</view>
			<view class="action text-white" @click="navChange" data-cur="pic">
				<view :class="PageCur === 'pic' ? 'cuIcon-picfill': 'cuIcon-pic'"></view> 随便看
			</view>
			<view class="action text-white add-action" @click="publish" >
				<button class="cu-btn cuIcon-add bg-white shadow"></button>
				发布
			</view>
			<view class="action text-white" @click="navChange" data-cur="notice">
				<view :class="PageCur === 'notice' ? 'cuIcon-noticefill': 'cuIcon-notice'">
					<view class="cu-tag badge">99</view>
				</view>
				消息
			</view>
			<view class="action text-white" @click="navChange" data-cur="my">
				<view :class="PageCur === 'my' ? 'cuIcon-myfill': 'cuIcon-my'">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	import My from '@/components/tabPage/my/my'
	import Notice from '@/components/tabPage/notice/notice'
	import Pic from '@/components/tabPage/pic/pic'
	import Video from '@/components/tabPage/video/video'
	export default {
		name: "index",
		data() {
			return {
				PageCur: 'pic'
			};
		},
		props: {
			type: {
				type: String,
				default() {
					return 'pic'
				}
			}
		},
		components: {
			My,
			Notice,
			Pic,
			Video
		},
		created() {
			this.PageCur = this.type
		},
		methods: {
			navChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				uni.navigateTo({
					url: `/pages/tabPage/${this.PageCur}/${this.PageCur}`
				})
			},
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			publish() {
				uni.showActionSheet({
					itemList: ['发布视频', '发布随便看'],
					success(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: $uni-theme-color;
		&.black {
			background-color: rgba($color: #000000, $alpha: 0.3);
		}
	}
</style>
