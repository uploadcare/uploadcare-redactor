export function start() {
  var buttonIcon = this.ucOpts.buttonIcon ? this.ucOpts.buttonIcon : 'rx-icon-file'
  var buttonBar = this.ucOpts.buttonBar ? this.ucOpts.buttonBar : 'toolbar'
  var buttonData = {
    title: this.ucOpts.buttonLabel || 'Uploadcare',
    command: 'uploadcare.show',
  }

  if (this.ucOpts.buttonBefore) {
    buttonData.position = {before: this.ucOpts.buttonBefore}
  }

  // the Redactor X toolbar shows icons only, so a button always gets one
  buttonData.icon = (buttonIcon.indexOf('<svg') === -1) ? '<i class="' + buttonIcon + '"></i>' : buttonIcon

  this.app[buttonBar].add('uploadcare', buttonData)
}
