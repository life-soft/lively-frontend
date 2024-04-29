<template>
	<view>
		<view class="events-list">
			<view class="event-card" v-for="event in events" :key="event.id">
				<image class="event-img" :src="event.eventBanner" mode="aspectFill"></image>
				<view class="event-info">
					<text class="event-time">{{event.eventTime}}</text>
					<text class="event-title">{{event.eventName}}</text>
					<view class="event-location">
						<image class="info-icon" src="@/static/icons/location.png"></image>
						<text class="location-text">杭高院教学楼杭高院教学楼杭高院教学楼杭高院教学楼杭高院教学楼</text>
					</view>
					<view class="event-organizer">
						<image class="info-icon" src="@/static/icons/user.png"></image>
						<text class="organizer-text">软开社软开社软开社软开社软开社软开社软开社软开社软开社软开社</text>
					</view>
				</view>
				<view class="event-actions">
					<view class="action-icon" hover-class="hover">
						<image class="action-img" src="@/static/icons/share.png"></image>
					</view>
					<view class="action-icon" hover-class="hover">
						<image class="action-img" src="@/static/icons/like.png"></image>
						<image v-if="false" src="@/static/icons/like.png"></image>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			events: []
		}
	},
	computed: {
	},
	created() {
	
	},
	mounted() {
		this.getEvents();
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
		getEvents() {
			const apiUrl = 'http://124.222.92.30:8080/system/event/list';
			uni.request({
				url: apiUrl,
				method: 'GET', 
				success: (res) => {
					if (res.statusCode === 200) {
						// 请求成功，更新 events 数组
						this.events = res.data.rows
						console.log(this.events)
						for (let i = 0; i < this.events.length; i++) {
							this.events[i].eventTime = this.formatDatetime(this.events[i].eventStart, this.events[i].eventEnd)
						}
					} else {
						// 服务器返回错误状态码
						console.error('Error: Server returned status code:', res.statusCode)
					}
				},
				fail: (error) => {
					// 请求失败
					console.error('Error fetching activities:', error)
				}
			});
		},
	}
}

</script>

<style lang="scss" scoped>
.events-list {
	margin-left: 30rpx;
	margin-right: 30rpx;
}
.event-card {
	height: 210rpx;
	margin-top: 30rpx;
	margin-bottom: 50rpx;
	display: flex;
	position: relative;
}
.event-img {
	height: 210rpx; 
	width: 210rpx;
	object-fit: cover;
	border-radius: 5rpx;
}
.event-info {
	margin-left: 30rpx;
	width: 450rpx;
	display: flex;
	align-items: left;
	justify-content: center;
	flex-direction: column;
	gap: 4rpx;
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
	font-size: 35rpx;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
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
	bottom: -15rpx;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-end;
	gap: 20rpx;
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
	padding: 10rpx;
	border-radius: 100rpx;
}
.action-img {
	width: 30rpx;
	height: 30rpx;
}
.hover {
	background-color: #f0f0f0;
}
</style>