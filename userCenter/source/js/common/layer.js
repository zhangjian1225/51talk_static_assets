
define("common/layer", ['tplCommon', '../common/util'], function (require, exports, module) {
    (function () {
        var tplCommon = require('tplCommon');
        var util = require("../common/util");
        $('#layerId').html(tplCommon.layer());
        util.replaceImgUrl('#layerId', static_url);
        var layerBox = $('#layerBox'),
            textId = $('#textId'),
            layerBtn = $('#layerBtn'),
            closeBtn = $("#layerId .tit-box a");
        //显示提示弹窗
        exports.showFn = function (value) {
            layerBox.show();
            textId.text(value);
        };

        exports.changeBtnText = function (value) {
            layerBtn.text(value);
        };

        closeBtn.on("click", function () {
            layerBox.hide();
        });
        //隐藏提示弹窗
        layerBtn.on('click', function () {
            layerBox.hide();
        });
    })();
});