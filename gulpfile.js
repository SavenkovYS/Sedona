var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var concat = require("gulp-concat");
var minify = require ("gulp-csso");
var rename = require ("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("style", function() {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
   return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
        imagemin.optipng({optimizationlevel: 3}),
        imagemin.mozjpeg({progressive: true}),
        imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task('webp', () =>
    gulp.src('source/img/**/*.{png,jpg}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('build/img'))
);

gulp.task("sprite", function () {
    return gulp.src("source/img/icon-*.svg")
      .pipe(svgstore({
        inlineSvg: true
    }))
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
      .pipe(posthtml([
        include()
    ]))
      .pipe(gulp.dest("build"));
});


gulp.task("copy", function() {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/css/normalize.css"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("html:copy", function() {
   return gulp.src("source/*.html")
     .pipe(gulp.dest("build"));
});

gulp.task("js:copy", function() {
  return gulp.src("source/**/*.js")
    .pipe(gulp.dest("build/js"));
});


gulp.task("clean", function () {
  return del("build");
});

gulp.task("browserSync", function(done) {
  server.init({
    server: {
      baseDir: "build/"
    },
    port: 3000
  });
  done();
});

gulp.task("serve", function() {
  gulp.watch("source/less/**/*.less", gulp.series("style"));
  gulp.watch("source/*.html").on("change", gulp.series("html:copy", server.reload));
  gulp.watch("source/**/*.js").on("change", gulp.series("js:copy", server.reload));
});


var build = gulp.series("clean", "copy", "style", "webp", "images", "sprite", "html");

var watch = gulp.parallel("serve", "browserSync");

gulp.task("build", build);

gulp.task("default", watch);
