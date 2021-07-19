<template>
	<view>
		<LookAroundList :list="list"></LookAroundList>
	</view>
</template>

<script>
	import LookAroundList from '@/components/lookAroundList'
	export default {
		data() {
			return {
				list: [{}, {}, {}]
			}
		},
		components: {
			LookAroundList
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
