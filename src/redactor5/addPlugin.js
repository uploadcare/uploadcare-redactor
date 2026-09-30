import {$R} from '../globals'
import {UploadcarePlugin} from './plugin'

// Redactor 5 plugins are classes, so the object-literal body from uploadcare.js is unused here
export function addPlugin() {
  $R.addPlugin('uploadcare', UploadcarePlugin)
}
