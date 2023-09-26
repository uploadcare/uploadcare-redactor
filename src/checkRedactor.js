import * as redactorX from './redactorX/index'
import * as redactor3 from './redactor3/index'
import * as redactor2 from './redactor2/index'

export default function checkRedactor() {
  if (!redactorX.getVersion() && !redactor3.getVersion() && !redactor2.getVersion()) {
    /* eslint-disable no-console */
    console.error('Uploadcare: Redactor not found.')
    /* eslint-enable no-console */

    return false
  }

  return true
}
