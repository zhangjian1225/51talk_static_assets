define("common/sidebarRt", ["tpl/common/index.js",'../common/util'], function(require, exports, module) {
  //引入套餐模块
  let indexSelsectTime = require("tpl/common/index.js"),
  util =  require("../common/util");
  let getDataObj = {
    getFreeConfig () {
      let that = this;
      $.ajax({
        url : window.use_url + '/api/right',
        type : 'get',
        dataType : 'json',
        data : {},
        success (res) {
          if(res.status == 10000){
            $('#sidebarRt').html(indexSelsectTime.sidebarRt(res));
            util.replaceImgUrl('#sidebarRt',static_url);
          } else {
            alert(res.info)
          }
        }
      });
    }
  }
  getDataObj.getFreeConfig();
  
});