import jscc from 'rollup-plugin-jscc'
import license from 'rollup-plugin-license'
import pkg from './package.json'
import uglify from 'rollup-plugin-uglify'

const plugins = [
  jscc({values: {_WIDGET_VERSION: pkg.widgetVersion}}),
  license({
    banner: `
      Uploadcare Redactor 2/3 plugin
      Version: <%= pkg.version %>
    `,
  }),
]

export default [
  {
    input: 'src/uploadcare.js',
    plugins: plugins,
    output: {
      file: 'dist/uploadcare.redactor.js',
      format: 'iife',
    },
  },
  {
    input: 'src/uploadcare.js',
    plugins: [uglify(), ...plugins],
    output: {
      file: 'dist/uploadcare.redactor.min.js',
      format: 'iife',
    },
  },
]
