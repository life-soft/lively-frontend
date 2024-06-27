"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const eventCardList = () => "../../../components/eventCardList/eventCardList.js";
const _sfc_main = {
  onShow() {
    let openid = common_vendor.index.getStorageSync("openid");
    console.log("openid when entering like", openid);
    if (openid.length == 0) {
      console.log("not login");
      common_vendor.index.navigateTo({
        url: "/pages/login/wxLogin"
      });
      return;
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
      noEvent: false
    };
  },
  computed: {},
  methods: {
    getEvents() {
      const apiUrl = "http://124.222.92.30:8080/system/event/collectList";
      common_vendor.index.request({
        url: apiUrl,
        method: "POST",
        // header: { 'content-type': 'application/x-www-form-urlencoded', },
        data: {
          "openID": common_vendor.index.getStorageSync("openid")
        },
        success: (res) => {
          if (res.statusCode === 200) {
            if (res.data.total == 0) {
              this.events = [];
              this.noEvent = true;
              return;
            }
            this.noEvent = false;
            this.events = res.data.rows;
            console.log(this.events);
            for (let i = 0; i < this.events.length; i++) {
              this.events[i].isCollected = 1;
            }
          } else {
            console.error("Error: Server returned status code:", res.statusCode);
          }
        },
        fail: (error) => {
          console.error("Error fetching activities:", error);
        }
      });
    }
  },
  onShareAppMessage(res) {
    console.log("share message", res);
    if (res.from == "menu") {
      return {
        title: "快来感受活动的力量"
      };
    }
    if (res.from == "button") {
      let e = res.target.dataset.event;
      return {
        title: e.eventName,
        path: "/pages/event/event?id=" + encodeURIComponent(e.eventId),
        imageUrl: e.eventBanner
      };
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _component_event_card_list = common_vendor.resolveComponent("event-card-list");
  (_easycom_uni_nav_bar2 + _component_event_card_list)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      fixed: true,
      ["background-color"]: "#ffffff",
      statusBar: "true"
    }),
    b: common_vendor.p({
      events: $data.events
    }),
    c: $data.noEvent
  }, $data.noEvent ? {
    d: common_assets._imports_0
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8086f44d"], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/tabBar/like/like.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
