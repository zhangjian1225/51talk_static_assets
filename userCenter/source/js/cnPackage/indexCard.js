define("cnPackage/indexCard", ['../common/layer','cnPackage/domOp',"tpl/cnPackage/index.js", "tplCommon",  "../common/banner","../common/myTimeout", "../common/packageTab", "../common/detailInfo", "../common/util", '../common/backTop'], function(require, exports, module) {
   
    //引入套餐模块
   var indexStrengthen = require("tpl/cnPackage/index.js");
  //  下部列表详情
   $('#indexCard').html(indexStrengthen.index_card_main());

   var util = require("../common/util");
  
    //banner
    require('../common/banner');
    //倒计时
    require('../common/myTimeout');
    //套餐tab
    require('../common/packageTab');

    util.replaceImgUrl('#indexCard', static_url);
    util.renderHeaderBottom();
    setTimeout(function() {
        require('../common/detailInfo');
    }, 1000);
    require('../common/backTop');
    require('cnPackage/domOp');
    
});