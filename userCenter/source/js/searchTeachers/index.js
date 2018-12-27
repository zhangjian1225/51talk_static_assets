define("searchTeachers/index", [], function(require, exports, module) {
    var inputDate = $('input[name="Date"]'), //日期
        inputSelectTime = $('input[name="selectTime"]'), //所选时间段
        inputCourse = $('input[name="course"]'), //课程
        inputTeaTag = $('input[name="tea_tag"]'), //外教特点
        inputTeaName = $('input[name="tea_name"]'), //外教名称
        inputStu_level = $('input[name="stu_level"]'), //适合学员
        inputSex = $('input[name="sex"]');//性别

    // 上课时间
    var TdaysListLi = $('.s-t-days-list li');
    TdaysListLi.click(function(){
        if($(this).index()==7){
            var parentsUl = $(this).parents('.s-t-days-list');
            if(parentsUl.index()==1){
                parentsUl.next().show();
                parentsUl.hide();
            }else{
                parentsUl.prev().show();
                parentsUl.hide();
            }
        }else{
            var thisVal = $(this).attr('date-time');
            TdaysListLi.removeClass('active');
            $(this).addClass('active');
            // 隐藏域赋值
            inputDate.val(thisVal);

        }
    });
    //点击下拉菜单
    var conditionType = $('.condition-type'),
        conditionTypeUl = $('.condition-type ul'),
        conditionTypeTimeLi = $('.condition-type-time li'),
        typeClassRightSpan = $('.condition-type-class .type-class-right span'),
        typelabellI = $('.type-label li');

    $(document).click(function(){
        conditionTypeUl.hide();
    });
    conditionType.click(function(){
        if($(this).find('ul').attr('style')=='display: block;'){
            $(this).find('ul').hide();
        }else{
            for(var i=0;i<=conditionType.length;i++){
                conditionType.eq(i).find('ul').hide();
            }
            $(this).find('ul').show();
        }
        return false;
    });
    conditionTypeTimeLi.click(function(){
        dropDownSelected(1,$(this),'.condition-type-time');
        return false;
    });
    typeClassRightSpan.click(function(){
        dropDownSelected(1,$(this),'.condition-type-class');
        return false;
    });
    typelabellI.click(function(){
        dropDownSelected(0,$(this));
        return false;
    });
    // 老师名称
    $('.condition-teacher-name input').blur(function(){
        inputTeaName.val($(this).val());
    })
    //下拉选中 type=1单选，type=0多选
    function dropDownSelected (type,_this,parentsName){
        var type = type;
        var typeTimeLiInner = _this.html();
        var conditionTypeI = _this.parents('.condition-type').find('i');
        if(type){
            if(parentsName=='.condition-type-class'){
                _this.parents(parentsName).find('.type-class-right span').removeClass('active');
            }else{
                conditionTypeTimeLi.removeClass('active');
            }
            _this.addClass('active');
            conditionTypeI.html(typeTimeLiInner);
            // 隐藏域赋值
            if(_this.parents('.condition-course').length > 0){ //课程
                inputCourse.val(_this.attr('data-val'));
            }else if(_this.parents('.condition-teachers').length > 0){ //筛选外教
                if(_this.parents('.condition-type').index()==1){ //外教性别
                    inputSex.val(_this.attr('date-val'));
                }else if(_this.parents('.condition-type').index()==3){ //适合学员
                    inputStu_level.val(_this.attr('date-val'));
                }
            }else if(_this.parents('.s-t-days').length > 0){ //时间段
                inputSelectTime.val(_this.attr('date-val'))
            }

            _this.parents(parentsName).hide();

        }else{
            var typeTimeLiInner2 = _this.find('em').html();
            if(_this.hasClass('active')){
                _this.removeClass('active');
                conditionTypeI.html(splitFn(conditionTypeI.html(),typeTimeLiInner2));
                if(conditionTypeI.html()==''){
                    conditionTypeI.html('外教特点');
                }
                // 隐藏域赋值
                inputTeaTag.val(splitFn(inputTeaTag.val(),_this.attr('data-tagid')+','));
            }else{
                _this.addClass('active');
                if(conditionTypeI.html()=='外教特点'){
                    conditionTypeI.html(typeTimeLiInner2);
                }else{
                    conditionTypeI.html(conditionTypeI.html() + typeTimeLiInner2);
                }
                // 隐藏域赋值
                inputTeaTag.val(inputTeaTag.val()+_this.attr('data-tagid')+',');
            }
        }
        
    }


    // 切割字符串返回新的字符串 oldstr要切割的字符串 type 已哪种特有符号切割
    function splitFn(oldstr,type){
        var typeInnerArr = oldstr.split(type);
        var newStr = '';
        for(var i = 0; i < typeInnerArr.length; i++){
            newStr += typeInnerArr[i];
        }
        return newStr;
    }

    // 清空搜索条件
    $('.clear-search span').click(function(){
        var conditionType = $('.condition-teachers .condition-type');
        // 清空上课日期
        TdaysListLi.removeClass('active');
        // 清空上课时间
        $('.s-t-days .condition-type-time li').eq(0).trigger('click');
        //清空课程选项
        $('.condition-course .condition-type-class span').eq(0).trigger('click');
        for(var i=0;i<conditionType.length;i++){
            var conditionTypeI =  conditionType.eq(i).find('i');
            if(i == 0){// 外教性别清空
                conditionTypeI.html('外教性别');
            }else if(i == 1){// 外教特点
                conditionTypeI.html('外交特点');
            }else{// 适合学员
                conditionTypeI.html('适合学员');
            }
            conditionType.eq(i).find('li').removeClass('active');
        }
        // 清空老师姓名
        $('.condition-teacher-name input').val('');

        //作用域清空
        inputDate.val('');
        inputSelectTime.val('');
        inputCourse.val('');
        inputTeaTag.val('');
        inputTeaName.val('');
        inputStu_level.val('');
        inputSex.val('');
    });

    $('.close,.cancel').click(function(){
        $('.mask').hide();
        $('.mask-tips').hide();
    });
});
