define("common/myTimeout", [''], function(require, exports, module) {
    function CountDown(){
        this.data = {
            time:'2018-1-27 23:59:59',
            dayEle:'timeout_days',
            hourEle:'timeout_hours',
            minuteEle:'timeout_minutes',
            secondEle:'timeout_second'
        }
        this.initTimeoutData =function(){
            var _this = this ;
            var timer;
            console.log('xxx,yyy,zzz');
            timer = setInterval(function(){
                var time = $('#banner').attr('data-time');
                if(time){
                    clearInterval(timer);
                    _this.data.time = new Date(time.replace(/\-/g,'/')).getTime() - new Date().getTime();
                    _this.timeout();
                }
            },500)
        }
        this.timeout = function(){

            var _this = this ;

            setTimeout(function(){

                if(_this.data.time<=0){

                    _this.endFn();

                }else{

                    _this.data.time-=100;
                    
                    $('#'+_this.data.dayEle).html(_this.computedTime(_this.data.time,'days'));

                    $('#'+_this.data.hourEle).html(_this.computedTime(_this.data.time,'hours'));

                    $('#'+_this.data.minuteEle).html(_this.computedTime(_this.data.time,'minutes'));

                    $('#'+_this.data.secondEle).html(_this.computedTime(_this.data.time,'seconds'));

                    _this.timeout()

                }
            },100)
        }
        this.endFn=function(){
            $('#timeout>p').addClass('hide');
            $('#timeout>p.default').removeClass('hide');
        }
        this.computedTime = function(time,unit){
            if(!time)return
            var seconds = time/1000;
            switch(unit){
                case 'days':
                    return Math.floor(seconds/60/60/24);
                case 'hours':
                    return Math.floor(seconds/60/60%24);//超出一天，取余数
                case 'minutes':
                    return Math.floor(seconds/60%60);//超出1小时，取余数
                case 'seconds':
                    return (seconds%60).toFixed(1);

            }
        }
        this.init = function(){

            var _this = this;

            this.initTimeoutData();

        }
        this.init();
    }
    new CountDown();
});