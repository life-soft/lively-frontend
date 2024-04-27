"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  const _component_uni_card = common_vendor.resolveComponent("uni-card");
  (_component_uni_icons + _component_uni_card)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      type: "pengyouquan",
      size: "18",
      color: "#999"
    }),
    b: common_vendor.o(($event) => _ctx.actionsClick("分享")),
    c: common_vendor.p({
      type: "heart",
      size: "18",
      color: "#999"
    }),
    d: common_vendor.o(($event) => _ctx.actionsClick("点赞")),
    e: common_vendor.p({
      type: "chatbubble",
      size: "18",
      color: "#999"
    }),
    f: common_vendor.o(($event) => _ctx.actionsClick("评论")),
    g: common_vendor.p({
      cover: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/tabBar/home/home.vue"]]);
wx.createPage(MiniProgramPage);
