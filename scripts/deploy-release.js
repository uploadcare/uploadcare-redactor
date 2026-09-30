const ghpages = require('gh-pages')

ghpages.publish(
  './dist/',
  {
    branch: 'release',
    message: 'Release ' + require('../package.json').version,
  },
  err => {
    if (err) {
      console.error(err)
      process.exitCode = 1
    }
    else {
      console.log('Done')
    }
  }
)
