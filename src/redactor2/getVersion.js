import {$} from '../globals'

export function getVersion() {
  if (typeof $ !== 'undefined' && typeof $.Redactor !== 'undefined') {
    return $.Redactor.VERSION
  }
}
