define('reviewList',['artTemplate'], function(require, exports, module) {
  var template = require('artTemplate');
  template.config('openTag', '[[');
  template.config('closeTag', ']]');
  template.config('escape', false);
  var reviewObj = {
    levelTab: $("#levelTab"),
    reviewList:$("#reviewList"),
    event:function event() {
      var that = this;
      // tab ajax
      $.ajax("/UrCourse/getOpenLevel", {
        type: "GET",
        dataType: "json",
        success: function(res) {
          if(res.status == 10000){
            that.levelTab.html(template("reviewTab", res));
            that.apiList(that.levelTab.find('.on').attr('data-level'));
          } else {
            alert(res.info)
          }
        }
      });
      // tab
      that.levelTab.on("click",'li',function(e){
        $(this).addClass('on').siblings().removeClass('on');
        that.reviewList.hide();
        $(".load").show();
        that.apiList($(this).attr("data-level"));
      });
    },
    // list ajax
    apiList: _.debounce(function(id){
      $.ajax("/UrCourse/getTextbookListByLevel",{
        type: "GET",
        dataType: "json",
        data:{level:id},
        success: function(res) {
          if(res.status == 10000){
            $(".load").hide();
            $("#reviewList").show();
            $("#reviewList").html(template("reviewList_temp", res.data))
          } else {
            alert(res.info)
          }
        }
      })
    },500)
  };
  reviewObj.event();
});