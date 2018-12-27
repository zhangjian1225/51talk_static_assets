define("exReceive/indexMethodTrail", ["tpl/exReceive/index.js", '../common/util'], function(require, exports, module) {
    //引入套餐模块
    let indexMethod = require("tpl/exReceive/index.js"),
        util = require("../common/util");
    // 主体
    $('#indexMethod').html(indexMethod.index_method_trail());
    util.replaceImgUrl('#indexMethod', static_url);
    // 公共头
    util.renderHeaderBottom();
    // banner
    $('#bannerText').html(indexMethod.bannerText());
    util.replaceImgUrl('#bannerText', static_url);
    $(".rightNow").on("click", function() {
        $.ajax({
            url: "http://course.51talk.com/ovofree/api/trial/addB2sAppointFree",
            type: "get",
            dataType: 'jsonp',
            jsonp: "callback",
            crossDomain: true,
            success: function(res) {
                if (res.status == 10000) {
                    location.href = "http://trial.51talk.com/trial/success_b2s"
                }
            }
        });
    })


});