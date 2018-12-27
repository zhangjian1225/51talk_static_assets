define("adultPackage/indexMonthlyLearningEffect", ["tpl/adultPackage/index.js","tplCommon","../common/cart","../common/courseInfo", "../common/banner","../common/timeout", "../common/packageTab",  "../common/detailInfo","../common/util",'../common/backTop'], function(require, exports, module) {
    //引入套餐模块
    var indexStrengthen = require("tpl/adultPackage/index.js");
    //下部列表详情
    $('#indexMonthlyLearningEffect').html(indexStrengthen.index_monthly_learning_effect());
    var util =  require("../common/util");
    //套餐信息
    require('../common/courseInfo');
    //banner
    require('../common/banner');
     //timeout倒计时
    var a = require('../common/timeout');
    //设置参数
    a.ajaxApiParams = 'point_package_10';
    new a.timeout();

    //套餐tab
    require('../common/packageTab');
    

    var tplCommon =  require("tplCommon");
    $("#cartBox").html(tplCommon.cartBox());
   
    util.replaceImgUrl('#indexMonthlyLearningEffect', static_url);
    util.renderHeaderBottom();
    setTimeout(function(){
        require('../common/detailInfo');
    },1000);
    require('../common/backTop');
});