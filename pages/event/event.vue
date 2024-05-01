<template>
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
}
</script>

<style>
</style>