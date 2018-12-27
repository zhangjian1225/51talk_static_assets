define("common/detailInfo", [''], function (require, exports, module) {
  (function () {
    var detailObj = {
      infoTab: $('#infoTab'),
      listInfo: $('.list-info'),
      offsetTop: 0,
      arr: [],
      _event: function _event() {
        var that = this;
        this.scrollFn();
        //点击tab切换时，改变tab的scrollTop
        this.infoTab.find('li').on('click', function () {
          var cur = $(this);
          if (!cur.hasClass('current')) {
            $('html, body').animate({
              'scrollTop': $($(this).find('a').attr('href')).offset().top - 64
            }, 500);
          }
        });
      },
      scrollFn: function scrollFn() {
        var that = this;
        //将课程详情的内容的offset().top存入数组
        this.listInfo.each(function (i) {
          that.offsetTop = that.listInfo.eq(i).offset().top - $(window).height();
          that.arr.push(that.offsetTop);
        });
        //记录tab的offset().top
        // this.temp = this.infoTab.offset().top;
        this.temp = $('#infoTab').offset().top;
        $(window).on('scroll', function () {
          var winTop = $(window).scrollTop();
          //判断是否滚动到详情tab
          if (winTop >= that.infoTab.offset().top) {
            that.infoTab.addClass('info-tab-fix');
          }
          //向上滚动到详情tab的位置，恢复tab的样式
          if (winTop < that.temp) {
            that.infoTab.removeClass('info-tab-fix');
          }
          //滚动内容 tab跟随
          var listInfoLen = that.listInfo.size();

          for (var i = 0; i <= listInfoLen - 1; i++) {
            if (winTop >= that.arr[i]) {
              that.infoTab.find('li').removeClass('current').eq(i).addClass('current');
            }
          }
        });
      }
    };
    detailObj._event();
  })();
});
