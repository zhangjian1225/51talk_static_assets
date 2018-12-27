define("youngPackage/indexStrengthen", ["tpl/youngPackage/index.js", "tplCommon", "../common/courseInfo", "../common/banner","../common/timeout", "../common/packageTab", '../common/detailInfo', '../common/util', '../common/backTop'], function(require, exports, module) {

    //引入套餐模块
    var indexStrengthen = require("tpl/youngPackage/index.js");
    var util = require("../common/util");
    $('#indexStrengthen').html(indexStrengthen.index_strengthen_main());
    var tplCommon = require("tplCommon");
    $("#cartBox").html(tplCommon.cartBox());

    util.renderHeaderBottom();
    util.replaceImgUrl('#indexStrengthen', static_url);
    //套餐信息
    require('../common/courseInfo');
    //banner
    require('../common/banner');
    //timeout倒计时
    var a = require('../common/timeout');
    //设置参数
    a.ajaxApiParams = 'point_package';
    new a.timeout();
    
    //套餐tab
    require('../common/packageTab');
    //下部列表详情
    $("#endLast").load(function() {
        require('../common/detailInfo');
    });
    // setTimeout(function() {
    //     require('../common/detailInfo');
    // }, 2000);

    //头部结构渲染
    //util.renderHeaderBottom();
    var carouselObj = {
        carouselFigure: $('.carousel-figure'),
        levelMain: $('._level-main'),
        circelImg: $('._circel-img'),
        stepValue: 640,
        levelTab: $('.level-tab'),
        tabMainLevel: $('._tab-main-level'),
        curTabNum: 0,
        ctabBox: $('#ctabBox'),
        tabMain: $('._tab-main'),
        specialClass: $('#specialClass'),
        imgList: $('._img-list'),
        levelImgNum: 4,
        event: function event() {
            var that = this;
            //初始化轮播ul长度
            $.each(this.imgList, function() {
                var liNum = $(this).find('li').size();
                var ulWidth = liNum * that.stepValue;
                $(this).css('width', ulWidth + 'px');
            });
            //开始轮播
            this.levelTabFn(this.curTabNum, 0);
            //经典、全能tab
            this.ctabBox.find('li').on('click', function() {
                if (!$(this).hasClass('current')) {
                    //tab状态
                    $(this).parent().find('li').removeClass('current');
                    $(this).addClass('current');
                    //tab对应的盒子状态
                    that.ctabBox.next('._tab-main').find('._tab-main-level').removeClass('show').eq($(this).index()).addClass('show');
                    //获取当前level轮播图片的个数
                    that.levelImgNum = $(this).parents('.level-box').find('._tab-main-level').eq($(this).index()).find('._level-main').eq(0).find('._img-list li').size();

                    clearTimeout(that.clearTime);
                    that.curTabNum = $(this).index();
                    that.levelTabFn(that.curTabNum, $(this).attr('data-cur'));
                }
            });
            //level tab
            this.levelTab.find('li').on('click', function() {
                var curIndex = $(this).index();
                var curThis = $(this);
                if (!curThis.hasClass('current')) {
                    //记录当前level
                    var levelCur = $(this).parents('._tab-main-level').index();
                    that.ctabBox.find('li').eq(levelCur).attr('data-cur', curIndex);
                    //获取当前level轮播图片的个数
                    that.levelImgNum = $(this).parent().next().find('._level-main').eq(curIndex).find('._img-list li').size();
                    //tab状态
                    curThis.parent().find('li').removeClass('current');
                    curThis.addClass('current');
                    //level状态控制
                    curThis.parent().next('.level-c').find('._level-main').addClass('hide').eq(curIndex).removeClass('hide');
                    //切换tab时，先停掉轮播
                    clearTimeout(that.clearTime);
                    that.levelTabFn(that.curTabNum, $(this).index());
                }
            });
            this.specialClass.find('.special-img-box ').on('mouseover', function() {
                $(this).find('.special-des').show();
            }).on('mouseout', function() {
                $(this).find('.special-des').hide();
            });

            this.specialClass.find('.special-des').on('mouseout', function(e) {
                $(this).hide();
            });
        },

        //控制当前是哪个状态下的轮播
        levelTabFn: function levelTabFn(tNum, num) {
            // alert(num)
            var that = this;
            //当前tab
            this.currentTab = this.tabMainLevel.eq(tNum).find('.level-main').eq(num);

            //从第一个图开始轮播
            var tempNum = 0;
            //图片轮播
            this.carouseFn(tempNum);

            this.circleEle = this.currentTab.find('._circel-img').find('li');
            //点击轮播圆点标示
            this.circleEle.on('click', function() {
                //先停掉原来的图播事件
                clearTimeout(that.clearTime);
                //重置轮播起点
                tempNum = $(this).index();
                //开始轮播
                that.carouseFn(tempNum);
                //圆点状态控制
                that.circleEle.removeClass('current');
                $(this).addClass('current');
                //轮播到指定图片
                that.left = $(this).index() * that.stepValue;
                that.currentTab.find('._img-list').animate({ 'margin-left': '-' + that.left + 'px' }, 1000);
            });
        },

        //轮播控制
        carouseFn: function carouseFn(curNum) {
            var _this = this;

            var that = this;
            this.clearTime = setInterval(function() {
                that.left = that.stepValue * curNum;

                if (curNum >= _this.levelImgNum - 1) {
                    curNum = 0;
                    that.currentTab.find('._img-list').animate({ 'margin-left': '-' + that.left + 'px' }, 1000);
                } else {
                    curNum++;
                    that.currentTab.find('._img-list').animate({ 'margin-left': '-' + that.left + 'px' }, 1000);
                }
                that.currentTab.find('._circel-img').find('li').removeClass('current').eq(curNum - 1).addClass('current');
            }, 2000);
        }
    };
    carouselObj.event();
    require('../common/backTop');
});