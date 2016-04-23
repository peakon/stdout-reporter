'use strict';

const Base = require('mocha/lib/reporters/base');
const Spec = require('mocha/lib/reporters/spec');
const intercept = require('intercept-stdout');

class StdoutReporter extends Spec {

  constructor(runner) {
    runner.on('test', test => {
      test.stdout = '';
      test.stderr = '';

      this.unhook = intercept(txt => {
        test.stdout += txt;
        return '';
      }, txt => {
        test.stderr += txt;
        return '';
      });
    });

    runner.on('pass', () => this.unhook());
    runner.on('fail', () => this.unhook());

    super(runner);
  }

  epilogue() {
    super.epilogue();

    this.failures.forEach((test, i) => {
      if (!test.stdout.length && !test.stderr.length) {
        return;
      }

      console.log(Base.color('error title', '  %s) %s:'), (i + 1), test.fullTitle());
      if (test.stderr.length) {
        const stderr = test.stderr.replace(/^/gm, '      ');
        console.log(Base.color('error message', '     %s\n%s'), 'Standard error:', stderr);
      }
      if (test.stdout.length) {
        const stdout = test.stdout.replace(/^/gm, '      ');
        console.log(Base.color('medium', '     %s\n%s'), 'Standard output:', stdout);
      }
    });
  }
}

module.exports = StdoutReporter;
