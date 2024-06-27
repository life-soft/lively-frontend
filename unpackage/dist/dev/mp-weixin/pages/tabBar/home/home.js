"use strict";
const common_vendor = require("../../../common/vendor.js");
const eventCardList = () => "../../../components/eventCardList/eventCardList.js";
const _sfc_main = {
  components: {
    eventCardList
  },
  data() {
    return {
      events: []
    };
  },
  computed: {},
  mounted() {
    this.getEvents();
  },
  onPullDownRefresh() {
    this.getEvents();
  },
  onShow() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      const apiUrl = "http://124.222.92.30:8080/system/event/list";
      console.log("open", common_vendor.index.getStorageSync("openid"));
      common_vendor.index.request({
        url: apiUrl,
        method: "POST",
        // header: { 'content-type': 'application/x-www-form-urlencoded', },
        data: {
          "openID": common_vendor.index.getStorageSync("openid")
        },
        success: (res) => {
          console.log("events", res);
          if (res.statusCode === 200) {
            this.events = res.data.rows;
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
  return {
    a: common_vendor.p({
      fixed: true,
      ["background-color"]: "#ffffff",
      statusBar: "true"
    }),
    b: common_vendor.p({
      events: $data.events
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/tabBar/home/home.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
