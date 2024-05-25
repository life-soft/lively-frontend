"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const eventCardList = () => "../../../components/eventCardList/eventCardList.js";
const _sfc_main = {
  components: {
    eventCardList
  },
  data() {
    return {
      events: [],
      searchInput: "",
      tagsPicked: ["阿巴巴"],
      // 还是用boolean表？
      tagsPickedTemp: [],
      AllTags: ["阿巴巴", "乌啦啦", "哇嘎嘎", "嘿呦喂", "哎呀呀", "哎哟哇"]
      // TO BE DELETED
    };
  },
  computed: {
    tagsPickedCount() {
      return this.tagsPicked.length;
    },
    eventsCount() {
      return this.events.length;
    },
    topBarHeight() {
      return common_vendor.index.getSystemInfoSync().statusBarHeight + 44 + "px";
    }
  },
  onShow() {
    this.getEvents();
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
            for (let i = 0; i < this.events.length; i++) {
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
    cleanSearchBar() {
      this.searchInput = "";
    },
    search() {
      console.log("search something");
    },
    deleteTag(index) {
      this.tagsPicked.splice(index, 1);
    },
    // TODO 选择标签功能做得特别差，待改进
    showDrawer() {
      this.tagsPickedTemp = this.tagsPicked.slice();
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    },
    filterSubmit() {
      this.tagsPicked = this.tagsPickedTemp.slice();
      this.$refs.showRight.close();
    },
    clearAllTags() {
      this.tagsPickedTemp = [];
    },
    isTagPicked(tag) {
      return this.tagsPickedTemp.includes(tag);
    },
    clickTag(tag) {
      let index = 0;
      index = this.tagsPickedTemp.indexOf(tag);
      console.log(index);
      if (index > -1) {
        this.tagsPickedTemp.splice(index, 1);
      } else {
        this.tagsPickedTemp.push(tag);
      }
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
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_easycom_uni_nav_bar2 + _component_event_card_list + _easycom_uni_drawer2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_drawer = () => "../../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_drawer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      fixed: true,
      ["background-color"]: "#ffffff",
      statusBar: "true"
    }),
    b: common_assets._imports_0,
    c: common_vendor.o(($event) => $options.search()),
    d: $data.searchInput,
    e: common_vendor.o(($event) => $data.searchInput = $event.detail.value),
    f: common_vendor.o(($event) => $options.cleanSearchBar()),
    g: common_assets._imports_1,
    h: common_vendor.o(($event) => $options.search()),
    i: common_assets._imports_2,
    j: $options.tagsPickedCount > 0
  }, $options.tagsPickedCount > 0 ? {
    k: common_vendor.t($options.tagsPickedCount)
  } : {}, {
    l: common_assets._imports_3,
    m: common_vendor.o((...args) => $options.showDrawer && $options.showDrawer(...args)),
    n: common_vendor.f($data.tagsPicked, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index,
        c: common_vendor.o(($event) => $options.deleteTag(index), index)
      };
    }),
    o: $options.topBarHeight,
    p: common_vendor.p({
      events: $data.events
    }),
    q: common_vendor.o(($event) => $options.closeDrawer()),
    r: common_assets._imports_4,
    s: common_vendor.o(($event) => $options.clearAllTags()),
    t: common_vendor.f($data.AllTags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index,
        c: $options.isTagPicked(tag) ? "white" : "#333538",
        d: $options.isTagPicked(tag) ? "#ef756e" : "#fff5ee",
        e: common_vendor.o(($event) => $options.clickTag(tag), index)
      };
    }),
    v: common_vendor.o(($event) => $options.filterSubmit()),
    w: common_vendor.sr("showRight", "b667569c-2"),
    x: common_vendor.p({
      maskClick: false,
      mode: "right",
      width: "750"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b667569c"], ["__file", "/Users/luyihan/Documents/Projects/lively-frontend/pages/tabBar/search/search.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
