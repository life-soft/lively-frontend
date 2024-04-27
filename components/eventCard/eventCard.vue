<template>
   <!-- 活动卡片 -->
   
   <div class="activity-cards" ref="cardComponentRef" >
      <div v-for="(activity, index) in activities" :key="index" class="activity-card" @click=tocontent(activity)>
        <div class="activity-pic">
           <!-- 使用v-html来处理HTML实体编码 -->
       <img v-if="activity.eventBanner && typeof activity.eventBanner === 'string' && activity.eventBanner.trim() !== ''" :src="activity.eventBanner" alt="Event Banner " class="imgpic"> 
    <!-- 如果没有有效的图片URL，显示一个默认图片或者占位符 -->
       <!-- <img v-else src="default-image.png" alt="Default Image"> --> 
        </div>
        <div class="activity-info">
          <div class="date">{{formatDatetime(activity.eventStart) }}</div>
          <div class="title">{{ activity.eventName}}</div>
          <div class="details">
          <img src="../../static/assets/user.svg" alt=""  class="imgtime">
            <span class="organizer">{{ activity.eventOrganizer }}</span>
          </div>
          <div class="bottom">
           <img src="../../static/assets/dw.svg" alt=""  class="imgOrganizer"/>
          <span class="location">{{ activity.eventDetail }}</span>
          </div>
        </div>
        <div class="sidepic">
          <img src="../../static/assets/love.svg" alt=""  class="imgsidepic"/>
          <img src="../../static/assets/share.svg" alt=""  class="imgsidepic"/>
        </div>
      </div>
      <!-- <slot :data="activities"></slot> -->
    </div>

    <span >{{index}}</span>
</template>
<script>

export default {
  
  data() {
    
    return {    
      activities: [

      ],
      logoPath:"../../static/public/logo.png",
      topinputFortext:"软开社课程",
      
    };
  },
  
  computed: {
    // 计算属性来获取数组的长度
    arrayLength() {
      return this.activities.length;
    },
    
  },

  methods: {
   
    printActivityCount() {
      console.log('活动卡片数量:', this.activities.length);
    },// 解析eventBanner字符串并返回第一个图片URL
   formatDatetime(datetimeString) {
     
     // 创建一个新的Date对象
     const date = new Date(datetimeString);
   
     // 获取日期的各个部分
     const days = ['日', '一', '二', '三', '四', '五', '六'];
     const day = days[date.getDay()];
     const year = date.getFullYear();
     const month = date.getMonth() + 1; // getMonth() 返回的月份是从0开始的
     const dayOfMonth = date.getDate();
     const hours = date.getHours();
     const minutes = date.getMinutes();
   
     // 格式化时间
     let formattedTime = '';
     if (hours < 10) {
       formattedTime += '0';
     }
     formattedTime += hours + ':';
     if (minutes < 10) {
       formattedTime += '0';
     }
     formattedTime += minutes;
   
     // 拼接最终的日期时间字符串
     return `周${day}, ${month}月${dayOfMonth}日 · ${formattedTime}`;
   },  
    tocontent(activity)
    {
		wx.showToast({
		    title: '活动ID: ' + activity.eventId, // 这里可以根据需要自定义提示内容
		    icon: 'none', // 自定义图标，如果不需要可以省略这个选项
		    duration: 2000 // 展示时长，单位为毫秒
		  });
      // alert(activity.eventId)//活动卡片的index
      //this.$router.push({ name: 'contentview', params: { eventId: activity.eventId} });
      console.log('card调用的:', activity); 
      this.$emit('selectEvent', activity);
	    uni.navigateTo({
	      url: '/pages/contentView/contentView?eventId=' +encodeURIComponent(activity.eventId)	    
		  
	    });

    },
   
    fetchActivities() {

      const apiUrl = 'http://124.222.92.30:8080/system/event/list';
      uni.request({
        url: apiUrl,
        method: 'GET', 
        success: (res) => {
          if (res.statusCode === 200) {
            // 请求成功，更新 activities 数组
            this.activities = res.data.rows;
            console.log(this.activities);
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
  },
  created() {

  },
mounted() {
    this.fetchActivities();
  },
};



</script>
<style scoped>
.imgpic{
	/* object-fit: cover; */
	 height: 100%; 
	 width: 100%;
	 object-fit: contain;
	 border-radius: 10px;
}
.activity-pic img {
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: none; /* 移除最大宽度限制，允许图片自然填充容器 */
  height: 100%; /* 使图片高度占满容器 */
  width: 100%; /* 使图片宽度占满容器 */
}
.imgOrganizer{
	  width:14px; /* 设置宽度为自动，保持原始宽高比 */
	  height: 25px; /* 设置高度 */
	max-width: 100%; /* 设置最大宽度为容器宽度的100%，防止溢出 */
	  object-fit: contain; /* 保持图像的完整，同时调整图像以适应容器 */
}	
	
.imgsidepic{
	width:20px;
	margin-right: 5px;
}
.outcome{

height: 3%;
widows: 100%;
}
.noutcome{
color:#626467;
font-size: 1rem;
font-weight: 700;
font-family: 'Inter';
}
svg{
width: 1.5rem;
height: 1rem;
}
.imgdetail{
	width:14px; /* 设置宽度为自动，保持原始宽高比 */
	  height: 14px; /* 设置高度 */
	max-width: 100%; /* 设置最大宽度为容器宽度的100%，防止溢出 */
	  object-fit: contain; /* 保持图像的完整，同时调整图像以适应容器 */
}
	
.imgtime{
	width:14px; /* 设置宽度为自动，保持原始宽高比 */
	  height: 14px; /* 设置高度 */
	max-width: 100%; /* 设置最大宽度为容器宽度的100%，防止溢出 */
	  object-fit: contain; /* 保持图像的完整，同时调整图像以适应容器 */
}
.activity-pic{

  width: 40%; /* 使图片容器宽度占满卡片 */
  height: auto; /* 使高度自适应内容 */
  overflow: hidden; /* 隐藏溢出的内容 */
  position: relative; /* 为图片的绝对定位做准备 */
  margin-right: 10px; /* 根据需要添加右边距，如果需要间隔 */

}
 .date{
font-weight: 700;
color: #EF756E;
font-size: 12px;
line-height: 1.5vh;
}
.container {
display: flex;
flex-direction: column;
height: 90%;
}
.deleteIcon{
margin-right: -40%;
}
.logo{
margin: 0 auto;
}

.top-nav {
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px;
background-color: #fff;

width: 90%;
margin: 0%;
}

.logo img {
width: 100%;
}

.search-bar {
display: flex;
align-items: center;
height: 1.5rem
}

.search-bar input {
flex: 1;
padding: 5px;
border: 1px solid #ddd;
border-radius: 20px;
outline: none;
}

.search-bar button {
padding: 5px 10px;
background-color: #ef756e;
color: #fff;
border: none;
border-radius: 20px;
cursor: pointer;
}



.activity-cards {
flex: 1;
overflow-y: auto;
width: 95%;
}

.activity-card {
display: flex; /* 使活动卡片横向排列 */
border: 1px solid #ddd;
border-radius: 10px;
margin-bottom: 10px;
padding: 10px;
height: 7rem;
margin-left: 5%;
}

.activity-info {
flex: 1;
display: flex;
flex-direction: column;
align-self: center; 
margin-left: 2%;
align-items: flex-start; 
margin-left: 1%;
width: 40%;
}

 .title {
font-size: 18px;
font-weight: bold;
/* S */
text-overflow: ellipsis;
overflow:hidden;

-webkit-line-clamp: 2;
line-height: 1;
/* line-height: 2vh; */
}

 .details {
display: flex;
justify-content: flex-start; /* 左对齐 */
align-items: center; /* 垂直居中对齐 */
flex-wrap: wrap; /* 允许内容换行 */
/* margin-top: 10px; */
margin-bottom: -5px;
  width: 80%; /* 确保详情容器宽度适应 */
}

 .organizer {
  display: flex;
  align-items: center; /* 垂直居中对齐图标和文字 */
  margin-right: 56%; /* 根据需要调整右边距 */
  margin-bottom: 5px; /* 添加底部间距，如果需要的话 */
  font-weight: 400;
  font-size: 12px;
  font-family: inter;
  margin-left: 5%;
  line-height: 19.2px;
}
 .location {
  display: flex;
  align-items: center; /* 垂直居中对齐图标和文字 */
  margin-right: 56%; /* 根据需要调整右边距 */
  margin-bottom: 5px; /* 添加底部间距，如果需要的话 */
  font-weight: 400;
  font-size: 12px;
  font-family: inter;
  line-height: 19.2px;
}
/* 为了确保图标不会太大，可以设置最大宽度和高度 */
.organizericon, .locationicon {
  max-width: 100%; /* 确保图标不会超过容器宽度 */
  max-height: 1em; /* 确保图标高度不会超过行高 */
  margin-right: 5px; /* 图标和文字之间的间距 */
}
.sidepic{
align-self: center;
}
.likeicon{

}
.organizericon
{
line-height: 3vh;
vertical-align: middle;
}
.shareicon
{

}
.top-nav input{
font-size: 1rem;
font-weight: 600;
}
.top-nav input::placeholder
{
color:#EF756E;

}
.bottom {
  display: flex; /* 启用flex布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: flex-start; /* 水平左对齐 */
  width: 80%;
  margin-top: 1px;
  margin-left: -1px;
  vertical-align: middle;
}
/* 媒体查询 - 针对小屏幕设备 */
@media (max-width: 768px) {
  .activity-info .organizer,
  .activity-info .location {
    /* font-size: 0.6rem; /* 减小字体大小以适应小屏幕 */
    /* margin-top: 10px; */ 
    margin-right: 40%; /* 减小右边距以适应小屏幕 */
  }
}
</style>