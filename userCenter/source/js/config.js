/**
 * 配置路由
 * @file：   config.js
 * @note: base
 */
(function() {
    var oContainer = document.getElementById("container"),
        oSeajs = document.getElementById("seajsnode"),
        sPage = oContainer ? (oContainer.getAttribute("data-init") || "index") : "index",
        src = oSeajs ? oSeajs.getAttribute("src") : "20141111",
        version = src.lastIndexOf("?") > 0 ? src.substring(src.lastIndexOf("?") + 1) : "20181101";
    seajs.config({
        alias: {
            tplCommon: "tpl/common/index.js",
            youngPAckage: "tpl/youngPackage/index.js",
            payFlowtpl: "tpl/payFlow/index.js"
        },
        map: [
            [/^(.*\/userCenter\/.*\.(?:css|js))(?:.*)$/i, "$1?" + version]
        ]
    });
    window.href_url = "//sale.51talk.com";
    window.use_url = "//trial.51talk.com";
    seajs.use(sPage);
})();
