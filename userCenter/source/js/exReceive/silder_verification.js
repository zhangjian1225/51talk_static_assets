define('exReceive/silder_verification', ['exReceive/popup'], function(require, exports, module) {
    var popup = require('exReceive/popup');
    var Register = function() {
        this.smsCode = $('#smsCode');
        this.timeNum = 0;
        this._event();
        this.times = 60;
        this.timer = null;
        this.adminLd = $('#admin_id').val(); //add 客户端
    }
    Register.prototype = {
        _event: function() {
            var that = this;
            this.silderVerification();

        },
        silderVerification: function() {
            var that = this;
            $(".outer").delegate('.start', 'mousedown', function(e) {
                that.timeout = setInterval(function() {
                    that.timeNum++;
                }, 1000);
                $.ajax({
                    url: '//www.51talk.com/ajax/slideCodeEvent',
                    type: 'get',
                    dataType: 'jsonp',
                    crossDomain: true,
                    data: {
                        action: 'move_start',
                        gt: 1
                    },
                    async: true
                });
                // var el = $(".inner"),os = el.offset(),that.dx,$span=$(".outer>span"),$filter=$(".filter-box"),_differ=$(".outer").width()-el.width();
                that.el = $(".inner");
                var os = that.el.offset(),
                    _differ = $(".outer").width() - that.el.width();

                that.$span = $(".outer>span");
                that.$filter = $(".filter-box");
                that.dx = 0;

                $(document).mousemove(function(e) {
                    that.dx = e.pageX - os.left;

                    if (that.dx < 0) {
                        that.dx = 0;
                    } else if (that.dx > _differ) {

                        that.dx = _differ;

                    }
                    that.$filter.css('width', that.dx);
                    that.el.css("left", that.dx);
                });
                $(document).mouseup(function(e) {
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    that.dx = e.pageX - os.left;
                    if (that.dx < _differ) {
                        that.dx = 0;
                        that.$span.html("点击并向右滑动");
                    } else if (that.dx >= _differ) {
                        var mobile = $(".mobile").val();
                        var mobileReg = /^1[0-9]{10}$/;
                        that.dx = _differ;
                        //清除计时
                        clearTimeout(that.timeout);

                        if (mobile == "") {
                            alert("请输入手机号码")
                            that.recoverySilder();
                            return;

                        } else if (!mobileReg.test(mobile)) {
                            alert("请输入正确的手机号码")
                            that.recoverySilder();
                            return;
                        }
                        //滑块滑到最后，验证成功，发请求
                        $.ajax({
                            url: '//www.51talk.com/ajax/slideCodeEvent',
                            type: 'get',
                            dataType: 'jsonp',
                            crossDomain: true,
                            data: {
                                action: 'success',
                                gt: that.timeNum
                            },
                            async: false,
                            success: function(res) {
                                //验证成功
                                if (res.status == 1) {
                                    that.smsCode.removeClass('count-down');
                                    that.dx = _differ;
                                    $(".outer").addClass("act");
                                    that.$span.html("验证成功").css('color', '#fff');
                                    that.el.removeClass('start').addClass('end');

                                    setTimeout(function() {
                                        $(".vscode").show();
                                        $(".slideCode").hide();
                                        that.smsCodeFn();
                                    }, 1000)

                                } else if (res.code = 60111) { //失败
                                    that.dx = 0;
                                    that.$span.html("点击并向右滑动");
                                    popup.showFn1(res.message);
                                }
                            },
                            error: function() {
                                that.dx = 0;
                                that.$span.html("点击并向右滑动");
                                popup.showFn1('网络问题');
                            }
                        });
                    }

                    if (that.dx > _differ) {
                        that.$filter.css('width', that.dx + 12);
                    } else {
                        that.$filter.css('width', that.dx);
                    }
                    that.el.css("left", that.dx);

                })
            })

            var that = this;
            $(".getAudioCode").on("click", function() {
                that.getAudioCode();
            })
        },
        //恢复滑块初始状态
        recoverySilder: function() {
            this.dx = 0;
            this.$span.html("点击并向右滑动").css('color', '#999');
            this.$filter.css('width', this.dx);
            this.el.css("left", this.dx);
            $('.inner').removeClass('end').addClass('start');
            $('.outer').removeClass('act');
        },
        smsCodeFn: function() {
            var that = this;
            $.ajax({
                url: "//www.51talk.com/ajax/sendReserveCheckCode",
                type: "post",
                data: {
                    user_mobile: $(".mobile").val()
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(res) {
                    if (res.status == 1) {
                        that.getEndTime()
                    } else {
                        alert(res.info)
                    }
                }
            })
        },
        getEndTime: function() {
            var that = this;
            that.timer = setInterval(function() {
                that.times--;
                if (that.times == 0) {
                    clearInterval(that.timer);
                }
                $(".times span").text(that.times);
                if (that.times == 0) {
                    that.times = 60;
                    that.recoverySilder();
                    $(".slideCode").show();
                    $(".getAudioCode").show();
                    $(".vscode").hide();
                    $(".times span").text(120);
                }
            }, 1000)
        },
        getAudioCode: function() {
            var that = this;
            $.ajax({
                url: "//www.51talk.com/ajax/sendReserveYy",
                type: "post",
                data: {
                    user_mobile: $(".mobile").val()
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(res) {
                    if (res.status == 1) {
                        $(".vscode").show();
                        $(".getAudioCode").hide();
                        $(".slideCode").hide();
                        that.getEndTime()
                    } else {
                        alert(res.info)
                    }
                }
            })
        }

    };
    exports.recoverySilderFn = function() {
        register.recoverySilder();
    }
    var register = new Register();
});