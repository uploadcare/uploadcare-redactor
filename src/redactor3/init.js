import loadWidget from '../loadWidget'
import parseOptions from '../parseOptions'
import applyIntegrationSetting from '../applyIntegrationSetting'

export default function(app) {
  this.app = app
  this.toolbar = app.toolbar
  this.redactorOpts = this.app.opts

  parseOptions.call(this)
  loadWidget.call(this)
  applyIntegrationSetting.call(this)
}
