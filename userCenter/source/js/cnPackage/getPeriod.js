define('cnPackage/getPeriod',['cnPackage/buildClass','../common/layer'],function(require,exports,module){
    var baseUrl = window.href_url;
    var classFns = require('cnPackage/buildClass');
    var commonLayer = require("../common/layer");
    var JSON2 = require("json2");
    //修改弹层确认按钮文字
    commonLayer.changeBtnText('我知道了');

    var Fn = function(){};

    Fn.prototype = {
        constructor:Fn,
        formatDate: function (time){
            var date = time.split(' ')[0].replace(/-/g,'/');
            return date;
        },
    
        makeLi: function (obj){
            var endDate;
            var startDate = this.formatDate(obj.period_start_time);
            if(obj.extra_period_end_time){
                endDate = this.formatDate(obj.extra_period_end_time);
            }else{
                endDate = this.formatDate(obj.period_end_time);
            }
            
            return '<li>'+startDate+'~'+endDate+ '<span>（' + obj.format_class_type + '）</span>'+'</li>';
        },
    
        dealSucc: function (data){
            //调用数据初始化
            this.initData()
            var str = '';
            for(var i=0; i<data.length; i++){
                str += this.makeLi(data[i]);
            }
            $('#js_date_list').html(str);
        },
        //初始化购买数据
        initData: function(){
            $('#js_date').removeClass('disable');
            $('#disBuy').hide();
            $('#buyBtn').show();
        },
        //统一处理无法购买情况样式
        commonDis: function(){
            $('#js_date').addClass('disable');
            $('#disBuy').show();
            $('#buyBtn').hide();
        },
       
        disableBuy: function(){
            this.commonDis();
            $('#disBuy').text('立即购买');
            window.alert_text = '该套餐班级已报满， 如需帮助请联系客服4000-51-51-51';
            commonLayer.showFn(alert_text);
        },
        alreadyBuy: function(){
            this.commonDis();
            $('#disBuy').text('我要续班');
            window.alert_text = '续班还未开始， 如有需要请联系您的中教老师。';
            commonLayer.showFn(alert_text);
        },
        noLogin: function(){
            this.commonDis();
            $('#disBuy').text('立即购买');
            window.alert_text = '请先登录';
            commonLayer.showFn(alert_text);
        }
    }

    var fn = new Fn();

    var ajaxFns = {
        //1+2套餐选开班周期
        getDateList: function (obj){
            $.get(baseUrl + '/ajax/getClassPeriod',obj).then(function(res){
                $('#buyBtn').removeClass('hide');
                var status = res.status;
                if(status==1){
                    $('#js_date').removeClass('hide');
                    var data = res.data;
                    window.dateList = data;
                    fn.dealSucc(data);
                }else if(status==0){
                    doubleDivision.noData = true;
                }else if(status==3){
                    $('#js_date').removeClass('hide');
                    fn.alreadyBuy();
                }else{
                    $('#js_date').removeClass('hide');
                    fn.noLogin();
                }
            }) 
        },
        //1+2套餐可选开班时间
        getTimeList: function (data){
            $.get(baseUrl + '/ajax/getClassTime',data).then(function(res){
                var status = res.status;
                if(status==1){
                    window.wierd = false;
                    window.time_list_index = -1;
                    window.timeObj = res.data;
                    classFns.selItems(date_index,time_index);
                }else{
                    window.wierd = true;
                    $('#js_time').addClass('disable');
                    commonLayer.showFn(res.info);
                }
            })
        },
        //校验购物车内商品
        checkCart: function(data){
            $.get(baseUrl + '/ajax/checkCart',data).then(function(res){
                if(res.status==1){
                    var json = res.data;
                    var oldCart = JSON2.parse(data.cart).mix;
                    var newCart = $.extend(true,{},oldCart,json);
                    var newCartStr = JSON2.stringify({
                        mix: newCart
                    })
                    $('#cart').val(newCartStr);
                    $('#buy_form').submit();
                }else{
                    commonLayer.showFn(res.info);
                }
            })
        },
        //获取课程信息
        getCourseList: function(data) {
            $.get(baseUrl + '/api/pointList',data).then(function(res){
                if(res.status ==1 ){
                    var courseEle = ''
                    for(var i=0,length=res.data.length; i<length; i++){
                        courseEle += '<li class="li-spec" id="'+res.data[i].id+'"><span></span><div class="li-info"><div class="child_2"><p>'+res.data[i].show_name+'</p><p class="li-des">'+res.data[i].goods_num+'节中教课，'+res.data[i].point_num+'节外教课</p></div></div></li>'
                    }
                    $('#courseInfo').html(courseEle)
                    //默认第一条选中
                    $('.li-spec').eq(0).addClass('active')
                }
            })
        },
        //获取套餐价格
        getPrice: function(data){
            $.get(baseUrl + '/api/pointDetail',data).then(function(res){
                if(res.status==1){
                    var info = res.data.info;
                    var url = info.agree_url;
                    $('#newPrice').html(info['display_price']);
                    $('#oldPrice').html(info.price);
                    $('#js_classname').html(info.name);
                    $('.js_protocol').attr('href',url);
                }else{
                    commonLayer.showFn(res.info);
                }
            })
        }

    }

    module.exports = ajaxFns;

    

    

    


})