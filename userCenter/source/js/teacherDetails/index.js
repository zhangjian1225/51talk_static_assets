define("teacherDetails/index", [], function(require, exports, module) {
    // 显示7天的滚动条和立即预约的滚动固定
    scrollFn();
    function scrollFn(){
        if($('.instant-booking').length > 0){ //老师详情页使用 老师评价页面不执行
            var contTop = $('div[class="appointment-cont"]').find('.cont-top');
            var contTopNum = contTop.offset().top;
    
            var instantBooking = $('.instant-booking');
            var instantBookingNum = $('.instant-booking-bottom').offset().top;
    
            // 滚动距离操作
            $(window).scroll(function(){
                console.log()
                if(contTopNum <= $(window).scrollTop()){
                    contTop.addClass('cont-top-fixed');
                }else{
                    contTop.removeClass('cont-top-fixed');
                }
                var heightTop = $(window).scrollTop()+$(window).height();
                if($(window).scrollTop()==0){
                    instantBooking.removeClass('instant-booking-fixed');
                }else if(instantBookingNum >= heightTop){
                    instantBooking.addClass('instant-booking-fixed');
                }else{
                    instantBooking.removeClass('instant-booking-fixed');
                }
            });
        }
    };
    // 连续上两节课的提示开关
    var tipsRes = false;
    var tipsResTwo = false;

    // 约课时间段
    var contLi = $('.cont-bottom li');
    // 点击约课时间
    $('.cont-bottom li').click(function(){
        var thisParent = $(this).parents('.cont-list'),
            nextParent = thisParent.next('.cont-list') ? thisParent.next('.cont-list') : null,
            thisIndex = $(this).index(),
            thisContListIdex = $(this).parents('.cont-list').index(),
            nextLiClass = nextParent.find('li').eq(thisIndex);
        
        if($(this).hasClass('classGo')){
            $(this).removeClass('classGo');
            $(this).find('input').removeAttr("checked");
            if($(this).find('.tips-details-text').attr('style')=='display: block;'){
                $(this).find('.tips-details-text').hide()
            }
        }else{
            $(this).addClass('classGo');
            $(this).find('input').attr('checked','checked');
            if(!tipsResTwo && nextParent != null && !nextLiClass.hasClass('classGo')){
                if(!tipsRes){
                    nextLiClass.addClass('classGo').find('.tips-details-text').show();
                    nextLiClass.find('input').attr('checked','checked');
                    tipsRes = true;
                }
                nextLiClass.addClass('classGo');
                tipsResTwo = true;
            }  
        }
    });
    // 点击立即预约
    var contLiRes = false;
    $('.instant-booking a').click(function(){
        var oForm = $("#reserveForm");
        if (oForm.find("input[type='checkbox']:checked").length) {
            oForm.submit();
        } else {
            $(window).scrollTop(966);
        }
    });

    // 点击关闭连续2节课提示
    $('.tips-details-close').click(function(){
        $(this).parent().hide();
        return false;
    });
    

    // 点击收藏老师
    var collectTeaher = $('.go-search');
    collectTeaher.click(function() {
        var t_id = $("#teacherid").val();
        var _this = $(this);
        if($(this).hasClass('cancel-collection')){
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/ajax/delMyCollection",
                data: "t_id=" + t_id,
                success: function(res) {
                    if (res.status) {
                        $('.clear-search').find('span').html(parseInt($('.clear-search').find('span').html()) - 1);
                        _this.removeClass('cancel-collection').html('<span></span>收 藏');
                    }else{
                        alert(res.info);
                    }
                }
            });
        }else{
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/ajax/collection",
                data: "t_id=" + t_id,
                success: function(res) {
                    if (res.status) {
                        $(".collection-tips").show();
                        $('.clear-search').find('span').html(parseInt($('.clear-search').find('span').html()) + 1);
                        _this.addClass('cancel-collection').html('取消收藏');
                    }else{
                        alert(res.info);
                    }
                }
            });                                          
        }
        
        
    });
    

    // 献花
    var teacherFlowers = $('.share-flowers').find('li').eq(0);
    teacherFlowers.click(function(){
        var t_id = $(this).find('a').attr('data-tid');
        var flowsers = parseInt($(this).find('a').attr('data-flowsers'));
        var _this = $(this);
        if(flowsers<=0){
            $('.flowers-tips').show();
            $('.flowers-tips').find('.flowers-text').eq(1).hide();
            $('.flowers-btn').find('span').eq(1).hide();
            $('.flowers-tips').find('.flowers-text').html('您的献花次数已用完');
            $('.f-sure').click(function(){
                $(this).parents('.comon-tip').hide();
                return false;
            })
            return;
        }else{
            $('.flowers-tips').show();
            $('.flowers-text span').html(flowsers);
            $('.f-sure').click(function(){
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/ajax/doPresent",
                    data: "t_id=" + t_id,
                    success: function(res) {
                        console.log(flowsers);
                        flowsers--;
                        if(res.status){
                            var oNum = $(_this);
                            if(oNum.length){
                                var flowsers_num = parseInt(_this.find('span').html())+1;
                                _this.find('span').html(flowsers_num);
                                $('.flowers-tips').hide();
                            }else{
                                alertTips(["献花成功，感谢您的支持！"],'知道了')
                            }
                            parseInt(_this.find('a').attr('data-flowsers',flowsers))
                            if(flowsers<1){
                                alertTips(["您的献花次数已用完"],'知道了')
                            }
                        } else {
                            alertTips([res.info],'知道了')
                        }
                    }
                });

                return false;
            })
        }

    });
    // 献花取消
    $('.f-cancel').click(function(){
        $(this).parents('.comon-tip').hide();
    });

    // 分享
    var teacherShare = $('.share-flowers').find('li').eq(1);
    teacherShare.click(function(){
        $('.share-tips').show();
    });

    // 欧美老师视频弹窗
    $('.video a').click(function(){
        $('.video-tips').show();
        $('.vjs-big-play-button').trigger('click')
    });

    // 音频播放
    AudioControl('audio-cont');
    function AudioControl(id,callback){
        // 音频控制进度条
        var audio = document.getElementById(id);
        $(audio).on('loadedmetadata',function(){
            audio.pause();
            // 播放
            $(document).on('click','.mp3-start',function(){
                $('.mp3-start').addClass('start-now');
                audio.play();
            });
            // 暂停
            $(document).on('click','.start-now',function(){
                $('.mp3-start').removeClass('start-now');
                audio.pause();
            });
        })
        setInterval(function () {
            var currentTime = audio.currentTime;
            setTimeShow(currentTime);
        }, 1000);
        // 设置播放时间
        function setTimeShow(t) {
            t = Math.floor(t);
            $('.mp3-line-top').css({width:(t/audio.duration).toFixed(4)*85+"%"});
        }
    }



    //alertTips(['每个人最多收藏50个老师，如果要继续收藏请先删除后再收藏'],'我知道了')
    // 提示弹窗
    function alertTips(arrTips,sureTips){
        var strTips = '';
        if(arrTips.length>0){
            for(var i=0;i<arrTips.length;i++){
                strTips +='<p class="success-c">'+ arrTips[i] +'</p>'
            }
        }
        var htmlTips = '<div class="collection-tips comon-tip" style="display:block;">'+
                            '<div class="teacher-bg-color"></div>'+
                            '<div class="teacer-tips">'+
                            '<h3 class="t-tips-tit">温馨提示 <span class="close-t-tips"></span></h3>'+strTips+
                            '<div class="t-tips-sure"><span>'+ sureTips +'</span></div>'
                            '</div>'+
                        '</div>';
        $('body').append(htmlTips);
    }


    // 点击弹窗关闭按钮
    $('.close-t-tips,.t-tips-sure span').click(function(){
        $(this).parents('.comon-tip').hide();
    });


    // 后七天 前七天
    var appointmentCont = $('.appointment-cont');
    appointmentCont.eq(0).find('.last').click(function(){
        appointmentCont.eq(0).addClass('hide');
        appointmentCont.eq(1).removeClass('hide');
        scrollFn();
        $(window).scrollTop(966);
    });
    appointmentCont.eq(1).find('.first').click(function(){
        appointmentCont.eq(1).addClass('hide');
        appointmentCont.eq(0).removeClass('hide');
        scrollFn();
        $(window).scrollTop(966);
    })
});
