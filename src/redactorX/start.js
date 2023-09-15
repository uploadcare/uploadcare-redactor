export default function start() {
  var buttonIcon = this.ucOpts.buttonIcon ? this.ucOpts.buttonIcon : 'rx-icon-file',
    buttonData = {
      title: this.ucOpts.buttonLabel || 'Uploadcare',
      command: 'uploadcare.show',
    };

  if (this.ucOpts.buttonBefore) {
    buttonData.position = { before: this.ucOpts.buttonBefore }
  }

  if (this.ucOpts.buttonIconEnabled) {
    buttonData.icon = (buttonIcon.indexOf('<svg ') === -1) ? '<i class="' + buttonIcon + '"></i>' : buttonIcon;
  }

  this.app.toolbar.add('uploadcare', buttonData)
}
