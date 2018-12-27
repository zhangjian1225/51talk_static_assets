define("common/banner", ['tplCommon', '../common/util'], function (require, exports, module) {
  (function () {
    var tplCommon = require('tplCommon');
    var util = require("../common/util");
    //获取数据
    var getDataObj = {
      //获取课程套餐数据
      getCourseData: function getCourseData() {
        $.ajax({
          url: window.href_url + '/api/pointBanner',
          // url: 'https://www.easy-mock.com/mock/5a815b907e05481d41b22ab1/syk_api/pointBanner',
          type: 'get',
          dataType: 'json',
          data: {
            point_type: $('#point_type').val()
          },
          success: function success(res) {
            if (res.status == 1) {
              var time = res.data.end;
              $('#banner').html(tplCommon.banner());
              $('#banner img').attr('src', res.data.url);
              $('#banner').attr('data-time', time);
              util.replaceImgUrl('#banner', static_url);
            }
          }
        });
      }
    };
    getDataObj.getCourseData();
  })();
});
