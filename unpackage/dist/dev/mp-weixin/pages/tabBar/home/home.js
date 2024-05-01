"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      events: []
    };
  },
  computed: {},
  created() {
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    formatDatetime(eventStart, eventEnd) {
      const start = new Date(eventStart);
      const end = new Date(eventEnd);
      const days = ["日", "一", "二", "三", "四", "五", "六"];
      const startDay = days[start.getDay()];
      const endDay = days[end.getDay()];
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();
      const startMonth = start.getMonth() + 1;
      const endMonth = end.getMonth() + 1;
      const startDayOfMonth = start.getDate();
      const endDayOfMonth = end.getDate();
      const startHours = start.getHours();
      const endHours = end.getHours();
      const startMinutes = start.getMinutes();
      const endMinutes = end.getMinutes();
      let formattedStartTime = "";
      let formattedEndTime = "";
      if (startHours < 10) {
        formattedStartTime += "0";
      }
      if (endHours < 10) {
        formattedEndTime += "0";
      }
      formattedStartTime += startHours + ":";
      formattedEndTime += endHours + ":";
      if (startMinutes < 10) {
        formattedStartTime += "0";
      }
      if (endMinutes < 10) {
        formattedEndTime += "0";
      }
      formattedStartTime += startMinutes;
      formattedEndTime += endMinutes;
      let formattedDate = "";
      if (startDay == endDay && startMonth == endMonth && startYear == endYear) {
        formattedDate = `周${endDay}, ${endMonth}月${endDayOfMonth}日 `;
      } else {
        formattedDate = `周${startDay}, ${startMonth}月${startDayOfMonth}日 - 周${endDay}, ${endMonth}月${endDayOfMonth}日`;
      }
      return `${formattedDate} · ${formattedStartTime}-${formattedEndTime}`;
    },
    getEvents() {
      const apiUrl = "http://124.222.92.30:8080/system/event/list";
      common_vendor.index.request({
        url: apiUrl,
        method: "GET",
        success: (res) => {
          if (res.statusCode === 200) {
            this.events = res.data.rows;
            console.log(this.events);
            for (let i = 0; i < this.events.length; i++) {
              this.events[i].eventTime = this.formatDatetime(this.events[i].eventStart, this.events[i].eventEnd);
              this.events[i].userLike = false;
            }
          } else {
            console.error("Error: Server returned status code:", res.statusCode);
          }
        },
        fail: (error) => {
          console.error("Error fetching activities:", error);
        }
      });
    },
    gotoEventDetail(eventId) {
      console.log("eventId", eventId);
      common_vendor.index.navigateTo({
        url: "/pages/event/event?id=" + encodeURIComponent(eventId),
        animationType: "slide-in-right"
      });
    },
    likeOrDislikeEvent(index) {
      console.log("like or dislike event", this.events[index]);
      this.events[index].userLike = this.events[index].userLike == false ? true : false;
    }
  },
  onShareAppMessage(res) {
    let e = res.target.dataset.event;
    console.log("share message", e);
    return {
      title: e.eventName,
      path: "/pages/event/event?id=" + encodeURIComponent(e.eventId),
      imageUrl: e.eventBanner
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.events, (event, index, i0) => {
      return common_vendor.e({
        a: event.eventBanner,
        b: common_vendor.t(event.eventTime),
        c: common_vendor.t(event.eventName),
        d: common_vendor.t(event.organizerName),
        e: event,
        f: common_vendor.o(() => {
        }, index),
        g: event.userLike
      }, event.userLike ? {
        h: common_assets._imports_3
      } : {
        i: common_assets._imports_4
      }, {
        j: common_vendor.o(($event) => $options.likeOrDislikeEvent(index), index),
        k: common_vendor.o(($event) => $options.gotoEventDetail(event.eventId), index),
        l: index
      });
    }),
    b: common_assets._imports_0,
    c: common_assets._imports_1,
    d: common_assets._imports_2
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-15dac74a"], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/tabBar/home/home.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
