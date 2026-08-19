// Gulp Compile Pug
const gulp = require('gulp');
const config = require('../config');
const pug = require('gulp-pug');

module.exports = (source, out, pugop = {pretty: true}) => {
  return gulp.src(source)
    .pipe(pug(pugop))
    .pipe(gulp.dest(out))
  ;
}
