"use strict";define("exReceive/indexSelsectTime",["tpl/exReceive/index.js","../common/util","./classTime.js","../common/exBanner.js","exReceive/silder_verification"],function(e,t,i){var n=e("tpl/exReceive/index.js"),s=e("../common/util");e("./classTime.js"),$("#indexSelsectTime").html(n.index_selsectTime()),s.renderHeaderBottom(),$("#bannerText").html(n.bannerText()),s.replaceImgUrl("#bannerText",static_url),"y"!=$("#is_check").val()&&0==$("#admin_id").val()?($("#mobileCode").html(n.mobileCode()),s.replaceImgUrl("#indexSelsectTime",static_url),$(".mobile").val($("#mobile").val())):("y"==$("#is_check").val()||0<$("#admin_id").val())&&$("#mobileCode").hide(),e("exReceive/silder_verification"),$.ajax({url:"http://www.51talk.com/trial/getMobileCode",xhrFields:{withCredentials:!0},type:"POST",dataType:"jsonp",crossDomain:!0,data:{},success:function(e){1==e.status&&""!=e.data.mobile_code&&$(".mobilecode").val(e.data.mobile_code)}});var a=$("#j_is_get_point").val();1==a?$(".alertSys").find("p").html("\u60a8\u7684\u5916\u65591\u5bf91\u4f53\u9a8c\u8bfe\u5df2\u7ecf\u8fc7\u671f\uff0c\u8bf7\u70b9\u51fb\u91cd\u65b0\u7533\u8bf7\u518d\u6b21\u6fc0\u6d3b\u4f53\u9a8c\u8bfe\uff01").end().find(".knowBtn").css({display:"none"}).end().find(".apply-lesson").css({display:"block"}).end().css({display:"block"}):3==a?$(".alertSys").find("p").html("\u60a8\u7684\u5916\u65591\u5bf91\u4f53\u9a8c\u8bfe\u5df2\u7ecf\u7f3a\u5e2d\uff0c\u8bf7\u70b9\u51fb\u91cd\u65b0\u7533\u8bf7\u518d\u6b21\u6fc0\u6d3b\u4f53\u9a8c\u8bfe\uff01").end().find(".knowBtn").css({display:"none"}).end().find(".apply-lesson").css({display:"block"}).end().css({display:"block"}):2==a?$(".alertSys").find("p").html("\u60a8\u7684\u5916\u65591\u5bf91\u4f53\u9a8c\u8bfe\u673a\u4f1a\u5df2\u7ecf\u6d88\u8017\u5b8c\uff0c\u8bf7\u8054\u7cfb\u8bfe\u7a0b\u987e\u95ee\u89e3\u51b3\uff01").end().find(".knowBtn").css({display:"inline-block"}).end().find(".apply-lesson").css({display:"none"}).end().css({display:"block"}):$(".alertSys").hide(),{mobile:$(".mobile"),mobilecode:$(".mobilecode"),imgCode:$(".imgcode"),verifycode:$("#verifycode"),getCodeBtn:$(".getCodeBtn"),smsBtn:$(".smsBtn"),nextBtn:$(".nextBtn"),event:function(){var s=this;this.getCodeBtn.on("click",function(){s.verifycode.attr("src","http://www.51talk.com/user/verify.php?a="+(new Date).getTime())}),$(".apply-lesson").on("click",function(){$.ajax({type:"get",url:"/api/operatePoint",success:function(e){if(1e4==e.status){$(".alertSys").find("p").html("\u7533\u8bf7\u6210\u529f\uff0c\u7acb\u5373\u7ea6\u8bfe\u5427\uff01").end().find(".apply-lesson").css({display:"none"}).end().find(".knowBtn").attr({href:"/trial/reserve"}).css({display:"inline-block","margin-top":"44px"})}else alert(e.info)}})}),$(".smsBtn").on("click",function(){if($(this).hasClass("smsBtn")){var e=s.mobile.val(),t=s.imgCode.val(),i=$(this);if(""==e)return alert("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"),!1;if(!/^1[0-9]{10}$/.test(e))return alert("\u8bf7\u586b\u5199\u6b63\u786e\u683c\u5f0f\u7684\u624b\u673a\u53f7\uff01"),!1;if(""==t)return alert("\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801\uff01"),!1;$.ajax({type:"get",url:"http://www.51talk.com/ajax/sendReserveCheckCode",dataType:"jsonp",crossDomain:!0,data:{user_mobile:e,vcode:t},success:function(e){1==e.status?(i.removeClass("smsBtn"),i.html("\u8bf7\u7a0d\u7b49..."),s.timeCount(i,120)):alert(e.info)}})}}),this.nextBtn.on("click",function(){var e=s.mobile.val(),t=s.imgCode.val(),i=(s.mobilecode.val(),$("#dataTime").val()),n=$("#dataId").val();if(""==n)return alert("\u8bf7\u9009\u62e9\u4e0a\u8bfe\u65f6\u95f4"),!1;if("y"!=$("#is_check").val()&&0==$("#admin_id").val()){if(""==e)return alert("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"),!1;if(!/^1[0-9]{10}$/.test(e))return alert("\u8bf7\u586b\u5199\u6b63\u786e\u683c\u5f0f\u7684\u624b\u673a\u53f7\uff01"),!1;if(""==t)return alert("\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801\uff01"),!1;$.ajax({url:"http://www.51talk.com/trial/checkMobile",xhrFields:{withCredentials:!0},type:"POST",dataType:"jsonp",crossDomain:!0,data:{course_date:i,course_time:n,mobile:e,code:t},success:function(e){1==e.status?window.location.href=window.time_url+"?course_date="+i+"&course_time="+n:alert(e.info)}})}else window.location.href=window.time_url+"?course_date="+i+"&course_time="+n})},timeCount:function(e,t){var i=setInterval(function(){if(--t<=0)return e.html("\u91cd\u65b0\u83b7\u53d6\u9a8c\u8bc1\u7801"),clearInterval(i),e.attr("data_state","1"),e.addClass("smsBtn"),!1;e.html(t+"\u79d2")},1e3)}}.event()});