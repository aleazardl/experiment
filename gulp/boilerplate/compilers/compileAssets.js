const gulp = require('gulp');
const config = require('../config');

const assetsCompile = (out) => {
  return gulp.src([config.paths.assets.source + '/**/*.*'])
  .pipe(gulp.dest(out));
};

module.exports = assetsCompile;
