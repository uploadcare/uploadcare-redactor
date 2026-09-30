import {existsSync} from 'node:fs'
import {playwright} from '@vitest/browser-playwright'
import {defineConfig} from 'vitest/config'

// Redactor 5 is licensed, so its build is not in the repo; its tests run when
// a build is placed here
const redactor5Build = 'test/vendor/redactor5/redactor.min.js'

export default defineConfig({
  define: {
    // the demo project only accepts images; set a key of your own project to
    // also test other files
    __UPLOADCARE_PUBLIC_KEY__: JSON.stringify(process.env.UPLOADCARE_PUBLIC_KEY || ''),
    __REDACTOR5_BUILD__: JSON.stringify(existsSync(redactor5Build) ? '/' + redactor5Build : ''),
  },
  test: {
    include: ['test/**/*.test.js'],
    // the tests upload real files to Uploadcare
    testTimeout: 90_000,
    hookTimeout: 90_000,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      viewport: {width: 1280, height: 900},
      instances: [{browser: 'chromium'}],
    },
  },
})
