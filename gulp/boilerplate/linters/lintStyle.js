// Gulp Stylelint Task
const gulp = require('gulp');
const config = require('../config');
const gulpStylelint = require('gulp-stylelint');

const styleLint = () => {
  return gulp
    .src(config.paths.scss.source + '**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
  }));
};

module.exports = styleLint;
