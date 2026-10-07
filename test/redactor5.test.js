import {describe, test} from 'vitest'
import {PLUGIN} from './helpers'
import {redactor5} from './adapters'
import {defineSuite} from './suite'

// __REDACTOR5_BUILD__ is the build path when test/vendor/redactor5/redactor.min.js
// exists, see vitest.config.mjs
if (__REDACTOR5_BUILD__) {
  defineSuite({
    ...redactor5,
    styles: [__REDACTOR5_BUILD__.replace(/\.js$/, '.css')],
    scripts: [__REDACTOR5_BUILD__, PLUGIN],
  })
}
else {
  describe('Redactor 5', () => {
    test.skip('needs a licensed build at test/vendor/redactor5/redactor.min.js and redactor.min.css', () => {})
  })
}
