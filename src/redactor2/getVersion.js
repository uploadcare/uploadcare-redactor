import {$} from '../globals'

export function getVersion() {
  if (typeof $.Redactor !== 'undefined') {
    return $.Redactor.VERSION
  }
}
