<template>
	<uni-nav-bar :fixed="true" background-color="#ffffff" statusBar="true"
		color="#333538" left-icon="left" :titleImage="false" title="登录" @clickLeft="back" 
	/>
	<view class="page">
		<view class="logo">
			<image class="pic" src="@/static/logo.png"></image>
		</view>
		<button class="wxLoginBtn" @click="wxLogin">
			<image class="wechatLogo" src="@/static/icons/wechat-white.png"></image>
			<text class="loginText">微信授权登录</text>
		</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		back() { //TODO: 导航守卫 目前用最笨的方法
			if (getCurrentPages()[0].route == "pages/tabBar/like/like") {
				console.log("go home")
				uni.switchTab({
					url: '/pages/tabBar/home/home'
				})
				return
			}
			uni.navigateBack({
				delta: 1
			})
		},
		wxLogin() {
			return new Promise((resolve, reject) => {
				uni.login({
					provider: 'weixin',
					success(loginRes) {
						uni.request({
							url: 'http://124.222.92.30:8080/system/OAuth/authByWX',
							method: 'POST',
							header: { 'content-type': 'application/x-www-form-urlencoded', },
							data: {
								code: loginRes.code,
							},
							success(res) {
								console.log(res)
								if (res.data.code !== 200) {
									reject(new Error('获取openid失败：', res.data.msg))
									return
								}
								// 简化实现，先不用vuex方案
								uni.setStorageSync('openid', res.data.data.openid)
								resolve(res.data.data.openid)
								uni.navigateBack({
									delta: 1
								})
							},
							fail(err) {
								reject(new Error('获取openid失败：' + err))
							}
						})
					},
					fail(err) {
						reject(err)
					}
				})
			})
		}
	}
}
</script>

<style>
.page {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	gap: 100rpx;
}
.logo {
	display: flex;
	justify-content: center;
	align-items: center;
}
.pic {
	width: 450rpx;
	height: 180rpx;
}
.wxLoginBtn {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20rpx;
	width: 600rpx;
	height: 100rpx;
	border-radius: 100rpx;
	background-color: #20D329;
}
.wechatLogo {
	width: 62rpx;
	height: 50rpx;
}
.loginText {
	color: white;
	letter-spacing: 5rpx;
	font-size: 40rpx;
}
button::after {
	border: none;
}
</style>