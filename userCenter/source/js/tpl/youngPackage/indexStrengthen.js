;
(function(root, factory) { if (typeof module === 'object' && module.exports) module.exports = factory();
    else if (typeof define === 'function') define(factory);
    else root = factory(); }(typeof window === 'object' ? window : this, function() {
    return {
        "t1": function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '<div>test2221</div>\n<p>hello world</p>';

            }
            return __p
        },
        "test2": function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '<div>test22111112222qqq</div>\n<!-- <img src="http://n.sinaimg.cn/news/1_img/cfp/56fedab5/20171121/dMfY-fynwnty6216203.jpg" />\n<img src="http://n.sinaimg.cn/news/1_img/cfp/56fedab5/20171121/dMfY-fynwnty6216203.jpg" /> -->\n<div age="' +
                    ((__t = (age)) == null ? '' : __t) +
                    '">\n    <p>\n        ' +
                    ((__t = (age)) == null ? '' : __t) +
                    '\n    </p>\n</div>';

            }
            return __p
        }
    }
}));