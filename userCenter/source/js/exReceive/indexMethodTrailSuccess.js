define("exReceive/indexMethodTrailSuccess", ["tpl/exReceive/index.js", '../common/util'], function(require, exports, module) {
    //引入套餐模块
    let indexMethod = require("tpl/exReceive/index.js"),
        util = require("../common/util");
    // 主体
    $('#indexMethod').html(indexMethod.index_method_trail_success());
    util.replaceImgUrl('#indexMethod', static_url);
    // 公共头
    util.renderHeaderBottom();
    // banner
    $('#bannerText').html(indexMethod.bannerText());
    util.replaceImgUrl('#bannerText', static_url);
    var method = {
        mList: $(".mList"),
        comBtn: $(".comBtn"),
        event: function event() {
            var that = this;
            this.mList.find(".select").on("click", function() {
                $(this).addClass("check").parents("li").siblings().find(".select").removeClass("check");
                $("#dataId").val($(this).attr("data-id"))
            });
            this.comBtn.on("click", function() {
                $.post('http://trial.51talk.com/api/FreeCourse/doReserve', {
                    tool: $("#dataId").val(),
                    course_date: $("#course_date").val(),
                    course_time: $("#course_time").val(),
                }, function(msg) {
                    if (msg.status == 1) {
                        window.location.href = window.completion_url + '?appoint_id=' + msg.data;
                    } else {
                        alert(msg.info);
                    }
                });
            });
            if ($("#user_role").val() == 1) {
                $(".mList").addClass("mListCls")
                $(".mList li").eq(1).hide();
            }
        },
    };
    method.event();
});