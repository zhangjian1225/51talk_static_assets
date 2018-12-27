define("exReceive/indexSuccess", ["tpl/exReceive/index.js",'../common/util'], function(require, exports, module) {
  //引入套餐模块
  let indexSuccess = require("tpl/exReceive/index.js"),
  util =  require("../common/util");
  // 公共头
  util.renderHeaderBottom();

  $('#indexSuccess').html(indexSuccess.index_success());
  util.replaceImgUrl('#indexSuccess',static_url);
  //引入成功页
  let getDataObj = {
    getFreeConfig () {
      let that = this;
      $.ajax({
        url : window.use_url + '/api/successAppoint?appoint_id='+$("#appoint_id").val(),
        type : 'get',
        dataType : 'json',
        data : {},
        success (data) {
          if(data.status == 10000){
            // 引入中间内容
            $('#success').html(indexSuccess.success(data));
            util.replaceImgUrl('#success',static_url);
            if($("#user_type").val() == 1){ // 成人
              $(".adult-li").show();
              $(".youth-li").hide();
              $(".list-before").addClass("before-adult");
            }
            // 视频
            $('#video').html(indexSuccess.video());
            util.replaceImgUrl('#video',static_url);
            //预习视频打点参数
            var params = {
              appoint_id : data.data.id,
              course_id: data.data.course_id,
              log_type: 6
            }
            successFn(params);
          } else {
            alert(data.info)
          }
        }
      });
    }
  }
  getDataObj.getFreeConfig();
  

  let successFn = (params) => {
    var successEvent = {
      videoBtn: $(".u-list li"), // 课前视频
      preVideo: $(".preview-btn"), // 预习视频
      closeBtn: $(".video-tips .close"), // 关闭视频
      returnBtn: $(".returnBtn"),//返回首页
      event: function event() {
        var that = this;
        this.videoBtn.click(function(){
          var $index = $(this).index();
          $.get(window.use_url + '/api/preparation',function(msg){
            if(msg.status == 10000){
              for(var i = 0; i < msg.data.length; i++){
                if($index == 0){
                  $(".ccID").attr("value",msg.data[0])
                  $(".ccIDName").attr("src",msg.data[0])
                }else if($index == 1){
                  $(".ccID").attr("value",msg.data[2])
                  $(".ccIDName").attr("src",msg.data[2])
                }
                $('.video-tips').show();
              }
            }
          });
        });
        // 预习视频
        this.preVideo.on("click",function(){
          var dataVideo = $(this).attr("data-video");
          $(".ccID").attr("value",dataVideo)
          $(".ccIDName").attr("src",dataVideo)
          $('.video-tips').show();
          //视频打点
          that.videoMask(params);

        });
        this.closeBtn.on("click",function(){
          $(".video-tips").hide();
        });
        this.returnBtn.find("a").attr('href',window.return_url);
      },
      //视频打卡
      videoMask:function(params) {
        $.ajax({
          url: 'http://www.51talk.com/ajax/addAppointCourseLog',
          type: "get",
          dataType: 'jsonp',
          data : params,
          jsonp: "callback",
          crossDomain: true,
          success : function(){}
        })
      }
    };
    successEvent.event();
  }

});