import getRedactorVerstion from './redactor$_REDACTOR_TARGET/getVersion'

export default function applyIntegrationSetting() {
  var redactorVersion = getRedactorVerstion()
  var pluginVerion = '$_VERSION'

  this.ucOpts.integration = 'Redactor/{redactorVersion}; Uploadcare-Redactor/{pluginVerion}'
    .replace('{redactorVersion}', redactorVersion)
    .replace('{pluginVerion}', pluginVerion)
}
