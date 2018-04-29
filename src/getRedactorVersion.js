import getRedactor2Version from './redactor2/getVersion'
import getRedactor3Version from './redactor3/getVersion'

export default function getRedactorVersion() {
  if (getRedactor3Version()) {
    return 3
  }

  if (getRedactor2Version()) {
    return 2
  }
}
