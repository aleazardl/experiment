const browserSync = require('browser-sync');


const newsync = (options) => {
  return browserSync.create().init(options);
};

const reloadBrowser = (browsersync) => {
  browsersync.reload();
}

module.exports = {
  newsync,
  reloadBrowser
};

