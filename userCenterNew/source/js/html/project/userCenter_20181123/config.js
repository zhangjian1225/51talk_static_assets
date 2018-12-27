/**
 * 配置路由
 * @file：   config.js
 * @note: base
 */
;(function (){
  var oContainer = document.getElementById("container"),
    oSeajs = document.getElementById("j_review_seajsnode"),
    sPage = oContainer ? (oContainer.getAttribute("data-init") || "index") : "index",
    src = oSeajs ? oSeajs.getAttribute("src") : "20181130",
    version = src.lastIndexOf("?") > 0 ? src.substring(src.lastIndexOf("?") + 1) : "20181130";
  seajs.config({
    alias: {
      artTemplate: 'common/artTemplate.js'
    },
    map: [
      [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i, "$1?" + version]
    ]
  });
  seajs.use(sPage);
})();
