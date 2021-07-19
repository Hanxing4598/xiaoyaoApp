<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="item.id===curTab?'text-orange cur':''" v-for="(item, index) in tabList" :key="item.id" @tap="tabSelect" :data-id="item.id">
					{{item.text}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curTab: 1,
				tabList: [{
					id: 1,
					text: '待付款'
				},{
					id: 2,
					text: '待发货'
				},{
					id: 3,
					text: '待收货'
				},{
					id: 4,
					text: '已完成'
				}]
			}
		},
		onLoad({ type }) {
			if (type) {
				this.curTab = Number(type)
			}
		},
		methods: {
			tabSelect(e) {
				this.curTab = e.currentTarget.dataset.id
			}
		}
	}
</script>

<style>

</style>
