import $R from 'Redactor'

export default function getVersion() {
  // Redactor 3 also exposes window.Redactor with a version, so detect 5 by its plugin API
  if (typeof $R === 'function' && typeof $R.addPlugin === 'function') {
    return $R.version
  }
}
