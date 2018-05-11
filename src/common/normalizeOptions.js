import $ from 'jQuery'

export default function normalizeOptions() {
  this.ucOpts = $.extend({}, this.redactorOpts.uploadcare)

  // defaults
  if (!this.ucOpts.crop) {
    this.ucOpts.crop = ''
  }
  if (!this.ucOpts.version) {
    this.ucOpts.version = '$_WIDGET_VERSION'
  }

  // Use imageTag from redactor config
  if (this.redactorOpts.imageTag) {
    this.ucOpts.imageTag = this.redactorOpts.imageTag
  }
}
