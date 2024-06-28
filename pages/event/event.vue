<template>
	<uni-nav-bar :fixed="true" background-color="#ffffff" statusBar="true"
		color="#333538" left-icon="left" @clickLeft="back" 
	/>
	<view>eventDetail</view>
	<external-page url="https://www.baidu.com"></external-page>
	
	<rich-text style="padding: 1em;" :nodes="wxContent"/>
</template>

<script>
export default {
	components: {
		externalPage,
	},
	data() {
		return {
			eventId: "",
			wxContent: "",
		}
	},
	onLoad(e) { // 类型非必填，可自动推导
		this.eventId = e.id;
		console.log("id", this.eventId)
		this.getWxContent()
	},
	methods: {
		back() {
			if (getCurrentPages().length == 1) {
				uni.switchTab({
					url: '/pages/tabBar/home/home'
				})
			}
			uni.navigateBack({
				delta: 1
			})
		},
		getWxContent() {
			const apiUrl = 'https://mp.weixin.qq.com/s/kgki3VirEmFSjIA-ujTUhQ'
			uni.request({
				url: apiUrl,
				method: 'GET', 
				success: (res) => {
					console.log("res", res)
					var html = res.data
					console.log("html", html)
					const start = res.data.indexOf('<div id="img-content"')
					const end = res.data.indexOf('<div id="js_tags_preview_toast"')
					html = html.slice(start,end)
					html = html.replace('visibility: hidden; opacity: 0; ','').replaceAll('data-src','src')
					// html = html.replace('id=', 'class=').replace('#', '.')
					this.wxContent = html
					console.log("html", html)
				},
				fail: (error) => {
					console.error('Error fetching activities:', error)
				}
			});
		}

	},
	onShareAppMessage() {
		
	},
	onShareTimeline() {
		
	}
}
</script>

<style scoped>
.content-link {
}
</style>