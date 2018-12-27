define("adultPackage/teachingMaterial", ["tpl/adultPackage/index.js", 'tplCommon', '../common/cart', '../common/banner','../common/timeout','../common/packageTab', '../common/detailInfo', '../common/layer', '../common/util','../common/backTop'], function (require, exports, module) {
    var tplCommon = require('tpl/adultPackage/index.js');
    $('#teachingMaterial').html(tplCommon.teaching_material_main());
    var commonTpl = require('tplCommon');
    var cart = require('../common/cart');
    $("#cartBox").html(commonTpl.cartBox());
    var util = require("../common/util");
    util.renderHeaderBottom();
    util.replaceImgUrl('#teachingMaterial', static_url);
    //banner
    require('../common/banner');
    //timeout倒计时
    var a = require('../common/timeout');
    //设置参数
    a.ajaxApiParams = 'book';
    new a.timeout();
    //套餐tab
    require('../common/packageTab');
    require('../common/backTop');
    //课程详情列表
    setTimeout(function(){
        require('../common/detailInfo');
    },1000);
    //提示弹窗
    var layer = require('../common/layer');
    var JSON2 = require("json2");
    var cookies = require("cookie");
    var getDataObj = {
        getData: function getData() {
            $.ajax({
                url: window.href_url + '/api/bookList',
                type: 'get',
                dataType: 'json',
                success: function success(res) {
                    if (res.status == 1) {
                        $('#teacingCourse').html(tplCommon.teaching_course(res));
                        util.replaceImgUrl('#teacingCourse', static_url);
                        teachingMaterialFn();
                    } else {
                        alert(res.info);
                    }
                }
            });
        }
    };
    //获取套餐数据
    getDataObj.getData();
    var teachingMaterialFn = function teachingMaterialFn() {
        var tabObj = {
            tabId: $('#tabId'),
            courseInfo: $('#courseInfo'),
            courseBox: $('._course-box'),
            suspensionInfo: $('.suspension-info'),
            priceId: $('#priceId'),
            coursePrice: 0,
            priceBox: $('#priceBox'),
            cart: [],
            purchaseImmediately: $('#purchaseImmediately'),
            materialUl: $('#materialUl'),
            prevId: $('._prev'),
            nextId: $('._next'),
            layerId: $('._layer'),
            textbookMask: $('#textbookMask'),
            closeId: $('#closeId'),
            cartObj: {},
            cartBtn: $('#cartBtn'),
            _event: function _event() {
                var that = this;
                //点击套餐交互
                this.courseInfo.find('li').not('.n-chose').on('click', function () {
                    that.cur = $(this);
                    that.dataPrice = that.cur.attr('data-price');
                    that.title = that.cur.find('p').text();
                    that.cartId = that.cur.attr('data-id');
                    if (!that.cur.hasClass('chose')) {
                        that.cur.addClass('chose');
                        that.addPrice(that.dataPrice, that.cartId);
                    } else {
                        that.choseNum = that.courseInfo.find('.chose').size();
                        that.cur.removeClass('chose');
                        that.reducePrice(that.dataPrice, that.cartId);
                    }
                });
                //立即购买
                this.purchaseImmediately.on('click', function () {
                    //选中的套餐id
                    if (that.courseInfo.find('.chose').size() == 0) {
                        layer.showFn('您还未选购任何课程商品哦');
                    } else {
                        that.dataCart = JSON2.stringify({ "cart": that.cart });
                        $.ajax({
                            url: window.href_url + '/ajax/checkCart',
                            type: 'get',
                            dataType: 'json',
                            async:false,
                            data: {
                                cart : that.dataCart
                            },
                            success : function(res){
                                if(res.status == 1){
                                    $('#formCard').val(that.dataCart);
                                    $('#buyBtnFrom').submit();
                                }else if(res.status == 0){
                                    layer.showFn(res.info);
                                }
                            }
                        });
                    }
                });
                //遮罩
                this.materialUl.find('li .li-img').hover(function () {
                    $(this).find('._layer').show();
                }, function () {
                    $(this).find('._layer').hide();
                });

                $('.btn-box').find('a').on('click', function () {
                    if (!$(this).hasClass('current')) {

                        that.changeFn($(this));
                    }
                });
                //预览教材交互
                this.layerId.find('a').on('click', function () {
                    that.textbookMask.show();
                    $('#pdf').attr('src', $(this).attr('href'));
                    return false;
                });
                this.textbookMask.height($(document).height());

                this.closeId.on('click', function () {
                    that.textbookMask.hide();
                });

                //pdf素材链接初始化
                this.materialUl.find('li').each(function (i) {
                    $(this).find('._layer a').attr('href', $(this).find('.btn-box a').eq(0).attr('pdf-url'));
                });

                //加入购物车btn
                this.cartBtn.on('click', function () {
                    if (that.courseInfo.find('.chose').size() == 0) {
                        layer.showFn('您还未选购任何课程商品哦');
                    }
                });
                cart.init();
                cart.addEvent();
            },
            changeFn: function changeFn(ele) {
                var curN = ele.index() + 1;

                ele.parent().find('a').removeClass('current');
                ele.addClass('current');
                ele.parents('li').find('._c-title').text('Book' + curN).end().find('._layer a').attr('href', ele.attr('pdf-url'));
            },

            //套餐价格累加
            addPrice: function addPrice() {
                this.coursePrice += parseInt(this.dataPrice);
                this.priceId.text(this.coursePrice);
                this.cart.push(this.cartId);
                this.priceBox.show();
                //处理数据，渲染在购物车按钮上
                var key = this.cartId;
                this.cartObj[key] = {
                    id: this.cartId,
                    price: this.dataPrice,
                    title: this.title,
                    point_type: $('#point_type').val(),
                    point_value: '',
                    expire_days: '',
                    is_show_installment: '',
                    installment_num: '',
                    installment_price: ''
                };
                this.cartBtn.attr('data-cart', JSON2.stringify(this.cartObj));
                this.isCanBuy();
            },

            //套餐价格减值
            reducePrice: function reducePrice() {
                if (this.choseNum == 1) {
                    this.priceBox.hide();
                }
                this.coursePrice -= parseInt(this.dataPrice);
                this.priceId.text(this.coursePrice);
                this.cart.pop(this.cartId);
                //取消勾选时，购物车按钮上的数据，对应更新
                delete this.cartObj[this.cartId];
                this.cartBtn.attr('data-cart', JSON2.stringify(this.cartObj));
                this.isCanBuy();
            },

            //购物按钮状态
            isCanBuy: function isCanBuy() {
                var selectedSize = _.keys(this.cartObj).length;
                var goods = JSON2.parse(cookies.getCookie("cart")).goods;
                goods = goods ? goods  : {};
                var joined = 0;
                for (var key in this.cartObj) {
                    if (goods[key]) {
                        joined++;
                    }
                }
                if (selectedSize == joined && selectedSize != 0 && joined != 0) {
                    $('.jsCart').text('已加入购物车');
                    $('.jsCart').addClass('already-cart');
                } else {
                    $('.jsCart').text('加入购物车');
                    $('.jsCart').removeClass('already-cart');
                }
            }
        };
        tabObj._event();
    };
});