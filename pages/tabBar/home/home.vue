<template>
	<view>
		home
		<uni-row class="demo-uni-row">
			<uni-col :span="12">
				<view class="demo-uni-col dark"></view>
			</uni-col>
			<uni-col :span="12">
				<view class="demo-uni-col light"></view>
			</uni-col>
		</uni-row>
		<view class="events-list">
			
			<!-- <view class="event-card" v-for="item in events" :key="item.id"> -->
			<!-- <uni-row class="event-card" v-for="item in events" :key="item.id" :gutter="gutter" :width="100">
				<uni-col :span="4">
					<view>image</view>
				</uni-col>
				<uni-col :span="16">
					<view>info</view>
				</uni-col>
				<uni-col :span="4">
					<view>action</view>
				</uni-col>
			</uni-row> -->
			<!-- </view> -->
		</view>

	</view>
</template>

<script>
export default {
	data() {
		events: [1, 2, 3, 4]
	}
}

</script>

<style scoped>
.events-list {
	
}
.event-card {
	
}



.demo-uni-col {
	height: 36px;
	border-radius: 4px;
}

.dark_deep {
	background-color: #99a9bf;
}

.dark {
	background-color: #d3dce6;
}

.light {
	background-color: #e5e9f2;
}
</style>