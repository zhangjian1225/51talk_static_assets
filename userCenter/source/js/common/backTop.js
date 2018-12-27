define("common/backTop", [''], function(require, exports, module) {
    (function() {
        var topId = $(".top-btn");
        topId.on('click', function() {
            $('html, body').animate({
                'scrollTop': $($(this).attr('href')).offset().top
            }, 500);
            return false
        });
        //top 按钮隐藏设置
        $(window).on('scroll', function() {

            if ($(window).scrollTop() > 500) {
                topId.fadeIn();
            } else {
                topId.fadeOut();
            }
        });
    })();
});