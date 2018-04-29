import loadWidget from '../common/loadWidget'
import normalizeOptions from '../common/normalizeOptions'
import applyIntegrationSetting from '../common/applyIntegrationSetting'

export default function(app) {
  this.app = app
  this.toolbar = app.toolbar
  this.redactorOpts = this.app.opts

  normalizeOptions.call(this)
  loadWidget.call(this)
  applyIntegrationSetting.call(this)
}
