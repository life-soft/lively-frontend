"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    back() {
      if (getCurrentPages()[0].route == "pages/tabBar/like/like") {
        console.log("go home");
        common_vendor.index.switchTab({
          url: "/pages/tabBar/home/home"
        });
        return;
      }
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    wxLogin() {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          success(loginRes) {
            common_vendor.index.request({
              url: "http://124.222.92.30:8080/system/OAuth/authByWX",
              method: "POST",
              header: { "content-type": "application/x-www-form-urlencoded" },
              data: {
                code: loginRes.code
              },
              success(res) {
                if (res.data.code !== 200) {
                  reject(new Error("获取openid失败：", res.data.msg));
                  return;
                }
                common_vendor.index.setStorageSync("openid", res.data.data.openid);
                resolve(res.data.data.openid);
                common_vendor.index.navigateBack({
                  delta: 1
                });
              },
              fail(err) {
                reject(new Error("获取openid失败：" + err));
              }
            });
          },
          fail(err) {
            reject(err);
          }
        });
      });
    }
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
      ["left-icon"]: "left",
      titleImage: false,
      title: "登录"
    }),
    c: common_assets._imports_0$1,
    d: common_assets._imports_1$1,
    e: common_vendor.o((...args) => $options.wxLogin && $options.wxLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/login/wxLogin.vue"]]);
wx.createPage(MiniProgramPage);
