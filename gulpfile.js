const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify");

function scripts() {
  return gulp
    .src("./src/scripts/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts"));
}

function compileStyles() {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream()); // Stream changes to browserSync for CSS injection
}

function optimizeImages() {
  return gulp
    .src("./src/assets/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/assets"));
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./src/styles/**/*.scss", compileStyles);
  gulp.watch("./src/assets/**/*", optimizeImages);
  gulp.watch("./*.html").on("change", browserSync.reload); // Reload on HTML file changes
  gulp.watch("./src/scripts/*.js", scripts);
}

exports.default = gulp.parallel(compileStyles, optimizeImages, scripts);
exports.watch = watchFiles;
