<template>
	<view>
		<form>
			<upload-img labelText="商品主图"></upload-img>
			<view class="cu-form-group">
				<view class="title">商品标题</view>
				<input placeholder="请输入商品标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">商品价格</view>
				<input placeholder="请输入商品价格" name="input"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">商品描述</view>
				<textarea maxlength="-1" placeholder="请输入商品描述"></textarea>
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

<style>

</style>
