<template>
	<view class="look-wrapper">
		<lookAroundList :list="list"></lookAroundList>
	</view>
</template>

<script>
	import LookAroundList from '@/components/lookAroundList'
	export default {
		data() {
			return {
				list: [{}, {}, {}, {}]
			}
		},
		components: {
			LookAroundList
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	.look-wrapper {
		padding-bottom: $uni-bottom-height;
	}
</style>
