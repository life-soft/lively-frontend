<template>
	<uni-nav-bar :fixed="true" background-color="#ffffff" statusBar="true"	/>
	
	<view>
		<event-card-list :events="events"></event-card-list>
	</view>
</template>

<script>
import eventCardList from "@/components/eventCardList/eventCardList.vue"
export default {
	components: {
		eventCardList
	},
	data() { 
		return {
			events: []
		}
	},
	computed: {
	},
	mounted() {
		this.getEvents();
	},
	onPullDownRefresh() {
		this.getEvents();	
	},
	onShow() {
		this.getEvents();	
	},
	methods: {
		getEvents() {
			const apiUrl = 'http://124.222.92.30:8080/system/event/list';
			console.log("open",uni.getStorageSync("openid"))
			uni.request({
				url: apiUrl,
				method: 'POST', 
				// header: { 'content-type': 'application/x-www-form-urlencoded', },
				data: {
					"openID": uni.getStorageSync("openid")
				},
				success: (res) => {
					console.log("events", res)
					if (res.statusCode === 200) {
						this.events = res.data.rows
					} else {
						console.error('Error: Server returned status code:', res.statusCode)
					}
				},
				fail: (error) => {
					console.error('Error fetching activities:', error)
				}
			});
		},
		
	},
	onShareAppMessage(res) {
		console.log("share message", res)
		if (res.from == "menu") {
			return {
				title: "快来感受活动的力量"
			}
		}
		if (res.from == "button") {
			let e = res.target.dataset.event
			return {
				title: e.eventName,
				path: '/pages/event/event?id=' + encodeURIComponent(e.eventId),
				imageUrl: e.eventBanner
			}
		}
		
	},
}

</script>

<style lang="scss" scoped>
</style>