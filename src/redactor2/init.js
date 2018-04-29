import loadWidget from '../common/loadWidget'
import normalizeOptions from '../common/normalizeOptions'
import applyIntegrationSetting from '../common/applyIntegrationSetting'

export default function() {
  this.redactorOpts = this.opts

  normalizeOptions.call(this)
  loadWidget.call(this)
  applyIntegrationSetting.call(this)

  this.uploadcare.start()
}
