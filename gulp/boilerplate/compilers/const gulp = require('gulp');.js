const gulp = require('gulp');
const config = require('./gulp/boilerplate/config');
const utils = require('./gulp/boilerplate/utils');

const styleLint = require('./gulp/boilerplate/linters/lintStyle');

const linter = require('./gulp/boilerplate/linters/lint');


const compileScss = require('./gulp/boilerplate/compilers/compileScss');
// exports.scssCompile = (done) => {
//   compileScss(config.paths.scss.destStatic);
//   done();
// };

const compileTs = require('./gulp/boilerplate/compilers/compileTs');
// exports.tsCompile = (done) => {
//   let entry = config.paths.ts.sourceAll + config.paths.ts.common.source + config.paths.ts.common.index;
//   let out= config.paths.ts.common.destStatic + config.paths.ts.common.source;
//   compileTs(entry, out, true);
//   done();
// };
const compilePug = require('./gulp/boilerplate/compilers/compilePug');
// exports.pugCompile = (done) => {
//   compilePug(
//     config.paths.pug.source + '**/*.pug', 
//     config.paths.pug.dest,
//   );
//   done();
// };
const compileAssets = require('./gulp/boilerplate/compilers/compileAssets');


const scssCompile = (done) => {
  compileScss(config.paths.scss.destStatic);
  done();
}

const tsCompile = (done) => {
  compileTs(
    config.paths.ts.sourceAll + config.paths.ts.common.source + config.paths.ts.common.index,
    config.paths.ts.common.destStatic + config.paths.ts.common.source,
    false
  );
  compileTs(
    config.paths.ts.sourceAll + config.paths.ts.top.source + config.paths.ts.top.index,
    config.paths.ts.top.destStatic + config.paths.ts.top.source,
    false
  );
  compileTs(
    config.paths.ts.sourceAll + config.paths.ts.lower.source + config.paths.ts.lower.index,
    config.paths.ts.lower.destStatic + config.paths.ts.lower.source,
    false
  );
  done();
}
const pugCompile = (done) => {
  compilePug(
    config.paths.pug.source + '**/*.pug', 
    config.paths.pug.dest,
  );
  done();
}

const assetsCompile = (done) => {
 compileAssets(config.paths.assets.destStatic);
 done();
}

exports.clean = utils.cleanDist;

const builderStatic = require('./gulp/boilerplate/builders/builderStatic');
exports.buildStatic = builderStatic;
// gulp.task('buildStatic', gulp.series(this.clean, linter, gulp.parallel(scssCompile, tsCompile, pugCompile, assetsCompile)));



// +++++++++++++++++++++++++++++++++++++++++++++++++++


// const gulp = require('gulp');
// const argv = require('yargs').argv;
// const smap = (argv.smap == 'false') ? false : true;

// // Linting
// gulp.task('esLint', function() {
//   const eslint = require('gulp-eslint');
//   return gulp.src(['html/template/default/js/**/*.ts'])
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError())
//   ;
// });
// gulp.task('styleLint', function () {
//   const gulpStylelint = require('gulp-stylelint');    
//   return gulp
//     .src('html/template/default/css/**/*.scss')
//     .pipe(gulpStylelint({
//       reporters: [
//         {formatter: 'string', console: true}
//       ]
//     }));
// });
// gulp.task('linting', gulp.parallel(['esLint', 'styleLint']));


// // JS/TS
// const ts = require('gulp-typescript');
// const browserify = require('browserify');
// var source = require('vinyl-source-stream');
// var tsify = require('tsify');
// var sourcemaps = require('gulp-sourcemaps');
// const terser = require('gulp-terser');
// var buffer = require('vinyl-buffer');
// gulp.task('tsCommon', function () {
//   let ret = browserify({
//     basedir: '.',
//     debug: true,
//     entries: ['html/template/default/js/common/index.ts'],
//     cache: {},
//     packageCache: {},
//   })
//     .plugin(tsify)
//       .transform('babelify', {
//         presets: ['@babel/preset-env'],
//         extensions: ['.ts'],
//       })
//     .bundle()
//     .pipe(source('index.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({ loadMaps: smap }))
//     .pipe(terser());

//     if (smap == true) ret = ret.pipe(sourcemaps.write('./'));

//     ret = ret.pipe(gulp.dest('dist/assets/js/common'));
    
//     return ret;
// });
// gulp.task('tsTop', function () {
//   let ret =  browserify({
//     basedir: '.',
//     debug: true,
//     entries: ['html/template/default/js/top/index.ts'],
//     cache: {},
//     packageCache: {},
//   })
//     .plugin(tsify)
//       .transform('babelify', {
//         presets: ['@babel/preset-env'],
//         extensions: ['.ts'],
//       })
//     .bundle()
//     .pipe(source('index.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({ loadMaps: smap }))
//     .pipe(terser());

//     if (smap == true) ret = ret.pipe(sourcemaps.write('./'));

//     ret = ret.pipe(gulp.dest('dist/assets/js/top'));
    
//     return ret;
// });
// gulp.task('tsLower', function () {
//   let ret =  browserify({
//     basedir: '.',
//     debug: true,
//     entries: ['html/template/default/js/lower/index.ts'],
//     cache: {},
//     packageCache: {},
//   })
//     .plugin(tsify)
//       .transform('babelify', {
//         presets: ['@babel/preset-env'],
//         extensions: ['.ts'],
//       })
//     .bundle()
//     .pipe(source('index.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({ loadMaps: smap }))
//     .pipe(terser());

//     if (smap == true) ret = ret.pipe(sourcemaps.write('./'));

//     ret = ret.pipe(gulp.dest('dist/assets/js/lower'));
    
//     return ret;
// });
// gulp.task('ts', gulp.parallel(['tsCommon', 'tsTop', 'tsLower']));


// // CSS/SCSS
// gulp.task('scssCompile', function () {
//   const sass = require('gulp-sass')(require('sass'));
//   const postcss = require('gulp-postcss');
//   const autoprefixer = require('autoprefixer');
//   return gulp.src('html/template/default/css/main.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(postcss([autoprefixer]))
//     .pipe(gulp.dest('dist/assets/css/'));
// });


// // Public assets
// gulp.task('publicAssets', function() {
//   return gulp.src(['html/template/default/assets/**/*.*'])
//     .pipe(gulp.dest('dist/assets'));
// });


// // PUG/HTML
// const pug = require('gulp-pug');
// gulp.task('pugCompile', function () {
//   return gulp.src('src-static/**/*.pug')
//   .pipe(pug({pretty: true}))
//   .pipe(gulp.dest('dist/'));
// });


// // Default Task
// gulp.task('default', gulp.series(['linting', 'scssCompile', 'ts', 'publicAssets', 'pugCompile']));


// // Watch
// gulp.task('watchCss', function() {
//   gulp.watch('./html/template/default/css/**/*.scss', (done) => {
//     gulp.series(['styleLint', 'scssCompile'])(done);
//   })
// });
// gulp.task('watchJs', function() {
//   gulp.watch('./html/template/default/js/**/*.ts', (done) => {
//     gulp.series(['esLint', 'ts'])(done);
//   })
// });
// gulp.task('watchPug', function() {
//   gulp.watch('./src-static/**/*.pug', (done) => {
//     gulp.series(['pugCompile'])(done);
//   })
// });
// gulp.task('otherAssets', function() {
//   gulp.watch('./html/template/default/assets/**/*.*', (done) => {
//     gulp.series(['publicAssets'])(done);
//   })
// });


// // Static server
// gulp.task('browser-sync', function() {
//   var browserSync = require('browser-sync').create();
//   browserSync.init({
//     port: 8000,
//     server: {
//       baseDir: './dist'
//     }
//   });

//   gulp.task('reloadBrowser', function(done){
//     browserSync.reload();
//     done();
//   });
//   gulp.watch('./html/template/default/css/**/*.scss', (done) => {
//     gulp.series(['scssCompile', 'reloadBrowser'])(done);
//   });
//   gulp.watch('./html/template/default/js/common/**/*.ts', (done) => {
//     gulp.series(['tsCommon', 'reloadBrowser'])(done);
//   });
//   gulp.watch('./html/template/default/js/top/**/*.ts', (done) => {
//     gulp.series(['tsTop', 'reloadBrowser'])(done);
//   });
//   gulp.watch('./html/template/default/js/lower/**/*.ts', (done) => {
//     gulp.series(['tsLower', 'reloadBrowser'])(done);
//   });
//   gulp.watch('./src-static/**/*.pug', (done) => {
//     gulp.series(['pugCompile', 'reloadBrowser'])(done);
//   });
//   gulp.watch('./html/template/default/public/**/*.*', (done) => {
//     gulp.series(['publicAssets', 'reloadBrowser'])(done);
//   });
// });

// // Dev Static
// gulp.task('devStatic', gulp.series('default', 'browser-sync'));



// const config = require('./gulp/boilerplate/config');

// const linter = require('./gulp/boilerplate/linters/lint');
// exports.lint = linter;


// const compileScss = require('./gulp/boilerplate/compilers/compileScss');
// exports.scssCompile = (done) => {
//   compileScss(config.paths.scss.destStatic);
//   done();
// };
// const compileTs = require('./gulp/boilerplate/compilers/compileTs');
// exports.tsCompile = (done) => {
//   let entry = config.paths.ts.sourceAll + config.paths.ts.common.source + config.paths.ts.common.index;
//   let out= config.paths.ts.common.destStatic + config.paths.ts.common.source;
//   compileTs(entry, out, true);
//   done();
// };
// const compilePug = require('./gulp/boilerplate/compilers/compilePug');
// exports.pugCompile = (done) => {
//   compilePug(
//     config.paths.pug.source + '**/*.pug', 
//     config.paths.pug.dest,
//   );
//   done();
// };

// const buildStatic = require('./gulp/boilerplate/builders/builderStatic');
// exports.buildStatic = buildStatic;
