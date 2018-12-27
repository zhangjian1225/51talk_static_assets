/*
 * 51Talk 自动化工程管理
 */

//
// /* 基础组件 */
// var gulp = require('gulp-param')(require('gulp'), process.argv);
// var ejs = require("gulp-ejs");
// var chalk = require("chalk");
//
// //css
// var header = require('gulp-header');
// var less = require("gulp-less");
// var autoprefix = require('gulp-autoprefixer');
// var makeUrlVer = require('gulp-make-css-url-version');
//
// //images
// var imagemin = require('gulp-imagemin');
//
// //js
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var transport = require('gulp-seajs-transport');
//
// //base
// var plumber = require('gulp-plumber');
// var browserSync = require('browser-sync');
// var proxy = require('http-proxy-middleware');
// var reload = browserSync.reload;
// var minifyCss = require('gulp-minify-css');
// var jade = require('gulp-jade');
// var changed = require('gulp-changed');
// var fs = require('fs');
//
// /* banner info */
// var pkg = require('./package.json');
// var banner = ['/*!',
//   ' * <%= pkg.homepage %>',
//   ' * copyright (c) 2015 <%= pkg.name %>',
//   ' */',
//   ''].join('\n');
//
// var log = console.log;
//
// /*css样式压缩*/
// gulp.task('css', function (project, type) {
//   log("minfiy css....");
//   return gulp.src('css/' + type + "/" + project + '/*.css')
//     .pipe(minifyCss())
//     .pipe(gulp.dest('../css/' + type + "/" + project + "/"));
// });
//
// /*gulp jst任务*/
// gulp.task('jst', function (project, type) {
//   var jst = require('gulp-jst-extend');
//   return gulp.src(['js/' + type + '/project/' + project + '/template/**/*.html'])
//     .pipe(jst('tmpl.js', {renameKeys: ['^.*/template/(.*).html$', '$1']}))
//     .pipe(gulp.dest('../js/' + type + '/project/' + project + '/'));
// });
//
// /*打包vendor.js*/
// gulp.task("build_vendor", function (project, type) {
//   log("build_vendor.....");
//   var config = "";
//   try {
//     var config = fs.readFileSync('js/' + type + '/project/' + project + '/config.json', "utf-8");
//     //var config = require("js"+type+'/project/'+project+'/config.json');
//   } catch (e) {
//     log('没有自定义配置config.json文件，默认打包所有的公用文件。。。');
//   }
//   var defaultConf = [
//     'js/' + type + '/common/*.js',
//     'js/' + type + '/project/' + project + '/config.js',
//     'js/' + type + '/mod/*.js',
//   ];
//
//   defaultConf = config ? JSON.parse(config).define : defaultConf;
//   gulp.src(defaultConf)
//     .pipe(plumber())
//     .pipe(transport())
//     .pipe(changed('js/' + type + '/project/' + project + '/vendor.js'))
//     .pipe(concat('vendor.js'))
//     .pipe(gulp.dest('js/' + type + '/project/' + project + '/'))
//     .on("end", function () {
//
//     });
// });
//
// /* gulp js 任务 */
// gulp.task('js', function (project, type) {
//   gulp.src([
//     'js/' + type + '/project/' + project + '/*.js',
//     '!js/' + type + '/project/' + project + '/config.js',
//   ])
//     .pipe(plumber())
//     .pipe(changed('../js/' + type + '/project/' + project + '/', {extension: '.js'}))
//     .pipe(uglify({
//       output: {
//         ascii_only: true
//       }
//     }))
//     .pipe(gulp.dest('../js/' + type + '/project/' + project + '/'));
//
//
// });
//
// /* gulp css/less 任务 */
// gulp.task('less', function (project, type) {
//   gulp.src('less/' + type + "/" + project + '/*.less')
//     .pipe(changed('css/' + type + "/" + project, {extension: '.css'}))
//     .pipe(header(banner, {pkg: pkg}))
//     .pipe(less({compress: false})).on('error', function (event) {
//     log(event);
//   })
//     .pipe(autoprefix({
//       browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
//       remove: true
//     }))
//     .pipe(makeUrlVer())
//     // .pipe(makeUrlVer({useDate:true}))
//     .pipe(gulp.dest('css/' + type + "/" + project))
//     .on("end", function () {
//       gulp.src('less/' + type + "/" + project + '/*.less')
//         .pipe(changed('../css/' + type + "/" + project + "/", {extension: '.css'}))
//         .pipe(header(banner, {pkg: pkg}))
//         .pipe(less({compress: true})).on('error', function (event) {
//         log(event);
//       })
//         .pipe(autoprefix({
//           browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
//           remove: true
//         }))
//         .pipe(makeUrlVer())
//         // .pipe(makeUrlVer({useDate:true}))
//         .pipe(gulp.dest('../css/' + type + "/" + project + "/"))
//         .pipe(reload({stream: true}));
//     });
// });
//
// /* images 任务 */
// gulp.task('images', function (project, type) {
//   gulp.src('images/' + type + "/" + project + '/*.{jpg,png,gif,swf}')
//     .pipe(changed('../images/' + type + "/" + project))
//     .pipe(imagemin({
//       progressive: true,
//       optimizationLevel: 7
//     }))
//     .pipe(gulp.dest('../images/' + type + "/" + project));
// });
//
// //jade 2 html
// gulp.task('jade', function (project, type) {
//   gulp.src('jade/' + type + '/' + project + '/*.jade')
//     .pipe(jade({
//       pretty: true,
//       locals: {
//         csslink: "/css/" + type + "/" + project + "/" + project + ".css",
//         imagessrc: "/images/" + type + "/" + project + "/",
//         jssrc: "/js/" + type + "/project/" + project + "/vendor.js"
//       }
//     }))
//     .pipe(plumber({
//       errorHandler: function (err) {
//         log(err)
//       }
//     }))
//     .pipe(gulp.dest('templates/' + type + "/" + project)).on('end', function () {
//     gulp.src('jade/' + type + "/" + project + '/*.jade')
//       .pipe(jade({
//         pretty: true,
//         locals: {
//           csslink: "../../../css/" + type + "/" + project + "/" + project + ".css",
//           imagessrc: "../../../images/" + type + "/" + project + "/",
//           jssrc: "../../../js/" + type + "/project/" + project + "/vendor.js"
//         }
//       }))
//       .pipe(gulp.dest('../templates/' + type + "/" + project))
//   })
// })
//
// /* html/templates 任务 */
// gulp.task('html', function (project, type) {
//   gulp.src('ejs/' + type + "/" + project + '/*.ejs')
//     .pipe(changed('templates/' + type + "/" + project))
//     .pipe(ejs({
//       csslink: "/css/" + type + "/" + project + "/" + project + ".css",
//       imagessrc: "/images/" + type + "/" + project + "/",
//       jssrc: "/js/" + type + "/project/" + project + "/vendor.js",
//       jsPath: "/js/" + type + "/project/" + project + "/",
//       imgComponentsPath: '/components/' + type + '/' + project + '/images/',
//       csslinkb2s: "/css/" + type + "/" + project + "/"
//
//     }))
//     .pipe(gulp.dest('templates/' + type + "/" + project)).on("end", function () {
//     gulp.src('ejs/' + type + "/" + project + '/*.ejs')
//       .pipe(changed('../templates/' + type + "/" + project))
//       .pipe(ejs({
//         csslink: "../../../css/" + type + "/" + project + "/" + project + ".css",
//         imagessrc: "../../../images/" + type + "/" + project + "/",
//         jssrc: "../../../js/" + type + "/project/" + project + "/vendor.js",
//         jsPath: "../../../js/" + type + "/project/" + project + "/",
//         imgComponentsPath: '../../../components/' + type + '/' + project + '/images/',
//         csslinkb2s: "../../../css/" + type + "/" + project + "/"
//       }))
//       .pipe(gulp.dest('../templates/' + type + "/" + project))
//   });
// });
//
// /**
//  *  browser sync
//  *  配置开发环境代理
//  */
// var proxy_e1 = proxy('/mock', {
//   target: 'https://easy-mock.com/mock/5a815b907e05481d41b22ab1/syk_api',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/mock': '/'
//   },
//   logLevel: 'debug'
// });
//
// gulp.task('browser-sync', function () {
//   browserSync({
//     server: {
//       baseDir: '.',
//       directory: true,
//       middleware: [proxy_e1]
//     },
//     open: 'external',
//     startPath: 'templates'
//   });
// });
//
// /* browser reload */
// gulp.task('bs-reload', function () {
//   browserSync.reload();
// });
//
// /* gulp 全部任务执行一次 */
// gulp.task('all', function (project, type) {
//   gulp.run('images', 'less', 'js', 'html');
// });
//
// /* gulp 监控任务 */
// gulp.task('watch', ['default', 'browser-sync'], function (project, type) {
//   try {
//     fs.readFileSync('js/' + type + '/project/' + project + '/vendor.js', "utf-8");
//   } catch (e) {
//     log("you have no vendor.js,I will build_vendor");
//     gulp.run('build_vendor');
//   }
//
//   gulp.watch(['ejs/' + type + "/" + project + '/*.ejs'], ['html', 'bs-reload']);
//   gulp.watch(['jade/' + type + "/" + project + '/*.jade'], ['jade', 'bs-reload']);
//   gulp.watch(['less/' + type + "/" + project + '/*.less'], ['less', 'bs-reload']);
//   gulp.watch(['images/' + type + "/" + project + '/*.{jpg,png,gif,swf}'], ['images', 'bs-reload']);
//   gulp.watch(['js/' + type + '/common/**/*.js', 'js/' + type + '/mod/**/*.js',
//     'js/' + type + '/lib/**/*.js',
//     '!js/' + type + '/project/' + project + '/vendor.js',
//     'js/' + type + '/project/' + project + '/config.js',
//     'js/' + type + '/project/' + project + '/config.json'
//   ], ['build_vendor', 'bs-reload']);
//   gulp.watch(['js/' + type + '/project/' + project + '/**/*.js'], ['js', 'bs-reload']);
//   gulp.watch(['js/' + type + '/project/' + project + '/template/*.html'], ['jst']);
//   gulp.watch(['css/' + type + '/project/' + project + '/*.css'], ['css']);
// });
//
// /* gulp default */
// gulp.task('default', function () {
//   var logo = fs.readFileSync('banner.txt', "utf-8");
//   log(`${chalk.bold.yellow(logo)}`);
//   log(`
//     1、${chalk.bold.cyan('欢迎使用TK GULP前端框架')}
//     2、${chalk.bold.cyan('你可以运行例如： gulp watch --project x --type x 来启动项目')}
//     3、${chalk.bold.cyan('如有问题请参考README文档')}
//   `);
// });

var requireDir = require('require-dir');
requireDir('./tasks');

