const gulp = require('gulp');
const revReplace = require('gulp-rev-replace');
const inputDir = "./cache/";
const manifestFilename = 'rev-manifest.json';

gulp.src(["views/partials/" + '**/*.ejs'])
  .pipe(revReplace({manifest: gulp.src(inputDir + manifestFilename)}))
  .pipe(gulp.dest("views/partials1"));
