"use strict";define("common/sidebar",["tpl/common/index.js","../common/util"],function(n,e,t){var s=n("tpl/common/index.js"),i=n("../common/util");({getFreeConfig:function(){$.ajax({url:window.use_url+"/api/left",type:"get",dataType:"json",data:{},success:function(n){if(1e4==n.status){if($("#sidebar").html(s.sidebar(n)),i.replaceImgUrl("#sidebar",static_url),1==n.data.content||2==n.data.content||3==n.data.content){var e=$(".menu").find("li").eq(1);e.find(".dirm").attr("href","javascript:;"),1==n.data.content?$(".alertSys").find("p").html("\u60a8\u7684\u5916\u65591\u5bf91\u4f53\u9a8c\u8bfe\u5df2\u7ecf\u8fc7\u671f\uff0c\u8bf7\u70b9\u51fb\u91cd\u65b0\u7533\u8bf7\u518d\u6b21\u6fc0\u6d3b\u4f53\u9a8c\u8bfe\uff01").end().find(".knowBtn").css({display:"none"}).end().find(".apply-lesson").css({display:"block"}):3==n.data.content?$(".alertSys").find("p").html("\u60a8\u7684\u5916\u65591\u5bf91\u4f53\u9a8c\u8bfe\u5df2\u7ecf\u7f3a\u5e2d\uff0c\u8bf7\u70b9\u51fb\u91cd\u65b0\u7533\u8bf7\u518d\u6b21\u6fc0\u6d3b\u4f53\u9a8c\u8bfe\uff01").end().find(".knowBtn").css({display:"none"}).end().find(".apply-lesson").css({display:"block"}):$(".alertSys").find("p").html("\u60a8\u7684\u5916\u65591\u5bf91\u4f53\u9a8c\u8bfe\u673a\u4f1a\u5df2\u7ecf\u6d88\u8017\u5b8c\uff0c\u8bf7\u8054\u7cfb\u8bfe\u7a0b\u987e\u95ee\u89e3\u51b3\uff01").end().find(".knowBtn").css({display:"inline-block"}).end().find(".apply-lesson").css({display:"none"}),e.on("click",function(){$(".alertSys").show()})}$(".alertSys").find(".close,.knowBtn").on("click",function(){$(".alertSys").hide()}),$(".alertSys").find(".apply-lesson").on("click",function(){$.ajax({type:"get",url:"/api/operatePoint",success:function(n){if(1e4==n.status){$(".alertSys").find("p").html("\u7533\u8bf7\u6210\u529f\uff0c\u7acb\u5373\u7ea6\u8bfe\u5427\uff01").end().find(".apply-lesson").css({display:"none"}).end().find(".knowBtn").attr({href:"/trial/reserve"}).css({display:"inline-block","margin-top":"44px"})}else alert(n.info)}})})}else alert(n.info)}})}}).getFreeConfig()});