var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var concat = require("gulp-concat");
var minify = require ("gulp-csso");
var rename = require ("gulp-rename");
var webp = require("gulp-webp");
var server = require("browser-sync").create();

gulp.task("style", function() {
  return gulp.src("source/less/**/*.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(concat("style.css"))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("browserSync", function(done) {
  server.init({
    server: {
      baseDir: "./source"
    },
    port: 3000
  });
  done();
});

gulp.task('webp', () =>
    gulp.src('img/**/*.{png,jpg}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('img/webp/'))
);

gulp.task("serve", function() {
  gulp.watch("source/less/**/*.less", gulp.series("style"));
  gulp.watch("source/*.html").on("change", gulp.series(server.reload));
});

var watch = gulp.parallel("serve", "browserSync");

gulp.task("default", watch);

