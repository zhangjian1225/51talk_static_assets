define("exReceive/classTime", ["tpl/exReceive/index.js",'../common/util'], function(require, exports, module) {
   //引入套餐模块
   let indexSelsectTime = require("tpl/exReceive/index.js"),
   util =  require("../common/util");
   let getDataObj = {
      getFreeConfig () {
        let that = this;
        $.ajax({
          url : window.use_url + '/api/FreeCourse/getFreeOpenDate',
          type : 'get',
          dataType : 'json',
          data : {},
          success (res) {
            if(res.status == 10000){
              $('#classTime').html(indexSelsectTime.classTime(res));
              util.replaceImgUrl('#classTime',static_url);
              if($(".listTab li").hasClass("gray")){
                $(".listTab li.gray").eq(0).find("span").addClass("check");
                $("#dataId").val($(".listTab li.gray").eq(0).attr("data-id"));
              }
              // 日期是否都已满
              if($("#is_disable_time").val() == 1){
                $(".timeList").find(".listTitle").show();
              }
              classFn(res)
              $("#dataTime").val(res.data.calendar_list[0].time)
            } else {
              alert(res.info)
            }
          }
        });
      }
    }
    getDataObj.getFreeConfig();
    
    let classFn = (res) => {
      var ClsTimeObj = {
          timeList: $(".timeList"),
          event: function event() {
            // 切换选择时间
            this.timeList.find(".tab li").on("click",function(){
              $(this).addClass("check").siblings().removeClass("check");
              $.get(window.use_url+'/api/FreeCourse/getFreeOpenTime',
                {
                  date:$(this).attr("data-time")
                },function(msg){
                  if(msg.status == 1){
                    var str = "";
                    for(var key in msg.data){
                      if(msg.data[key].status == 'off'){
                        str += '<li data-id='+ msg.data[key].id +'><span class="full">'+ msg.data[key].start +'已满</span></li>'
                      }else{
                        str += '<li class="gray" data-id='+ msg.data[key].id +'><span>'+ msg.data[key].start +'</span></li>'
                      }
                    }
                    $(".listTab").html(str);
                  }
              });
              $("#dataTime").val($(this).attr("data-time"));
              $("#dataId").val("");
            });
            // 选中时间
            this.timeList.find(".listTab").on("click",function(ev){
              var $this = $(ev.target);
              if($this.hasClass("full")){
                return
              }else{
                $this.addClass("check").parent().siblings().find("span").removeClass("check");
                $("#dataId").val($this.parent().attr("data-id"));
              }
            });
          },
      };
      ClsTimeObj.event();
    }
});