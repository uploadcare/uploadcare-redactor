import {readFileSync} from 'node:fs'
import {defineConfig} from 'vite'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

const banner = `/**
 * ${pkg.name} ${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 * Date: ${new Date().toISOString().slice(0, 10)}
 */`

// the source has '$_VERSION' and '$_WIDGET_VERSION' placeholders in strings
function versionPlaceholders() {
  return {
    name: 'version-placeholders',
    transform(code, id) {
      if (!id.includes('/src/')) {
        return null
      }

      return code
        .replaceAll('$_WIDGET_VERSION', pkg.widgetVersion)
        .replaceAll('$_VERSION', pkg.version)
    },
  }
}

// the plugin has no exports, the name only satisfies the iife format;
// strict keeps the ES module semantics the source is written for;
// postBanner goes in after minification, so the minified file keeps it too
const output = {format: 'iife', name: 'uploadcareRedactor', strict: true, postBanner: banner}

export default defineConfig({
  plugins: [versionPlaceholders()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: 'src/uploadcare.js',
    },
    rolldownOptions: {
      output: [
        {...output, entryFileNames: 'uploadcare.redactor.js'},
        {...output, entryFileNames: 'uploadcare.redactor.min.js', minify: true},
      ],
    },
  },
})
