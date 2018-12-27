define("payFlow/index", ['payFlowtpl', "tplCommon", '../common/util'], function (require, exports, module) {
    //引入套餐模块
    var cookies = require("cookie");
    var JSON2 = require("json2");
    function PayFlow() {
        this.tpl = require("payFlowtpl");
        this.commonTpl = require("tplCommon");
        this.selectCartId = 0;
        this.selectMoney = 0;

    }
    var util = require("../common/util");
    PayFlow.prototype = {
        init: function () {

            //主体结构
            this.renderMain();
            //头部结构渲染
            util.renderHeaderBottom();
            //套餐
            if ($('#point_type').val() == 'mix_point') {
                // 1+2 套餐
                this.renderCombinePackage();
            } else {
                // 其他套餐
                this.renderPackageList();
            }
            //渲染特定协议
            if($('#point_type').val() == 'point_package_10'){
              this.renderAgreement($('#point_type').val());
            }
            //绑定是否同意协议事件
            this.agreement();
            //绑定代金券
            //this.bindCoupon();
            //提交定单
            this.submitOrder();
            //提示框
            this.warningTip();
            //dialog弹出框
            this.mdialog();
        },
        renderAgreement: function(type) {
          if(type == 'point_package_10') {
            $("#app #package-agreement").html(this.tpl.AgreeAdultPackage10);
          }      
        },
        
        renderMain: function () {
            //主体结构
            $("#app").html(this.tpl.indexMain({ "point_type": $("#point_type").val(), 'agree_version': $('#agree_version').val() , isValidateDate: +new Date() > +new Date(2018, 9, 1)}));
            util.replaceImgUrl('#app', static_url);
        },

        // 2018.7.4  add
        banckList: function ($this) {
            var userAgent = window.navigator.userAgent;
            var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
            var isChrome = userAgent.indexOf("Chrome") !== -1; //谷歌浏览器
            if (isFF || isChrome) {
                if ($this.hasClass("bankCheck")) {
                    $("#explainT").show();
                } else {
                    $("#explainT").hide();
                }
            }
        },
        // 2018.7.4 end

        renderCombinePackage: function () {
            var self = this;
            var cart = $("#cartInfo").val();
            //获取组合套餐数据
            $.get(window.href_url + '/ajax/getOrderInfo?point_type=mix_point&cart=' + cart, function (res) {
                var data = res.data;
                var mix = data.mix;
                $("#packageList11").html(self.tpl.combinePackage({
                    mix: mix,
                    is_cash_down: data.price.is_cash_down,
                    sign: data.data_sign,
                    gateway: data.gateway
                }));

                $('#my_cart').val(cart);

                //价格详情
                $("#totalInfo").html(self.tpl.totalInfo({ price: data.price, goods: 1 }));
                util.replaceImgUrl('#totalInfo', static_url);
                //应付金额
                $("#meetPay span").text(data.price.pay_price.toFixed(2));
                $("#meetPay span").attr("origin", data.price.pay_price);

                if (data.price.can_use_card) {
                    //优旉券
                    $("#couponList").html(self.tpl.couponList());
                    util.replaceImgUrl('#couponList', static_url);
                    self.renderCouponList();

                    //绑定代金券
                    self.bindCoupon();

                }
                //全额支付银行列表
                var allMoney = {
                    fullGateway: data.pay_method.full_gateway,
                    fullEbank: data.pay_method.full_ebank,
                    count: $("#meetPay span").text()
                }
                //信用卡分期列表

                var installment = {
                    list: data.pay_method.installment ? data.pay_method.installment.list : [],
                    count: $("#meetPay span").text()
                }
                //汇款 

                var huiKuan = {
                    list: data.pay_method.bank ? data.pay_method.bank.list : [],
                    count: $("#meetPay span").text()
                };
                if (data.pay_method.bank) {
                    data.pay_method.bank.count = $("#meetPay span").text();
                }

                //支付导航
                $("#navPay").html(self.tpl.navPay({
                    pay: data.pay_method,
                    allMoney: _.escape(JSON2.stringify(allMoney)),
                    installment: _.escape(JSON2.stringify(installment)),
                    huikuan: _.escape(JSON2.stringify(huiKuan))
                }));
                util.replaceImgUrl('#navPay', static_url);


                $("#navPay li").off().on("click", function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    var flage = $(this).attr("flage");
                    // $("#couponList").show();
                    // if(self.selectCartId && $("#couponList:visible").length == 0){
                    //   $("#coupCon [data-cardid='" + self.selectCartId + "']").click();
                    // }
                    if (flage == "installment" && self.selectCartId) {
                        // $("#coupCon [data-cardid='" + self.selectCartId + "']").removeClass('selected');
                        $("#card_id").val("");
                        $("#couponList").hide();
                        var origin = $("#meetPay span").attr("origin");
                        $("#meetPay span").text(parseInt(origin).toFixed(2));
                        $("#totalInfo .ticket").hide();
                    } else if (self.selectCartId && $("#couponList:visible").length == 0) {
                        $("#couponList").show();
                        $("#coupCon [data-cardid='" + self.selectCartId + "']").click();
                    }

                    if (flage == "installment") {
                        $("#couponList").hide();
                    } else if (flage != "installment") {
                        $("#couponList").show();
                    }
                    var sendData = $(this).data("source");
                    sendData.count = $("#meetPay span").text();
                    $("#payStyle").html(self.tpl[flage](sendData));
                    util.replaceImgUrl('#payStyle', static_url);
                    $("#payStyle .count").text($("#meetPay span").text());
                    //银行绑定事件
                    $("#payStyle .bankItem").off().on("click", function () {
                        $("#payStyle .bankItem").removeClass("active");
                        $(this).addClass("active");
                        $("#payStyle .bankItem input").removeAttr("checked");
                        $(this).find("input").attr("checked", "checked");
                        if ($("#installmentDetail").length == 0) {
                            self.banckList($(this))
                            return;
                        }
                        var input = $(this).find("input");
                        var obj = {
                            cardrate: input.attr('cardrate'),
                            periodnum: input.attr('periodnum'),
                            count: parseInt($("#meetPay span").text()),
                            bank: input.val(),
                            firstRate: input.attr('firstrate')
                        };
                        // 2018.6.26 add
                        var money = $("#meetPay span").attr("origin");
                        if ($(this).hasClass('bdwebBank')) {
                            // 支付方式是 百度分期
                            if ($("#coupCon [data-cardid='" + self.selectCartId + "']").hasClass('selected')) {
                                $("#coupCon [data-cardid='" + self.selectCartId + "']").addClass('selected');
                                $("#meetPay span").text((money - self.selectMoney).toFixed(2));
                                $("#payStyle .count").text((money - self.selectMoney).toFixed(2));
                                $("#totalInfo .ticket").show();
                                $("#card_id").val(self.selectCartId)
                            }
                            $("#couponList").show();
                        } else {
                            $("#couponList").hide();
                            $("#totalInfo .ticket").hide();
                            $("#meetPay span").text(money);
                            $("#payStyle .count").text(money);
                            $("#card_id").val("")
                        }
                        $("#installmentDetail").html(self.tpl.installmentDetail(obj));

                    });
                })

                //默认全额支付
                $("#payStyle").html(self.tpl.allMoney({ fullGateway: data.pay_method.full_gateway, fullEbank: data.pay_method.full_ebank, count: $("#meetPay span").text() }));
                util.replaceImgUrl('#payStyle', static_url);
                //银行绑定事件
                $("#payStyle .bankItem").off().on("click", function () {
                    self.banckList($(this))
                    $("#payStyle .bankItem").removeClass("active");
                    $(this).addClass("active");
                    $("#payStyle .bankItem input").removeAttr("checked");
                    $(this).find("input").attr("checked", "checked");
                });
            })
        },


        renderPackageList: function () {
            var self = this;
            var cart = $("#cartInfo").val() ? JSON2.parse($("#cartInfo").val()) : {};
            delete cart.goods;
            cart = JSON2.stringify(cart);
            $.get(window.href_url + '/ajax/getOrderInfo?&web=1&cart=' + cart, function (res) {
                if (res.status == 0) {
                    alert(res.info);
                } else {
                    //购买过的商品列表
                    var data = res.data;
                    $("#packageList11").html(self.tpl.packageList({
                        point: data.point,
                        is_cash_down: data.price.is_cash_down,
                        sign: data.data_sign,
                        gateway: data.gateway,
                        point_id: _.keys(data.point).toString()
                    }));
                    util.replaceImgUrl('#packageList11', static_url);
                    //优惠信息
                    $("#freeMoney").html(self.tpl.freeMoney({ price: data.price }));
                    util.replaceImgUrl('#freeMoney', static_url);
                    //价格详情
                    $("#totalInfo").html(self.tpl.totalInfo({ price: data.price, goods: _.keys(data.point).length }));
                    util.replaceImgUrl('#totalInfo', static_url);
                    //应付金额
                    $("#meetPay span").text(data.price.pay_price.toFixed(2));
                    $("#meetPay span").attr("origin", data.price.pay_price);
                    //获取实物
                    var goodsCount = 0;
                    for (var item in data.point) {
                        if (data.point[item].point_type == "microphone" || data.point[item].point_type == "book") {
                            goodsCount++;
                        }
                    }
                    if (goodsCount > 0) {
                        //货物列表
                        $("#addrInfo").html(self.tpl.addrInfo({ point: data.point }));
                        util.replaceImgUrl('#addrInfo', static_url);
                        //收货地址
                        self.renderAddress();
                    }
                    if (data.price.can_use_card) {
                        //优旉券
                        $("#couponList").html(self.tpl.couponList());
                        util.replaceImgUrl('#couponList', static_url);
                        self.renderCouponList();

                        //绑定代金券
                        self.bindCoupon();

                    }
                    //全额支付银行列表
                    var allMoney = {
                        fullGateway: data.pay_method.full_gateway,
                        fullEbank: data.pay_method.full_ebank,
                        count: $("#meetPay span").text()
                    }
                    //信用卡分期列表

                    var installment = {
                        list: data.pay_method.installment ? data.pay_method.installment.list : [],
                        count: $("#meetPay span").text()
                    }
                    //汇款 

                    var huiKuan = {
                        list: data.pay_method.bank ? data.pay_method.bank.list : [],
                        count: $("#meetPay span").text()
                    };
                    if (data.pay_method.bank) {
                        data.pay_method.bank.count = $("#meetPay span").text();
                    }
                    //支付导航
                    $("#navPay").html(self.tpl.navPay({
                        pay: data.pay_method,
                        allMoney: _.escape(JSON2.stringify(allMoney)),
                        installment: _.escape(JSON2.stringify(installment)),
                        huikuan: _.escape(JSON2.stringify(huiKuan))
                    }));
                    util.replaceImgUrl('#navPay', static_url);
                    $("#navPay li").off().on("click", function () {
                        $(this).addClass("active").siblings().removeClass("active");
                        var flage = $(this).attr("flage");
                        // $("#couponList").show();
                        // if(self.selectCartId && $("#couponList:visible").length == 0){
                        //   $("#coupCon [data-cardid='" + self.selectCartId + "']").click();
                        // }
                        if (flage == "installment" && self.selectCartId) {
                            // $("#coupCon [data-cardid='" + self.selectCartId + "']").removeClass('selected');
                            $("#card_id").val("");
                            $("#couponList").hide();
                            var origin = $("#meetPay span").attr("origin");
                            $("#meetPay span").text(parseInt(origin).toFixed(2));
                            $("#totalInfo .ticket").hide();
                        } else if (self.selectCartId && $("#couponList:visible").length == 0) {
                            var money = $("#meetPay span").attr("origin");
                            $("#couponList").show();
                            // $("#coupCon [data-cardid='" + self.selectCartId + "']").click();
                            $("#meetPay span").text((money - self.selectMoney).toFixed(2));
                            $("#payStyle .count").text((money - self.selectMoney).toFixed(2));
                            $("#totalInfo .ticket").show();
                        }

                        if (flage == "installment") {
                            $("#couponList").hide();
                        } else if (flage != "installment") {
                            $("#couponList").show();
                        }

                        var sendData = $(this).data("source");
                        sendData.count = $("#meetPay span").text();
                        $("#payStyle").html(self.tpl[flage](sendData));
                        util.replaceImgUrl('#payStyle', static_url);
                        $("#payStyle .count").text($("#meetPay span").text());
                        //银行绑定事件
                        $("#payStyle .bankItem").off().on("click", function () {
                            $("#payStyle .bankItem").removeClass("active");
                            $(this).addClass("active");
                            $("#payStyle .bankItem input").removeAttr("checked");
                            $(this).find("input").attr("checked", "checked");
                            if ($("#installmentDetail").length == 0) {
                                self.banckList($(this))
                                return;
                            }
                            var input = $(this).find("input");
                            var obj = {
                                cardrate: input.attr('cardrate'),
                                periodnum: input.attr('periodnum'),
                                count: parseInt($("#meetPay span").text()),
                                bank: input.val(),
                                firstRate: input.attr('firstrate')
                            };
                            // 2018.6.26 add
                            var money = $("#meetPay span").attr("origin");
                            if ($(this).hasClass('bdwebBank')) {
                                // 百度有钱花 分支
                                if ($("#coupCon [data-cardid='" + self.selectCartId + "']").hasClass('selected')) {
                                    $("#coupCon [data-cardid='" + self.selectCartId + "']").addClass('selected');
                                    $("#meetPay span").text((money - self.selectMoney).toFixed(2));
                                    $("#payStyle .count").text((money - self.selectMoney).toFixed(2));
                                    $("#totalInfo .ticket").show();
                                    $("#card_id").val(self.selectCartId)
                                }
                                $("#couponList").show();
                            } else {
                                $("#couponList").hide();
                                $("#totalInfo .ticket").hide();
                                $("#meetPay span").text(money);
                                $("#payStyle .count").text(money);
                                $("#card_id").val("")
                            }

                            $("#installmentDetail").html(self.tpl.installmentDetail(obj));

                        });
                    })
                    //默认全额支付
                    $("#payStyle").html(self.tpl.allMoney({ fullGateway: data.pay_method.full_gateway, fullEbank: data.pay_method.full_ebank, count: $("#meetPay span").text() }));
                    util.replaceImgUrl('#payStyle', static_url);
                    //银行绑定事件
                    $("#payStyle .bankItem").off().on("click", function () {
                        self.banckList($(this))
                        $("#payStyle .bankItem").removeClass("active");
                        $(this).addClass("active");
                        $("#payStyle .bankItem input").removeAttr("checked");
                        $(this).find("input").attr("checked", "checked");
                    });


                }

            })

        },
        couponBindEvent: function () {
            var self = this;
            $("#coupCon .normal").off().on("click", function (item) {
                var money = Number($("#meetPay span").attr("origin"));
                var moneyT = money - (money * 0.1)
                if (!$(this).hasClass('selected')) {
                    $("#card_id").val($(this).data("cardid"));
                    $(this).addClass("selected").siblings().removeClass("selected");
                    $("#totalInfo .ticket").show();
                    var suslice = $(this).data("money");
                    var moneyD = (money - suslice) - ((money - suslice) * 0.1);
                    $("#totalInfo .ticket span").text(suslice.toFixed(2));
                    $("#meetPay span,#payStyle .count").text((money - suslice).toFixed(2));
                    // $("#payStyle .count").text((money - suslice).toFixed(2));
                    $("#ereryNum").text((moneyD * 0.005).toFixed(2))
                    $("#fengNum,#AlloranNum").text((moneyD * 0.06).toFixed(2))
                    $("#orangeText").text((((money - suslice)) * 0.1).toFixed(2))
                    $("#AllorangeNum").text(moneyD.toFixed(2))
                    $("#labelNum").text(((moneyD + (moneyD * 0.06)) / 12).toFixed(2))
                    $("#orangeNum").text(((money - suslice) + (moneyD * 0.06)).toFixed(2))
                    // $("#orangeNum").text((money+(moneyD*0.05)).toFixed(2))
                    self.selectCartId = $(this).data("cardid");
                    self.selectMoney = suslice
                } else {
                    $("#card_id").val("");
                    $(this).removeClass("selected");
                    $("#totalInfo .ticket").hide();
                    $("#meetPay span,#payStyle .count").text(money);
                    // $("#payStyle .count").text(money);
                    $("#ereryNum").text((moneyT * 0.005).toFixed(2))
                    $("#fengNum,#AlloranNum").text((moneyT * 0.06).toFixed(2))
                    $("#orangeText").text((money * 0.1).toFixed(2))
                    $("#AllorangeNum").text(moneyT.toFixed(2))
                    $("#labelNum").text(((moneyT + (moneyT * 0.06)) / 12).toFixed(2))
                    $("#orangeNum").text((money + (moneyT * 0.06)).toFixed(2))
                    self.selectCartId = 0;
                    self.selectMoney = 0;
                }
                if ($('#payStyle .bdwebBank').hasClass('active')) {
                    var input = $('#payStyle .bdwebBank').find("input");
                    var obj = {
                        cardrate: input.attr('cardrate'),
                        periodnum: input.attr('periodnum'),
                        count: parseInt($("#meetPay span").text()),
                        bank: input.val(),
                        firstRate: input.attr('firstrate')
                    };
                    $("#installmentDetail").html(self.tpl.installmentDetail(obj));
                }
            });
        },

        renderCouponList: function () {
            var self = this;
            var url = '';
            var data = {};
            var cart;
            var point_type = $('#point_type').val();
            if (point_type == 'mix_point') {
                cart = $("#cartInfo").val();
                data = {
                    point_type: 'mix_point',
                    cart: cart
                }
            } else {
                cart = $("#cartInfo").val() ? JSON2.parse($("#cartInfo").val()) : {};
                data = {
                    point_ids: cart.cart.join(",")
                }
            }

            $.get(window.href_url + "/api/cashCardList", data, function (res) {
                if (res.status == 1 && res.data.length > 0) {
                    $(".coupon-tit").show();
                    $("#coupCon").html(self.tpl.coupCon({ data: res.data }));
                    util.replaceImgUrl('#coupCon', static_url);
                    self.couponBindEvent();
                }
            })
        },
        renderAddress: function () {
            var self = this;
            $.get(window.href_url + "/api/addressInfo", function (res) {
                if (res.status == 1) {
                    $("#address-box").html(self.tpl.address({ data: res.data }));
                } else {
                    $("#address-box").html(self.tpl.address({
                        data: {
                            real_name: "",
                            user_addr: "",
                            user_phone: ""
                        }
                    }));
                }
            })
        },
        bindCoupon: function () {
            var self = this;
            $(".bind-coupon .bind").on("click", function () {
                var code = $.trim($(".bind-coupon input").val());
                var point_type = $('#point_type').val();
                var cart;
                if (code == "") {
                    $(".bind-coupon .errorTip").text("请输入代金券").css("display", "inline-block");
                    return;
                }
                var ajaxData = {
                    card_id: code,
                    price: $("#real").attr("real")
                };

                if (point_type == 'mix_point') {
                    cart = $("#cartInfo").val();
                    ajaxData.cart = cart;
                    ajaxData['point_type'] = 'mix_point';

                } else {
                    cart = $("#cartInfo").val() ? JSON2.parse($("#cartInfo").val()) : {};
                    ajaxData.point_ids = cart.cart.join(',');
                }

                $.post(window.href_url + "/api/cashCardAdd", ajaxData, function (res) {
                    if (res.status == 1) {
                        $(".mask,.alert").show();
                        $(".coupon-tit").show();
                        $(".bind-coupon .errorTip").hide();
                        $("#coupCon").append(self.tpl.coupCon({
                            data: [{
                                is_order_use: false,
                                money: res.data.money,
                                id: res.data.real_card_id,
                                valid_end: res.data.expire
                            }]
                        }));
                        $("#bMoney").text(res.data.money);
                        $(".alert .close").off().on("click", function () {
                            $(".mask,.alert").hide();
                        });
                        $(".f-btn span").off().on("click", function () {
                            $(".mask,.alert").hide();
                            self.couponBindEvent();
                        });
                    } else {
                        $(".bind-coupon .errorTip").text(res.info).css("display", "inline-block");
                    }
                })
            });

            $(".bind-coupon input").focus(function () {
                $(".bind-coupon .errorTip").hide();
            })
        },
        agreement: function () {
            $(".add-a-check-text").off().on("click", function () {
                var btn = $(this).find(".add-a-c-icon");
                var chckbox = $(this).find("input");
                if (btn.hasClass("add-a-c-icon2")) {
                    btn.removeClass("add-a-c-icon2");
                    chckbox.attr("checked", "checked");
                } else {
                    btn.addClass("add-a-c-icon2");
                    chckbox.removeAttr("checked");
                }
            })
        },
        submitOrder: function () {


            $(".pay_btn").on("click", function () {
                var mobileReg = /^1[0-9]{10}$/;
                var iphone = $("[name='user_phone']").val();
                var realName = $("[name='real_name']").val();
                if ($("[name='real_name']").length > 0 && !realName) {
                    $("#warning .content").text("请填写您的收件人姓名");
                    $("#warning,.mask").show();
                    return;
                } else if ($("[name='real_name']").length > 0 && realName.length > 8) {
                    $("#warning .content").text("您输入名字过长，请控制在8个字以内");
                    $("#warning,.mask").show();
                    return;
                } else if ($("[name='user_addr']").length > 0 && !$("[name='user_addr']").val()) {
                    $("#warning .content").text("请填写您的收件地址");
                    $("#warning,.mask").show();
                    return;
                } else if ($("[name='user_phone']").length > 0 && !$("[name='user_phone']").val()) {
                    $("#warning .content").text("请填写您的手机号码");
                    $("#warning,.mask").show();
                    return;
                } else if ($("[name='user_phone']").length > 0 && iphone && !mobileReg.test(iphone)) {
                    $("#warning .content").text("您的手机号码填写有误");
                    $("#warning,.mask").show();
                    return;
                } else if ($(".add-agreement-check input:checked").length == 0) {
                    $("#warning .content").text("您还没有选择同意协议！");
                    $("#warning,.mask").show();
                    return;
                } else if ($("[name='payMethod']").length > 0 && $("[name='payMethod']:checked").length == 0) {
                    $("#warning .content").text("您还没有选择支付方式");
                    $("#warning,.mask").show();
                    return;
                }
                $("#form").action = "//sale.51talk.com/orderPay" + $("#card_id").val();
                $("#form").submit();
                // $.ajax({
                //   async : false,
                //   cache : false,
                //   type : 'POST',
                //   data : $("#card_id").val(),
                //   url : "//sale.51talk.com/orderPay",//请求的action路径  
                //   success : function(data) { //请求成功后处理函数。    
                //       // alert(data);
                //   },
                //   error : function() {//请求失败处理函数  
                //     alert('失败');
                //   },
                // });
                $(".m-dialog").show();
            });
        },
        warningTip: function () {
            $("#warning .close,#warning .btn").on("click", function () {
                $("#warning").hide();
                $(".mask").hide();
            });
        },
        mdialog: function () {
            $(".m-dialog .close").on("click", function () {
                $(".m-dialog").fadeOut();
            })
        }

    }
    new PayFlow().init();
});