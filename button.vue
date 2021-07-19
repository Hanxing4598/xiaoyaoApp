<template>
	<view>
		<view :class="noPad ? '':'padding-xl'" >
			<button :class="`cu-btn block ${size} bg-${color}`" :disabled="loading" @click="buttonClick">
				<text class="cuIcon-loading2 cuIconfont-spin" v-if="loading"></text>{{text}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"custom-button",
		props: {
			text: {
				type: String,
				default() {
					return ''
				}
			},
			size: {
				type: String,
				default() {
					return 'lg'
				}
			},
			status: {
				type: String,
				default() {
					return 'primary'
				}
			},
			color: {
				type: String,
				default() {
					return 'blue'
				}
			},
			noPad: {
				type: Boolean,
				default() {
					return false
				}
			},
			loading: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
			};
		},
		created() {
		},
		methods: {
			buttonClick(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.bg-blue {
		background-color: #0081ff !important;
		color: #fff !important;
	}
	.bg-red {
		background-color: #e54d42 !important;
		color: #fff !important;
	}
</style>
