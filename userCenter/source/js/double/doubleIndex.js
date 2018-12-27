define("double/doubleIndex", ["tpl/double/index.js",'../common/util'], function(require, exports, module) {
  //引入套餐模块
  let doubleIn = require("tpl/double/index.js"),
  util =  require("../common/util");
  $('#double').html(doubleIn.double_index());
  util.replaceImgUrl('#double',static_url);
  // 公共头
  util.renderHeaderBottom();
});