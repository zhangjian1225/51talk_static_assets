define("exReceive/basic", ["tpl/exReceive/index.js",'../common/util'], function(require, exports, module) {
  //引入套餐模块
  let indexSelsectTime = require("tpl/exReceive/index.js"),
  util =  require("../common/util");
  let getDataObj = {
    getFreeConfig () {
      let that = this;
      $.ajax({
        url : window.use_url + '/api/userInfo',
        type : 'get',
        dataType : 'json',
        data : {},
        success (res) {
          if(res.status == 10000){
            $('#basic').html(indexSelsectTime.basic(res));
            util.replaceImgUrl('#basic',static_url);
            if($("#finishBuy").val() == 0){
              $(".buyBtn").show();
              $(".wLayer").hide();
            }
          } else {
            alert(res.info)
          }
        }
      });
    }
  }
  getDataObj.getFreeConfig();
  
});