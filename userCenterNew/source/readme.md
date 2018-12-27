**初始化建立项目**

    gulp initPro --project ac2 --type html

**监听项目的变化**

    gulp watch --project ac2 --type html
    gulp watch --project ac2 --type wap

**预览所有PC项目**

	gulp watch --type html
	gulp watch --type wap

**config_vendor.json 自定义配置生成vendor.js**

    默认情况下生成配置文件，如下：
    {"define":[
    	"html/common/js/sea.min.js",
    	"html/common/js/jquery-1.8.2.min.js",
    	"html/project/2017/test2/source/js/config.js",
    	]
    }

**如有需要把其他包打入到vendor.js中** 

    {"define":[
    	"html/common/js/sea.min.js",
    	"html/common/js/jquery-1.8.2.min.js",
    	"html/project/2017/test2/source/js/config.js",
    	"html/common/js/mod/cookie.js",
    	"html/common/js/mod/json2.js"
    	]
    }

**需要注意的是config.js包要放置在其他依赖包中的前面**

    （less 中图片的路径地址及其less包的导入）
    @import "../../../../../common/less/base.less";
    @import "../../../../../common/less/www/w_header.less";
    @import "../../../../../common/less/www/w_footer.less";
    @imgPath: "../images/";
    
    （针对于个别需求，不需要直接引入vendor.js 或者是和项目名同名的css 文件）
    <link rel="stylesheet" type="text/css" href="<%= cssPath%>test.css">
    <script src="<%= jsPath%>test.js"></script>

**less 压缩编译**

 - 如项目名为test 只能针对于test.less  文件进行编译 ，其他的必须以index 为开头的less文件才可以进行编译

