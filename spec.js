'use strict';

const Spec = require('mocha/lib/reporters/spec');
const interceptor = require('./interceptor');

module.exports = interceptor.wrapReporter(Spec);
