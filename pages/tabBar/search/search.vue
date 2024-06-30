<template>
	<uni-nav-bar :fixed="true" background-color="#ffffff" statusBar="true"	/>
	<view class="header" :style="{top: topBarHeight}">
		<view class="search-box">
			<image class="icon" src="@/static/icons/search.png"></image>
			<input class="input" v-model="searchInput" @confirm="search()" confirm-type="search" placeholder="请输入关键词" />
			<image class="icon" @click="cleanSearchBar()" src="@/static/icons/cancel.png"></image>
			<text class="search-button" @click="search()">搜索</text>
		</view>
		<view class="filters">
			<view class="tag-filter" @click="showDrawer">
				<image class="icon" src="@/static/icons/filter-light.png"></image>
				<view v-if="tagsPickedCount > 0" style="margin-right: 4rpx;">{{tagsPickedCount}}</view>
				<view>筛选</view>
				<image class="icon" src="@/static/icons/chevron-down-light.png"></image>
			</view>
			<view v-for="(tag, index) in tagsPicked" :key="index" class="tag-filter" @click="deleteTag(index)">
				{{tag}}
			</view>
		</view>
	</view>
	<view class="results">
		<!-- <view class="results-count">
			{{eventsCount}}条结果
		</view> -->
		<event-card-list :events="events" class="events-list"></event-card-list>
	</view>
	<uni-drawer class="drawer" :maskClick="false" ref="showRight" mode="right" width="750">
		<view class="header">
			<image class="icon" @click="closeDrawer()" src="@/static/icons/arrow-left.png"></image>
			<view class="title">筛选</view>
			<view class="clear" @click="cleartags()">清空</view>
		</view>
		<view class="content" scroll-y="true">
			<view class="filter-title">活动类型</view>
			<view v-for="(tagInfo, index) in tagsInfo" :key="index" 
				class="tag-filter" 
				:style="{color: isTagPicked(tagInfo.tagName) ? 'white' : '#333538', backgroundColor: isTagPicked(tagInfo.tagName) ? '#ef756e' : '#fff5ee'}" 
				@click="clickTag(tagInfo.tagName)"
			>
				{{tagInfo.tagName}}
			</view>
		</view>
		<view class="footer">
			<view class="submit-button" @click="filterSubmit()">确 认</view>
		</view>
	</uni-drawer>
</template>

<script>
import eventCardList from "@/components/eventCardList/eventCardList.vue"
export default {
	components: {
		eventCardList,
	},
	data() { 
		return {
			events: [],
			searchInput: "",
			tagsPicked: [], // 还是用boolean表？
			tagsPickedTemp: [],
			
			tagsInfo: []
		}
	},
	computed: {
		tagsPickedCount() {
			return this.tagsPicked.length
		},
		eventsCount() {
			return this.events.length
		},
		topBarHeight() {
			return (uni.getSystemInfoSync().statusBarHeight + 44) + 'px' // 导航栏高度44px
		}
	},
	onPullDownRefresh() {
		this.getEvents()
	},
	onShow() {
		this.getEvents()
	},
	mounted() {
		this.getEvents()
		this.getTags()
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
					} else {
						console.error('Error: Server returned status code:', res.statusCode)
					}
				},
				fail: (error) => {
					console.error('Error fetching activities:', error)
				}
			});
		},
		cleanSearchBar() {
			this.searchInput = ""
		},
		search() {
			console.log("search something")
		},
		deleteTag(index) {
			this.tagsPicked.splice(index, 1)
			// TODO: search again
		},
		
		// TODO 选择标签功能做得特别差，待改进
		showDrawer() {
			this.tagsPickedTemp = this.tagsPicked.slice()
			this.$refs.showRight.open()
		},
		closeDrawer() {
			this.$refs.showRight.close()
		},
		filterSubmit() {
			this.tagsPicked = this.tagsPickedTemp.slice() 
			this.$refs.showRight.close()
			// TODO: search again
		},
		cleartags() {
			this.tagsPickedTemp = []
		},
		isTagPicked(tag) {
			return this.tagsPickedTemp.includes(tag)
		},
		clickTag(tag) {
			let index = 0;
			index = this.tagsPickedTemp.indexOf(tag)
			console.log(index)
			if (index > -1) {
				this.tagsPickedTemp.splice(index, 1)
			} else {
				this.tagsPickedTemp.push(tag)
			}
		},
		getTags() {
			const apiUrl = 'http://124.222.92.30:8080/system/tag/list';
			uni.request({
				url: apiUrl,
				method: 'GET', 
				success: (res) => {
					if (res.statusCode === 200) {
						this.tagsInfo = res.data.rows
					} else {
						console.error('Error: Server returned status code:', res.statusCode)
					}
				},
				fail: (error) => {
					console.error('Error fetching activities:', error)
				}
			});
		}
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
.header {
	background-color: #ffffff;
	position: fixed;
	left: 0rpx;
	width: 100%;
	z-index: 100;
}
.search-box {
	padding: 15rpx;
	margin: 30rpx;
	border-bottom: 1rpx solid #e0e0e0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	
	.icon {
		width: 40rpx;
		height: 40rpx;
	}
	.input {
		margin-left: 10rpx;
		margin-right: 10rpx;
		font-size: 40rpx;
		width: 470rpx;
		color: $uni-color-primary;
	}
	.cancel-button {
		border-radius: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: transparent;
	}
	.search-button {
		color: $uni-color-info-light;
		font-size: 30rpx;
		width: 60rpx;
		height: 40rpx;
		padding-left: 15rpx;
		border-left: 2rpx solid #e0e0e0;
		border-radius: 0rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: transparent;
	}
}
.filters {
	margin: 20rpx 30rpx;
	font-size: 30rpx;
	color: white;
	font-weight: bold;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10rpx;
	overflow: hidden;
	overflow-x: auto;
	white-space: nowrap;
	scrollbar-width: none;
	  
	&::-webkit-scrollbar {
		display: none;
	}
	.tag-filter {
		width: auto;
		padding: 10rpx 15rpx;
		border-radius: 100rpx;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: $uni-color-primary;
		
		.icon {
			height: 30rpx;
			width: 30rpx;
			margin: 5rpx 8rpx;
		}
	}
	
}
.results-count {
	margin-left: 30rpx;
	margin-bottom: -20rpx;
	color: $uni-color-info-light;
	font-size: 30rpx;
	font-weight: bold;
}
.results {
	position: relative;
	top: 200rpx;
}
.drawer {
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #ffffff;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		.icon {
			width: 50rpx;
			height: 50rpx;
			padding: 20rpx 30rpx;
		}
		.title {
			font-size: 50rpx;
			color: $uni-color-info-dark;
			font-weight: bold;
			padding: 20rpx;
		}
		.clear {
			font-size: 35rpx;
			color: $uni-color-info-light;
			padding: 20rpx;
		}
	}
	.content {
		position: relative;
		margin-top: 120rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		overflow-y: auto; // TODO: scroll
		display: inline-block;
		
		.tag-filter {
			width: auto;
			font-size: 30rpx;
			padding: 10rpx 15rpx;
			border-radius: 100rpx;
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background-color: $uni-color-primary;
			margin: 10rpx;
		}
		.filter-title {
			color: $uni-color-info-dark;
			font-size: 40rpx;
			font-weight: 500;
			margin-bottom: 15rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
		}
	}
	.footer {
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		height: 150rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.submit-button {
			font-size: 30rpx;
			font-weight: bold;
			color: $uni-color-info-dark;
			width: 400rpx;
			height: 70rpx;
			border: 1rpx solid $uni-color-info-light;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
button::after {
	border: none;
}
</style>