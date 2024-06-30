<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
export default {
	data() { 
		return {
			url: "",
		}
	},
	onLoad(e) { // 类型非必填，可自动推导
		this.url = e.url;
		console.log("url", this.url)
	},
	mounted() {
		
	},
	methods: {
		
	}
}
</script>

<style>
</style>