#### gulp相关逻辑梳理
+ gulp watch之监听ejs 
```js
watch(['source/ejs/**/*.ejs'], function (vinyl) {
  gulp.run("html");
});
```
+ gulp.task(html) 将 ejs 转化生成到 template 下
```js
gulp.task('html', function () {
  ...
  // 将 source/ejs/' + templatePath + '/*.ejs中文件，注入相关数据（css，js，image路径等）
  // 生成 template/下同名模板文件。
  // 其中 vendor 对应 jsSource2 其在每个模板最后的js中使用
  // template下文件用作前端展示及后端嵌套页面模板
});
```
+ gulp.task('jst'）转换 source/tpl/ 下的 html 为js 并移动到指定位置 -> source/js/tpl/ -> js/tpl/
+ gulp.task('less') source/less/ -> source/css/ -> css
+ gulp.task('images') source/images/ -> source/images/ -> images

#### 文件作用
+ source/js/config_vendor.json
  配置所需打包到vendor的文件（包含sea.js，lodash.js， jquery.js，config.js，以及其他）
  config 必须在sea.js jquery.js config.js后，因为其依赖前者处理
+ source/js/config.js
  1. 获取模板待插入节点#container
  2. 通过data-init获取该节点需动态加载的js = sPage
  3. 获取 seajsnode 对应的js文件，根据这个配置动态加载其他资源的版本号（其src是gulp.task(html)生成的vendor）
  4. 配置seajs所需别名map等配置项以及其他所需配置
  5. 使用seajs动态加载该页面指定的文件 seajs.use(sPage);
  
#### 页面示例
1.  template/adultPackage/index_strengthen_tpl.html 
```html
<!-- 前面css应注意公共css与当前页面css，在copy时应注意是否copy命名新的当前页面css，以免css改动影响原页面以及新页面的样式错乱 -->
<!-- 此处sPage = adultPackage/indexStrengthen-->
<body data-init="adultPackage/indexStrengthen" id="container">
    <div id="indexStrengthen">
        loading...
    </div>
    <input type="text" value="point_package" id="point_type">
</body>
<!-- 此处vendor来源于gulp.task(html)配置，受及source/js/config.js  source/js/config_vendor.json 影响 -->
<script src="../../source/js/vendor.js" id="seajsnode"></script>
```
2. 加载sPage seajs.use('adultPackage/indexStrengthen');
adultPackage/indexStrengthen 通过 seajs.config.map 映射到 js/adultPackage/indexStrengthen。
此处我们以未压缩的 source/js/adultPackage/indexStrengthen 来便于分析

```js
// 定义本页面模块关联各种依赖的引入。依赖项关联配置见 source/js/config.js
define("adultPackage/indexStrengthen", ["tpl/adultPackage/index.js","tplCommon","...."], function(require, exports, module) {
    //引入套餐模块。
    // js/tpl/adultPackage/index.js 来源于 source/js/tpl/adultPackage等压缩生成。最早来自于 source/tpl/adultPackage/
    // 具体逻辑见 gulp.task('jst'）
    var indexStrengthen = require("tpl/adultPackage/index.js");
    
    //下部列表详情
    // 替换模板 html 中 #indexStrengthen 为 indexStrengthen.index_strengthen_main() 内容。即html生成的js
    // 可在 source/js/tpl/adultPackage/index.js 大致看相关映射
    $('#indexStrengthen').html(indexStrengthen.index_strengthen_main());
    
    // 同上部分逻辑，用于加载header bottom
    var util =  require("../common/util");
    //套餐信息
    require('../common/courseInfo');
    //banner
    require('../common/banner');
     //timeout倒计时
    var a = require('../common/timeout');
    //设置参数
    a.ajaxApiParams = 'point_package';
    new a.timeout();

    //套餐tab点击切换
    require('../common/packageTab');
    

    var tplCommon =  require("tplCommon");
    // 购物车相关
    $("#cartBox").html(tplCommon.cartBox());
   
    util.replaceImgUrl('#indexStrengthen', static_url);
    util.renderHeaderBottom();
    setTimeout(function(){
        require('../common/detailInfo');
    },1000);
    require('../common/backTop');
});
```

