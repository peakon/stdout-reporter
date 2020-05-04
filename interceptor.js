'use strict';

const Base = require('mocha/lib/reporters/base');
const intercept = require('intercept-stdout');

module.exports =   {
  wrapReporter(BaseReporter) {
    return class extends BaseReporter {
      constructor(runner) {
        runner.on('test', test => this.start(test));
        runner.on('pass', test => this.end());
        runner.on('fail', test => this.end());
        runner.on('end', () => this.end());

        super(runner);
      }

      start(test) {
        test.stdout = '';
        test.stderr = '';

        this.end();

        this.unhook = intercept(
          txt => {
            test.stdout += txt;
            return '';
          },
          txt => {
            test.stderr += txt;
            return '';
          }
        );
      }

      end() {
        if (this.unhook) {
          this.unhook();
          delete this.unhook;
        }
      }

      epilogue() {
        super.epilogue();

        this.failures.forEach((test, i) => {
          if (!test.stdout && !test.stderr) {
            return;
          }

          console.log(Base.color('error title', '  %s) %s:'), i + 1, test.fullTitle());
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
    };
  }
}
