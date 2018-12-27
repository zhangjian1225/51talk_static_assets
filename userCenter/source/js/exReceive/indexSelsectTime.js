define("exReceive/indexSelsectTime", ["tpl/exReceive/index.js", '../common/util', './classTime.js', '../common/exBanner.js', 'exReceive/silder_verification'], function(require, exports, module) {
    //引入套餐模块
    let indexSelsectTime = require("tpl/exReceive/index.js"),
        util = require("../common/util");
		// 调用上课时间
    require("./classTime.js");
    $('#indexSelsectTime').html(indexSelsectTime.index_selsectTime());
    // 公共头
    util.renderHeaderBottom();
    // banner
    $('#bannerText').html(indexSelsectTime.bannerText());
    util.replaceImgUrl('#bannerText', static_url);
    // 手机验证
    if ($("#is_check").val() != "y" && $("#admin_id").val() == 0) {
        $('#mobileCode').html(indexSelsectTime.mobileCode());
        util.replaceImgUrl('#indexSelsectTime', static_url);
        $(".mobile").val($("#mobile").val());
    } else if ($("#is_check").val() == "y" || $("#admin_id").val() > 0) {
        $("#mobileCode").hide();
    }

    //滑动验证
    require("exReceive/silder_verification")

    // 判断是否有短信验证码
    $.ajax({
        url: 'http://www.51talk.com/trial/getMobileCode',
        xhrFields: { withCredentials: true },
        type: 'POST',
        dataType: 'jsonp',
        crossDomain: true,
        data: {},
        success(msg) {
            if (msg.status == 1 && msg.data.mobile_code != "") {
                $(".mobilecode").val(msg.data.mobile_code);
            }
        }
    });
		// 判断是否有财富
	// 还是用的content  1是可以补次卡
	// 2是我知道了
	// 还有0的情况 不需要做任何处理
  // 后端要求 content => j_is_get_point
		var content_val = $("#j_is_get_point").val();
		if (content_val == 1){
            $(".alertSys").find('p').html('您的外教1对1体验课已经过期，请点击重新申请再次激活体验课！').end().find('.knowBtn').css({ 'display': 'none' }).end().find('.apply-lesson').css({ 'display': 'block' }).end().css({"display":'block'});
        } else if (content_val == 3) {
            $(".alertSys").find('p').html('您的外教1对1体验课已经缺席，请点击重新申请再次激活体验课！').end().find('.knowBtn').css({ 'display': 'none' }).end().find('.apply-lesson').css({ 'display': 'block' }).end().css({ "display": 'block' });
        } else if (content_val == 2){
            $(".alertSys").find('p').html('您的外教1对1体验课机会已经消耗完，请联系课程顾问解决！').end().find('.knowBtn').css({ 'display': 'inline-block' }).end().find('.apply-lesson').css({ 'display': 'none' }).end().css({ "display": 'block' });
		}else{
			$(".alertSys").hide();
		}
	
    var TimeObj = {
        mobile: $(".mobile"),
        mobilecode: $(".mobilecode"),
        imgCode: $(".imgcode"),
        verifycode: $("#verifycode"),
        getCodeBtn: $(".getCodeBtn"),
        smsBtn: $(".smsBtn"),
        nextBtn: $(".nextBtn"),
        event: function event() {
            var that = this;
            // 换一换
            this.getCodeBtn.on("click", function() {
                that.verifycode.attr('src', 'http://www.51talk.com/user/verify.php' + '?a' + '=' + new Date().getTime())
						});
                    // 重新激活体验课
					$(".apply-lesson").on("click", function () {
							$.ajax({
								type: 'get',
								url: '/api/operatePoint',
								success(res) {
									if (res.status == 10000) {
										var href_src = '/trial/reserve';
										$(".alertSys").find('p').html('申请成功，立即约课吧！').end().find('.apply-lesson').css({ 'display': 'none' }).end().find('.knowBtn').attr({ 'href': href_src }).css({ 'display': 'inline-block','margin-top':'44px'});
									} else {
										alert(res.info);
										//that.verifycode.attr('src', 'http://www.51talk.com/user/verify.php' + '?a' + '=' + new Date().getTime());
									}
								}
							});
						});
            // 获取验证码
            $(".smsBtn").on("click", function() {
                if ($(this).hasClass("smsBtn")) {
                    var mobileVal = that.mobile.val(),
                        imgCodeVal = that.imgCode.val(),
                        mobileReg = /^1[0-9]{10}$/,
                        $this = $(this);
                    if (mobileVal == '') {
                        alert("请输入手机号码");
                        return false;
                    }
                    if (!mobileReg.test(mobileVal)) {
                        alert("请填写正确格式的手机号！");
                        return false;
                    }
                    if (imgCodeVal == "") {
                        alert("请填写验证码！");
                        return false;
                    }
                    $.ajax({
                        type: 'get',
                        url: 'http://www.51talk.com/ajax/sendReserveCheckCode',
                        // xhrFields: {withCredentials: true},
                        dataType: 'jsonp',
                        crossDomain: true,
                        data: { user_mobile: mobileVal, vcode: imgCodeVal },
                        success(msg) {
                            if (msg.status == 1) {
                                $this.removeClass("smsBtn");
                                $this.html("请稍等...");
                                that.timeCount($this, 120);
                            } else {
                                alert(msg.info);
                                //that.verifycode.attr('src', 'http://www.51talk.com/user/verify.php' + '?a' + '=' + new Date().getTime());
                            }
                        }
                    });
                }
            });
            // 下一步提交
            this.nextBtn.on("click", function() {
                var mobileVal = that.mobile.val(),
                    imgCodeVal = that.imgCode.val(),
                    mobilecodeVal = that.mobilecode.val(),
                    dataTime = $("#dataTime").val(),
                    timeId = $("#dataId").val(),
                    mobileReg = /^1[0-9]{10}$/;
                if (timeId == "") {
                    alert("请选择上课时间");
                    return false;
                }
                if ($("#is_check").val() != 'y' && $("#admin_id").val() == 0) {
                    if (mobileVal == '') {
                        alert("请输入手机号码");
                        return false;
                    }
                    if (!mobileReg.test(mobileVal)) {
                        alert("请填写正确格式的手机号！");
                        return false;
                    }
                    if (imgCodeVal == "") {
                        alert("请填写验证码！");
                        return false;
                    }
                    $.ajax({
                        url: 'http://www.51talk.com/trial/checkMobile',
                        xhrFields: { withCredentials: true },
                        type: 'POST',
                        dataType: 'jsonp',
                        crossDomain: true,
                        data: {
                            course_date: dataTime,
                            course_time: timeId,
                            mobile: mobileVal,
                            code: imgCodeVal,
                        },
                        success(msg) {
                            if (msg.status == 1) {
                                window.location.href = window.time_url + '?' + 'course_date=' + dataTime + '&course_time=' + timeId;
                            } else {
                                alert(msg.info);
                            }
                        }
                    });
                } else {
                    window.location.href = window.time_url + '?' + 'course_date=' + dataTime + '&course_time=' + timeId;
                }
            });
        },
        // 倒计时
        timeCount(obj, num) {
            var timer = setInterval(function() {
                num--;
                if (num <= 0) {
                    obj.html("重新获取验证码");
                    clearInterval(timer);
                    obj.attr("data_state", "1");
                    obj.addClass("smsBtn");
                    return false;
                }
                obj.html(num + "秒");
            }, 1000);
        },
    };
    TimeObj.event();
});