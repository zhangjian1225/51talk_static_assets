define("common/courseInfo", ['tplCommon', '../common/cart', '../common/util', '../common/layer'], function (require, exports, module) {
  (function () {
    var tplCommon = require('tplCommon');
    var JSON2 = require("json2");
    var cart = require("../common/cart");
    var util = require("../common/util");
    var cookies = require("cookie");
    //提示弹窗
    var layer = require('../common/layer');
    //套餐列表缓存数据对象
    var cacheData = {};
    //获取数据
    var getDataObj = {
      courseId: 0,
      //获取课程套餐数据
      getCourseData: function getCourseData() {
        var that = this;
        $.ajax({
          url: window.href_url + '/api/pointList',
          // url: 'https://www.easy-mock.com/mock/5a815b907e05481d41b22ab1/syk_api/pointList',
          type: 'get',
          dataType: 'json',
          data: {
            point_type: $('#point_type').val()
          },
          success: function success(res) {
            if (res.status == 1) {
              //渲染页面
              $('#tInfoBox').html(tplCommon.courseInfo(res));
              const conf_package_desc = res.data && res.data[0] && res.data[0].conf_package_desc; 
              const lis = $("#tInfoBox #courseInfo li");
              if(lis && lis.eq(0)) {
                 addDesc(lis.eq(0));
              }
              util.replaceImgUrl('#tInfoBox', static_url);
              //拼第一个套餐数据，放在加入购物车按钮上
              // that.dataCart = {'datacart':{"id":res.data[0].id,"price":res.data[0].price,"title":res.data[0].name,"point_type":res.data[0].point_type,"point_value":res.data[0].point_value,"expire_days":res.data[0].expire_days}};

              // $('#cartId').attr('data-cart',JSON2.stringify(that.dataCart));
              //渲染结束，调用交互方法
              courseFn();
              that.getCourseInfo();
            } else {
              alert(res.info);
            }
          }
        });
      },
      getCourseInfo: function getCourseInfo() {
        $.ajax({
          url: window.href_url + '/api/pointDetail',
          // url: 'https://www.easy-mock.com/mock/5a815b907e05481d41b22ab1/syk_api/pointDetail',
          type: 'get',
          dataType: 'json',
          data: {
            id: getDataObj.courseId,
            from: 'web'
          },
          success: function success(res) {
            if (res.status == 1) {
              //价格信息
              $('#priceInfo').html(tplCommon.price_info(res));
              //协议和分期
              $('#installment').html(tplCommon.installment(res));
              //将数据放入缓存对象中
              cacheData[res.data.info.id] = res;
            } else {
              alert(res.info);
            }
          }
        });
      }
    };
    getDataObj.getCourseData();


    function addDesc($ele) {  
      if(!$ele) return;
      var dataDesc = $ele.attr("data-desc");
      var coursePBox = $("#tInfoBox .course-box")
      var tip = coursePBox.find(".tip");
      if(tip){
        tip.remove();
      }

      if(dataDesc){
        coursePBox.append('<p class="tip" style="margin-left: 20px; color: #999">'+  dataDesc + '</p>');
      } 
    }

    //课程套餐交互
    var courseFn = function courseFn() {
      var courseObj = {
        //课程盒子id
        courseInfo: $('#courseInfo'),
        courseBox: $('._course-box'),
        suspensionInfo: $('.suspension-info'),
        buyBtn: $('#buyBtn'),
        _event: function _event() {
          var that = this;
          //渲染页面后，判断第一个套餐是否已加入购物车
          this.cartFn(this.courseInfo.find('li').eq(0));
          //点击套餐列表，请求数据，渲染套餐详情信息
          this.courseInfo.find('li').on('click', function () {

            addDesc($(this));
            if (!$(this).hasClass('current')) {
              $(this).parent().find('li').removeClass('current li-spec');
              $(this).addClass('current li-spec');
              
              /*描述，简化文案切换*/

              //重置兄弟节点状态
              $(this).siblings().find('.child_1').removeClass('hide')
              $(this).siblings().find('.child_2').addClass('hide')
              //改变当前状态
              $(this).find('.child_1').addClass('hide');
              $(this).find('.child_2').removeClass('hide');
              //点击套餐，获取套餐id
              getDataObj.courseId = $(this).attr('data-id');
            
              //点击套餐发请求，渲染价格信息,并缓存数据,避免多次请求
              //缓存标记
              var flag = false;
              //迭代缓存对象，判断当前套餐是否已加入缓存
              for (var item in cacheData) {
                if (cacheData[item].data.info.id == getDataObj.courseId) {
                  flag = true;
                }
              }

              if (flag == true) {
                //有缓存，取缓存数据
                //价格信息
                $('#priceInfo').html(tplCommon.price_info(cacheData[getDataObj.courseId]));
                //协议和分期
                $('#installment').html(tplCommon.installment(cacheData[getDataObj.courseId]));
              } else {
                //无缓存，发请求
                getDataObj.getCourseInfo();
              }
              //加入购物车btn交互
              that.cartFn($(this));
            }
          });
          //套餐列表hover
          this.courseInfo.find('li').on('mouseover', function () {
            $(this).find('.suspension-info').show();
          }).on('mouseout', function () {
            $(this).find('.suspension-info').hide();
          });

          //获取第一个套餐的id，用于第一次详情请求
          getDataObj.courseId = this.courseInfo.find('li').eq(0).attr('data-id');

          //立即购买
          this.buyBtn.on('click', function () {
            that.cart = JSON2.stringify({"cart": [getDataObj.courseId]});
            $.ajax({
              url: window.href_url + '/ajax/checkCart',
              type: 'get',
              dataType: 'json',
              async: false,
              data: {
                cart: that.cart
              },
              success: function (res) {
                if (res.status == 1) {
                  $('#formCard').val(that.cart);
                  $('#buyBtnFrom').submit();
                } else if (res.status == 0) {
                  layer.showFn(res.info);
                }
              }
            });
          });
          cart.init();
        },

        //将套餐数据，渲染到“加入购物车”按钮上
        cartFn: function cartFn(ele) {
          var obj = {};
          obj[ele.attr('data-id')] = {
            "id": ele.attr('data-id'),
            "price": ele.attr('price'),
            "title": ele.attr('title'),
            "point_type": ele.attr('point-type'),
            "expire_days": ele.attr('expire-days'),
            "is_show_installment": '',
            "installment_num": '',
            "installment_price": ''
          };
          $('.jsCart').attr('data-cart', JSON2.stringify(obj));

          //判断是否已加入购物车
          var newCartValue = cookies.getCookie('cart');
          if (newCartValue != "") {
            var cookieNewCart = JSON2.parse(cookies.getCookie('cart'));
            var tempFlag = false;
            ;
            for (var key in cookieNewCart.cart) {
              if (ele.attr('data-id') == cookieNewCart.cart[key]) {
                tempFlag = true;
              }
            }
            if (tempFlag == true) {
              $('.jsCart').text('已加入购物车');
              $('.jsCart').addClass('already-cart');
            } else {
              $('.jsCart').text('加入购物车');
              $('.jsCart').removeClass('already-cart');
            }
          }
        }
      };
      courseObj._event();
      //初始化第一个按钮的状态
      courseObj.courseInfo.find('li').eq(0).click();

    };
  })();
});
