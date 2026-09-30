import {$R} from '../globals'

export function getVersion() {
  if (typeof $R !== 'undefined') {
    return $R.version
  }
}
