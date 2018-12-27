define('cnPackage/buildClass',['../common/layer'], function(require, exports,module) {
    var commonLayer = require("../common/layer");
    var classFns = {
        initClass: function(list,date_index,time_index){
            if(list){
                this.initedStyle(list,date_index,time_index);
            }else{
                this.getItem(list,date_index,time_index);
            }
        },

        initedStyle: function(list,date_index,time_index){
            window.inited = true;
            window.date_index = date_index;
            window.time_index = time_index;

            $('#js_date_tab').children().removeClass('active').eq(date_index).addClass('active');
            $('#js_time_tab').children().removeClass('active').eq(time_index).addClass('active');

            this.buildClass(list);
        },

        getItem: function(list,date_index,time_index){
            // if(time_index<2){
            //     time_index++;
            // }else{
            //     if(date_index==0){
            //         date_index++;
            //         time_index=0;
            //     }
            // }
            // if(time_index<3&&date_index<2){
                // this.selItems(date_index,time_index);
            // }else{
                // commonLayer.showFn('该套餐班级已报满， 如需帮助请联系客服4000-51-51-51');
            // }
            this.buildClass(list);
        },


        selItems: function (date_index,time_index){
            var props = this.getProps(date_index,time_index);
            var date_prop = props.date_prop;
            var time_prop = props.time_prop;
            var list;
            if(window.timeObj[date_prop]){
                list = window.timeObj[date_prop][time_prop];
            }
            if(!window.inited){
                this.initClass(list,date_index,time_index);
            }else{
                this.buildClass(list);
            }
        },
        //将index转换为数据key
        getProps: function (date_index,time_index){
            
            var date_prop = '';
            var time_prop = '';
            // if(date_index==0){
            //     date_prop = 'sat'
            // }else{
            //     date_prop = 'sun';
            // }
            switch (date_index){
                case 0:
                    date_prop = 'fri';
                    break;
                case 1:
                    date_prop = 'sat';
                    break;
                case 2:
                    date_prop = 'sun';
                    break;
            }
    
            if(time_index==0){
                time_prop = 'am'
            }else if(time_index==1){
                time_prop = 'pm';
            }else{
                time_prop = 'night';
            }
            return {
                date_prop: date_prop,
                time_prop: time_prop
            }
        },
    
        buildClass: function (list){
            this.modifyStyle(list);
            if(list){
                this.dealSucc(list);
                window.timeList = list;
            }else{
                $('#js_time_list').html('');
            }
        },
        //依据时间列表相关数据，修改相关样式
        modifyStyle: function (list){
            if(list){
                $('#js_time').removeClass('disable');
                $('#js_time_title').html('请选择上课时间');
                $('#fullfilled').hide();
            }else{
                $('#js_time').addClass('disable');
                $('#js_time_title').html('---');
                $('#fullfilled').show();
            }
        },
        makeLi: function (obj){
            var json = {
                1: '周一',
                2: '周二',
                3: '周三',
                4: '周四',
                5: '周五',
                6: '周六',
                7: '周日'
            }
            var start_time = obj.start_time;
            var week = json[obj['week']];
            var desc = obj['extra_class_str'];
            
            return '<li>每'+week+start_time+desc+'</li>';
        },
        dealSucc: function (data){
            var str = '';
            for(var i=0; i<data.length; i++){
                str += this.makeLi(data[i]);
            }
            $('#js_time_list').html(str);
        },
        //重置时间tab样式
        resetTime: function(){
            window.date_index = 0;
            window.time_index = 0;
            $('.item').removeClass('active');
            $('#js_date_tab').children().eq(0).addClass('active');
            $('#js_time_tab').children().eq(0).addClass('active');
        }
    }
    module.exports = classFns;
    
});