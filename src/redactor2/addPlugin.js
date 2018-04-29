export default function addPlugin(pluginBody) {
  $.Redactor.prototype.uploadcare = function() {
    return pluginBody
  }
}
