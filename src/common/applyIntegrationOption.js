import getRedactor3Version from '../redactor3/getVersion'
import getRedactor2Version from '../redactor2/getVersion'

export default function applyIntegrationOption() {
  var redactorVersion = getRedactor3Version() || getRedactor2Version()
  var pluginVerion = '$_VERSION'

  this.ucOpts.integration = 'Redactor/{redactorVersion}; Uploadcare-Redactor/{pluginVerion}'
    .replace('{redactorVersion}', redactorVersion)
    .replace('{pluginVerion}', pluginVerion)
}
