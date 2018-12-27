define("common/timeout", [''], function (require, exports, module) {
  (function () {
    function timeout() {
      this.data = {
        time: '2018-1-27 23:59:59',
        dayEle: 'timeout_days',
        hourEle: 'timeout_hours',
        minuteEle: 'timeout_minutes',
        secondEle: 'timeout_second'
      };
      this.initTimeoutData = function () {
        var _this = this;
        $.ajax({
          url: window.href_url + '/api/pointBanner',
          // url: 'https://www.easy-mock.com/mock/5a815b907e05481d41b22ab1/syk_api/pointBanner',
          type: 'get',
          dataType: 'json',
          data: {
            point_type: exports.ajaxApiParams
          },
          success: function (res) {
            if (res.status == 1) {
              _this.data.time = new Date(res.data.end.replace(/\-/g, '/')).getTime() - new Date().getTime();
              $('.banner>img').prop({
                'src': res.data.url
              });
              _this.timeout();
            }
          }
        })
      };
      this.timeout = function () {
        var _this = this;
        setTimeout(function () {

          if (_this.data.time <= 0) {

            _this.endFn();

          } else {

            _this.data.time -= 100;

            $('#' + _this.data.dayEle).html(_this.computedTime(_this.data.time, 'days'));

            $('#' + _this.data.hourEle).html(_this.computedTime(_this.data.time, 'hours'));

            $('#' + _this.data.minuteEle).html(_this.computedTime(_this.data.time, 'minutes'));

            $('#' + _this.data.secondEle).html(_this.computedTime(_this.data.time, 'seconds'));

            _this.timeout()

          }
        }, 100)
      };
      this.endFn = function () {
        $('#timeout>p').addClass('hide');
        $('#timeout>p.default').removeClass('hide');
      };
      this.computedTime = function (time, unit) {
        if (!time) return
        var seconds = time / 1000;
        switch (unit) {
          case 'days':
            return Math.floor(seconds / 60 / 60 / 24);
          case 'hours':
            return Math.floor(seconds / 60 / 60 % 24);//超出一天，取余数
          case 'minutes':
            return Math.floor(seconds / 60 % 60);//超出1小时，取余数
          case 'seconds':
            return (seconds % 60).toFixed(1);
        }
      };
      this.init = function () {
        this.initTimeoutData();
      };
      this.init();
    }
    exports.ajaxApiParams = 'point_package';
    exports.timeout = timeout;
  })();
});
