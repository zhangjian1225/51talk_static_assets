define("exReceive/indexMethod", ["tpl/exReceive/index.js", '../common/util'], function(require, exports, module) {
    //引入套餐模块
    let indexMethod = require("tpl/exReceive/index.js"),
        util = require("../common/util");
    // 主体
    $('#indexMethod').html(indexMethod.index_method());
    util.replaceImgUrl('#indexMethod', static_url);
    // 公共头
    util.renderHeaderBottom();
    // banner
    $('#bannerText').html(indexMethod.bannerText());
    util.replaceImgUrl('#bannerText', static_url);
    var showNickName = $('#show_nick_name').val(); // 1展示 = 非成人：  其他 = 非非成人：（少儿用户|成人转少儿用户）
    
    var method = {
        mList: $(".mList"),
        comBtn: $(".comBtn"),
        nickName: $("input#nick_name"),
        event: function event() {
            var that = this;
            var validVal = "";
            this.mList.find("li").on("click", function() {
                var select = $(this).find(".select");
                select.addClass("check").parents("li").siblings().find(".select").removeClass("check");
                $("#dataId").val(select.attr("data-id"))
            });
            this.comBtn.on("click", function() {
                if(showNickName == '1' && !isValid()) {
                  return;
                }
                window.__sdonclick && window.__sdonclick('exclassbooked');
                var data = {
                    tool: $("#dataId").val(),
                    course_date: $("#course_date").val(),
                    course_time: $("#course_time").val(),
                }
                if(showNickName == '1'){
                  data.nick_name = $("#nick_name").val();
                }
                $.post('http://trial.51talk.com/api/FreeCourse/doReserve', data , function(msg) {
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
            };
            
            if(showNickName == '1'){
              $(".show_nick_name__no").hide();
              $(".show_nick_name").show();
            }else {
              $(".show_nick_name").hide();
              $(".show_nick_name__no").show();
            }
            
            this.nickName.on('input', function(){     
              if(isValid()){
                validVal = that.nickName.val();
                that.comBtn.removeClass('disabled');
              }else {
                var nickNameVal = that.nickName.val();
                if(nickNameVal.length == 1 && /^[A-Za-z]$/.test(nickNameVal)){
                  validVal = nickNameVal;
                }else {
                  if(that.nickName.val().length > validVal.length){
                    that.nickName.val(validVal);
                    if(!that.nickName.val().length == 1){
                      that.comBtn.removeClass('disabled');
                    }
                    
                  }else {
                    that.comBtn.addClass('disabled');
                  }
                }
                
                if(that.nickName.val().length === 0) {
                  validVal = "";
                  that.comBtn.addClass('disabled');
                }
                
                if(that.nickName.val().length === 1) {
                  that.comBtn.addClass('disabled');
                }
              }
            });
            
            function isValid() {
              var nickNameVal = that.nickName.val();
              var res = /^[A-Za-z]{2,20}$/.test(nickNameVal);
              console.log(nickNameVal, res);
              return res;
            }
        },
    };
    method.event();
});