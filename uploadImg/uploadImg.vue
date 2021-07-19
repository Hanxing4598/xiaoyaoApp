<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
				{{labelText}}
			</view>
			<view class="action">
				{{imgList.length}}/{{count}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="viewImage" :data-url="imgList[index]">
				 <image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseImage" v-if="imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			count: {
				type: Number,
				default() {
					return 4
				}
			},
			labelText: {
				type: String,
				default() {
					return '图片上传'
				}
			}
		},
		data() {
			return {
				imgList: []
			}
		},
		methods: {
			getImgList() {
				return this.imgList.join(',')
			},
			chooseImage() {
				const that = this
				uni.chooseImage({
					count: this.count, //默认4
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						that.$emit('choose', res.tempFilePaths, this.imgList)
					}
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			delImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除该图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							that.$emit('del', this.imgList[e.currentTarget.dataset.index])
						}
					}
				})
			},
		}
	}
</script>

<style>
</style>
