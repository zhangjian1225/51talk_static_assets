define('successful',['artTemplate'], function(require, exports, module) {
  var template = require('artTemplate');
  template.config('openTag', '[[');
  template.config('closeTag', ']]');
  template.config('escape', false);
  var successObj = {
    event:function(){
      var that = this;
      $.ajax({
        url:"/mock/FreeCourse/successFul",
        type: "GET",
        dataType: "json",
        success: function(res) {
          $("#textbook").html(template("bookList", res.data))
        }
      })
    }
  };
  successObj.event();
});