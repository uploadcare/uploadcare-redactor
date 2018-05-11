export default function start() {
  var buttonData = {
    title: this.ucOpts.buttonLabel || 'Uploadcare',
    api: 'plugin.uploadcare.show',
  }

  var button = this.ucOpts.buttonBefore
    ? this.toolbar.addButtonBefore(this.ucOpts.buttonBefore, 'uploadcare', buttonData)
    : this.toolbar.addButton('uploadcare', buttonData)

  if (this.ucOpts.buttonIconEnabled) {
    button.setIcon('<i class="' + (this.ucOpts.buttonIcon ? this.ucOpts.buttonIcon : 're-icon-file') + '"></i>')
  }
}
