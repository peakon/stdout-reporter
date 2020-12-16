# @peakon/stdout-reporter
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpeakon%2Fstdout-reporter.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpeakon%2Fstdout-reporter?ref=badge_shield)


This adds a Mocha reporter based on the default spec reporter, that captures stdout and stderr during test execution, and outputs them only for test failures at the end of the run.

The code reuses as much as possible from the default reporter to avoid duplication.

## Usage

Install:

`npm install @peakon/stdout-reporter`

Use as the reporter:

`mocha --reporter @peakon/stdout-reporter`


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpeakon%2Fstdout-reporter.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpeakon%2Fstdout-reporter?ref=badge_large)