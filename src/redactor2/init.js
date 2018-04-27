import loadWidget from '../loadWidget'
import parseOptions from '../parseOptions'
import applyIntegrationSetting from '../applyIntegrationSetting'

export default function() {
  this.redactorOpts = this.opts

  parseOptions.call(this)
  loadWidget.call(this)
  applyIntegrationSetting.call(this)

  this.uploadcare.start()
}
