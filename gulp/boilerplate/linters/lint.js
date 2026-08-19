// Single linter file
const { parallel } = require('gulp');
const lintStyle = require('./lintStyle');
const lintTs = require('./lintTs');

module.exports = parallel(lintStyle, lintTs);
