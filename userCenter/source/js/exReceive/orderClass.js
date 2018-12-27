define("exReceive/orderClass", ["tpl/exReceive/index.js",'../common/util'], function(require, exports, module) {
  //引入套餐模块
  let orderClass = require("tpl/exReceive/index.js"),
  util =  require("../common/util");
  // 我预约的评测课
  let evaluResDataObj = {
    getFreeConfig () {
      let that = this;
      $.ajax({
        url : window.use_url + '/api/reserveCourse',
        type : 'get',
        dataType : 'json',
        data : {},
        success (res) {
            if(res.status == 10000){
              if(res.data != ""){
                $('#orderClass').html(orderClass.orderClass(res));
                util.replaceImgUrl('#orderClass',static_url);
                // 视频
                $(".viewDt").on("click",function(){
                  var dataVideo = $(this).attr("data-video");
                  $(".ccID").attr("value",dataVideo)
                  $(".ccIDName").attr("src",dataVideo)
                  $('.video-tips').show();
                  //视频打点
                  var params = {
                    appoint_id : res.data.id,
                    course_id: res.data.course_id,
                    log_type: 6
                  }
                  that.videoMask(params);
                });
              }
            } else {
              alert(res.info)
            }
        }
      });
    },
    videoMask (params) {
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
  }
  evaluResDataObj.getFreeConfig();
  
});