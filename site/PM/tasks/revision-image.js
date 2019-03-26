const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.src(["public/" + 'img/*' ])
    .pipe(imagemin())
    .pipe(gulp.dest('cache/img'))
