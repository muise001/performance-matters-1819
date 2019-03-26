const gulp = require('gulp');
const rev = require('gulp-rev');
const inputDir = "./cache/";
const manifestFilename = 'rev-manifest.json';

gulp.src(["public/" + '**/*.{css,js}' ])
  .pipe(rev())
  .pipe(gulp.dest(inputDir))
  .pipe(rev.manifest(manifestFilename))
  .pipe(gulp.dest(inputDir));
