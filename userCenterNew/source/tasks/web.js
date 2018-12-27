/*
 * 51Talk 自动化工程管理
 */

/* 基础组件 */
var gulp = require('gulp-param')(require('gulp'), process.argv);
var ejs = require("gulp-ejs");

//css
var header = require('gulp-header');
var less = require("gulp-less");
var autoprefix = require('gulp-autoprefixer');
var makeUrlVer = require('gulp-make-css-url-version');

//images
var imagemin = require('gulp-imagemin');

//js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var transport = require('gulp-seajs-transport');
var babel = require('gulp-babel');

//base
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var proxy = require('http-proxy-middleware');
var reload = browserSync.reload;
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');
var changed = require('gulp-changed');
var fs = require('fs');

/* banner info */
var pkg = require('../package.json');
var banner = ['/*!',
  ' * <%= pkg.homepage %>',
  ' * copyright (c) 2015 <%= pkg.name %>',
  ' */',
  ''].join('\n');

/**
 * 代理配置
 */
var proxy_e1 = proxy('/mock', {
  target: 'http://172.16.0.45:7300/mock/5bfba3b71d2cb328eddca66e/api',
  changeOrigin: true,
  pathRewrite: {
    '^/mock': '/'
  },
  logLevel: 'debug'
});

var log = console.log;

/*css样式压缩*/
gulp.task('css', function (project, type) {
  log("minfiy css....");
  return gulp.src('css/' + type + "/" + project + '/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('../css/' + type + "/" + project + "/"));
});

/*gulp jst任务*/
gulp.task('jst', function (project, type) {
  var jst = require('gulp-jst-extend');
  return gulp.src(['js/' + type + '/project/' + project + '/template/**/*.html'])
    .pipe(jst('tmpl.js', {renameKeys: ['^.*/template/(.*).html$', '$1']}))
    .pipe(gulp.dest('../js/' + type + '/project/' + project + '/'));
});

/*打包vendor.js*/
gulp.task("build_vendor", function (project, type) {
  try {
    var config = fs.readFileSync('js/' + type + '/project/' + project + '/config.json', "utf-8");
  } catch (e) {
    log('没有自定义配置config.json文件，默认打包所有的公用文件。。。');
  }
  var defaultConf = [
    'js/' + type + '/common/*.js',
    'js/' + type + '/project/' + project + '/config.js',
    'js/' + type + '/mod/*.js',
  ];
  defaultConf = config ? JSON.parse(config).define : defaultConf;
  gulp.src(defaultConf)
    .pipe(plumber())
    .pipe(transport())
    .pipe(changed('js/' + type + '/project/' + project + '/vendor.js'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('js/' + type + '/project/' + project + '/'))
    .on("end", function () {

    });
});

/* gulp js 任务 */
gulp.task('js', function (project, type) {
  gulp.src([
    'js/' + type + '/project/' + project + '/**/*.js',
    '!js/' + type + '/project/' + project + '/config.js',
  ])
    .pipe(plumber())
    .pipe(changed('../js/' + type + '/project/' + project + '/', {extension: '.js'}))
    // .pipe(babel({
    //   presets: ['env']
    // }))
    .pipe(uglify({
      output: {
        ascii_only: true
      }
    }))
    .pipe(gulp.dest('../js/' + type + '/project/' + project + '/'));
});

/* gulp css/less 任务 */
gulp.task('less', function (project, type) {
  gulp.src('less/' + type + "/" + project + '/**/*.less')
    .pipe(changed('css/' + type + "/" + project, {extension: '.css'}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(less({compress: false})).on('error', function (event) {
    log(event);
  })
    .pipe(autoprefix({
      browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
      remove: true
    }))
    .pipe(makeUrlVer())
    // .pipe(makeUrlVer({useDate:true}))
    .pipe(gulp.dest('css/' + type + "/" + project)).on("end", function () {
    gulp.src('less/' + type + "/" + project + '/**/*.less')
      .pipe(changed('../css/' + type + "/" + project + "/", {extension: '.css'}))
      .pipe(header(banner, {pkg: pkg}))
      .pipe(less({compress: true})).on('error', function (event) {
      log(event);
    })
      .pipe(autoprefix({
        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
        remove: true
      }))
      .pipe(makeUrlVer())
      // .pipe(makeUrlVer({useDate:true}))
      .pipe(gulp.dest('../css/' + type + "/" + project + "/"))
      .pipe(reload({stream: true}));
  });
});

/* images 任务 */
gulp.task('images', function (project, type) {
  gulp.src('images/' + type + "/" + project + '/**/*.{jpg,png,gif,swf}')
    .pipe(changed('../images/' + type + "/" + project))
    .pipe(imagemin({
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      optimizationLevel: 7  //类型：Number  默认：3  取值范围：0-7（优化等级
    }))
    .pipe(gulp.dest('../images/' + type + "/" + project));
});

//jade 2 html
gulp.task('jade', function (project, type) {
  gulp.src('jade/' + type + '/' + project + '/*/**.jade')
    .pipe(jade({
      pretty: true,
      locals: {
        csslink: "/css/" + type + "/" + project + "/" + project + ".css",
        imagessrc: "/images/" + type + "/" + project + "/",
        jssrc: "/js/" + type + "/project/" + project + "/vendor.js"
      }
    }))
    .pipe(plumber({
      errorHandler: function (err) {
        log(err)
      }
    }))
    .pipe(gulp.dest('templates/' + type + "/" + project)).on('end', function () {
    gulp.src('jade/' + type + "/" + project + '/*.jade')
      .pipe(jade({
        pretty: true,
        locals: {
          csslink: "../../../css/" + type + "/" + project + "/" + project + ".css",
          imagessrc: "../../../images/" + type + "/" + project + "/",
          jssrc: "../../../js/" + type + "/project/" + project + "/vendor.js"
        }
      }))
      .pipe(gulp.dest('../templates/' + type + "/" + project))
  })
})

/* html/templates 任务 */
gulp.task('html', function (project, type) {
  gulp.src(['ejs/' + type + "/" + project + '/**/*.ejs', '!ejs/' + type + "/" + project + '/common/*.ejs'])
    .pipe(changed('templates/' + type + "/" + project))
    .pipe(ejs({
      csslink: "/css/" + type + "/" + project + "/" + project + ".css",
      imagessrc: "/images/" + type + "/" + project + "/",
      jssrc: "/js/" + type + "/project/" + project + "/vendor.js",
      jsPath: "/js/" + type + "/project/" + project + "/",
      imgComponentsPath: '/components/' + type + '/' + project + '/images/',
      cssPath: "/css/" + type + "/" + project + "/",
      csslinkb2s: "/css/" + type + "/" + project + "/"
    }))
    .pipe(gulp.dest('templates/' + type + "/" + project)).on("end", function () {
    gulp.src(['ejs/' + type + "/" + project + '/**/*.ejs', '!ejs/' + type + "/" + project + '/common/*.ejs'])
      .pipe(changed('../templates/' + type + "/" + project))
      .pipe(ejs({
        csslink: "../../../css/" + type + "/" + project + "/" + project + ".css",
        imagessrc: "../../../images/" + type + "/" + project + "/",
        jssrc: "../../../js/" + type + "/project/" + project + "/vendor.js",
        jsPath: "../../../js/" + type + "/project/" + project + "/",
        imgComponentsPath: '../../../components/' + type + '/' + project + '/images/',
        cssPath: "../../../css/" + type + "/" + project + "/",
        csslinkb2s: "../../../css/" + type + "/" + project + "/"
      }))
      .pipe(gulp.dest('../templates/' + type + "/" + project))
  });
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: '.',
      directory: true,
      middleware: [proxy_e1]
    },
    open: 'external',
    startPath: 'templates'
  });
});

/* browser reload */
gulp.task('bs-reload', function () {
  browserSync.reload();
});

/* gulp 监控任务 */
gulp.task('web', ['default', 'build_vendor', 'browser-sync'], function (project, type) {
  gulp.watch(['ejs/' + type + "/" + project + '/**/*.ejs'], ['html', 'bs-reload']);
  gulp.watch(['jade/' + type + "/" + project + '/**/*.jade'], ['jade', 'bs-reload']);
  gulp.watch(['less/' + type + "/" + project + '/**/*.less'], ['less', 'bs-reload']);
  gulp.watch(['images/' + type + "/" + project + '/**/*.{jpg,png,gif,swf}'], ['images', 'bs-reload']);
  gulp.watch([
    '!js/' + type + '/project/' + project + '/vendor.js',
    'js/' + type + '/common/**/*.js',
    'js/' + type + '/mod/**/*.js',
    'js/' + type + '/lib/**/*.js',
    'js/' + type + '/project/' + project + '/config.js',
    'js/' + type + '/project/' + project + '/config.json'
  ], ['build_vendor', 'bs-reload']);
  gulp.watch(['js/' + type + '/project/' + project + '/**/*.js'], ['js', 'bs-reload']);
  gulp.watch(['js/' + type + '/project/' + project + '/template/*.html'], ['jst']);
});
