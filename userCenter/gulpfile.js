/*
 * 51Talk 自动化工程管理
 */

/* 基础组件 */
var gulp = require('gulp-param')(require('gulp'), process.argv);
var ejs = require("gulp-ejs");
var path = require('path');

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

//base
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');
var changed = require('gulp-changed');
var fs = require('fs');
// var through = require('through2');
// var copy = require('gulp-copy');
var base64 = require('gulp-base64');
// var stripDebug = require('gulp-strip-debug');
// var jslint = require('gulp-jslint');
var babel = require('gulp-babel');
var templatePath = "common";
// var project_b = "",
//   type_b = "",
//   year_b = "";
var watch = require('gulp-watch');
var config = {
  project: "",
  type: "",
  year: ""
}
//var watch = require('gulp-watch');

/* banner info */
var pkg = require('./package.json');
var banner = ['/*!',
  ' * <%= pkg.homepage %>',
  ' * copyright (c) 2017 <%= pkg.name %>',
  ' */',
  ''
].join('\n');

/*gulp jst任务*/
gulp.task('jst', function () {
  var jst = require('gulp-jst-extend2');
  return gulp.src(['source/tpl/' + templatePath + '/**/*.html'])
  //.pipe(changed(type + '/project/' + year + '/' + project + '/source/tpl/' + templatePath + '/', { extension: '.js' }))
    .pipe(jst('index.js', {renameKeys: ['^.*\/tpl\/.*\/(.*).html$', '$1']}))
    .pipe(gulp.dest('source/js/tpl/' + templatePath + "/"))
    .on("end", function () {
      gulp.src('source/js/tpl/' + templatePath + '/*.js')
        .pipe(uglify({
          compress: true
        }))
        .pipe(gulp.dest('js/tpl/' + templatePath + "/"))
        .pipe(reload({stream: true}));
    })
});

/* gulp js 任务 */
gulp.task('js', function () {
  console.log("js building...");
  var project = config.project,
    type = config.type,
    year = config.year;
  return gulp.src([
    'source/js/**/*.js',
    '!' + 'source/js/config.js',
    '!' + 'source/js/tpl/*/*.js'
  ])
  //.pipe(stripDebug())
  /*.pipe(jslint())
    .pipe(jslint.reporter('default'))
          .pipe(jslint.reporter('stylish'))*/
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(plumber())
    .pipe(changed('js/', {extension: '.js'}))
    .pipe(uglify({
      output: {
        ascii_only: true
      }
    }))
    .pipe(gulp.dest('js/'));
});

/* gulp css/less 任务 */
gulp.task('less', function () {
  console.log("css compress....");
  var project = config.project,
    type = config.type,
    year = config.year;
  return gulp.src([
    'source/less/' + templatePath + '/index*.less'])
    .pipe(changed('source/css/' + templatePath + '/', {extension: '.css'}))

    .pipe(header(banner, {pkg: pkg}))
    .pipe(less({compress: false})).on('error', function (event) {
      console.log(event);
    })
    .pipe(autoprefix({
      browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
      remove: true
    }))
    .pipe(makeUrlVer())
    .pipe(base64({
      baseDir: 'source/css/' + templatePath + '/',
      extensions: ['svg', 'gif', 'png', 'jpg', /\.jpg#datauri$/i],
      exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
      maxImageSize: 20 * 1024, // bytes
      debug: false
    }))
    .pipe(gulp.dest('source/css/' + templatePath + "/")
      .on("end", function () {
        gulp.src([
          'source/less/' + templatePath + '/index*.less'
        ])
          .pipe(changed('css/', {extension: '.css'}))
          .pipe(header(banner, {pkg: pkg}))
          .pipe(less({compress: true})).on('error', function (event) {
          console.log(event);
        })
          .pipe(autoprefix({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            remove: true
          }))
          .pipe(makeUrlVer())
          .pipe(base64({
            baseDir: 'css/' + templatePath + "/",
            extensions: ['svg', 'gif', 'png', 'jpg', /\.jpg#datauri$/i],
            exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 20 * 1024, // bytes
            debug: false
          }))
          .pipe(gulp.dest('css/' + templatePath + "/"))
          .pipe(reload({stream: true}));
      }));
});

/* images 任务 */
gulp.task('images', function () {
  return gulp.src('source/images/**/*.{jpg,png,gif,swf}')
    .pipe(changed('images'))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest('images'))
    .pipe(reload({stream: true}));
});

//jade 2 html
gulp.task('jade', function () {
  var project = config.project,
    type = config.type,
    year = config.year;
  return gulp.src('source/**/*.jade')
    .pipe(changed('template', {extension: '.html'}))
    .pipe(jade({
      pretty: true,
      locals: {
        csslink: "source/css/" + project + ".css",
        imagessrc: "images/",
        jssrc: "source/js/vendor.js",
        cssPath: "css/",
        jsPath: "js/"
      }
    }))
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err)
      }
    }))
    .pipe(gulp.dest('template'));
})

/* html/templates 任务 */
gulp.task('html', function () {
  var project = config.project,
    type = config.type,
    year = config.year;
  console.log("ejs build html...");
  return gulp.src(['source/ejs/' + templatePath + '/*.ejs', "!" + '/source/ejs/common/*.ejs'])
    .pipe(changed('template/' + templatePath))
    .pipe(ejs({
      csslink: "../css/" + project + ".css",
      imagessrc: "../images/",
      imagessrc2: "../../images/",
      jssrc: "../js/vendor.js",
      jsSource: "../source/js/vendor.js",
      jsSource2: "../../source/js/vendor.js",
      cssPath: "../css/",
      cssPath2: "../../css/",
      jsPath: "../js/",
      jsPath2: "../../js/"
    }, {}, {ext: '.html'}))
    .pipe(gulp.dest('template/' + templatePath))
    .pipe(reload({stream: true}));
});

/* browser sync */
gulp.task('browser-sync', function () {
  // var year = new Date().getFullYear();
  // if (!project_b) {
  //   var path = type_b + "/project/" + year;
  // } else {
  //   var path = type_b + '/project/' + year_b + '/' + project_b + '/template';
  // }

  browserSync({
    server: {
      baseDir: '.',
      directory: true
    },
    open: 'external',
    startPath: '/template'
    // startPath: path
  });
});

/* browser reload */
gulp.task('bs-reload', function () {
  console.log("bs-reload.....");
  //browserSync.reload();
});

/*打包vendor.js*/
gulp.task("build_vendor", function () {
  console.log("build_vendor.....");
  try {
    var config = fs.readFileSync('source/js/config_vendor.json', "utf-8");
    console.log("read file....");
  } catch (e) {
    console.log('you haven no define config.json，default build all pack...');
  }

  if (config) {
    config = JSON.parse(config).define;
  } else {

  }

  return gulp.src(config)
    .pipe(plumber())
    .pipe(transport())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('source/js/'))
    .on("end", function () {
      gulp.src('source/js/vendor.js')
        .pipe(uglify({
          output: {
            ascii_only: true
          },
          ie8: true
        }))
        .pipe(gulp.dest('js/'))
    });
});

/* gulp 监控任务 */
gulp.task('watch', function (project, type, year) {
  // if (!year) {
  //   year = new Date().getFullYear();
  // }
  // project_b = project, type_b = type, year_b = year;
  // config.project = project;
  // config.type = type;
  // config.year = year;

  gulp.run("browser-sync");

  watch(['source/tpl/**/*.html'], function (vinyl) {
    // var tempPath = vinyl.path.split(path.delimiter)[0].split("tpl\\")[1].split("\\")[0];
    // 获取监控的文件的父目录 path.sep 平台兼容
    templatePath = vinyl.path.split(path.delimiter)[0].split("tpl"+ path.sep)[1].split(path.sep)[0];
    gulp.run("jst");
  });

  watch(['source/images/**/*.{jpg,png,gif,swf}'], function () {
    gulp.run("images");
  }).on('unlink', function(file){
    var distFile = path.relative('./source', file); //计算相对路径
    fs.existsSync(distFile) && fs.unlink(distFile, function (err) {
      console.log('文件删除失败--->', err);
    });
  });

  gulp.watch([
    'common/**/*.js',
    'source/js/config.js',
    'source/js/config_vendor.json'
  ], ['build_vendor', 'bs-reload']).on("change", reload);

  watch(['source/ejs/**/*.ejs'], function (vinyl) {
    // var tempPath = vinyl.path.split(path.delimiter)[0].split("\\");
    var tempPath = vinyl.path.split(path.delimiter)[0].split(path.sep);
    var lg = tempPath.length;
    templatePath = tempPath[lg - 2];
    gulp.run("html");
  });
  watch(['source/less/**/*.less'], function (vinyl) {
    // var tempPath = vinyl.path.split(path.delimiter)[0].split("\\");
    var tempPath = vinyl.path.split(path.delimiter)[0].split(path.sep);
    var lg = tempPath.length;
    templatePath = tempPath[lg - 2];
    gulp.run("less");
  });
  gulp.watch(['source/jade/**/*.jade'], ['jade', 'bs-reload']).on("change", reload);
  gulp.watch(['source/js/**/*.js',
    "!" + 'source/js/config.js',
    "!" + 'source/js/vendor.js',
    "!" + 'source/js/tpl/**/*.js'
  ], ['js', 'bs-reload']).on("change", reload);
});

/* gulp default */
gulp.task('default', function () {
  console.log("Wecome to project for Study Report");
  console.log("You can run gulp watch --project PROJECT_NAME to start project");
});
