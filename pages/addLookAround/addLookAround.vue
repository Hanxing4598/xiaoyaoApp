<template>
	<view>
		<form>
			<view class="cu-form-group">
				<input placeholder="嗯,取个好点的标题吧..." name="input"></input>
			</view>
			<view class="cu-form-group">
				<textarea placeholder="新鲜的话题可以获得更多关注哦..." name="input"></textarea>
			</view>
			<upload-img :count="9"></upload-img>
			<view class="cu-form-group">
				<input placeholder="定位可选" name="input" disabled="disabled"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			
			<custom-button text="立即发布"></custom-button>
		</form>
	</view>
</template>

<script>
	import UploadImg from '@/components/uploadImg/uploadImg'
	export default {
		data() {
			return {
				imgList: []
			}
		},
		components: {
			UploadImg
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #fff;
	}
</style>
