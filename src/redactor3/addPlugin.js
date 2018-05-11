import $R from 'Redactor'

export default function addPlugin(pluginBody) {
  $R.add('plugin', 'uploadcare', pluginBody)
}
