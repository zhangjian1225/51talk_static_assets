;(function(root, factory) {  if (typeof module === 'object' && module.exports) module.exports = factory();  else if (typeof define === 'function') define(factory);  else root = factory();}(typeof window === 'object' ? window : this, function() {  return {"afterOrderClass": function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="results">\n    <h3>\n        我预约的评测课\n        <a href="http://www.51talk.com/user/appoint" target="_blank" class="more">更多></a>\n    </h3>\n    <div class="lists">\n        <h4>\n            <i></i>\n            ' +
((__t = ( data.show_time_for_stu )) == null ? '' : __t) +
'\n                <a href="javascript:;" class="evlBtn">1对1外教评测课</a>\n        </h4>\n        <dl>\n            ';
 if(data.preview_video == '') {;
__p += '\n                <dt><img src="../../images/exReceive/r_after_img.png?v=1543305523828" alt=""></dt>\n                ';
 } else{ ;
__p += '\n                    <dt>\n          <div class="viewDt">\n            <img src="' +
((__t = (imagessrc2)) == null ? '' : __t) +
'exReceive/viewImg.png?v=1543305523828" alt="" class="viewImg">\n            <i class="view-btn" data-video="' +
((__t = ( data.preview_video )) == null ? '' : __t) +
'" onclick="__sdonclick(\'exclassvideo\');"></i>\n            <span>课前预习视频</span>\n          </div>\n        </dt>\n                    ';
 } ;
__p += '\n                        <dd class="ts">\n                            ' +
((__t = ( data.course_name )) == null ? '' : __t) +
'\n                        </dd>\n                        <dd>\n                            ' +
((__t = ( data.course_name_en_us )) == null ? '' : __t) +
'\n                        </dd>\n                        <dd class="tt">\n                            ';
 if(data.teacher_url == '') {;
__p += '\n                                <img src="' +
((__t = ( data.tea_pic )) == null ? '' : __t) +
'?v=1543305523829" alt="">\n                                ';
 } else{ ;
__p += '\n                                    <a href="' +
((__t = ( data.teacher_url )) == null ? '' : __t) +
'" target="_blank"><img src="' +
((__t = ( data.tea_pic )) == null ? '' : __t) +
'?v=1543305523829" alt=""></a>\n                                    ';
 } ;
__p += '\n                                        ' +
((__t = ( data.tea_name )) == null ? '' : __t) +
'\n                        </dd>\n        </dl>\n    </div>\n    <div class="basicList">\n        <ul class="preList">\n            <li><a href="' +
((__t = ( data.url_preview )) == null ? '' : __t) +
'" onclick="__sdonclick(\'preview\');" class="preview" target="_blank"><i></i>课程预习</a></li>\n            <li><a href="' +
((__t = ( data.book_url )) == null ? '' : __t) +
'" onclick="__sdonclick(\'downloadbook\');" class="download"><i></i>下载教材</a></li>\n            ';
 if(data.updateble == true) {;
__p += '\n                <li>\n                    <a href="http://www.51talk.com/reserve/upcourse/' +
((__t = ( data.id )) == null ? '' : __t) +
'" onclick="__sdonclick(\'changebook\');" class="modify" target="_blank">\n                        ';
 } else{ ;
__p += '\n                            </a></li><li class="notCheck"><a href="http://www.51talk.com/reserve/upcourse/' +
((__t = ( data.id )) == null ? '' : __t) +
'" onclick="__sdonclick(\'changebook\');" class="modify" target="_blank">\n                                </a><a href="javascript:;" class="modify">\n                                    ';
 } ;
__p += '\n                                        <i></i>修改教材\n                                        <div class="modiLayer">\n                                            <div class="layer">\n                                                <i></i>\n                                                <span>课前一小时内无法修改教材</span>\n                                            </div>\n                                        </div>\n                                </a>\n                            </li>\n                            ';
 if(data.updateble == true) {;
__p += '\n                                <li>\n                                    <a href="http://www.51talk.com/reserve/cancel/' +
((__t = ( data.id )) == null ? '' : __t) +
'" onclick="__sdonclick(\'cancel\');" class="cancel" target="_blank">\n                                        ';
 } else{ ;
__p += '\n                                            </a></li><li class="notCheck"><a href="http://www.51talk.com/reserve/cancel/' +
((__t = ( data.id )) == null ? '' : __t) +
'" onclick="__sdonclick(\'cancel\');" class="cancel" target="_blank">\n                                                </a><a href="javascript:;" class="cancel">\n                                                    ';
 } ;
__p += '\n                                                        <i></i>取消课程</a>\n                                            </li>\n                                            <!-- <li class="notice hide"><i></i>课前半小时不可修改</li> -->\n        </ul>\n    </div>\n</div>';

}
return __p
},
"afterReady": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="pre-info-main">\n  <h3>课前必看：如何上好这节外教课</h3>\n  <!-- 青少 -->\n  <div class="info-video" id="youth-video">\n    <ul>\n      <li class="LVideo" onclick="__sdonclick(\'51video_before\');">\n        <img src="../../images/exReceive/r_video_1.png?v=1543305523850" alt="">\n        <i class="video-btn"></i>\n        <span class="title">课前准备必看</span>\n      </li>\n      <li onclick="__sdonclick(\'preparevideo\');" class="videoImg">\n        <img src="../../images/exReceive/r_video_2.png?v=1543305523850" alt="">\n        <span class="title"><img src="../../images/exReceive/video_btn.png?v=1543305523850" alt="" class="r-video-btn">了解51talk的服务</span>\n      </li>\n      <li onclick="__sdonclick(\'word_video\');" class="videoImg">\n        <img src="../../images/exReceive/r_video_3.png?v=1543305523850" alt="">\n        <span class="title"><img src="../../images/exReceive/video_btn.png?v=1543305523850" alt="" class="r-video-btn">外教课堂常用指令</span>\n      </li>\n    </ul>\n  </div>\n  <!-- 成人 -->\n  <div class="info-video hide" id="adult-video">\n    <ul>\n      <li onclick="__sdonclick(\'preparevideo\');">\n        <img src="../../images/exReceive/r_video_1.png?v=1543305523850" alt="">\n        <i class="video-btn"></i>\n        <span class="title">课前准备必看</span>\n      </li>\n      <li class="LVideo" onclick="__sdonclick(\'51video_before\');">\n        <img src="../../images/exReceive/r_video_l.jpg?v=1543305523850" alt="">\n        <i class="video-btn"></i>\n        <span class="title">了解51Talk的服务</span>\n      </li>\n    </ul>\n  </div>\n  <h3>下载上课软件</h3>\n  <div class="info-software hide" id="ipadSoft">\n    <ul class="youthWare">\n      <li><img src="../../images/exReceive/r_after_ipad.jpg?v=1543305523850" alt=""></li>\n      <li>\n        <dl>\n          <dt>51Talk青少儿英语iPad版</dt>\n          <dd class="indent">使用IPad在App Store 搜索51Talk青少儿英语并下载</dd>\n          <dd><i></i>方便快捷，随时随地预约上课</dd>\n          <dd></dd>\n        </dl>\n      </li>\n      <li>\n        <img src="../../images/exReceive/r_ipad_code.jpg?v=1543305523850" alt="">\n        <span>扫码下载</span>\n      </li>\n    </ul>\n    <ul>\n      <li><img src="../../images/exReceive/r_after_logo.jpg?v=1543305523850" alt=""></li>\n      <li>\n        <dl>\n          <dt>AC在线教室 电脑客户端</dt>\n          <dd><i></i>高清晰度视频通话，零距离连线外教</dd>\n          <dd><i></i>内嵌教材，无需下载，使用方便</dd>\n          <dd><i></i>中英双语即时翻译，与外教对话无障碍</dd>\n        </dl>\n      </li>\n      <li>\n        <a href="http://www.51talk.com/ac/51TalkAC.php" target="_blank">\n          <img src="../../images/exReceive/r_logo_load.jpg?v=1543305523850" alt="">\n          <span>下载软件</span></a>\n      </li>\n    </ul>\n  </div>\n  <div class="info-software hide" id="AcSoft">\n    <ul>\n        <li><img src="../../images/exReceive/r_after_logo.jpg?v=1543305523850" alt=""></li>\n        <li>\n          <dl>\n            <dt>AC在线教室 电脑客户端</dt>\n            <dd><i></i>高清晰度视频通话，零距离连线外教</dd>\n            <dd><i></i>内嵌教材，无需下载，使用方便</dd>\n            <dd><i></i>中英双语即时翻译，与外教对话无障碍</dd>\n          </dl>\n        </li>\n        <li>\n          <a href="http://www.51talk.com/ac/51TalkAC.php" target="_blank">\n            <img src="../../images/exReceive/r_logo_load.jpg?v=1543305523851" alt="">\n            <span>下载软件</span></a>\n        </li>\n      </ul>\n    <ul class="youthWare">\n      <li><img src="../../images/exReceive/r_after_ipad.jpg?v=1543305523851" alt=""></li>\n      <li>\n        <dl>\n          <dt>51Talk青少儿英语iPad版</dt>\n          <dd class="indent">使用IPad在App Store 搜索51Talk青少儿英语并下载</dd>\n          <dd><i></i>方便快捷，随时随地预约上课</dd>\n          <dd></dd>\n        </dl>\n      </li>\n      <li>\n        <img src="../../images/exReceive/r_ipad_code.jpg?v=1543305523851" alt="">\n        <span>扫码下载</span>\n      </li>\n    </ul>\n  </div>\n  <div class="info-list">\n    <p>常见问题：</p>\n    <ul>\n      <li>（1）上课前需要准备什么？</li>\n      <li><span>请在课前熟悉本节课教材，根据提示做好课前预习，提前进入AC在线教室等待外教进入即可。</span></li>\n      <li>（2）上课过程中出现问题怎么办？</li>\n      <li><span>您可以拨打客服热线：4000-515151 或者联系您的课程顾问。</span></li>\n      <li>（3）上完课后，何时能看到我的评测结果？</li>\n      <li><span>外教会在课后第一时间为您生成专属的评测报告，届时，您直接登录51Talk会员中心即可查看。另外，我们也有专属的课程顾问，会在您上完课后24小时左右与您联系。</span></li>\n    </ul>\n  </div>\n  <div id="video"></div>\n</div>';

}
return __p
},
"bannerText": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="bannerText">\n  <dl>\n    <dt><img src="../../images/exReceive/time_logo.png?v=1543305523860" alt=""></dt>\n    <dd>我们为您准备了一节价值288元的外教1对1体验课，以便您更好的了解我们的在线课程服务</dd>\n    <dd>免费体验机会将于<span>30天后过期</span>，请尽快预约！</dd>\n  </dl>\n</div>';

}
return __p
},
"basic": function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="basic">\n  <dl class="info">\n    <dt><a href="' +
((__t = ( data.update_avatar )) == null ? '' : __t) +
'" class="figure"><img src="' +
((__t = ( data.avatar_new )) == null ? '' : __t) +
'?v=1543305523864" alt=""></a></dt>\n    <dd class="stu">' +
((__t = ( data.nick_name )) == null ? '' : __t) +
'\n      <a href="' +
((__t = ( data.update_user )) == null ? '' : __t) +
'" class="write">\n        <i class="writeImg"></i>\n        <div class="wLayer">\n          给自己起个英文名，让老师提前认识你吧！\n        </div>\n      </a>\n      <a href="https://sale.51talk.com/" target="_blank" onclick="__sdonclick(\'buybutton\');" class="buyBtn hide">购买课程</a>\n    </dd>\n    <dd class="learn">\n      学号：' +
((__t = ( data.stu_num )) == null ? '' : __t) +
'\n      <span>学豆：' +
((__t = ( data.credit )) == null ? '' : __t) +
'<a href="' +
((__t = ( data.user_credit )) == null ? '' : __t) +
'"><i></i></a></span>\n    </dd>\n    <dd class="over">\n      <i></i>\n      剩余体验次数：<span class="num">' +
((__t = ( data.point_num )) == null ? '' : __t) +
'</span>次\n      ';
 if(data.point_num != 0) {;
__p += '\n        <span class="data">（有效期至' +
((__t = ( data.valid_end )) == null ? '' : __t) +
'） </span>\n      ';
 } ;
__p += '\n      <a href="' +
((__t = ( data.user_asset )) == null ? '' : __t) +
'" class="classTime">课次详情</a>\n    </dd>\n    ';
 if(data.classtime_num != 0) {;
__p += '\n    <dd class="classNum">剩余课时：<span class="num">' +
((__t = ( data.classtime_num )) == null ? '' : __t) +
'</span>课时</dd>\n    ';
 } ;
__p += '\n    ';
 if(data.point1v2_num != 0) {;
__p += '\n    <dd class="classNum">剩余课数：<span class="num">' +
((__t = ( data.point1v2_num )) == null ? '' : __t) +
'</span>课数</dd>\n    ';
 } ;
__p += '\n  </dl>\n</div>\n';

}
return __p
},
"classTime": function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>选择上课时间<span>(每节课25分钟)</span></h3>\n<div class="timeList">\n  <ul class="tab">\n    ';
 for(var i = 0; i < data.calendar_list.length; i++) { ;
__p += '\n      ';
 if(data.calendar_list[i].is_today == 1 ) { ;
__p += '\n        <li class="check" data-time="' +
((__t = ( data.calendar_list[i].time )) == null ? '' : __t) +
'">\n      ';
 } else { ;
__p += '\n        </li><li data-time="' +
((__t = ( data.calendar_list[i].time )) == null ? '' : __t) +
'">\n      ';
 } ;
__p += '\n        <span>' +
((__t = ( data.calendar_list[i].week )) == null ? '' : __t) +
'</span>\n        <span>' +
((__t = ( data.calendar_list[i].date )) == null ? '' : __t) +
'</span>\n      </li>\n    ';
 } ;
__p += '\n  </ul>\n  <ul class="listTab">\n    ';
 for(var key in data.time_arr_two) { ;
__p += '\n      ';
 if(data.time_arr_two[key].status == "off" ) { ;
__p += '\n        <li data-id="' +
((__t = ( data.time_arr_two[key].id )) == null ? '' : __t) +
'"><span class="full">' +
((__t = ( data.time_arr_two[key].start )) == null ? '' : __t) +
'已满</span></li>\n      ';
 } else { ;
__p += '\n        <li class="gray" data-id="' +
((__t = ( data.time_arr_two[key].id )) == null ? '' : __t) +
'"><span>' +
((__t = ( data.time_arr_two[key].start )) == null ? '' : __t) +
'</span></li>\n      ';
 } ;
__p += '\n    ';
 } ;
__p += '\n  </ul>\n  <p class="listTitle">很抱歉，如果您心仪的体验课时段已满，先去官网首页听听免费公开课吧！51Talk专属客服将在48小时内致电，为您预约1对1外教体验课。</p>\n  <!-- 获取信息 -->\n  <input type="hidden" id="dataTime">\n  <input type="hidden" id="dataId">\n</div>';

}
return __p
},
"finishReady": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="moreServer">\n  <h3>了解更多51Talk课程服务</h3>\n  <div class="info-stu">\n    <div class="stu-read">\n      <a href="javascript:;" onclick="__sdonclick(\'mustread\');">查看详情</a>\n    </div>\n    <div class="cls-video" onclick="__sdonclick(\'51video_after\');">\n      <img src="../../images/exReceive/r_more_video.jpg?v=1543305523871">\n      <i class="video-btn"></i>\n      <span class="title">了解51Talk的服务</span>\n    </div>\n  </div>\n  <div class="package">\n    <a href="https://sale.51talk.com/" onclick="__sdonclick(\'buybanner\');" target="_blank" class="buy-btn">\n      <span>查看课程套餐</span>\n      现在购买立享优惠>\n    </a>\n  </div>\n  <div id="video"></div>\n</div>';

}
return __p
},
"finishResults": function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="results">\n  <h3>\n      最近一次外教课上课记录\n  </h3>\n  <div class="lists">\n    <h4>\n      <i></i>\n      ' +
((__t = ( data.show_time_for_stu )) == null ? '' : __t) +
'\n      <a href="javascript:;" class="evlBtn">1对1外教体验课</a>\n    </h4>\n    <dl>\n      ';
 if(data.status == "t_absent") {;
__p += ' <!-- 老师缺席 -->\n        <dt class="absent"></dt>\n      ';
 } else if(data.status == "s_absent"){ ;
__p += ' <!-- 学生缺席 -->\n        <dt class="absent stuAbsent"></dt>\n      ';
 } else if(data.report_new.length > 0){ ;
__p += ' <!-- 级别 -->\n        <dt><span>您的级别<br><i>Level' +
((__t = ( data.level_auto_user )) == null ? '' : __t) +
'</i></span></dt>\n      ';
 } else{ ;
__p += ' <!-- 测试报告生成中 -->\n        <dt><span>评测报告<br>正在生成中<br>...</span></dt>\n      ';
 } ;
__p += '\n      <dd class="ts">' +
((__t = ( data.course_name )) == null ? '' : __t) +
'</dd>\n      <dd>' +
((__t = ( data.course_name_en_us )) == null ? '' : __t) +
'</dd>\n      <dd class="tt">\n        ';
 if(data.teacher_url == "") {;
__p += ' \n          <img src="' +
((__t = ( data.tea_pic )) == null ? '' : __t) +
'?v=1543305523876" alt="">\n        ';
 } else { ;
__p += '\n          <a href="' +
((__t = ( data.teacher_url )) == null ? '' : __t) +
'" target="_brank"><img src="' +
((__t = ( data.tea_pic )) == null ? '' : __t) +
'?v=1543305523876" alt=""></a>\n        ';
 } ;
__p += '\n        ' +
((__t = ( data.tea_name )) == null ? '' : __t) +
'\n      </dd>\n    </dl>\n  </div>\n  <div class="basicList">\n    <ul class="preList">\n        ';
 if((data.status == "t_absent" || data.status == "s_absent")) {;
__p += ' \n          ';
 if(data.content == 0){ ;
__p += ' <!-- 无卡缺席 -->\n            <li class="courseTel">请联系客服 4000-515151 再约一节</li>\n          ';
 } else { ;
__p += ' <!-- 缺席 -->\n            <li class="courseLi check"><a href="http://trial.51talk.com/trial/reserve" class="courseBtn">再约一节</a></li>  \n          ';
 } ;
__p += '\n        ';
 } else{ ;
__p += ' <!-- 是否有级别 -->\n          ';
 if(data.report_new.length > 0) {;
__p += ' <!-- 级别 -->\n            <li class="check"><a href="' +
((__t = ( data.report_new)) == null ? '' : __t) +
'" target="_blank" onclick="__sdonclick(\'checkreport\');" class="see"><i></i>查看体验报告</a></li>\n          ';
 } ;
__p += '\n          ';
 if(data.review_url.have == "y") {;
__p += '  <!-- 是否有课后测试 -->\n            <li><a href="' +
((__t = ( data.review_url.url )) == null ? '' : __t) +
'" onclick="__sdonclick(\'afterexercise\');" class="classTest"><i></i>课后测试题</a></li>\n          ';
 } ;
__p += '\n          ';
 if(data.record_url.length > 0) {;
__p += ' <!-- 是否课程回放 -->\n            <li class="recordHide"><a href="' +
((__t = ( data.record_url )) == null ? '' : __t) +
'" target="_blank" onclick="__sdonclick(\'playback\');" class="playback"><i></i>课程回放</a></li><a href="' +
((__t = ( data.record_url )) == null ? '' : __t) +
'" target="_blank" onclick="__sdonclick(\'playback\');" class="playback">\n          ';
 } else{ ;
__p += '\n            </a><li class="recordHide notCheck"><a href="' +
((__t = ( data.record_url )) == null ? '' : __t) +
'" target="_blank" onclick="__sdonclick(\'playback\');" class="playback">\n              </a><a href="javascript:;" class="playback"><i></i>课程回放\n                <div class="modiLayer">\n                  <div class="layer">\n                    <i></i>\n                    <span>视频将在上课结束后的24小时内生成，如一直未生成，则可能是由于网络问题或语音通道不支持导致未录屏成功。</span>\n                  </div>\n                </div>\n              </a>\n            </li> \n          ';
 } ;
__p += '\n        ';
 } ;
__p += '  \n    </ul>\n  </div>\n</div> ';

}
return __p
},
"index_after": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div id="head"></div>\n<div class="contentWidth">\n  <!-- banner -->\n  <div id="banner"></div>\n  <div class="exContent">\n    <!-- 左侧栏 -->\n    <div id="sidebar"></div>\n    <div class="content">\n      <!-- 基础部分 -->\n      <div id="basic"></div>\n      <!-- 我预约的评测课 -->\n      <div id="orderClass"></div>\n      <!-- 课前准备 -->\n      <div id="afterReady"></div>\n    </div>\n    <!-- 右侧栏 -->\n    <div id="sidebarRt"></div>\n  </div>\n  <input type="hidden" id="finishBuy" value="1">\n</div>\n<div id="bottom"></div>';

}
return __p
},
"index_before": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div id="head"></div>\n<div class="contentWidth">\n  <!-- banner -->\n  <div id="banner"></div>\n  <div class="exContent">\n    <!-- 左侧栏 -->\n    <div id="sidebar"></div>\n    <div class="content">\n      <!-- 基础部分 -->\n      <div id="basic"></div>\n      <div class="messageB">\n        <ul>\n          <li>我们为您准备了一节价值288元的外教1对1评测课</li>\n          <li>以便您更好的了解我们的在线课程服务</li>\n          <li><a href="http://trial.51talk.com/trial/reserve" class="receBtn">立即领取</a></li>\n          <li>免费体验机会将于30天后过期  请尽快预约</li>\n        </ul>\n      </div>\n    </div>\n    <!-- 右侧栏 -->\n    <div id="sidebarRt"></div>\n  </div>\n  <input type="hidden" id="finishBuy" value="1">\n</div>\n<div id="bottom"></div>';

}
return __p
},
"index_finish": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div id="head"></div>\n<div class="contentWidth">\n  <!-- banner -->\n  <div id="banner"></div>\n  <div class="exContent">\n    <!-- 左侧栏 -->\n    <div id="sidebar"></div>\n    <div class="content">\n      <!-- 基础部分 -->\n      <div id="basic"></div>\n      <!-- 我预约的评测课 -->\n      <div id="orderClass"></div>\n      <!-- 最近一次上课记录 -->\n      <div id="results"></div>\n      <!-- 了解更多 -->\n      <div id="finishReady"></div>\n    </div>\n    <!-- 右侧栏 -->\n    <div id="sidebarRt"></div>\n  </div>\n</div>\n<!-- 查看详情 -->\n<!-- 成人 -->\n<div class="deLayer hide" id="adultBtn">\n  <div class="view">\n    <span class="ltBtn hide"></span>\n    <span class="rtBtn"></span>\n    <div class="content">\n      <img src="../../images/common/delete.png?v=1543305523888" class="delete" alt="">\n      <div class="cont">\n        <ul class="lists">\n          <li><img src="../../images/exReceive/new_adult01.png?v=1543305523888" alt=""></li>\n          <li><img src="../../images/exReceive/new_adult02.png?v=1543305523888" alt=""></li>\n          <li><img src="../../images/exReceive/new_adult03.png?v=1543305523888" alt=""></li>\n          <li><img src="../../images/exReceive/new_adult04.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_adult05.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_adult06.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_adult07.png?v=1543305523889" alt=""></li>\n        </ul>\n        <ul class="switch">\n          <li class="crt"></li>\n          <li></li>\n          <li></li>\n          <li></li>\n          <li></li>\n          <li></li>\n          <li></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- 青少 -->\n<div class="deLayer hide" id="youthBtn">\n  <div class="view">\n    <span class="ltBtn hide"></span>\n    <span class="rtBtn"></span>\n    <div class="content">\n      <img src="../../images/common/delete.png?v=1543305523889" class="delete" alt="">\n      <div class="cont">\n        <ul class="lists">\n          <li><img src="../../images/exReceive/new_youth01.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_youth02.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_youth03.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_youth04.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_youth05.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_youth06.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_youth07.png?v=1543305523889" alt=""></li>\n          <li><img src="../../images/exReceive/new_youth08.png?v=1543305523889" alt=""></li>\n        </ul>\n        <ul class="switch">\n          <li class="crt"></li>\n          <li></li>\n          <li></li>\n          <li></li>\n          <li></li>\n          <li></li>\n          <li></li>\n          <li></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n<input type="hidden" id="finishBuy" value="0">\n<div id="bottom"></div>';

}
return __p
},
"index_method": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div id="head"></div>\n<div class="methods">\n  <div id="bannerText"></div>\n  <div class="content">\n    <!-- show_nick_name 非成人用户  show_nick_name__no： 非非成人用户 （少儿用户|成人转少儿用户）-->\n    <h3 class="show_nick_name__no">最后一步！请选择上课方式完成预约，外教将在约定的时间为学员上课</h3>\n    <h3 class="show_nick_name">请选择上课方式完成预约，外教将在约定的时间为学员上课</h3>\n    <ul class="mList">\n      <li>\n        <dl>\n          <dt><img src="../../images/exReceive/m_logo.png?v=1543305523899" alt=""></dt>\n          <dd class="airdd">AirClass在线教室</dd>\n          <dd>高清晰度视频通话，零距离连线外教<br>中英双语即时翻译，与外教对话无障碍</dd>\n        </dl>\n        <span class="select check" data-id="51TalkAC"></span>\n        <img src="../../images/exReceive/m_comp.png?v=1543305523899" alt="" class="mCompImg">\n      </li>\n      \n      <li>\n        <dl>\n          <dt><img src="../../images/exReceive/m_cls.png?v=1543305523899" alt=""></dt>\n          <dd class="airdd">51Talk青少儿英语iPad版 </dd>\n          <dd>方便快捷，随时随地预约上课<br> &nbsp; </dd>\n        </dl>\n        <span class="select" data-id="ipad"></span>\n        <img src="../../images/exReceive/m_ipad.png?v=1543305523899" alt="" class="mCompImg">\n      </li>\n    </ul>\n    <div class="complete show_nick_name__no"><a href="javascript:;" class="comBtn">完成预约</a></div>\n  </div>\n  <div class="show_nick_name">\n    <div class="en-name-box">\n      <p class="en-name-box__des">给孩子取一个英文名，方便和外教更好交流！</p>\n      <p class="en-name-box__inputbox">\n        <label class="required">*</label><span class="name-label">英文名：</span>\n        <input class="input" type="text" id="nick_name" value="" placeholder="请输入孩子的英文名，或者中文名拼音">\n        <!-- <label class="required-tip">请输入正确英文名(只能填写英文字母大小写，限制字符30个)</label> -->\n      </p>\n    </div>\n    <div class="complete-box">\n      <div class="complete">\n        <a href="javascript:;" class="comBtn disabled">完成预约</a>\n      </div>\n    </div>\n  </div>\n  <input type="hidden" id="dataId" value="51TalkAC">\n</div>\n<input type="hidden" id="finishBuy" value="1">\n<div id="bottom"></div>';

}
return __p
},
"index_method_trail": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div id="head"></div>\n<div class="methods">\n    <div id="bannerText"></div>\n    <div class="content">\n        <h2>—— 您将免费获得 ——</h2>\n        <div class="trial-info">\n            <ul class="f-cb">\n\n                <li>\n                    <div class="flag flag1"></div>\n                    <p>\n                        <b>25</b>分钟<br>1对1外教课程\n                    </p>\n                </li>\n                <li>\n                    <div class="flag flag2"></div>\n                    <p>\n                        <b>1</b>次<br>英语能力测评\n                    </p>\n                </li>\n                <li>\n                    <div class="flag flag3"></div>\n                    <p>\n                        <b>1</b>份<br>英语能力报告\n                    </p>\n                </li>\n                <li>\n                    <div class="flag flag4"></div>\n                    <p>\n                        <b>1</b>套<br>学习提升规划\n                    </p>\n                </li>\n            </ul>\n        </div>\n        <div class="bottom-go">\n            <p>点击领取，51Talk学习顾问将电话联系帮您约课，省心方便~</p>\n            <div class="complete"><a href="javascript:;" class="rightNow">立即领取</a></div>\n        </div>\n\n        <input type="hidden" id="dataId" value="ac">\n    </div>\n</div>\n<input type="hidden" id="finishBuy" value="1">\n<div id="bottom"></div>';

}
return __p
},
"index_method_trail_success": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '\n\n<input type="hidden" id="finishBuy" value="1">\n\n<div id="head"></div>\n<div class="methods">\n    <div id="bannerText"></div>\n    <div class="content">\n        <div class="success">\n            <img src="../../images/exReceive/succ_img.png?v=1543305523918" <="" div="">\n            <h2>领取成功</h2>\n            <p>51Talk学习顾问将电话联系帮您约课<br>\n                请注意接听来自51Talk的电话</p>\n        </div>\n    </div>\n</div>\n<input type="hidden" id="finishBuy" value="1">\n<div id="bottom"></div>';

}
return __p
},
"index_selsectTime": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div id="head"></div>\n<div class="selTime">\n    <div id="bannerText"></div>\n    <div class="content">\n        <div id="classTime"></div>\n        <div id="mobileCode"></div>\n        <div class="next"><a href="javascript:;" class="nextBtn">下一步</a></div>\n    </div>\n</div>\n<!-- 弹出层 -->\n<div class="alertSys">\n    <div class="layerS">\n        <div class="hd">\n            <h3>温馨提示</h3>\n        </div>\n        <div class="conText">\n            <p>您的外教1对1体验课机会已经消耗完，请联系课程顾问解决！</p>\n            <a href="/trial/index" class="knowBtn">知道了</a>\n            <a href="javascript:;" class="apply-lesson">重新申请体验课</a>\n        </div>\n    </div>\n</div>\n<div class="layer-box hide" id="layerBox">\n    <div class="mian-box hide" id="layer1">\n        <div class="tit-box">\n            <span id="closeId"></span>\n        </div>\n        <div class="content">\n            <div class="content-info" id="contentInfo1"></div>\n            <div class="btn-box">\n                <a class="sure" id="sureId" href="javascript:;">我知道了</a>\n            </div>\n        </div>\n    </div>\n    <div class="mian-box hide" id="layer2">\n        <div class="tit-box">\n            <span id="closeId"></span>\n        </div>\n        <div class="content">\n            <div class="content-info" id="contentInfo2"></div>\n            <div class="btn-box">\n                <a class="sure" href="//login.51talk.com/login/index">直接登录</a>\n                <a class="find-password" href="//login.51talk.com/password/forgot">找回密码</a>\n            </div>\n        </div>\n    </div>\n    <div class="mian-box hide" id="layer3">\n        <div class="tit-box">\n            <span id="closeId"></span>\n        </div>\n        <div class="content">\n            <div class="content-info" id="contentInfo3"></div>\n            <div class="btn-box">\n                <a class="sure" href="//login.51talk.com/password/forgot">找回密码</a>\n            </div>\n        </div>\n    </div>\n</div>\n<div id="bottom"></div>';

}
return __p
},
"index_success": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div id="head"></div>\n<div id="success"></div>\n<div id="bottom"></div>';

}
return __p
},
"mobileCode": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<h3>手机验证<span>(便于接收上课短信通知)</span></h3>\n<div class="form">\n    <ul>\n        <li>\n            <span class="lt">手机号码：</span>\n            <div class="input">\n                <input type="text" placeholder="请输入手机号" class="mobile">\n            </div>\n        </li>\n        <li class="slideCode">\n            <span class="lt">验证码：</span>\n            <div class="input">\n                <div class="verification-box">\n                    <div class="outer">\n                        <div class="filter-box"></div>\n                        <span>点击并向右滑动</span>\n                        <div class="inner start"></div>\n                    </div>\n                </div>\n            </div>\n        </li>\n        <li class="vscode hide">\n            <span class="lt">验证码：</span>\n            <div class="input">\n                <input type="text" class="imgcode" placeholder="请输入验证码">\n                <p class="times"><span>60</span>秒后重新获取</p>\n            </div>\n        </li>\n        <li class="getAudioCode hide">\n            长时间接收不到验证码，尝试<a href="javascript:void(0)">语音接听验证码</a>\n        </li>\n    </ul>\n</div>\n\n<!-- <h3>手机验证<span>(便于接收上课短信通知)</span></h3>\n<div class="form">\n  <ul>\n    <li>\n      <span class="lt">手机号码：</span>\n      <div class="input">\n        <input type="text" placeholder="请输入手机号" class="mobile">\n      </div>\n    </li>\n    <li>\n      <span class="lt">验证码：</span>\n      <div class="input">\n        <input type="text" class="imgcode" placeholder="请输入图形验证码">\n        <span class="code"><img id="verifycode" src="http://www.51talk.com/user/verify.php"  alt="单击更换验证码"  class="codeBtn"></span>\n        <span class="getCodeBtn">看不清，换一张</span>\n      </div>\n    </li>\n    <li>\n      <div class="input">\n        <input type="text" class="mobilecode" placeholder="请输入短信验证码">\n        <span class="code smsBtn">获取验证码</span>\n      </div>\n    </li>\n  </ul>\n</div> -->';

}
return __p
},
"orderClass": function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="results">\n  <h3>\n    我预约的体验课\n    <a href="http://www.51talk.com/user/appoint" class="more">更多></a>\n  </h3>\n  <div class="lists leveLists">\n    <h4>\n      <i></i>\n      ' +
((__t = ( data.show_time_for_stu )) == null ? '' : __t) +
'\n      <a href="javascript:;" class="evlBtn">1对1外教体验课</a>\n    </h4>\n    <dl>\n      ';
 if(data.preview_video == '') {;
__p += '\n        <dt><img src="../../images/exReceive/r_after_img.png?v=1543305523941" alt=""></dt>\n      ';
 } else{ ;
__p += '\n        <dt>\n          <div class="viewDt" data-video="' +
((__t = ( data.preview_video )) == null ? '' : __t) +
'" onclick="__sdonclick(\'exclassvideo\');">\n            <img src="../../images/exReceive/viewImg.png?v=1543305523941" alt="" class="viewImg">\n            <i class="view-btn"></i>\n          </div>\n        </dt>\n      ';
 } ;
__p += '\n      <dd class="ts">' +
((__t = ( data.course_name )) == null ? '' : __t) +
'</dd>\n      <dd>' +
((__t = ( data.course_name_en_us )) == null ? '' : __t) +
'</dd>\n      <dd class="tt">\n        ';
 if(data.teacher_url == '') {;
__p += '\n          <img src="' +
((__t = ( data.tea_pic )) == null ? '' : __t) +
'?v=1543305523941" alt="">\n        ';
 } else{ ;
__p += '\n          <a href="' +
((__t = ( data.teacher_url )) == null ? '' : __t) +
'" target="_brank"><img src="' +
((__t = ( data.tea_pic )) == null ? '' : __t) +
'?v=1543305523941" alt=""></a>\n        ';
 } ;
__p += '\n      ' +
((__t = ( data.tea_name )) == null ? '' : __t) +
'</dd>\n    </dl>\n  </div>\n  <div class="basicList">\n    <ul class="preList">\n      ';
 if(data.url_preview != '') {;
__p += '\n        <li class="check"><a href="' +
((__t = ( data.url_preview )) == null ? '' : __t) +
'" onclick="__sdonclick(\'preview\');" class="preview"><i></i>课程预习</a></li>\n      ';
 } ;
__p += '\n      <li><a href="' +
((__t = ( data.book_url )) == null ? '' : __t) +
'" onclick="__sdonclick(\'downloadbook\');" target="_blank" class="download"><i></i>下载教材</a></li>\n      ';
 if(data.updateble_book == true) {;
__p += '\n        <li><a href="http://www.51talk.com/reserve/upcourse/' +
((__t = ( data.id )) == null ? '' : __t) +
'" onclick="__sdonclick(\'changebook\');" class="modify">\n      ';
 } else{ ;
__p += '\n        </a></li><li class="notCheck"><a href="javascript:;" class="modify">\n      ';
 } ;
__p += '\n          <i></i>修改教材\n          <div class="modiLayer">\n            <div class="layer">\n              <i></i>\n              <span>\n                <!-- admin_id大于0后台登录模式 -->\n                ';
 if(data.admin_id > 0) { ;
__p += ' \n                  课前10分钟内无法修改教材\n                ';
 } else { ;
__p += '\n                  课前1小时以内无法修改教材\n                ';
 } ;
__p += '  \n              </span>\n            </div>\n          </div>\n        </a>\n      </li>\n      ';
 if(data.updateble == true) {;
__p += '\n        <li><a href="http://www.51talk.com/reserve/cancel/' +
((__t = ( data.id )) == null ? '' : __t) +
'" onclick="__sdonclick(\'cancel\');" class="cancel">\n      ';
 } else{ ;
__p += '\n        </a></li><li class="notCheck"><a href="javascript:;" class="cancel">\n      ';
 } ;
__p += '\n        <i></i>取消课程\n        <div class="modiLayer">\n          <div class="layer">\n            <i></i>\n            <span>课前半小时内无法取消课程</span>\n          </div>\n        </div>\n      </a></li>\n      <!-- <li class="notice hide"><i></i>半小时不可取消</li> -->\n    </ul>\n  </div>\n</div>';

}
return __p
},
"success": function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="success">\n    <div class="part-1">\n        <dl class="appoint">\n          <dt><img src="../../images/exReceive/succ_img.png?v=1543305523950" alt=""></dt>\n          <dd class="tit">体验课预约成功！</dd>\n          <dd class="youth-li">外教老师正在努力为宝贝备课中，请记得准时参加，不要浪费老师的辛苦付出，让老师白等哦～</dd>\n          <dd class="adult-li hide">外教老师正在努力备课中，请记得准时参加，不要浪费老师的辛苦付出，让老师白等哦～</dd>\n        </dl>\n        <p class="codeTit youth-li">请扫描下方二维码，关注51talk青少微信服务号，获取上课自动提醒。</p>\n        <p class="codeTit adult-li hide">请扫描下方二维码，关注51talk微信服务号，获取上课自动提醒。</p>\n        <dl class="codeImg">\n          <dt><img src="' +
((__t = ( data.qrcode )) == null ? '' : __t) +
'?v=1543305523950" alt=""></dt>\n          <dd class="classT">以下为您预约的课程信息：</dd>\n          <dd>上课时间：' +
((__t = ( data.show_time_for_stu )) == null ? '' : __t) +
'</dd>\n          <dd>教材名称：<span>' +
((__t = ( data.course_name )) == null ? '' : __t) +
'</span><span>' +
((__t = ( data.course_name_en_us )) == null ? '' : __t) +
'</span></dd>\n          <dd>上课方式：' +
((__t = ( data.teach_type )) == null ? '' : __t) +
'</dd>\n        </dl>\n      </div>\n      <div class="part-2">\n        <div class="list-title">\n          <img src="../../images/exReceive/suc_list_img01.png?v=1543305523950" alt="" class="r-img">\n          <span class="youth-li">宝爸宝妈必看：如何上好这节外教课！</span>\n          <span class="adult-li hide">课前必看：如何上好这节外教课！</span>\n        </div>\n        <div class="list-before">\n          <img src="../../images/exReceive/suc_list_img03.png?v=1543305523950" alt="" class="r-img youth-li">\n          <img src="../../images/exReceive/suc_list_img02.png?v=1543305523950" alt="" class="r-img adult-li hide">\n          <div class="list-class">\n            <h3>课前准备</h3>\n            <p class="youth-li">观看视频，了解体验课上课准备事项，并提前下载上课软件，才能更好的陪伴宝贝上课哦～</p>\n            <p class="adult-li hide">观看视频，了解体验课上课准备事项，并提前下载上课软件。</p>\n            <ul class="u-list">\n              <li onclick="__sdonclick(\'51video_before\');">\n                <img src="../../images/exReceive/suc_video.png?v=1543305523950" alt="">\n                <img src="../../images/exReceive/r_video_btn.png?v=1543305523950" alt="" class="video-btn">\n                <span class="span-1">课前准备必看</span>\n              </li>\n              <li onclick="__sdonclick(\'word_video\');" class="youth-li">\n                <img src="../../images/exReceive/suc_eng_video.png?v=1543305523950" alt="">\n                <img src="../../images/exReceive/r_video_btn.png?v=1543305523950" alt="" class="video-btn">\n                <span class="span-1">外教课堂常用指令</span>\n              </li>\n            </ul>\n            <p class="ipadYouth adult-li hide">\n              <a href="http://www.51talk.com/ac/51TalkAC.php" target="_blank"><img src="../../images/exReceive/suc_adult_img.png?v=1543305523950"></a>\n            </p>\n            <p class="ipadYouth youth-li">\n              <a href="//www.51talk.com/h/download.html" target="_blank"><img src="../../images/exReceive/suc_img_ipad.png?v=1543305523950" alt="" class="suc-img-ipad"></a>\n              <a href="//www.51talk.com/ac/51TalkAC.php" target="_blank"><img src="../../images/exReceive/suc_img_ac.png?v=1543305523950" alt="" class="suc-img-ac"></a>   \n            </p>\n          </div>\n        </div>\n        <div class="list-preview youth-li">\n          <img src="../../images/exReceive/suc_list_img04.png?v=1543305523950" alt="" class="r-img">\n          <div class="list-class">\n            <h3>预习课程</h3>\n            ';
  if(data.preview_video.length) {;
__p += '\n            <p>为了让宝贝能更好地和外教沟通，我们的中教老师专门为宝贝录制了预习视频，快带着宝贝提前了解下本节课的上课内容吧～</p>\n            <div class="video">\n              <img src="../../images/exReceive/suc_video_y.png?v=1543305523950" alt="">\n              <img src="../../images/exReceive/r_video_btn.png?v=1543305523950" alt="" class="preview-btn" data-video="' +
((__t = ( data.preview_video )) == null ? '' : __t) +
'" onclick="__sdonclick(\'exclassvideo\');">\n            </div>\n            ';
 } else { ;
__p += '\n            <div class="basic-list">\n              <ul>\n              ';
 if(data.url_preview != "") {;
__p += '\n                <li class="check"><a href="' +
((__t = ( data.url_preview )) == null ? '' : __t) +
'" target="_blank" class="preview" onclick="__sdonclick(\'preview\');"><i></i>课程预习</a></li>\n              ';
 }  ;
__p += '\n              <li><a href="' +
((__t = ( data.book_url )) == null ? '' : __t) +
'" class="download" onclick="__sdonclick(\'downloadbook\');" target="_blank"><i></i>下载教材</a></li>\n              </ul>\n            </div>\n            ';
 }  ;
__p += '\n          </div>\n        </div>\n      </div>\n      <div class="returnBtn"><a href="javascript:;">返回首页</a></div>\n      <div id="video"></div>\n  </div>';

}
return __p
},
"video": function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="video-tips hide">\n  <div class="tips">\n    <h3 class="tit"><span class="close"><img src="../../images/common/delete.png?v=1543305523953"></span></h3>\n    <div class="video-cont">\n      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="600" height="490" id="cc_0427F02CA90CCEFF9C33DC5901307461">\n        <param name="movie" value="https://p.bokecc.com/flash/single/9A0993B2384AB21D_0427F02CA90CCEFF9C33DC5901307461_false_3A7743CB01E0E55B_1/player.swf" class="ccID">\n        <param name="autostart" value="1">\n        <param name="allowFullScreen" value="true">\n        <param name="allowScriptAccess" value="always"><param value="transparent" name="wmode">\n        <embed src="https://p.bokecc.com/flash/single/9A0993B2384AB21D_0427F02CA90CCEFF9C33DC5901307461_false_3A7743CB01E0E55B_1/player.swf" width="700" height="493" class="ccIDName" name="cc_0427F02CA90CCEFF9C33DC5901307461" allowfullscreen="true" wmode="transparent" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">\n      </object>\n    </div>\n  </div>\n</div>';

}
return __p
}}}));