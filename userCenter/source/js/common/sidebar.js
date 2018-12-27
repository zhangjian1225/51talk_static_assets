define("common/sidebar", ["tpl/common/index.js",'../common/util'], function(require, exports, module) {
  //引入套餐模块
  let indexSelsectTime = require("tpl/common/index.js"),
  util =  require("../common/util");
  
  let getDataObj = {
    getFreeConfig () {
      let that = this;
      $.ajax({
        url : window.use_url + '/api/left',
        type : 'get',
        dataType : 'json',
        data : {},
        success (res) {
          if(res.status == 10000){
            $('#sidebar').html(indexSelsectTime.sidebar(res));
            util.replaceImgUrl('#sidebar',static_url);
            // 判断次数是否为0
            if (res.data.content == 1 || res.data.content == 2 || res.data.content == 3){
              var menuLi = $(".menu").find("li").eq(1);
              menuLi.find(".dirm").attr('href','javascript:;');
              if (res.data.content == 1){
                $(".alertSys").find('p').html('您的外教1对1体验课已经过期，请点击重新申请再次激活体验课！').end().find('.knowBtn').css({ 'display': 'none' }).end().find('.apply-lesson').css({ 'display': 'block' });
              } else if (res.data.content == 3){
                $(".alertSys").find('p').html('您的外教1对1体验课已经缺席，请点击重新申请再次激活体验课！').end().find('.knowBtn').css({ 'display': 'none' }).end().find('.apply-lesson').css({ 'display': 'block' });
              }else{
                $(".alertSys").find('p').html('您的外教1对1体验课机会已经消耗完，请联系课程顾问解决！').end().find('.knowBtn').css({ 'display': 'inline-block' }).end().find('.apply-lesson').css({ 'display': 'none' });
              }
              menuLi.on("click",function(){
                $(".alertSys").show();
              });
            }
            $(".alertSys").find(".close,.knowBtn").on("click",function(){
              $(".alertSys").hide();
            });
            $(".alertSys").find(".apply-lesson").on("click", function () {
              $.ajax({
                type: 'get',
                url: '/api/operatePoint',
                success(res) {
                  if (res.status == 10000) {
                    var href_src = '/trial/reserve';
                    $(".alertSys").find('p').html('申请成功，立即约课吧！').end().find('.apply-lesson').css({ 'display': 'none' }).end().find('.knowBtn').attr({ 'href': href_src}).css({ 'display': 'inline-block', 'margin-top': '44px' });
                  } else {
                    alert(res.info);
                    //that.verifycode.attr('src', 'http://www.51talk.com/user/verify.php' + '?a' + '=' + new Date().getTime());
                  }
                }
              });
              
            });
          } else {
            alert(res.info)
          }
        }
      });
    }
  }
  getDataObj.getFreeConfig();
  
});