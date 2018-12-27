define("usersSelect/indexRegContents", ["tpl/usersSelect/index.js",'../common/util','../common/sidebar.js','../common/sidebarRt.js','../common/exBanner.js',], function(require, exports, module) {
  //引入套餐模块
  let usersSelect = require("tpl/usersSelect/index.js"),
      util =  require("../common/util");
  let getDataObj = {
    getTrialConfig () {
      let that = this;
      $.ajax({
        url : window.use_url + '/api/trialConfig',
        type : 'get',
        dataType : 'json',
        data : {},
        success (res) {
          if(res.status == 10000){
            $('#moreContent').html(usersSelect.moreContent(res));
            util.replaceImgUrl('#moreContent',static_url);
            usersFn(res)
          } else {
            alert(res.info)
          }
        }
      });
    }
  }
  getDataObj.getTrialConfig();

  $('#usersSelect').html(usersSelect.index_regContents());
  util.replaceImgUrl('#usersSelect',static_url);
  // 公共头
  util.renderHeaderBottom();
  require("../common/sidebar.js"); //左侧栏
  require("../common/sidebarRt.js");//右侧栏
  require("../common/exBanner.js");//banner
    let usersFn = (res) => { 
      let usersObj = { 
        regEndsList : $(".regEnds_list"),
        moreSubList : $(".moreSub_list"),
        comCheck : $(".comCheck"),
        _event (){
          let that = this;
          // 注册目的
          this.regEndsList.find("li").on('click',function(){
            var tab = $(this).attr("data-tab"),
                stuAge = "stuAge"+tab;
            if(tab == '2'){
              $(".moreSubs").addClass("subsThree");
              $(".moreSubs").find(".youth").hide();
              $(".moreSubs").find(".ault").show();
            }
            $('#'+stuAge).show();
            that.regEndsList.hide();
            that.moreSubList.show();
          });
          // 更多信息
          $(".subBtn").find("dd").on("click",function(){
            var infoTab = $(this).parents("dl");
            if(infoTab.hasClass("stuAge")){ // 学龄阶段
              that.changeEvent($(this),'stuAge');           
            } else if (infoTab.hasClass("garde")){ // 年级
              that.changeEvent($(this),'garde');
            } else if (infoTab.hasClass("purpose")){ // 学习目的
              that.changeEvent($(this),'purpose'); 
            } else if (infoTab.hasClass("engLevel")) { // 英语水平
              that.changeEvent($(this),'engLevel'); 
            }
          });
          // 返回上一页
          $(".formSub .return").on("click",function(){
            that.regEndsList.show();
            that.moreSubList.hide();      
            that.moreSubList.find("dl").hide();
            that.moreSubList.find("dl dd").removeClass("check");
            $(".jsCheck").val("0");
            $(".formSub .complete").removeClass("comCheck");
            $(".moreSubs").addClass("subsTwo");
            $(".moreSubs").removeClass("subsThree");
            $(".moreSubs").find(".youth").show();
            $(".moreSubs").find(".ault").hide();
          });
          // 完成
          this.moreSubList.find(".complete").on("click",function(){
            if($(this).hasClass('comCheck')){
              $.post(window.use_url+'/api/upUserOccupInfo',
                  {
                    occup:$("#stuAge").val(), 
                    grade:$("#garde").val(), 
                    purpose:$("#purpose").val(), 
                    english_level:$("#engLevel").val(),
                    age: $("#age").val()
                  }, function(msg){
                if(msg.status == 10000){
                  window.location.href = window.content_url;
                }else{
                  alert(msg.info);
                }
              });
            }
          });
        },
        changeEvent(ele,id){
          var subTab = ele.parents("dl"),
              dataId = id+ele.attr("data-id"), // 获取id值
              garde = "garde"+ele.attr("data-id"), // 年级
              purpose = "purpose"+ele.attr("data-id"), // 学习目的
              engLevel = "engLevel"+ele.attr("data-id"); // 英语水平
          // 显示当天
          $('#'+id).show().siblings(".id").hide();
          // 清除选中状态
          ele.addClass("check").siblings().removeClass("check");
          subTab.nextAll().find('dd').removeClass("check");
          subTab.nextAll().hide();
          // 选中赋值
          $('#'+id).val(ele.attr("data-value"));
          // 消除完成选中
          $(".formSub .complete").removeClass("comCheck");
          if(id == "stuAge"){ // 学龄阶段
            // 更多信息格局改变
            ele.parents(".moreSubs").removeClass("subsTwo");
            // 学龄是否含有年级
            if(ele.attr("data-show") == 1){
              $('#'+purpose).show().siblings(".purpose").hide();
            }else{
              $('#'+garde).show().siblings(".garde").hide();
            }
          } else if(id == "garde"){ // 年级
            // 是否幼儿园大班
            if(ele.attr("data-show") == 1){
              $('#'+engLevel).show().siblings(".engLevel").hide();
            }else{
              $('#'+purpose).show().siblings(".purpose").hide();
            }
            // 是否是幼儿
            if($("#stuAge").val() == "7"){
              $("#age").val(ele.attr("data-value"));
              $("#purpose").val("0"); 
              $("#garde").val("0"); 
            } else {
              $("#age").val("0");
            }
          } else if(id == "purpose"){ // 学习目的
            $('#'+engLevel).show().siblings(".engLevel").hide();
          } else if(id == "engLevel"){// 英语水平
            $(".formSub").find(".complete").addClass("comCheck");
          }
        }
      }  
      usersObj._event();
    }
});