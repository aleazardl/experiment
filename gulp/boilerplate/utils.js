const gulp = require('gulp');
const config = require('./config');
const clean = require('gulp-clean');
const fs = require('fs');

const cleanDist = () => {
  return gulp.src(config.paths.dest, {allowEmpty: true, read: false})
      .pipe(clean())
    ;
};

module.exports = {
  cleanDist
};
