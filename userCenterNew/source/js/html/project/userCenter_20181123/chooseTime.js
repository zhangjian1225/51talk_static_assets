define('chooseTime',['artTemplate'], function(require, exports, module) {
  var template = require('artTemplate');
  template.config('openTag', '[[');
  template.config('closeTag', ']]');
  template.config('escape', false);
  var timeObj = {
    tabDate: $("#tabDate"),
    basicDate: $("#basicDate"),
    freeTime: $("#freeTime"),
    sureBtn: $(".sure"),
    layerBtn: $(".layer"),
    event:function event(){
      var that = this;
      // tab list
      $.ajax("/UrCourse/getCalendarList", {
        type: "GET",
        dataType: "json",
        data:{
          textbook_id:$("#textbook_id").val(),
        },
        success: function(res) {
          if(res.status == 10000){
            that.basicDate.html(template("basic", res.data));
            that.tabDate.html(template("chooseTab", res.data));
            that.apiFreeTime(that.tabDate.find('.check').attr('data-date'));
          } else {
            alert(res.info)
          }
        }
      });
      // tab
      this.tabDate.on('click','li',function(){
        that.sureBtn.addClass("gray")
        $(this).addClass('check').siblings().removeClass('check');
        that.freeTime.hide();
        $(".load").show();
        $(".seleTime").text("请选择上课时间");
        that.apiFreeTime($(this).attr("data-date"))
      });
      // tab time
      this.freeTime.on('click','li',function(){
        that.sureBtn.removeClass("gray")
        if($(this).hasClass('gray')){
          return
        } else {
          $(this).addClass('check').siblings().removeClass('check');
          $(".seleTime").text(that.tabDate.find(".check").attr("data-date") + ' ' + that.freeTime.find(".check").attr("data-start-time") + '-' + that.freeTime.find(".check").attr("data-end-time"))
        }
      });
      // submit
      this.sureBtn.click(_.debounce(function(){
        if(that.freeTime.find('li').hasClass("check")){
          var $this = $(this);
          $.ajax({
            url:"/UrCourse/doUrCourse",
            type:"post",
            dataType:"json",
            data:{
              date:that.tabDate.find(".check").attr("data-date"),
              time:that.freeTime.find(".check").attr("data-time-id"),
              textbook_id:$("#textbook_id").val()
            },
            success:function(res){
              if(res.status == 10000){
                window.location.href = res.data.url;
              } else {
                that.layerBtn.find(".word p").text(res.info)
                that.layerBtn.show();
              }
            }
          });
        } else {
          that.layerBtn.find("p").text("请选择上课时间！")
          that.layerBtn.show();
        }
      },800));
      $("#cancel").click(function(){
        that.layerBtn.hide();
      });
    },
    // list ajax
    apiFreeTime:_.debounce(function(id){
      $.ajax({
        url:"/UrCourse/getDateTimeList",
        type: "GET",
        dataType: "json",
        data:{
          date:id,
          textbook_id:$("#textbook_id").val(),
        },
        success: function(res) {
          if(res.status == 10000){
            $(".load").hide();
            $("#freeTime").show();
            $("#freeTime").html(template("chooseTime", res))
          } else {
            alert(res.info)
          }
        }
      })
    },500),
  };
  timeObj.event();
});