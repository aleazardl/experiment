const { series, parallel, task, watch } = require('gulp');
const config = require('../config');
const utils = require('../utils');
const lint = require('../linters/lint');
const argv = require('yargs').argv;
const smap = (argv.smap == 'false') ? false : true;


// Static SCSS
const compileScss = require('../compilers/compileScss');
task('scssCompile', () =>  {
  return compileScss(config.paths.scss.destStatic, smap);
});


// Static TS
const compileTs = require('../compilers/compileTs');
task('tsCompileCommon', ()=> {
  return compileTs(
    config.paths.ts.sourceAll + config.paths.ts.common.source + config.paths.ts.common.index,
    config.paths.ts.common.destStatic + config.paths.ts.common.source,
    smap
  );
});
task('tsCompileTop', ()=> {
  return compileTs(
    config.paths.ts.sourceAll + config.paths.ts.top.source + config.paths.ts.top.index,
    config.paths.ts.top.destStatic + config.paths.ts.top.source,
    smap
  );
});
task('tsCompileLower', ()=> {
  return compileTs(
    config.paths.ts.sourceAll + config.paths.ts.lower.source + config.paths.ts.lower.index,
    config.paths.ts.lower.destStatic + config.paths.ts.lower.source,
    smap
  );
});


// Pug files
const compilePug = require('../compilers/compilePug');
task('pugCompile', () =>  {
  return compilePug(
    config.paths.pug.source + '/*.pug', 
    config.paths.pug.dest,
  );
});


// Asset files
const compileAssets = require('../compilers/compileAssets');
task('assetsCompile', () => {
  return compileAssets(config.paths.assets.destStatic);
});


// Builder Task
const buildStatic = series(
  utils.cleanDist,
  lint,
  'scssCompile',
  parallel(['tsCompileCommon', 'tsCompileTop', 'tsCompileLower']),
  'pugCompile',
  'assetsCompile'
);

// Watcher task
const watcherStatic = () => {
  const browserSync = require('browser-sync').create();
  browserSync.init(config.browserSync.argsStatic);

  task('reloadBrowser', function(done){
    browserSync.reload();
    done();
  });

  watch(config.paths.scss.source + '**/*.scss', series(['scssCompile', 'reloadBrowser']));
  watch(config.paths.ts.sourceAll + config.paths.ts.common.source + '**/*.ts', series(['tsCompileCommon', 'reloadBrowser']));
  watch(config.paths.ts.sourceAll + config.paths.ts.top.source + '**/*.ts', series(['tsCompileTop', 'reloadBrowser']));
  watch(config.paths.ts.sourceAll + config.paths.ts.lower.source + '**/*.ts', series(['tsCompileLower', 'reloadBrowser']));
  watch(config.paths.pug.source + '**/*.*', series(['pugCompile', 'reloadBrowser']));
  watch(config.paths.assets.source + '**/*.*', series(['assetsCompile', 'reloadBrowser']));
};

module.exports = {
  buildStatic,
  watcherStatic
};
