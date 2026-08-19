// Gulp Compile Typescript
const gulp = require('gulp');
const config = require('../config');
const ts = require('gulp-typescript');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const buffer = require('vinyl-buffer');

const tsCmopile = (entry, out, smap) => {
  let ret = browserify({
    basedir: '.',
    debug: true,
    entries: entry,
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['@babel/preset-env'],
      extensions: ['.ts'],
    })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: smap }))
    .pipe(terser());

    if (smap == true) ret = ret.pipe(sourcemaps.write('./'));

    ret = ret.pipe(gulp.dest(out));
    
    return ret;
};

module.exports = tsCmopile;
