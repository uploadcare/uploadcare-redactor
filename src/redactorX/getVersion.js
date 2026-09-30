import {$RX} from '../globals'

export function getVersion() {
  if (typeof $RX !== 'undefined') {
    return 'X' + $RX.version
  }
}
