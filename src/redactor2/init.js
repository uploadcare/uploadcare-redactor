import loadWidget from '../common/loadWidget'
import normalizeOptions from '../common/normalizeOptions'
import applyIntegrationOption from '../common/applyIntegrationOption'

export default function() {
  this.redactorOpts = this.opts

  normalizeOptions.call(this)
  loadWidget.call(this)
  applyIntegrationOption.call(this)

  this.uploadcare.start()
}
