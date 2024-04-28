<template>
	<view>
		<view class="events-list">
			<view class="event-card" v-for="event in events" :key="event.id">
				<image class="event-img" :src="event.eventBanner" mode="aspectFill"></image>
				<view class="event-info">
					<view class="event-time">周五, 12月23日 - 周日, 12月25日 · 16:30-18:00</view>
					<view class="event-title">{{event.eventName}}测试测试测试测试测试测试测试测</view>
					<view class="event-location">
						<image class="icon" src="@/static/icons/location.png"></image>
						<text>杭高院教学楼311</text>
					</view>
					<view class="event-organizer">
						<image class="icon" src="@/static/icons/user.png"></image>
						<text>软开社</text>
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
	height: 220rpx;
	margin-top: 30rpx;;
	margin-bottom: 60rpx;
	display: flex;
}
.event-img {
	height: 220rpx; 
	width: 220rpx;
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
}
.event-title {
	color: $uni-color-info-dark;
	font-weight: bold;
	font-size: 35rpx;
	// max-height: 200rpx;
	// overflow: hidden;
}
.event-location {
	color: $uni-color-info-light;
	font-weight: bold;
	font-size: 27rpx;
	display: flex;
	align-items: center;
	flex-direction: row;	
	gap: 10rpx;
}
.event-organizer {
	color: $uni-color-info-light;
	font-size: 27rpx;
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
</style>