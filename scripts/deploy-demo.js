const ghpages = require('gh-pages')

ghpages.publish('./', {src: ['index.html', 'demo/**', 'dist/**']}, err => {
  if (err) {
    console.error(err)
    process.exitCode = 1
  }
  else {
    console.log('Done')
  }
})
