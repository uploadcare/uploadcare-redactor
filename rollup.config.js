import jscc from 'rollup-plugin-jscc'
import license from 'rollup-plugin-license'
import pkg from './package.json'
import uglify from 'rollup-plugin-uglify'
import browsersync from 'rollup-plugin-browsersync'

const isWatching = process.argv.includes('-w') || process.argv.includes('--watch')

const plugins = [
  jscc({values: {_WIDGET_VERSION: pkg.widgetVersion}}),
  license({
    banner: `
      <%= pkg.name %> <%= pkg.version %>
      <%= pkg.description %>
      <%= pkg.homepage %>
      Date: <%= moment().format('YYYY-MM-DD') %>
    `,
  }),
  isWatching && browsersync(),
]

const globals = {
  jQuery: 'window.jQuery',
  Redactor: 'window.Redactor',
}

const external = ['jQuery', 'Redactor']

export default [
  {
    input: 'src/uploadcare.js',
    plugins,
    external,
    output: {
      file: 'dist/uploadcare.redactor.js',
      format: 'iife',
      globals,
    },
  },
  {
    input: 'src/uploadcare.js',
    plugins: [uglify(), ...plugins],
    external,
    output: {
      file: 'dist/uploadcare.redactor.min.js',
      format: 'iife',
      globals,
    },
  },
]
