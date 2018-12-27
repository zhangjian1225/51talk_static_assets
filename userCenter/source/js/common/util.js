define("common/util", ['tplCommon'], function (require, exports, module) {
  module.exports = {
    replaceImgUrl: function (ele, static_url) {
      var imgEles = $(ele).find("img");
      $.each(imgEles, function (i, item) {
        var src = $(item).attr("src");
        src = src.replace(/\.\.\/\.\./, static_url);
        $(item).attr('src', src);
      })
    },
    renderHeaderBottom: function () {
      var self = this;
      self.commonTpl = require("tplCommon");

      var j_href_url = "sale.51talk.com";
      if (document.domain === "trial.51talk.com") {
        j_href_url = "trial.51talk.com";
      }

      $.ajax({
        url: "//" + j_href_url + "/api/webHeader",
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true,
        data: {},
        success: function (res) {
          //NOTE： 原来状态是1，现在改为 10000
          if (res.status == 10000) {
            $("#head").html(self.commonTpl.head(res.data));
            self.replaceImgUrl('#head', static_url);
            $("#bottom").html(self.commonTpl.bottom(res.data));
            self.replaceImgUrl('#bottom', static_url);
            // $("#pind").html(res.data.html_statistics);
          } else {
            alert(res.info);
          }
        },
        error: function () {
          alert("接口错误");
        }
      });
    }
  }
});
