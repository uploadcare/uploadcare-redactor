import {$R} from '../globals'

export function addPlugin(pluginBody) {
  $R.add('plugin', 'uploadcare', pluginBody)
}
