<template>
	<uni-nav-bar :fixed="true" background-color="#ffffff" statusBar="true"
		color="#333538" left-icon="left" @clickLeft="back" 
	/>
	<view>eventDetail</view>
</template>

<script>
export default {
	data() {
		return {
			eventId: ""
		}
	},
	onLoad(e) { // 类型非必填，可自动推导
		this.eventId = e.id;
		console.log("id", id)
	},
	methods: {
		back() {
			console.log("back")
			uni.navigateBack({
				delta: 1
			})
		},

	},
	onShareAppMessage() {
		
	},
	onShareTimeline() {
		
	}
}
</script>

<style>
</style>