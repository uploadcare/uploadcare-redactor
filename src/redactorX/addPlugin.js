import $RX from 'RedactorX'

export default function addPlugin(pluginBody) {
  $RX.add('plugin', 'uploadcare', pluginBody)
}
