define("exReceive/indexBefore", ["tpl/exReceive/index.js",'../common/util','../common/sidebar.js','../common/sidebarRt.js','../common/exBanner.js','./basic.js'], function(require, exports, module) {
  //引入套餐模块
  let indexBefore = require("tpl/exReceive/index.js"),
      util =  require("../common/util"),
      indexCommon = require("tpl/common/index.js");
  // 主体
  $('#indexBefore').html(indexBefore.index_before());
  util.replaceImgUrl('#indexBefore',static_url);
  // 公共头
  util.renderHeaderBottom();
  require("../common/sidebar.js"); //左侧栏
  require("../common/sidebarRt.js");//右侧栏
  require("../common/exBanner.js");//banner
  require("./basic.js");//基础部分
});