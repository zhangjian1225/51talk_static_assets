"use strict";define("exReceive/indexMethod",["tpl/exReceive/index.js","../common/util"],function(e,n,i){var a=e("tpl/exReceive/index.js"),t=e("../common/util");$("#indexMethod").html(a.index_method()),t.replaceImgUrl("#indexMethod",static_url),t.renderHeaderBottom(),$("#bannerText").html(a.bannerText()),t.replaceImgUrl("#bannerText",static_url);var l=$("#show_nick_name").val();({mList:$(".mList"),comBtn:$(".comBtn"),nickName:$("input#nick_name"),event:function(){var i=this,n="";function a(){var e=i.nickName.val(),n=/^[A-Za-z]{2,20}$/.test(e);return console.log(e,n),n}this.mList.find("li").on("click",function(){var e=$(this).find(".select");e.addClass("check").parents("li").siblings().find(".select").removeClass("check"),$("#dataId").val(e.attr("data-id"))}),this.comBtn.on("click",function(){if("1"!=l||a()){window.__sdonclick&&window.__sdonclick("exclassbooked");var e={tool:$("#dataId").val(),course_date:$("#course_date").val(),course_time:$("#course_time").val()};"1"==l&&(e.nick_name=$("#nick_name").val()),$.post("http://trial.51talk.com/api/FreeCourse/doReserve",e,function(e){1==e.status?window.location.href=window.completion_url+"?appoint_id="+e.data:alert(e.info)})}}),1==$("#user_role").val()&&($(".mList").addClass("mListCls"),$(".mList li").eq(1).hide()),"1"==l?($(".show_nick_name__no").hide(),$(".show_nick_name").show()):($(".show_nick_name").hide(),$(".show_nick_name__no").show()),this.nickName.on("input",function(){if(a())n=i.nickName.val(),i.comBtn.removeClass("disabled");else{var e=i.nickName.val();1==e.length&&/^[A-Za-z]$/.test(e)?n=e:i.nickName.val().length>n.length?(i.nickName.val(n),1==!i.nickName.val().length&&i.comBtn.removeClass("disabled")):i.comBtn.addClass("disabled"),0===i.nickName.val().length&&(n="",i.comBtn.addClass("disabled")),1===i.nickName.val().length&&i.comBtn.addClass("disabled")}})}}).event()});