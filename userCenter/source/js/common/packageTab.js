define("common/packageTab", ['tplCommon'], function (require, exports, module) {
  (function () {
    var JSON2 = require("json2");
    var tplCommon = require('tplCommon');
    //获取数据
    var getDataObj = {
      //获取课程套餐数据
      getCourseData: function getCourseData() {
        var point_type = $('#point_type').val();
        $.ajax({
          url: window.href_url + '/api/typeList',
          // url: 'https://www.easy-mock.com/mock/5a815b907e05481d41b22ab1/syk_api/typeList',
          type: 'get',
          dataType: 'json',
          data: {
            from: 'web',
            point_type: point_type
          },
          success: function success(res) {
            if (res.status == 1) {
              var id = res.data[point_type]['default_id'];
              $('#tabBox').html(tplCommon.package_tab(res));
              $('#tabBox').attr('data-id', id);
              tabFn();
            } else {
              alert(res.info);
            }
          }
        });
      }
    };
    getDataObj.getCourseData();
    //tab交互
    var tabFn = function tabFn() {
      //套餐tab
      var indexFn = {
        tabId: $('#tabId'),
        _event: function _event() {
          this.tabId.find('li').on('click', function () {
            if (!$(this).hasClass('current')) {
              $(this).parent().find('li').removeClass('current');
              $(this).addClass('current');
            }
          });
        }
      };
      indexFn._event();
    };
  })();
});
