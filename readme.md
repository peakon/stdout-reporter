# stdout-reporter

This adds a Mocha reporter based on the default spec reporter, that captures stdout and stderr during test execution, and outputs them only for test failures at the end of the run.

The code reuses as much as possible from the default reporter to avoid duplication.

## Usage

Install:

`npm install stdout-reporter`

Use as the reporter:

`mocha --reporter stdout-reporter`
