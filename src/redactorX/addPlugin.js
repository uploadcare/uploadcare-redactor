import {$RX} from '../globals'

export function addPlugin(pluginBody) {
  $RX.add('plugin', 'uploadcare', pluginBody)
}
