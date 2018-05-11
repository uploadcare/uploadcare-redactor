import loadWidget from '../common/loadWidget'
import normalizeOptions from '../common/normalizeOptions'
import applyIntegrationOption from '../common/applyIntegrationOption'
import start from './start'

export default function() {
  this.redactorOpts = this.opts

  normalizeOptions.call(this)
  loadWidget.call(this)
  applyIntegrationOption.call(this)

  start.call(this)
}
