// Gulp Eslint Task
const gulp = require('gulp');
const config = require('../config');
const eslint = require('gulp-eslint');

const esLint = () => {
  return gulp.src([config.paths.ts.sourceAll + '**/*.ts'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  ;
}

module.exports = esLint;
