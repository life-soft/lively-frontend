"use strict";
var nvMask, nvImageMenu;
class NvImageMenu {
  constructor(arg) {
    this.isShow = false;
  }
  show({
    list,
    cancelText
  }, callback) {
    if (!list) {
      list = [{
        "img": "/static/sharemenu/wechatfriend.png",
        "text": "图标文字"
      }];
    }
    var screenWidth = plus.screen.resolutionWidth;
    var margin = 20, iconWidth = 60, icontextSpace = 5, textHeight = 12;
    var left1 = margin / 360 * screenWidth;
    var iconSpace = (screenWidth - left1 * 2 - iconWidth * 4) / 3;
    if (iconSpace <= 5) {
      margin = 15;
      iconWidth = 40;
      left1 = margin / 360 * screenWidth;
      iconSpace = (screenWidth - left1 * 2 - iconWidth * 4) / 3;
    }
    var left2 = left1 + iconWidth + iconSpace;
    var left3 = left1 + (iconWidth + iconSpace) * 2;
    var left4 = left1 + (iconWidth + iconSpace) * 3;
    var top1 = left1;
    var top2 = top1 + iconWidth + icontextSpace + textHeight + left1;
    const TOP = {
      top1,
      top2
    }, LEFT = {
      left1,
      left2,
      left3,
      left4
    };
    nvMask = new plus.nativeObj.View("nvMask", {
      //先创建遮罩层
      top: "0px",
      left: "0px",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.2)"
    });
    nvImageMenu = new plus.nativeObj.View("nvImageMenu", {
      //创建底部图标菜单
      bottom: "0px",
      left: "0px",
      height: (iconWidth + textHeight + 2 * margin) * Math.ceil(list.length / 4) + 44 + "px",
      //'264px',
      width: "100%",
      backgroundColor: "rgb(255,255,255)"
    });
    nvMask.addEventListener("click", () => {
      this.hide();
      callback({
        event: "clickMask"
      });
    });
    let myList = [];
    list.forEach((item, i) => {
      myList.push({
        tag: "img",
        src: item.img,
        position: {
          top: TOP["top" + (parseInt(i / 4) + 1)],
          left: LEFT["left" + (1 + i % 4)],
          width: iconWidth,
          height: iconWidth
        }
      });
      myList.push({
        tag: "font",
        text: item.text,
        textStyles: {
          size: textHeight
        },
        position: {
          top: TOP["top" + (parseInt(i / 4) + 1)] + iconWidth + icontextSpace,
          left: LEFT["left" + (1 + i % 4)],
          width: iconWidth,
          height: textHeight
        }
      });
    });
    nvImageMenu.draw([
      {
        tag: "rect",
        //菜单顶部的分割灰线
        color: "#e7e7e7",
        position: {
          top: "0px",
          height: "1px"
        }
      },
      {
        tag: "font",
        text: cancelText,
        //底部取消按钮的文字
        textStyles: {
          size: "14px"
        },
        position: {
          bottom: "0px",
          height: "44px"
        }
      },
      {
        tag: "rect",
        //底部取消按钮的顶部边线
        color: "#e7e7e7",
        position: {
          bottom: "45px",
          height: "1px"
        }
      },
      ...myList
    ]);
    nvMask.show();
    nvImageMenu.show();
    this.isShow = true;
    nvImageMenu.addEventListener("click", (e) => {
      if (e.screenY > plus.screen.resolutionHeight - 44) {
        this.hide();
      } else if (e.clientX < 5 || e.clientX > screenWidth - 5 || e.clientY < 5)
        ;
      else {
        var iClickIndex = -1;
        var iRow = e.clientY < top2 - left1 / 2 ? 0 : 1;
        var iCol = -1;
        if (e.clientX < left2 - iconSpace / 2) {
          iCol = 0;
        } else if (e.clientX < left3 - iconSpace / 2) {
          iCol = 1;
        } else if (e.clientX < left4 - iconSpace / 2) {
          iCol = 2;
        } else {
          iCol = 3;
        }
        if (iRow == 0) {
          iClickIndex = iCol;
        } else {
          iClickIndex = iCol + 4;
        }
        callback({
          event: "clickMenu",
          index: iClickIndex
        });
      }
    });
  }
  hide() {
    if (this.isShow) {
      nvMask.hide();
      nvImageMenu.hide();
      this.isShow = false;
    }
  }
}
exports.NvImageMenu = NvImageMenu;
