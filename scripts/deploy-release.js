const ghpages = require('gh-pages')

ghpages.publish(
  './dist/',
  {
    branch: 'release',
    message: 'Release ' + process.env.npm_package_version,
  },
  err => {
    if (err) {
      console.error(err)
    }
    else {
      console.log('Done')
    }
  }
)
