import $R from 'Redactor'
import UploadcarePlugin from './plugin'

// Redactor 5 plugins are classes, so the object-literal body built in uploadcare.js is not used here
export default function addPlugin() {
  $R.addPlugin('uploadcare', UploadcarePlugin)
}
