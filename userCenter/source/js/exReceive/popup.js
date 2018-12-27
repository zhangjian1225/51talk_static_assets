define('exReceive/popup', [], function(require, exports, module) {
    var PopupFn = function() {
        this.layerBox = $('#layerBox');
        this.layer1 = $('#layer1');
        this.layer2 = $('#layer2');
        this.layer3 = $('#layer3');
        this.mianBox = $('.mian-box');
        this.contentInfo3 = $('#contentInfo3');
        this.contentInfo2 = $('#contentInfo2');
        this.contentInfo1 = $('#contentInfo1');
        this._event();
    }
    PopupFn.prototype = {
        _event: function() {
            var that = this;
            $('#sureId, #closeId').on('click', function() {
                that.layerBox.addClass('hide');
                that.mianBox.addClass('hide');
            });
        }
    };

    var popup = new PopupFn();
    module.exports = {
        showFn1: function(value) {
            popup.layer1.removeClass('hide');
            popup.layerBox.removeClass('hide');
            popup.contentInfo1.text(value);
        },
        showFn2: function(value) {
            popup.layer2.removeClass('hide');
            popup.layerBox.removeClass('hide');
            popup.contentInfo2.text(value);
        },
        showFn3: function(value) {
            popup.layer3.removeClass('hide');
            popup.layerBox.removeClass('hide');
            popup.contentInfo3.text(value);
        }
    }
});