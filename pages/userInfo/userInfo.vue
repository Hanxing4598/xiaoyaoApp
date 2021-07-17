<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">头像</view>
				<view class="cu-avatar" @click="changeAvatar">
					<image class="avatar" src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">登录名</view>
				<input class="input" placeholder="" value="hxing641" disabled="disabled"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">昵称</view>
				<input class="input" placeholder="请输入昵称"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">生日</view>
				<picker mode="date" :value="formData.birthday" :start="startDate" :end="endDate" @change="birthdayChange">
					<view class="picker">
						{{formData.birthday}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">城市</view>
				<pick-regions :defaultRegion="defaultRegion" @getRegion="handleGetRegion">
					<view class="picker">
						{{formData.city}}
					</view>
				</pick-regions>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">详细地址</view>
				<textarea class="input" maxlength="-1" placeholder="请输入详细地址"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">身高</view>
				<input class="input" placeholder="请输入身高"></input>
				<text class="after-text">cm</text>
			</view>
			<view class="cu-form-group">
				<view class="title">体重</view>
				<input class="input" placeholder="请输入体重"></input>
				<text class="after-text">kg</text>
			</view>
			
			<custom-button text="提交" :loading="loading" @click="submitForm"></custom-button>
		</form>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	const BIRTHDAY_TIPS = '请选择生日'
	const CITY_TIPS = '请选择城市'
	export default {
		data() {
			return {
				formData: {
					birthday: BIRTHDAY_TIPS,
					city: CITY_TIPS,
					detailAddress: ''
				},
				endDate: new dayjs().format('YYYY-MM-DD'),
				startDate: '1930-01-01',
				defaultRegion:['广东省','深圳市'], // 默认城市
				loading: false
			}
		},
		onLoad() {
			console.log(this.endDate)
			uni.showModal({
				content: '222',
				title: '提示'
			})
		},
		components: {
			pickRegions
		},
		methods: {
			submitForm() {
				console.log(this.formData)
			},
			handleGetRegion(data) {
				this.formData.city = data.map(item => item.name).join('')
			},
			birthdayChange(date) {
				this.formData.birthday = date.detail.value
			},
			changeAvatar() {
				this.$utils.$upload({
					count: 2
				})
			}
		}
	}
</script>

<style lang="scss" scoped> 
	.avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.cu-avatar {
		background: none;
	}
	.input {
		text-align: right;
	}
</style>
