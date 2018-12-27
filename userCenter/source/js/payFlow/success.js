define("payFlow/success", ['../common/util','payFlowtpl'], function(require, exports, module) {
    //引入套餐模块
    function Success(){
        this.commonTpl = require("tplCommon");
        this.payFlowtpl = require("payFlowtpl");
    }
    var util =  require("../common/util");
    Success.prototype={
        init:function(){
            //渲染主体结构
            this.renderMain();

        },
        renderMain:function(){
           
            var self =  this;
            $.get(window.href_url+'/ajax/paySuccInfo?order_id='+$("#order_id").val()+'&web=1',function(res){
                if(res.status==1){
                    var point_type = $('#point_type').val();
                    if(point_type=='mix_point'){
                        var mix = self.dealMix(res.data.mix);
                        $("#app").html(self.payFlowtpl.successMain({
                            mix:mix,
                            point:null,
                            book:0,
                            microphone:0
                        }));
                    }else{
                        //头部结构渲染
                        var books = [];
                        for(var item in res.data.book){
                            books.push(res.data.book[item].name);
                        }
                        var microphone = [];
                        for (var item in res.data.microphone){
                            microphone.push(res.data.microphone[item].name);
                        }
                        $("#app").html(self.payFlowtpl.successMain({
                            mix:null,
                            point:res.data.point,
                            book:books.join(';'),
                            microphone:microphone.join(";")
                        }));
                    }
                    
                    util.replaceImgUrl('#app',static_url);
                     //头部结构渲染
                    util.renderHeaderBottom();
                }else{
                    alert(res.info);
                }
            })
        },
        dealMix: function(mix){
            var json = {
                6: '周六',
                7: '周日'
            }
            var startDate = this.formatDate(mix.period_start_time);
            var endDate;
            if(mix.extra_period_end_time){
                endDate = this.formatDate(mix.extra_period_end_time);
            }else{
                endDate = this.formatDate(mix.period_end_time);
            }
            
            var start_time = mix.start_time;
            var end_time = mix.end_time;
            var week = json[mix['week']];
            mix.classTime = '中教课每'+week+' '+start_time+'-'+end_time;
            mix.classDate = startDate + '至'+endDate;
            return mix;
        },
        formatDate: function (time){
            var date = time.split(' ')[0].replace(/-/g,'/');
            return date;
        }

    }
    new Success().init();
});