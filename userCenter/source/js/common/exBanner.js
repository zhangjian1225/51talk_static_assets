define("common/exBanner", ["tpl/common/index.js",'../common/util'], function(require, exports, module) {
  //引入套餐模块
  let indexSelsectTime = require("tpl/common/index.js"),
  util =  require("../common/util");
  let getDataObj = {
    getFreeConfig () {
      let that = this;
      $.ajax({
        url : 'http://www.51talk.com/trial/top_advertisement',
        type : 'get',
        dataType : 'jsonp',
        data : {},
        success (res) {
          if(res.status == 1){
            $('#banner').html(indexSelsectTime.exBanner(res));
            util.replaceImgUrl('#banner',static_url);
            var bannerObj = {
                switch: $(".p-switch"),
                pic: $(".p-pic"),
                picLi: $(".p-pic").find("li"),
                count: $(".p-pic").find("li").length,
                timer: null,
                oNow: 0,
                speed:500,
                slideSpeed:5000,
                _event: function() {
                  var that = this;
                  this.switch.find("li").on("click",function(){
                    var index=$(this).index();
                    if(that.oNow == index) return;
                    that.slide(index)
                  }).hover(function(){
                    clearInterval(that.timer);
                  },function(){
                    that.begin();
                  });
                  that.frameTime();
                  that.begin();
                },
                slide(type){
                  var that = this;
                  if(that.picLi.eq(that.oNow).is(":animated")) return;
                  that.picLi.css({"z-index":0}).stop().animate({"opacity":0},that.speed);
                  if(type == "next"){
                    that.oNow++;
                  }else{
                    that.oNow = type;
                  }
                  if(that.oNow<0){
                    that.oNow = that.count-1;
                  }else if(that.oNow === that.count){
                    that.oNow = 0;  
                  }
                  that.picLi.eq(that.oNow).css({"z-index":1,"opacity":0.7}).stop().animate({"opacity":1},that.speed);
                  that.switch.find("li").removeClass("crt").eq(that.oNow).addClass("crt");
                  that.begin();
                },
                begin(){
                  if(this.count<=1) return;
                  clearInterval(this.timer);
                  var that = this;
                  that.timer = setInterval(function(){ 
                    that.slide("next")
                  }, that.slideSpeed);
                },
                // 倒计时
                frameTime(){
                  var dataTime= $("#dataTime").attr("data-end-time");//结束时间
                  var timer = setInterval(function(){
                    if (dataTime > 1) {
                      dataTime -= 1;
                      var day = Math.floor((dataTime / 3600) / 24);
                      var hour = Math.floor((dataTime / 3600) % 24);
                      var minute = Math.floor((dataTime / 60) % 60);
                      var second = Math.floor(dataTime % 60);
                      $(".u-day i").text(day)
                      $(".u-hour i").text(hour<10?"0"+hour:hour);//计算小时
                      $(".u-minute i").text(minute<10?"0"+minute:minute);//计算分钟
                      $(".u-second i").text(second<10?"0"+second:second);//计算秒杀
                    } else { 
                      clearInterval(timer);
                    }
                  }, 1000);
                },
            };
            bannerObj._event();
          } else {
            alert(res.info)
          }
        }
      });
    }
  }
  getDataObj.getFreeConfig();

  // $('#banner').html(indexSelsectTime.exBanner());
  // util.replaceImgUrl('#banner',static_url);
  
  // let bannerFn = (res) => {
    
  // }
});