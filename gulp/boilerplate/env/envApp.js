const { series, parallel, task, watch, src, dest } = require('gulp');
const config = require('../config');
const utils = require('../utils');
const lint = require('../linters/lint');
const argv = require('yargs').argv;
const smap = (argv.smap == 'false') ? false : true;


// Static SCSS
const compileScss = require('../compilers/compileScss');
task('scssCompileApp', () =>  {
  return compileScss(config.paths.scss.destApp, smap);
});


// Static TS
const compileTs = require('../compilers/compileTs');
task('tsCompileCommonApp', ()=> {
  return compileTs(
    config.paths.ts.sourceAll + config.paths.ts.common.source + config.paths.ts.common.index,
    config.paths.ts.common.destApp + config.paths.ts.common.source,
    smap
  );
});
task('tsCompileTopApp', ()=> {
  return compileTs(
    config.paths.ts.sourceAll + config.paths.ts.top.source + config.paths.ts.top.index,
    config.paths.ts.top.destApp + config.paths.ts.top.source,
    smap
  );
});
task('tsCompileLowerApp', ()=> {
  return compileTs(
    config.paths.ts.sourceAll + config.paths.ts.lower.source + config.paths.ts.lower.index,
    config.paths.ts.lower.destApp + config.paths.ts.lower.source,
    smap
  );
});

// Asset files
const compileAssets = require('../compilers/compileAssets');
task('assetsCompileApp', () => {
  return compileAssets(config.paths.assets.destApp);
});

// App Compile
task('appCompile', () => {
  return src([config.paths.app.source + '**/*.*'])
    .pipe(dest(config.paths.dest))
  ;
});

// Builder Task
const buildApp = series(
  utils.cleanDist,
  lint,
  'scssCompileApp',
  parallel(['tsCompileCommonApp', 'tsCompileTopApp', 'tsCompileLowerApp']),
  'assetsCompileApp',
  'appCompile'
);

// Watcher task
const watcherApp = () => {
  const browserSyncApp = require('browser-sync').create();
  browserSyncApp.init(config.browserSync.argsApp);

  task('reloadBrowserApp', function(done){
    browserSyncApp.reload();
    done();
  });

  watch(config.paths.scss.source + '**/*.scss', series(['scssCompileApp', 'reloadBrowserApp']));
  watch(config.paths.ts.sourceAll + config.paths.ts.common.source + '**/*.ts', series(['tsCompileCommonApp', 'reloadBrowserApp']));
  watch(config.paths.ts.sourceAll + config.paths.ts.top.source + '**/*.ts', series(['tsCompileTopApp', 'reloadBrowserApp']));
  watch(config.paths.ts.sourceAll + config.paths.ts.lower.source + '**/*.ts', series(['tsCompileLowerApp', 'reloadBrowserApp']));
  watch(config.paths.assets.source + '**/*.*', series(['assetsCompileApp','reloadBrowserApp']));
  watch(config.paths.app.source + '**/*.*', series(['appCompile', 'reloadBrowserApp']));
};

module.exports = {
  buildApp,
  watcherApp
};
