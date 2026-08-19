let config = {}

config.paths = {
  dest: './dist/',

  pug: {
    source: 'src/',
    dest: './dist/',
  },

  scss: {
    source: 'src/css/',
    main: 'main.scss',
    destStatic: 'dist/css/',
    destApp: 'dist/css/'
  },

  ts: {
    sourceAll: 'src/js/',

    common: {
      source: 'common/',
      index:  'index.ts',
      destStatic: 'dist/js/',
      destApp: 'dist/js/',
    },
    top: {
      source: 'top/',
      index:  'index.ts',
      destStatic: 'dist/js/',
      destApp: 'dist/js/',
    },
    lower: {
      source: 'lower/',
      index:  'index.ts',
      destStatic: 'dist/js/',
      destApp: 'dist/js/',
    }
  },

  assets: {
    source: 'public/',
    destStatic: 'dist/public',
    destApp : 'dist/public'
  },

  app: {
    source: 'src/php/'
  }
}

config.browserSync = {
  argsStatic: {
    port: 8000,
    server: {
      baseDir: './dist'
    }
  },
  argsApp: {
    port: 3000,
    proxy: 'localhost:8000/',
    open: true,
  }
}

module.exports = config
