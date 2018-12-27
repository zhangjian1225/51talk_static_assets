define("exReceive/indexAfter", ["tpl/exReceive/index.js",'../common/util','../common/sidebar.js','../common/sidebarRt.js','../common/exBanner.js','./basic.js','./orderClass.js'], function(require, exports, module) {
  //引入套餐模块
  let indexAfter = require("tpl/exReceive/index.js"),
      util =  require("../common/util"),
      indexCommon = require("tpl/common/index.js");
  // 主体
  $('#indexAfter').html(indexAfter.index_after());
  util.replaceImgUrl('#indexAfter',static_url);
  // 公共头
  util.renderHeaderBottom();
  require("../common/sidebar.js"); //左侧栏
  require("../common/sidebarRt.js");//右侧栏
  require("../common/exBanner.js");//banner4
  require("./basic.js");//基础部分
  require("./orderClass.js");// 我预约的评测课
  // 课前准备
  $('#afterReady').html(indexAfter.afterReady());
  util.replaceImgUrl('#afterReady',static_url);
   // 视频
   $('#video').html(indexAfter.video());
   util.replaceImgUrl('#video',static_url);
   var afterInfo = {
    infoStu: $(".info-video li"),
     event: function event() {
       var that = this;
       this.infoStu.on("click",function(){
        var $index = $(this).index();
        $.get(window.use_url + '/api/preparation',function(msg){
          if(msg.status == 10000){
            for(var i = 0; i < msg.data.length; i++){
              if($index == 0){
                $(".ccID").attr("value",msg.data[0])
                $(".ccIDName").attr("src",msg.data[0])
              }else if($index == 1){
                $(".ccID").attr("value",msg.data[1])
                $(".ccIDName").attr("src",msg.data[1])
              }else{
                $(".ccID").attr("value",msg.data[2])
                $(".ccIDName").attr("src",msg.data[2])  
              }
              $('.video-tips').show();
            }
          }
        });
      });
      $(".video-tips .close").on("click",function(){
        $(".video-tips").hide();
      });
      // 判断ac or ipad
      if($("#teachType").val() == "51TalkAC"){
        $("#AcSoft").show();   
      }else{
        $("#ipadSoft").show();   
      }
      // 是青少 or 成人
      if($("#user_type").val() == 1){ //成人
        $(".info-software").find(".youthWare").hide();  
        $("#adult-video").show();
        $("#youth-video").hide();
      }
     },
   };
   afterInfo.event();
});