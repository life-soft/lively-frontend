<template>
	<uni-nav-bar :fixed="true" background-color="#ffffff" statusBar="true"	/>
	<view>
		<event-card-list :events="events"></event-card-list>
		<view v-if="noEvent" class="no-liked">
			<image src="@/static/go-shopping.png"></image>
			<text class="remind">快去收藏你喜欢的活动吧！</text>
		</view>
	</view>
</template>

<script>
import eventCardList from "@/components/eventCardList/eventCardList.vue"
export default {
	onShow() {
		let openid = uni.getStorageSync("openid")
		console.log("openid when entering like", openid)
		if (openid.length == 0) {
			console.log("not login")
			uni.navigateTo({
				url: '/pages/login/wxLogin'
			})
			return
		}
		this.getEvents();	
	},	
	mounted() {
		this.getEvents();
	},
	onPullDownRefresh() {
		this.getEvents();	
	},
	components: {
		eventCardList
	},
	data() { 
		return {
			events: [],
			noEvent: false,
		}
	},
	computed: {
	},

	methods: {
		getEvents() {
			const apiUrl = 'http://124.222.92.30:8080/system/event/collectList';
			uni.request({
				url: apiUrl,
				method: 'POST',
				// header: { 'content-type': 'application/x-www-form-urlencoded', },
				data: {
					"openID": uni.getStorageSync("openid")
				},
				success: (res) => {
					if (res.statusCode === 200) {
						if (res.data.total == 0) {
							this.events = []
							this.noEvent = true
							return 
						}
						this.noEvent = false
						this.events = res.data.rows
						console.log(this.events)
						for (let i = 0; i < this.events.length; i++) {
							this.events[i].isCollected = 1 //TODO
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
.no-liked {
	margin-top: 200rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 40rpx;
	.remind {
		font-size: 50rpx;
		font-weight: bold;
		color: $uni-color-primary;
	}
}

</style>