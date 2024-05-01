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
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/event/event.vue"]]);
wx.createPage(MiniProgramPage);
