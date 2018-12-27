define("exReceive/indexFinish", ["tpl/exReceive/index.js",'../common/util','../common/sidebar.js','../common/sidebarRt.js','../common/exBanner.js','./basic.js','./orderClass.js'], function(require, exports, module) {
  //引入套餐模块
  let indexFinish = require("tpl/exReceive/index.js"),
      util =  require("../common/util"),
      indexCommon = require("tpl/common/index.js");
  // 主体
  $('#indexFinish').html(indexFinish.index_finish());
  util.replaceImgUrl('#indexFinish',static_url);
  // 公共头
  util.renderHeaderBottom();
  require("../common/sidebar.js"); //左侧栏
  require("../common/sidebarRt.js");//右侧栏
  require("../common/exBanner.js");//banner
  require("./basic.js");//基础部分
  require("./orderClass.js");// 我预约的评测课
  // 最近一次上课记录
  let resultDataObj = {
    getFreeConfig () {
      let that = this;
      $.ajax({
        url : window.use_url + '/api/lastClassRecord',
        type : 'get',
        dataType : 'json',
        data : {},
        success (res) {
          if(res.status == 10000){
            $('#results').html(indexFinish.finishResults(res));
            util.replaceImgUrl('#results',static_url);
            // 是否显示课程回放
            if($("#is_show").val() == 0){ //成人
              $(".recordHide").hide();
            }
          } else {
            alert(res.info)
          }
        }
      });
    }
  }
  resultDataObj.getFreeConfig();
  // 了解更多课程服务
  $('#finishReady').html(indexFinish.finishReady());
  util.replaceImgUrl('#indexFinish',static_url);
   // 视频
  $('#video').html(indexFinish.video());
  util.replaceImgUrl('#video',static_url);
  var finish = {
    infoStu: $(".info-stu"),
    deLayer: $(".deLayer"),
    adultBtn: $("#adultBtn"),
    youthBtn: $("#youthBtn"),
    switch: $(".switch"),
    listsLi: $(".lists").find("li"),
    stepWidth: 778,
    oNow: 0,
    event: function event() {
      var that = this;
      this.infoStu.find(".cls-video").on("click",function(){
        $.get(window.use_url + '/api/ccVideo',function(msg){
          if(msg.status == 10000){
            $(".ccID").attr("value",msg.data)
            $(".ccIDName").attr("src",msg.data)
            $('.video-tips').show();
          }
        });
      });
      $(".video-tips .close").on("click",function(){
        $(".video-tips").hide();
      });
      // 查看详情
      this.switch.find("li").on("click",function(){
        var index=$(this).index();
        var leftStep = index * that.stepWidth;
        $(this).addClass("crt").siblings().removeClass("crt");
        $(this).parent().siblings(".lists").animate({ 'margin-left': '-' + leftStep + 'px' }, 500);
        if(index == 0){
          $(".ltBtn").hide();
        }else{
          $(".ltBtn").show();
        }
      });
      $(".rtBtn").on("click",function(){
        that.carousel(0,$(this))
      });
      $(".ltBtn").on("click",function(){
        that.carousel(1,$(this))
      });
      // 关闭
      this.deLayer.find(".delete").on("click",function(){
        that.deLayer.hide();  
      });
      // 新学员必读
      $(".stu-read").on("click",function(){
        var type =$("#user_type").val();
        if(type == 2){ // 青少
          $("#youthBtn").show();
        }else{ //成人
          $("#adultBtn").show(); 
        }
      });
    },
    carousel(type,$this){
      var that = this;
      var listTab = $this.parent().find(".lists");
      if(type == 0){
        var resNum = listTab.css("margin-left").replace('px', '');
        var crtN = -resNum/that.stepWidth;
        crtN++;
        var step = resNum-that.stepWidth;
        if(crtN > $this.parent().find(".lists li").length-1){
          crtN = 0;
          resNum = 0;
        }
      }else if(type == 1){
        var resNum = -listTab.css("margin-left").replace('px', '');
        var crtN = resNum/that.stepWidth;
        crtN--;
        var step = resNum-that.stepWidth;
      }
      $this.parent().find(".switch li").removeClass("crt").eq(crtN).addClass("crt");
      if(crtN == 0){
        $(".ltBtn").hide();
        listTab.animate({ 'margin-left': 0 + 'px' }, 500);
      }else{
        $(".ltBtn").show();
        if(type == 0){
          listTab.animate({ 'margin-left': step + 'px' }, 500);
        }else if(type ==1){
          listTab.animate({ 'margin-left': '-'+ step + 'px' }, 500); 
        }
      }
    },
  };
  finish.event();
});