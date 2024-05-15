"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      eventId: ""
    };
  },
  onLoad(e) {
    this.eventId = e.id;
    console.log("id", id);
  },
  methods: {
    back() {
      console.log("back");
      common_vendor.index.navigateBack({
        delta: 1
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
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/event/event.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
