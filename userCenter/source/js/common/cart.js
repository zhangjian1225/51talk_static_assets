/**
 * 
 * @authors Saturday (wuhao01@51talk.com)
 * @version 1.0.0
 */
//购物车
define("common/cart",['tplCommon','../common/layer'],function (require,exports,module){
    $.fn.extend({
        unChecked: function() {
            return this.each(function(index, ele) {
                if (ele.type.toLowerCase() == "radio") {
                    $(ele).attr("checked", false).next().removeClass("check");
                } else {
                    $(ele).attr("checked", false).next().removeClass("checked");
                }
            });
        },
        checked: function() {
            return this.each(function(index, ele) {
                if (ele.type.toLowerCase() == "radio") {
                    $(ele).attr("checked", true).next().addClass("check");
                } else {
                    $(ele).attr("checked", true).next().addClass("checked");
                }

            });
        },
        addCheckbox: function() {
            return this.each(function(index, ele) {
                var inputCheckbox = $(ele);
                var oCheckbox = $('<span class="u-ckb"></span>');
                inputCheckbox.after(oCheckbox);
                if (inputCheckbox.prop("checked")) {
                    oCheckbox.addClass("checked");
                }
                if (inputCheckbox.prop("disabled")) {
                    return true;
                }
                oCheckbox.parent().on("click", function() {
                    var oLabel = $(this);
                    inputCheckbox.attr("checked", !inputCheckbox.prop("checked"));
                    oCheckbox.toggleClass("checked");
                    inputCheckbox.change();
                    return false;
                });
            });
        }
    });
    var cookies= require("cookie");
    var JSON2=require("json2");
    //提示弹窗
    var layer = require('../common/layer');
    //js动态添加模拟checkbox
 


    //第一步 确定是否有购物内容  定义cookie 字段为cart
    function Cart(){

        /*
        {
            cart:[],
            earphone:"off",
            goods:{
                30133:{
                   id: 30133,
                   price:3333,
                   title:'',
                   point_type:'',
                   point_value:'',
                   expire_days:'',
                   is_show_installment:'',
                   installment_num:'',
                   installment_price:''
                }
            }
        }
        */
        //购物车
        this.cartBox =cookies.getCookie('cart')? JSON2.parse(cookies.getCookie('cart')):{cart:[],earphone:"off",goods:{}};
   
        this.tplCommon = require('tplCommon');
        this.now = 1;
        this.totalPrice = 0;
        
    }
    Cart.prototype={
       init:function(){
           this.bindEvents();
           this.addEvent();
           $("input[type='checkbox'].f-dn").each(function (index, ele) {
            $(ele).addCheckbox();
         });
        //货物个数
           var total = _.keys(this.cartBox.goods);
           this.initRender();
           this.top = $("#cart .products").height();
           //上下页
           this.nextEvent();
           this.preEvent();
           this.checkEarphone();
           $("#cart [name='cart']").val(JSON2.stringify(this.cartBox));
       },
       isInstallment:function(){
           var isInstallment = false;
           for(var item in this.cartBox.goods){
               if(this.cartBox.goods[item].is_show_installment){
                 isInstallment= true;
                 this.installment_num = this.cartBox.goods[item].installment_num;
                 break;
               }
           }
           return isInstallment;
       },
    
       getTotalPrice: function(){
           this.totalPrice = 0;
           for(var key in this.cartBox.goods){
                this.totalPrice +=Number(this.cartBox.goods[key].price);
           }
           if(this.cartBox.earphone=="on"){
                this.totalPrice =  this.totalPrice + 50;
           }
           if(!this.isInstallment()){
               $("#cart .jsTotal").html(this.totalPrice);
           }else{
                $("#cart .jsTotal").html(this.totalPrice+"元="+(this.totalPrice/this.installment_num).toFixed(2)+"元 × 12期");
           }
       },
       initRender:function(){
            this.renderGoodsList();
            this.renderMain();
            this.pageRender();
            this.getTotalPrice();
       },
       renderGoodsList:function(){
            var goods = this.cartBox.goods;
            $("#cart .jsWrap").html("");
            if(_.keys(this.cartBox.goods).length==0){
                $("#cartBox .addeds").hide();
            }else{
                $("#cartBox .addeds").show();
            }
            if(this.cartBox.earphone=="on"){
                $("[name='earphone']").checked();
            }
            for(var key in goods){
                $("#cart .jsWrap").append(this.tplCommon.goodItem( goods[key]));
                this.delEvent();
            }
        },
       renderMain:function(){
           $(".jsCount").text( _.keys(this.cartBox.goods).length);
       },
       bindEvents:function(){
           var oCart = $("#cart");
            var right=parseInt(oCart.css("right"));
            oCart.mouseenter(function(){
                this.timer=setTimeout(function(){
                    oCart.stop().animate({"right":0});
                },100);
            }).mouseleave(function(event){
                if(event.pageX<$(window).width()){
                    clearTimeout(this.timer);
                    oCart.stop().animate({"right":-255});
                }            
            });
            var self = this;
            $("#form-cart").attr("action",href_url+'/orderInfo');

            $("#form-cart .jsSubmit").off().on("click",function(){
                if(self.cartBox.cart.length==0){
                    layer.showFn('您还没有选购内容不能提交！');
                    return false;
                }
                $.ajax({
                    url:window.href_url+"/ajax/checkCart",
                    type:"GET",
                    async:false,
                    success:function(res){
                        console.log(res);
                        if(res.status==0){
                            layer.showFn(res.info);
                            return;
                        }else{
                            $("#form-cart").submit();
                        }
                    }
                });
            });
       },
       delEvent:function(){
           //删除DOM节点
           var self = this;
           $(".jsDelete").on("click",function(){
                var id = $(this).data("id");
                self.deleteGoods(id);
                $(this).parent().parent().remove();
                //self.now = 1;

           });
       },
       addEvent:function(){
           var self = this;
           $(".jsCart").on('click',function(){
                if($(this).hasClass('already-cart')){
                    return;
                }
                var obj =  $(this).attr('data-cart');
                if(obj){
                    self.addGoods(JSON2.parse(obj));
                }
               
           });
       },
       addGoods:function(obj){ //添加商品
           var obj = obj;
           var html = "";
           var str = "您已经添加:";
           var havenjoined = [];
           if(!this.cartBox.goods){
                this.cartBox.goods={};
            }
           for(var key in obj){
                if(!this.cartBox.goods[key]){
                   this.cartBox.goods[key] =  obj[key];
                   html+= this.tplCommon.goodItem( obj[key]);
                }else{
                    havenjoined.push(obj[key].title);
                }
           }
           if(!html){
               return;
           }
           $(".jsCart").text('已加入购物车');
           $(".jsCart").addClass("already-cart");
           $(".jsWrap").append(html);
           $("#cart").stop().animate({"right":0});
           this.delEvent();
           this.totalPrice = 0;
           this.updateCookie();
           this.pageRender();
       },
       deleteGoods:function(id){ //删除商品
           delete this.cartBox.goods[id];
           //更新cookie
           this.totalPrice = 0;
           if($(".jsCart").attr("data-cart")){
                var cart = JSON2.parse( $(".jsCart").attr("data-cart"));
                if(cart[id]){
                    $(".jsCart").removeClass("already-cart").text('加入购物车');
                }
           }
           
           this.updateCookie();
           this.pageRender();

       },
       updateCookie:function(){

            this.cartBox.cart = _.keys(this.cartBox.goods);
            if(this.cartBox.cart.length==0){
                this.cartBox.earphone = "off";
                $("#cart .addeds").hide();
                $("[name='earphone']").unChecked();
            }else{
                $("#cart .addeds").show();
                
            }
            cookies.setCookie('cart',JSON2.stringify(this.cartBox));
            $("#cart [name='cart']").val(JSON2.stringify(this.cartBox));
            this.getTotalPrice();
            this.renderMain();
       },
       pageRender:function(){
            //每次显示多少个
            this.iPages=3;
            this.count =_.keys(this.cartBox.goods).length;
            this.total = Math.ceil(this.count/this.iPages);
            if(this.total==0 || this.total==1){
                $(".jsPageCount").text(1);
                $('#cart .next').addClass("dis-next");
                $('#cart .prev').addClass("dis-prev");
                this.now=1;
            }else{
                $(".jsPageCount").text(this.total);
                $('#cart .next').removeClass("dis-next");
            }
          
            if(this.now>this.total){
                this.now= this.total;
                 $("#cart .jsWrap").animate({"top":-(this.now-1)*this.top});
                 if(this.now==0){
                     this.now=1;
                 }

            }else if(this.now==1){
                $("#cart .jsWrap").animate({"top":0});
            }
            if(this.total==0){
                $(".jsPageNow").text(1);
            }else{
                $(".jsPageNow").text(this.now);
            }
            
            if(this.now == this.total && this.now>1){
                $('#cart .next').addClass("dis-next");
            }
            

       },
       preEvent:function(){
            var self = this;
          
            $("#cart .prev").on("click",function(){
                if($(this).hasClass("dis-prev")){
                    return;
                }
                self.now--;
                $("#cart .jsPageNow").text( self.now);
                $("#cart .next").removeClass("dis-next");

                $("#cart .jsWrap").stop().animate({"top":-(self.now-1)*self.top});

                if(self.now==1){
                    $(this).addClass("dis-prev");
                }
            });
       },
       nextEvent:function(){
          
        var self = this;
        $("#cart .next").on("click",function(){
            if($(this).hasClass("dis-next")){
                return;
            }
            self.now++;
            $("#cart .jsPageNow").text( self.now);
            $("#cart .jsWrap").stop().animate({"top":-(self.now-1)*self.top},300);
            $("#cart .prev").removeClass("dis-prev");
            if(self.now==self.total){
                $(this).addClass("dis-next");
            }
        });
       },
       checkEarphone : function(){
           var self  =  this;
          $("[name='earphone']").on("change",function(){
                if($("#cart [name='earphone']:checked").length==1){
                    self.cartBox.earphone = "on";
                }else{
                    self.cartBox.earphone = "off";
                }
                self.updateCookie();
          });
        
       }
    }
    module.exports =  new Cart();

});
