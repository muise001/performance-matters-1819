let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify')

gulp.src('cache/css/*.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest("cache/css"))

gulp.src('cache/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest("cache/js"))
