;(function(root, factory) {  if (typeof module === 'object' && module.exports) module.exports = factory();  else if (typeof define === 'function') define(factory);  else root = factory();}(typeof window === 'object' ? window : this, function() {  return {"index_regContents": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div id="head"></div>\n<div class="contentWidth">\n  <!-- banner -->\n  <div id="banner"></div>\n  <div class="exContent">\n    <!-- 左侧栏 -->\n    <div id="sidebar"></div>\n    <div class="content"></div>\n    <!-- 右侧栏 -->\n    <div id="sidebarRt"></div>\n  </div>\n</div>\n<div id="bottom"></div>\n<div class="regcontent">\n  <div class="regEnds endSubs">\n    <!-- 目的 -->\n    <div class="regEnds_list">\n      <h3 class="title">您注册51Talk的目的是？</h3>\n      <ul class="list">\n        <li data-tab="1">\n          <img src="../../images/usersSelect/reg_l_img.png?v=1516275144150">\n          <a href="javascript:;" onclick="__sdonclick(\'Idchoose_child\');" class="childBtn">我的孩子要学英语</a>\n        </li>\n        <li data-tab="2">\n          <img src="../../images/usersSelect/reg_r_img.png?v=1516275144151">\n          <a href="javascript:;" onclick="__sdonclick(\'Idchoose_adult\');" class="persBtn">我要学英语</a>\n        </li>\n      </ul>\n    </div>\n    <!-- 更多信息 -->\n    <div class="moreSub_list hide" id="moreContent">\n    </div>\n    <input type="hidden" id="stuAge" class="jsCheck" value="0">\n    <input type="hidden" id="garde" class="jsCheck" value="0">\n    <input type="hidden" id="purpose" class="jsCheck" value="0">\n    <input type="hidden" id="engLevel" class="jsCheck" value="0">\n    <input type="hidden" id="age" class="jsCheck" value="0">\n    <input type="hidden" id="isNaPop" class="jsCheck" value="0">\n  </div>\n</div>';

}
return __p
},
"moreContent": function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="moreSubs subsTwo">\n    <h3 class="title">\n      <span class="youth">请您填写孩子的学习情况，以便我们提供适合您孩子英语水平的课程</span>\n      <span class="ault hide">请填写您的详细信息，以便我们提供适合您英语水平的课程</span>\n    </h3>\n    <div class="subsBox">\n      ';
  for(var keys in data.identity) {;
__p += '\n      <dl class="subList subBtn stuAge" data-id="' +
((__t = ( keys )) == null ? '' : __t) +
'" id="stuAge' +
((__t = ( keys )) == null ? '' : __t) +
'">\n        <dt>\n          <span class="youth">学龄阶段</span>\n          <span class="ault hide">您的职业</span>\n        </dt>\n        ';
  for(var key in data.identity[keys]) {;
__p += '\n          <dd data-id="' +
((__t = ( data.identity[keys][key].id )) == null ? '' : __t) +
'" data-show="' +
((__t = ( data.identity[keys][key].is_show )) == null ? '' : __t) +
'" data-value="' +
((__t = ( data.identity[keys][key].value )) == null ? '' : __t) +
'">' +
((__t = ( data.identity[keys][key].name )) == null ? '' : __t) +
'</dd>\n        ';
 } ;
__p += '\n      </dl>  \n      ';
 } ;
__p += ' \n      ';
  for(var keys in data.grade) {;
__p += '\n      <dl class="subBtn garde hide" data-id="' +
((__t = ( keys )) == null ? '' : __t) +
'" id="garde' +
((__t = ( keys )) == null ? '' : __t) +
'">\n        <dt><img src="../../images/usersSelect/grade_line.png?v=1516275144221"></dt>\n          ';
  for(var key in data.grade[keys]) {;
__p += '\n            <dd data-id="' +
((__t = ( data.grade[keys][key].id )) == null ? '' : __t) +
'" data-show="' +
((__t = ( data.grade[keys][key].is_show )) == null ? '' : __t) +
'" data-value="' +
((__t = ( data.grade[keys][key].value )) == null ? '' : __t) +
'"><span></span>' +
((__t = ( data.grade[keys][key].name )) == null ? '' : __t) +
'</dd>\n          ';
 } ;
__p += '\n      </dl>\n      ';
 } ;
__p += '\n      ';
  for(var keys in data.purpose) {;
__p += '\n      <dl class="subList subBtn purpose hide" data-id="' +
((__t = ( keys )) == null ? '' : __t) +
'" id="purpose' +
((__t = ( keys )) == null ? '' : __t) +
'">\n        <dt>\n          <span>学习目的</span>\n        </dt>\n        ';
  for(var key in data.purpose[keys]) {;
__p += '\n          <dd data-id="' +
((__t = ( data.purpose[keys][key].id )) == null ? '' : __t) +
'" data-value="' +
((__t = ( data.purpose[keys][key].value )) == null ? '' : __t) +
'"><span></span>' +
((__t = ( data.purpose[keys][key].name )) == null ? '' : __t) +
'</dd>\n        ';
 } ;
__p += '\n      </dl>\n      ';
 } ;
__p += '\n      ';
  for(var keys in data.english_level) {;
__p += '\n      <dl class="subList subBtn engLevel hide" data-id="' +
((__t = ( keys )) == null ? '' : __t) +
'" id="engLevel' +
((__t = ( keys )) == null ? '' : __t) +
'">\n        <dt>\n          <span>英语水平</span>\n        </dt>\n        ';
  for(var key in data.english_level[keys]) {;
__p += '\n          <dd data-id="' +
((__t = ( data.english_level[keys][key].id )) == null ? '' : __t) +
'" data-value="' +
((__t = ( data.english_level[keys][key].value )) == null ? '' : __t) +
'"><span></span>' +
((__t = ( data.english_level[keys][key].name )) == null ? '' : __t) +
'</dd>\n        ';
 } ;
__p += '\n      </dl>\n      ';
 } ;
__p += '\n    </div>\n  </div>\n  <div class="formSub">\n    <a href="javascript:;" class="return">返回上一页</a>\n    <a href="javascript:;" onclick="__sdonclick(\'Idchoose_finish\');" class="complete">完成</a>\n  </div>';

}
return __p
}}}));