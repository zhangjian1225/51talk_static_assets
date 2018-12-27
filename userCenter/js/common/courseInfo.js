"use strict";define("common/courseInfo",["tplCommon","../common/cart","../common/util","../common/layer"],function(t,i,n){!function(){var i=t("tplCommon"),n=t("json2"),a=t("../common/cart"),o=t("../common/util"),s=t("cookie"),e=t("../common/layer"),r={},c={courseId:0,getCourseData:function(){var t=this;$.ajax({url:window.href_url+"/api/pointList",type:"get",dataType:"json",data:{point_type:$("#point_type").val()},success:function(n){if(1==n.status){$("#tInfoBox").html(i.courseInfo(n));n.data&&n.data[0]&&n.data[0].conf_package_desc;var a=$("#tInfoBox #courseInfo li");a&&a.eq(0)&&d(a.eq(0)),o.replaceImgUrl("#tInfoBox",static_url),l(),t.getCourseInfo()}else alert(n.info)}})},getCourseInfo:function(){$.ajax({url:window.href_url+"/api/pointDetail",type:"get",dataType:"json",data:{id:c.courseId,from:"web"},success:function(t){1==t.status?($("#priceInfo").html(i.price_info(t)),$("#installment").html(i.installment(t)),r[t.data.info.id]=t):alert(t.info)}})}};function d(t){if(t){var i=t.attr("data-desc"),n=$("#tInfoBox .course-box"),a=n.find(".tip");a&&a.remove(),i&&n.append('<p class="tip" style="margin-left: 20px; color: #999">'+i+"</p>")}}c.getCourseData();var l=function(){var t={courseInfo:$("#courseInfo"),courseBox:$("._course-box"),suspensionInfo:$(".suspension-info"),buyBtn:$("#buyBtn"),_event:function(){var t=this;this.cartFn(this.courseInfo.find("li").eq(0)),this.courseInfo.find("li").on("click",function(){if(d($(this)),!$(this).hasClass("current")){$(this).parent().find("li").removeClass("current li-spec"),$(this).addClass("current li-spec"),$(this).siblings().find(".child_1").removeClass("hide"),$(this).siblings().find(".child_2").addClass("hide"),$(this).find(".child_1").addClass("hide"),$(this).find(".child_2").removeClass("hide"),c.courseId=$(this).attr("data-id");var n=!1;for(var a in r)r[a].data.info.id==c.courseId&&(n=!0);1==n?($("#priceInfo").html(i.price_info(r[c.courseId])),$("#installment").html(i.installment(r[c.courseId]))):c.getCourseInfo(),t.cartFn($(this))}}),this.courseInfo.find("li").on("mouseover",function(){$(this).find(".suspension-info").show()}).on("mouseout",function(){$(this).find(".suspension-info").hide()}),c.courseId=this.courseInfo.find("li").eq(0).attr("data-id"),this.buyBtn.on("click",function(){t.cart=n.stringify({cart:[c.courseId]}),$.ajax({url:window.href_url+"/ajax/checkCart",type:"get",dataType:"json",async:!1,data:{cart:t.cart},success:function(i){1==i.status?($("#formCard").val(t.cart),$("#buyBtnFrom").submit()):0==i.status&&e.showFn(i.info)}})}),a.init()},cartFn:function(t){var i={};if(i[t.attr("data-id")]={id:t.attr("data-id"),price:t.attr("price"),title:t.attr("title"),point_type:t.attr("point-type"),expire_days:t.attr("expire-days"),is_show_installment:"",installment_num:"",installment_price:""},$(".jsCart").attr("data-cart",n.stringify(i)),""!=s.getCookie("cart")){var a=n.parse(s.getCookie("cart")),o=!1;for(var e in a.cart)t.attr("data-id")==a.cart[e]&&(o=!0);1==o?($(".jsCart").text("\u5df2\u52a0\u5165\u8d2d\u7269\u8f66"),$(".jsCart").addClass("already-cart")):($(".jsCart").text("\u52a0\u5165\u8d2d\u7269\u8f66"),$(".jsCart").removeClass("already-cart"))}}};t._event(),t.courseInfo.find("li").eq(0).click()}}()});