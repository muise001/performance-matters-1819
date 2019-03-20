const gulp = require('gulp');
const rev = require('gulp-rev');
const inputDir = "cache/";
const revReplace = require('gulp-rev-replace');
const manifestFilename = 'rev-manifest.json';

gulp.src(["public/" + '**/*.{css,js}' ])
  .pipe(rev())
  .pipe(gulp.dest(inputDir))
  .pipe(rev.manifest(manifestFilename))
  .pipe(gulp.dest(inputDir));

  gulp.src("views/partials/" + '**/*.ejs')
    .pipe(revReplace({manifest: gulp.src(inputDir + manifestFilename)}))
    .pipe(gulp.dest("views/partials1"));
