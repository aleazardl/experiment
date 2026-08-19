// Gulp Eslint Task
const gulp = require('gulp');
const config = require('../config');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const scssCompile = (out, smap) => {
  let ret = gulp.src(config.paths.scss.source + config.paths.scss.main);

  if (smap == true) ret = ret.pipe(sourcemaps.init());
  
  ret = ret.pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
  
  if (smap == true) ret = ret.pipe(sourcemaps.write('.'));
  
  ret = ret.pipe(gulp.dest(out));
  
  return ret; 
};


module.exports = scssCompile;

