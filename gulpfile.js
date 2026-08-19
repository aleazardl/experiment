const { series } = require('gulp');

// Utils
const lint = require('./gulp/boilerplate/linters/lint');
exports.lint = lint;

// Static env
const { buildStatic, watcherStatic } = require('./gulp/boilerplate/env/envStatic');
exports.build = buildStatic;
exports.dev = series(buildStatic, watcherStatic);

const { buildApp, watcherApp } = require('./gulp/boilerplate/env/envApp');
exports.buildApp = buildApp;
exports.devApp = watcherApp;
