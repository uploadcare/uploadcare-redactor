const ghpages = require('gh-pages')

ghpages.publish('./', {src: ['index.html', 'demo/**', 'dist/**']}, err => {
  if (err) {
    console.error(err)
  }
  else {
    console.log('Done')
  }
})
