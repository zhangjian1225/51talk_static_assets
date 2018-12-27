define('cnPackage/domOp',['cnPackage/buildClass','cnPackage/getPeriod','../common/layer'],function(require,exports,module){
    window.dateList = []; //周期列表
    window.timeObj = {};   //时间对象{sat:{},sun:{},map{}}
    window.timeList = []; //时间列表
    window.inited = false; //是否是重新选择上课周期
    window.date_index = 0; //周末tab选项的index
    window.time_index = 0; //每天早午晚tab的index
    window.date_list_index = -1; // 周期列表选中的index
    window.time_list_index = -1; // 时间列表选中的index
    window.alert_text = ''; // 提示文案内容
    window.wierd = false; // 是否数据异常
    window.doubleDivision = {
        noData : false
    }
    var JSON2 = require("json2");
    var commonLayer = require("../common/layer");
    var classFns = require('cnPackage/buildClass');
    var ajaxFns = require('cnPackage/getPeriod');
    $('#buyBtn').addClass('hide');
    var Fn = function(){
        var self = this;
        this.selDate = $('#js_date');
        this.selTime = $('#js_time');
        this.date_list = $('#js_date_list');
        this.time_list = $('#js_time_list');
        this.date_title = $('#js_date_title');
        this.time_title = $('#js_time_title');
        this.items = $('.item');
        this.buy = $('#buyBtn');
        this.dis_buy = $('#disBuy');
        this.box = $('#cn-box');
        this.courseList = $('#courseInfo');
        //点击半册班 or 全册班
        this.courseList.on('click', 'li', function(){
            //初始化
            $('.li-spec').removeClass('active')
            $('#cn-box').hide()
            $('#holiday').hide();
            $('#js_date_title').text('请选择开始上课的日期')
            window.date_list_index = -1;
            window.time_list_index = -1;
            window.date_index = 0;
            window.time_index = 0;
            
            $(this).addClass('active')
            if($(this).attr('id')){
                var ajaxData = {
                    from: 'web',
                    point_type: 'mix_point',
                    id: $(this).attr('id')
                }
                var obj = {
                    mix_id: $(this).attr('id')
                }
                ajaxFns.getPrice(ajaxData);
                ajaxFns.getDateList(obj);
            }
        })
        this.addEvent = function(){
            $(document).click(function(){
                self.date_list.hide();
                self.time_list.hide();
            })
            
            this.selDate.click(function(){
                if($(this).hasClass('disable')){
                    commonLayer.showFn(window.alert_text);
                    return ;
                }
                self.date_list.show();
                return false;
            })
            
            this.selTime.click(function(){
                if($(this).hasClass('disable')){
                    return ;
                }
                self.time_list.show();
                return false;
            })
            //点击开班周期列表
            this.date_list.on('click','li',function(){
                //初始化
                $('#holiday').hide();

                var text = $(this).text();
                var index = $(this).index();
                window.date_list_index = index;
                window.inited = false;
                self.date_title.text(text);
                self.date_list.hide();
                self.box.show();
                classFns.resetTime();
                ajaxFns.getTimeList(dateList[index]);
            })
            //点击开班时间列表
            this.time_list.on('click','li',function(){
                var index = $(this).index();
                var text = $(this).html();
                window.time_list_index = index;
                self.time_title.text(text);
                self.time_list.hide();
                //假期显示
                var holiDate = $(this).data('holi');
                if(holiDate) {
                    $('#holiday').show();
                    $('.holi').text(holiDate)
                }else {
                    $('#holiday').hide();
                }
            })
            //点击周末及上下午标签
            this.items.click(function(){
                //初始化
                $('#holiday').hide();

                if($(this).hasClass('active')){
                    return ;
                }
                if(window.wierd){
                    return ;
                }
                window.time_list_index = -1;
                $(this).addClass('active').siblings().removeClass('active');
                var index = $(this).index();
                if($(this).parent().hasClass('js_date_tab')){
                    window.date_index = index;
                }else{
                    window.time_index = index;
                }
                classFns.selItems(date_index,time_index);
            })
            //购买标签
            this.buy.click(function(){
                var date_json = dateList[date_list_index];
                var time_json = timeList[time_list_index];
              //1+2不选时间情况下，“立即购买”提示
                if(doubleDivision.noData){
                    commonLayer.showFn('请先联系您的课程顾问，完成中教体验课，才能购买合适的级别课程');
                    return false;
                }
                if(dateList&&timeList&&date_json&&time_json){
                    var key = time_json['key'];
                    var sub_map = JSON2.stringify(timeObj['map'][key]);
                    var json = $.extend(true,{},date_json,time_json);
                    var jsonStr = JSON2.stringify({
                        mix: json
                    })
                    var obj = {
                        point_type:'mix_point',
                        cart: jsonStr,
                        sub_map: sub_map
                    }
                    ajaxFns.checkCart(obj);
                }else{
                    if(window.wierd){
                        commonLayer.showFn('请刷新列表，重新选择！');
                    }else{
                        commonLayer.showFn('请选择上课时间！');
                    }
                    
                }
            })
            this.dis_buy.click(function(){
                commonLayer.showFn(window.alert_text);
            })
        }
        this.init = function(){
            this.getAjax();
            this.addEvent();
        }
        this.getAjax = function(){
            
            var timer = setInterval(function(){
                //需要获取tab标签下的id属性，才能进行下一步
                var id = $('#tabBox').attr('data-id');
                if(id){
                    clearInterval(timer);
                    var ajaxData = {
                        from: 'web',
                        point_type: 'mix_point',
                        id: id
                    }
                    var obj = {
                        mix_id: id
                    }
                    ajaxFns.getCourseList({from: 'web', point_type: 'mix_point'});
                    ajaxFns.getPrice(ajaxData);
                    ajaxFns.getDateList(obj);
                }
            },500)
        }

        this.init();
    };

    
    new Fn();
})