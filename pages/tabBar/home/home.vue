<template>
	<view>
		<view class="events-list">
			<view class="event-card" v-for="event in events" :key="event.id">
				<image class="event-img" :src="event.eventBanner" mode="aspectFill"></image>
				<view class="event-info">
					<text class="event-time">周五, 12月23日 - 周日, 12月25日 · 16:30-18:00</text>
					<text class="event-title">{{event.eventName}}</text>
					<view class="event-location">
						<image class="icon" src="@/static/icons/location.png"></image>
						<text class="location-text">杭高院教学楼杭高院教学楼杭高院教学楼杭高院教学楼杭高院教学楼</text>
					</view>
					<view class="event-organizer">
						<image class="icon" src="@/static/icons/user.png"></image>
						<text class="organizer-text">软开社软开社软开社软开社软开社软开社软开社软开社软开社软开社</text>
					</view>
				</view>
				<view class="event-actions">
					<uni-icons fontFamily="like">{{'\uebc6'}}</uni-icons>
					
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
	created() {
	
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
						// 请求成功，更新 events 数组
						this.events = res.data.rows;
						console.log(this.events);
					} else {
						// 服务器返回错误状态码
						console.error('Error: Server returned status code:', res.statusCode);
					}
		        },
		        fail: (error) => {
					// 请求失败
					console.error('Error fetching activities:', error);
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
	margin-top: 30rpx;;
	margin-bottom: 60rpx;
	display: flex;
}
.event-img {
	height: 210rpx; 
	width: 210rpx;
	object-fit: cover;
	border-radius: 5px;
}
.event-info {
	margin-left: 30rpx;
	width: 450rpx;
	display: flex;
	align-items: left;
	justify-content: center;
	flex-direction: column;
	gap: 4rpx;
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
	right: 0rpx;
	bottom: 0rpx;
	display: grid;
}
.icon {
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
</style>