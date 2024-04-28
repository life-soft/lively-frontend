"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      events: []
    };
  },
  created() {
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      const apiUrl = "http://124.222.92.30:8080/system/event/list";
      common_vendor.index.request({
        url: apiUrl,
        method: "GET",
        success: (res) => {
          if (res.statusCode === 200) {
            this.events = res.data.rows;
            console.log(this.events);
          } else {
            console.error("Error: Server returned status code:", res.statusCode);
          }
        },
        fail: (error) => {
          console.error("Error fetching activities:", error);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.events, (event, k0, i0) => {
      return {
        a: event.eventBanner,
        b: common_vendor.t(event.eventName),
        c: "15dac74a-0-" + i0,
        d: event.id
      };
    }),
    b: common_assets._imports_0,
    c: common_assets._imports_1,
    d: common_vendor.t(""),
    e: common_vendor.p({
      fontFamily: "like"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-15dac74a"], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/tabBar/home/home.vue"]]);
wx.createPage(MiniProgramPage);
