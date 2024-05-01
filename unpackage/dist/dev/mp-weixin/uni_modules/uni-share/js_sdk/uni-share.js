"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_uniShare_js_sdk_uniImageMenu = require("./uni-image-menu.js");
class UniShare extends uni_modules_uniShare_js_sdk_uniImageMenu.NvImageMenu {
  constructor(arg) {
    super();
    this.isShow = super.isShow;
  }
  async show(param, callback) {
    var menus = [];
    plus.share.getServices((services) => {
      services = services.filter((item) => item.nativeClient);
      let servicesList = services.map((e) => e.id);
      param.menus.forEach((item) => {
        if (servicesList.includes(item.share.provider) || typeof item.share == "string") {
          menus.push(item);
        }
      });
      super.show({
        list: menus,
        cancelText: param.cancelText
      }, (e) => {
        callback(e);
        if (e.event == "clickMenu") {
          if (typeof menus[e.index]["share"] == "string") {
            this[menus[e.index]["share"]](param);
          } else {
            common_vendor.index.share({
              ...param.content,
              ...menus[e.index].share,
              success: (res) => {
                console.log("success:" + JSON.stringify(res));
                super.hide();
              },
              fail: function(err) {
                console.log("fail:" + JSON.stringify(err));
                common_vendor.index.showModal({
                  content: JSON.stringify(err),
                  showCancel: false,
                  confirmText: "知道了"
                });
              }
            });
          }
        }
      });
    }, (err) => {
      common_vendor.index.showModal({
        title: "获取服务供应商失败：" + JSON.stringify(err),
        showCancel: false,
        confirmText: "知道了"
      });
      console.error("获取服务供应商失败：" + JSON.stringify(err));
    });
  }
  hide() {
    super.hide();
  }
  copyurl(param) {
    console.log("copyurl", param);
    common_vendor.index.setClipboardData({
      data: param.content.href,
      success: () => {
        console.log("success");
        common_vendor.index.hideToast();
        common_vendor.index.showToast({
          title: "复制成功",
          icon: "none"
        });
        super.hide();
      },
      fail: (err) => {
        common_vendor.index.showModal({
          content: JSON.stringify(err),
          showCancel: false
        });
      }
    });
  }
  // 使用系统分享发送分享消息 
  shareSystem(param) {
    console.log("shareSystem", param);
    plus.share.sendWithSystem({
      type: "text",
      content: param.content.title + param.content.summary || "",
      href: param.content.href
    }, (e) => {
      console.log("分享成功");
      super.hide();
    }, (err) => {
      console.log("分享失败：" + JSON.stringify(err));
      common_vendor.index.showModal({
        title: "获取服务供应商失败：" + JSON.stringify(err),
        showCancel: false,
        confirmText: "知道了"
      });
    });
  }
}
exports.UniShare = UniShare;
