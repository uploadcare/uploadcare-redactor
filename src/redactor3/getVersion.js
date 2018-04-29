import $R from 'Redactor'

export default function getVersion() {
  if (typeof $R !== 'undefined') {
    return $R.version
  }
}
