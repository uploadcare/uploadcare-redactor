import {loadWidget} from '../common/loadWidget'
import {normalizeOptions} from '../common/normalizeOptions'
import {applyIntegrationOption} from '../common/applyIntegrationOption'

export function init(app) {
  this.app = app
  this.toolbar = app.toolbar
  this.redactorOpts = this.app.opts

  normalizeOptions.call(this)
  loadWidget.call(this)
  applyIntegrationOption.call(this)
}
