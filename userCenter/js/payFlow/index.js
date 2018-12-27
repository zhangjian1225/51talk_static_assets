"use strict";define("payFlow/index",["payFlowtpl","tplCommon","../common/util"],function(t,e,a){t("cookie");var n=t("json2");function i(){this.tpl=t("payFlowtpl"),this.commonTpl=t("tplCommon"),this.selectCartId=0,this.selectMoney=0}var o=t("../common/util");i.prototype={init:function(){this.renderMain(),o.renderHeaderBottom(),"mix_point"==$("#point_type").val()?this.renderCombinePackage():this.renderPackageList(),"point_package_10"==$("#point_type").val()&&this.renderAgreement($("#point_type").val()),this.agreement(),this.submitOrder(),this.warningTip(),this.mdialog()},renderAgreement:function(t){"point_package_10"==t&&$("#app #package-agreement").html(this.tpl.AgreeAdultPackage10)},renderMain:function(){$("#app").html(this.tpl.indexMain({point_type:$("#point_type").val(),agree_version:$("#agree_version").val(),isValidateDate:+new Date>+new Date(2018,9,1)})),o.replaceImgUrl("#app",static_url)},banckList:function(t){var e=window.navigator.userAgent,a=e.indexOf("Firefox")>-1,n=-1!==e.indexOf("Chrome");(a||n)&&(t.hasClass("bankCheck")?$("#explainT").show():$("#explainT").hide())},renderCombinePackage:function(){var t=this,e=$("#cartInfo").val();$.get(window.href_url+"/ajax/getOrderInfo?point_type=mix_point&cart="+e,function(a){var i=a.data,l=i.mix;$("#packageList11").html(t.tpl.combinePackage({mix:l,is_cash_down:i.price.is_cash_down,sign:i.data_sign,gateway:i.gateway})),$("#my_cart").val(e),$("#totalInfo").html(t.tpl.totalInfo({price:i.price,goods:1})),o.replaceImgUrl("#totalInfo",static_url),$("#meetPay span").text(i.price.pay_price.toFixed(2)),$("#meetPay span").attr("origin",i.price.pay_price),i.price.can_use_card&&($("#couponList").html(t.tpl.couponList()),o.replaceImgUrl("#couponList",static_url),t.renderCouponList(),t.bindCoupon());var s={fullGateway:i.pay_method.full_gateway,fullEbank:i.pay_method.full_ebank,count:$("#meetPay span").text()},r={list:i.pay_method.installment?i.pay_method.installment.list:[],count:$("#meetPay span").text()},c={list:i.pay_method.bank?i.pay_method.bank.list:[],count:$("#meetPay span").text()};i.pay_method.bank&&(i.pay_method.bank.count=$("#meetPay span").text()),$("#navPay").html(t.tpl.navPay({pay:i.pay_method,allMoney:_.escape(n.stringify(s)),installment:_.escape(n.stringify(r)),huikuan:_.escape(n.stringify(c))})),o.replaceImgUrl("#navPay",static_url),$("#navPay li").off().on("click",function(){$(this).addClass("active").siblings().removeClass("active");var e=$(this).attr("flage");if("installment"==e&&t.selectCartId){$("#card_id").val(""),$("#couponList").hide();var a=$("#meetPay span").attr("origin");$("#meetPay span").text(parseInt(a).toFixed(2)),$("#totalInfo .ticket").hide()}else t.selectCartId&&0==$("#couponList:visible").length&&($("#couponList").show(),$("#coupCon [data-cardid='"+t.selectCartId+"']").click());"installment"==e?$("#couponList").hide():"installment"!=e&&$("#couponList").show();var n=$(this).data("source");n.count=$("#meetPay span").text(),$("#payStyle").html(t.tpl[e](n)),o.replaceImgUrl("#payStyle",static_url),$("#payStyle .count").text($("#meetPay span").text()),$("#payStyle .bankItem").off().on("click",function(){if($("#payStyle .bankItem").removeClass("active"),$(this).addClass("active"),$("#payStyle .bankItem input").removeAttr("checked"),$(this).find("input").attr("checked","checked"),0!=$("#installmentDetail").length){var e=$(this).find("input"),a={cardrate:e.attr("cardrate"),periodnum:e.attr("periodnum"),count:parseInt($("#meetPay span").text()),bank:e.val(),firstRate:e.attr("firstrate")},n=$("#meetPay span").attr("origin");$(this).hasClass("bdwebBank")?($("#coupCon [data-cardid='"+t.selectCartId+"']").hasClass("selected")&&($("#coupCon [data-cardid='"+t.selectCartId+"']").addClass("selected"),$("#meetPay span").text((n-t.selectMoney).toFixed(2)),$("#payStyle .count").text((n-t.selectMoney).toFixed(2)),$("#totalInfo .ticket").show(),$("#card_id").val(t.selectCartId)),$("#couponList").show()):($("#couponList").hide(),$("#totalInfo .ticket").hide(),$("#meetPay span").text(n),$("#payStyle .count").text(n),$("#card_id").val("")),$("#installmentDetail").html(t.tpl.installmentDetail(a))}else t.banckList($(this))})}),$("#payStyle").html(t.tpl.allMoney({fullGateway:i.pay_method.full_gateway,fullEbank:i.pay_method.full_ebank,count:$("#meetPay span").text()})),o.replaceImgUrl("#payStyle",static_url),$("#payStyle .bankItem").off().on("click",function(){t.banckList($(this)),$("#payStyle .bankItem").removeClass("active"),$(this).addClass("active"),$("#payStyle .bankItem input").removeAttr("checked"),$(this).find("input").attr("checked","checked")})})},renderPackageList:function(){var t=this,e=$("#cartInfo").val()?n.parse($("#cartInfo").val()):{};delete e.goods,e=n.stringify(e),$.get(window.href_url+"/ajax/getOrderInfo?&web=1&cart="+e,function(e){if(0==e.status)alert(e.info);else{var a=e.data;$("#packageList11").html(t.tpl.packageList({point:a.point,is_cash_down:a.price.is_cash_down,sign:a.data_sign,gateway:a.gateway,point_id:_.keys(a.point).toString()})),o.replaceImgUrl("#packageList11",static_url),$("#freeMoney").html(t.tpl.freeMoney({price:a.price})),o.replaceImgUrl("#freeMoney",static_url),$("#totalInfo").html(t.tpl.totalInfo({price:a.price,goods:_.keys(a.point).length})),o.replaceImgUrl("#totalInfo",static_url),$("#meetPay span").text(a.price.pay_price.toFixed(2)),$("#meetPay span").attr("origin",a.price.pay_price);var i=0;for(var l in a.point)"microphone"!=a.point[l].point_type&&"book"!=a.point[l].point_type||i++;i>0&&($("#addrInfo").html(t.tpl.addrInfo({point:a.point})),o.replaceImgUrl("#addrInfo",static_url),t.renderAddress()),a.price.can_use_card&&($("#couponList").html(t.tpl.couponList()),o.replaceImgUrl("#couponList",static_url),t.renderCouponList(),t.bindCoupon());var s={fullGateway:a.pay_method.full_gateway,fullEbank:a.pay_method.full_ebank,count:$("#meetPay span").text()},r={list:a.pay_method.installment?a.pay_method.installment.list:[],count:$("#meetPay span").text()},c={list:a.pay_method.bank?a.pay_method.bank.list:[],count:$("#meetPay span").text()};a.pay_method.bank&&(a.pay_method.bank.count=$("#meetPay span").text()),$("#navPay").html(t.tpl.navPay({pay:a.pay_method,allMoney:_.escape(n.stringify(s)),installment:_.escape(n.stringify(r)),huikuan:_.escape(n.stringify(c))})),o.replaceImgUrl("#navPay",static_url),$("#navPay li").off().on("click",function(){$(this).addClass("active").siblings().removeClass("active");var e=$(this).attr("flage");if("installment"==e&&t.selectCartId){$("#card_id").val(""),$("#couponList").hide();var a=$("#meetPay span").attr("origin");$("#meetPay span").text(parseInt(a).toFixed(2)),$("#totalInfo .ticket").hide()}else if(t.selectCartId&&0==$("#couponList:visible").length){var n=$("#meetPay span").attr("origin");$("#couponList").show(),$("#meetPay span").text((n-t.selectMoney).toFixed(2)),$("#payStyle .count").text((n-t.selectMoney).toFixed(2)),$("#totalInfo .ticket").show()}"installment"==e?$("#couponList").hide():"installment"!=e&&$("#couponList").show();var i=$(this).data("source");i.count=$("#meetPay span").text(),$("#payStyle").html(t.tpl[e](i)),o.replaceImgUrl("#payStyle",static_url),$("#payStyle .count").text($("#meetPay span").text()),$("#payStyle .bankItem").off().on("click",function(){if($("#payStyle .bankItem").removeClass("active"),$(this).addClass("active"),$("#payStyle .bankItem input").removeAttr("checked"),$(this).find("input").attr("checked","checked"),0!=$("#installmentDetail").length){var e=$(this).find("input"),a={cardrate:e.attr("cardrate"),periodnum:e.attr("periodnum"),count:parseInt($("#meetPay span").text()),bank:e.val(),firstRate:e.attr("firstrate")},n=$("#meetPay span").attr("origin");$(this).hasClass("bdwebBank")?($("#coupCon [data-cardid='"+t.selectCartId+"']").hasClass("selected")&&($("#coupCon [data-cardid='"+t.selectCartId+"']").addClass("selected"),$("#meetPay span").text((n-t.selectMoney).toFixed(2)),$("#payStyle .count").text((n-t.selectMoney).toFixed(2)),$("#totalInfo .ticket").show(),$("#card_id").val(t.selectCartId)),$("#couponList").show()):($("#couponList").hide(),$("#totalInfo .ticket").hide(),$("#meetPay span").text(n),$("#payStyle .count").text(n),$("#card_id").val("")),$("#installmentDetail").html(t.tpl.installmentDetail(a))}else t.banckList($(this))})}),$("#payStyle").html(t.tpl.allMoney({fullGateway:a.pay_method.full_gateway,fullEbank:a.pay_method.full_ebank,count:$("#meetPay span").text()})),o.replaceImgUrl("#payStyle",static_url),$("#payStyle .bankItem").off().on("click",function(){t.banckList($(this)),$("#payStyle .bankItem").removeClass("active"),$(this).addClass("active"),$("#payStyle .bankItem input").removeAttr("checked"),$(this).find("input").attr("checked","checked")})}})},couponBindEvent:function(){var t=this;$("#coupCon .normal").off().on("click",function(e){var a=Number($("#meetPay span").attr("origin")),n=a-.1*a;if($(this).hasClass("selected"))$("#card_id").val(""),$(this).removeClass("selected"),$("#totalInfo .ticket").hide(),$("#meetPay span,#payStyle .count").text(a),$("#ereryNum").text((.005*n).toFixed(2)),$("#fengNum,#AlloranNum").text((.06*n).toFixed(2)),$("#orangeText").text((.1*a).toFixed(2)),$("#AllorangeNum").text(n.toFixed(2)),$("#labelNum").text(((n+.06*n)/12).toFixed(2)),$("#orangeNum").text((a+.06*n).toFixed(2)),t.selectCartId=0,t.selectMoney=0;else{$("#card_id").val($(this).data("cardid")),$(this).addClass("selected").siblings().removeClass("selected"),$("#totalInfo .ticket").show();var i=$(this).data("money"),o=a-i-.1*(a-i);$("#totalInfo .ticket span").text(i.toFixed(2)),$("#meetPay span,#payStyle .count").text((a-i).toFixed(2)),$("#ereryNum").text((.005*o).toFixed(2)),$("#fengNum,#AlloranNum").text((.06*o).toFixed(2)),$("#orangeText").text((.1*(a-i)).toFixed(2)),$("#AllorangeNum").text(o.toFixed(2)),$("#labelNum").text(((o+.06*o)/12).toFixed(2)),$("#orangeNum").text((a-i+.06*o).toFixed(2)),t.selectCartId=$(this).data("cardid"),t.selectMoney=i}if($("#payStyle .bdwebBank").hasClass("active")){var l=$("#payStyle .bdwebBank").find("input"),s={cardrate:l.attr("cardrate"),periodnum:l.attr("periodnum"),count:parseInt($("#meetPay span").text()),bank:l.val(),firstRate:l.attr("firstrate")};$("#installmentDetail").html(t.tpl.installmentDetail(s))}})},renderCouponList:function(){var t=this,e={};e="mix_point"==$("#point_type").val()?{point_type:"mix_point",cart:$("#cartInfo").val()}:{point_ids:($("#cartInfo").val()?n.parse($("#cartInfo").val()):{}).cart.join(",")},$.get(window.href_url+"/api/cashCardList",e,function(e){1==e.status&&e.data.length>0&&($(".coupon-tit").show(),$("#coupCon").html(t.tpl.coupCon({data:e.data})),o.replaceImgUrl("#coupCon",static_url),t.couponBindEvent())})},renderAddress:function(){var t=this;$.get(window.href_url+"/api/addressInfo",function(e){1==e.status?$("#address-box").html(t.tpl.address({data:e.data})):$("#address-box").html(t.tpl.address({data:{real_name:"",user_addr:"",user_phone:""}}))})},bindCoupon:function(){var t=this;$(".bind-coupon .bind").on("click",function(){var e,a=$.trim($(".bind-coupon input").val()),i=$("#point_type").val();if(""!=a){var o={card_id:a,price:$("#real").attr("real")};"mix_point"==i?(e=$("#cartInfo").val(),o.cart=e,o.point_type="mix_point"):(e=$("#cartInfo").val()?n.parse($("#cartInfo").val()):{},o.point_ids=e.cart.join(",")),$.post(window.href_url+"/api/cashCardAdd",o,function(e){1==e.status?($(".mask,.alert").show(),$(".coupon-tit").show(),$(".bind-coupon .errorTip").hide(),$("#coupCon").append(t.tpl.coupCon({data:[{is_order_use:!1,money:e.data.money,id:e.data.real_card_id,valid_end:e.data.expire}]})),$("#bMoney").text(e.data.money),$(".alert .close").off().on("click",function(){$(".mask,.alert").hide()}),$(".f-btn span").off().on("click",function(){$(".mask,.alert").hide(),t.couponBindEvent()})):$(".bind-coupon .errorTip").text(e.info).css("display","inline-block")})}else $(".bind-coupon .errorTip").text("\u8bf7\u8f93\u5165\u4ee3\u91d1\u5238").css("display","inline-block")}),$(".bind-coupon input").focus(function(){$(".bind-coupon .errorTip").hide()})},agreement:function(){$(".add-a-check-text").off().on("click",function(){var t=$(this).find(".add-a-c-icon"),e=$(this).find("input");t.hasClass("add-a-c-icon2")?(t.removeClass("add-a-c-icon2"),e.attr("checked","checked")):(t.addClass("add-a-c-icon2"),e.removeAttr("checked"))})},submitOrder:function(){$(".pay_btn").on("click",function(){var t=$("[name='user_phone']").val(),e=$("[name='real_name']").val();return $("[name='real_name']").length>0&&!e?($("#warning .content").text("\u8bf7\u586b\u5199\u60a8\u7684\u6536\u4ef6\u4eba\u59d3\u540d"),void $("#warning,.mask").show()):$("[name='real_name']").length>0&&e.length>8?($("#warning .content").text("\u60a8\u8f93\u5165\u540d\u5b57\u8fc7\u957f\uff0c\u8bf7\u63a7\u5236\u57288\u4e2a\u5b57\u4ee5\u5185"),void $("#warning,.mask").show()):$("[name='user_addr']").length>0&&!$("[name='user_addr']").val()?($("#warning .content").text("\u8bf7\u586b\u5199\u60a8\u7684\u6536\u4ef6\u5730\u5740"),void $("#warning,.mask").show()):$("[name='user_phone']").length>0&&!$("[name='user_phone']").val()?($("#warning .content").text("\u8bf7\u586b\u5199\u60a8\u7684\u624b\u673a\u53f7\u7801"),void $("#warning,.mask").show()):$("[name='user_phone']").length>0&&t&&!/^1[0-9]{10}$/.test(t)?($("#warning .content").text("\u60a8\u7684\u624b\u673a\u53f7\u7801\u586b\u5199\u6709\u8bef"),void $("#warning,.mask").show()):0==$(".add-agreement-check input:checked").length?($("#warning .content").text("\u60a8\u8fd8\u6ca1\u6709\u9009\u62e9\u540c\u610f\u534f\u8bae\uff01"),void $("#warning,.mask").show()):$("[name='payMethod']").length>0&&0==$("[name='payMethod']:checked").length?($("#warning .content").text("\u60a8\u8fd8\u6ca1\u6709\u9009\u62e9\u652f\u4ed8\u65b9\u5f0f"),void $("#warning,.mask").show()):($("#form").action="//sale.51talk.com/orderPay"+$("#card_id").val(),$("#form").submit(),void $(".m-dialog").show())})},warningTip:function(){$("#warning .close,#warning .btn").on("click",function(){$("#warning").hide(),$(".mask").hide()})},mdialog:function(){$(".m-dialog .close").on("click",function(){$(".m-dialog").fadeOut()})}},(new i).init()});