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
	methods: {
		getEvents() {
			const apiUrl = 'http://124.222.92.30:8080/system/event/list';
			uni.request({
				url: apiUrl,
				method: 'GET', 
				success: (res) => {
					if (res.statusCode === 200) {
						this.events = res.data.rows
						console.log(this.events)
						for (let i = 0; i < this.events.length; i++) {
							this.events[i].userLike = false //TODO
						}
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