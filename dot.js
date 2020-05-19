'use strict';

const Dot = require('mocha/lib/reporters/dot');
const interceptor = require('./interceptor');

module.exports = interceptor.wrapReporter(Dot);
