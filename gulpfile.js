const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");

function compileStyles() {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
}

function optimizeImages() {
  return gulp
    .src("./src/assets/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/assets"));
}

function watchFiles() {
  gulp.watch("./src/styles/**/*.scss", compileStyles);
  gulp.watch("./src/assets/**/*", optimizeImages);
}

exports.default = gulp.parallel(compileStyles, optimizeImages);
exports.watch = watchFiles;
