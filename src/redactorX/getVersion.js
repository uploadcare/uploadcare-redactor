import $RX from 'RedactorX'

export default function getVersion() {
  if (typeof $RX !== 'undefined') {
    return 'X' + $RX.version
  }
}
