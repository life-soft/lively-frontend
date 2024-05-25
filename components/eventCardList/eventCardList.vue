<template>
	<view class="events-list">
		<view class="event-card" @click="gotoEventDetail(event.eventId)" v-for="(event, index) in events" :key="index">
			<view class="event-img-block">
				<image class="event-img" :src="event.eventBanner" mode="aspectFill"></image>
			</view>
			<view class="event-info">
				<text class="event-time">{{event.eventTime}}</text>
				<text class="event-title">{{event.eventName}}</text>
				<view class="event-location">
					<image class="info-icon" src="@/static/icons/location.png"></image>
					<text class="location-text">初识测试测试初识测试测试初识测试测试</text>
				</view>
				<view class="event-organizer">
					<image class="info-icon" src="@/static/icons/user.png"></image>
					<text class="organizer-text">{{event.organizerName}}软开社软开社软开社软开社软开社软开社软开社软开社软开社软开社</text>
				</view>
			</view>
			<view class="event-actions">
				<button class="action-button" open-type="share" :data-event='event' hover-class="is-hover" @click.stop>
					<image class="action-img" src="@/static/icons/share.png"></image>
				</button>
				<button class="action-button" hover-class="is-hover" @click.stop="likeOrDislikeEvent(index)">
					<image v-if="event.userLike" class="action-img" src="@/static/icons/like-filled.png"></image>
					<image v-else class="action-img" src="@/static/icons/like.png"></image>
				</button>
			</view>
		</view>
	</view>
		
</template>

<script>
export default {
	name: "event-card-list",
	props: {
		events: Array,
	},
	watch: {
		events(oldVal, newVal) {
			this.eventDataProcess()
		}
	},
	methods: {
		formatDatetime(eventStart, eventEnd) {
			// 创建一个新的Date对象
			const start = new Date(eventStart)
			const end = new Date(eventEnd)			
		
			// 获取日期的各个部分
			const days = ['日', '一', '二', '三', '四', '五', '六']
			const startDay = days[start.getDay()]
			const endDay = days[end.getDay()]
			const startYear = start.getFullYear()
			const endYear = end.getFullYear()
			const startMonth = start.getMonth() + 1 // getMonth() 返回的月份是从0开始的
			const endMonth = end.getMonth() + 1 // getMonth() 返回的月份是从0开始的
			const startDayOfMonth = start.getDate()
			const endDayOfMonth = end.getDate()
			const startHours = start.getHours()
			const endHours = end.getHours()
			const startMinutes = start.getMinutes()
			const endMinutes = end.getMinutes()
		
			// 格式化时间
			let formattedStartTime = ''
			let formattedEndTime = ''
			if (startHours < 10) {
				formattedStartTime += '0'
			}
			if (endHours < 10) {
				formattedEndTime += '0'
			}
			formattedStartTime += startHours + ':'
			formattedEndTime += endHours + ':'
			if (startMinutes < 10) {
				formattedStartTime += '0'
			}
			if (endMinutes < 10) {
				formattedEndTime += '0'
			}
			formattedStartTime += startMinutes
			formattedEndTime += endMinutes
			
			let formattedDate = ''
			if (startDay == endDay && startMonth == endMonth && startYear == endYear) {
				formattedDate = `周${endDay}, ${endMonth}月${endDayOfMonth}日 `
			} else {
				formattedDate = `周${startDay}, ${startMonth}月${startDayOfMonth}日 - 周${endDay}, ${endMonth}月${endDayOfMonth}日`
			}
		
			// 拼接最终的日期时间字符串
			return `${formattedDate} · ${formattedStartTime}-${formattedEndTime}`
		},
		eventDataProcess() {
			for (let i = 0; i < this.events.length; i++) {
				this.events[i].eventTime = this.formatDatetime(this.events[i].eventStart, this.events[i].eventEnd)
			}
		},
		gotoEventDetail(eventId) {
			console.log("eventId", eventId)
		    uni.navigateTo({
				url: '/pages/event/event?id=' + encodeURIComponent(eventId),	    
				animationType: "slide-in-right",
		    });
		},
		likeOrDislikeEvent(index) {
			console.log("like or dislike event", this.events[index])
			// 登录后才可使用按钮，有更好的实现方式？
			let openid = uni.getStorageSync("openid")
			console.log("openid: ",openid)
			if (openid.length == 0) {
				console.log("not login")
				uni.navigateTo({
					url: '/pages/login/wxLogin'
				})
				return
			} else {
				this.events[index].userLike = this.events[index].userLike == false ? true : false
				
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.events-list {
	margin-left: 30rpx;
	margin-right: 30rpx;
}
.event-card {
	height: 230rpx;
	margin-top: 20rpx;
	margin-bottom: 35rpx;
	display: flex;
	position: relative;
}
.event-img {
	height: 210rpx; 
	width: 210rpx;
	object-fit: cover;
	border-radius: 10rpx;	
}
.event-img-block {
	display: flex;
	align-items: center;
}
.event-info {
	margin-left: 30rpx;
	width: 450rpx;
	display: flex;
	align-items: left;
	justify-content: center;
	flex-direction: column;
	gap: 10rpx;
	left: 240rpx;
}
.event-time {
	color: $uni-color-primary;
	font-weight: bold;
	font-size: 27rpx;
	width: 410rpx;
	overflow: hidden; 
	white-space: nowrap; 
	text-overflow: ellipsis;
}
.event-title {
	color: $uni-color-info-dark;
	font-weight: bold;
	font-size: 38rpx;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-height: 1.2;
	max-height: 300rpx;
}
.event-location {
	display: flex;
	align-items: center;
	flex-direction: row;	
	gap: 10rpx;
}
.event-organizer {
	display: flex;
	align-items: center;
	flex-direction: row;	
	gap: 10rpx;
}
.event-actions {
	position: absolute;
	right: -10rpx;
	bottom: -10rpx;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-end;
	gap: 10rpx;
}
.info-icon {
	width: 27rpx;
	height: 27rpx;
}
.location-text {
	color: $uni-color-info-light;
	font-weight: bold;
	font-size: 27rpx;
	width: 410rpx;
	overflow: hidden;
	white-space: nowrap; 
	text-overflow: ellipsis;
}
.organizer-text {
	color: $uni-color-info-light;
	font-size: 27rpx;
	width: 310rpx;
	overflow: hidden; 
	white-space: nowrap; 
	text-overflow: ellipsis;
}
.action-icon {
	width: 30rpx;
	height: 30rpx;
	padding: 15rpx;
	border-radius: 100rpx;
}
.action-img {
	width: 30rpx;
	height: 30rpx;
}
.action-button {
	padding: 15rpx;
	border-radius: 100rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: transparent;
}
.is-hover {
	background-color: #f0f0f0;
}
button::after {
	border: none;
}
</style>