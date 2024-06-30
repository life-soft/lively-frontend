"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      eventId: "",
      wxUrl: "https://mp.weixin.qq.com/s/kgki3VirEmFSjIA-ujTUhQ",
      wxContent: ""
    };
  },
  onLoad(e) {
    this.eventId = e.id;
    console.log("id", this.eventId);
    this.getWxContent();
  },
  methods: {
    back() {
      if (getCurrentPages().length == 1) {
        common_vendor.index.switchTab({
          url: "/pages/tabBar/home/home"
        });
      }
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    getWxContent() {
      common_vendor.index.request({
        url: this.wxUrl,
        method: "GET",
        success: (res) => {
          console.log("res", res);
          var html = res.data;
          console.log("html", html);
          const start = res.data.indexOf('<div id="img-content"');
          const end = res.data.indexOf('<div id="js_tags_preview_toast"');
          html = html.slice(start, end);
          html = html.replace("visibility: hidden; opacity: 0; ", "").replaceAll("data-src", "src");
          this.wxContent = html;
          console.log("html", html);
        },
        fail: (error) => {
          console.error("Error fetching activities:", error);
        }
      });
    },
    seeOriginalContent() {
      common_vendor.index.navigateTo({
        url: "/pages/externalPage/externalPage?url=" + this.wxUrl,
        animationType: "slide-in-right"
      });
    }
  },
  onShareAppMessage() {
  },
  onShareTimeline() {
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.back),
    b: common_vendor.p({
      fixed: true,
      ["background-color"]: "#ffffff",
      statusBar: "true",
      color: "#333538",
      ["left-icon"]: "left"
    }),
    c: common_vendor.o(($event) => $options.seeOriginalContent()),
    d: $data.wxContent
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c258207c"], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/event/event.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
