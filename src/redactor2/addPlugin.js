import $ from 'jQuery'

function wrap(fn) {
  return function() {
    fn.call(this)
  }
}

export default function addPlugin(pluginBody) {
  $.Redactor.prototype.uploadcare = function() {
    return Object.keys(pluginBody).reduce(function(acc, key) {
      var value = pluginBody[key]

      acc[key] = typeof value === 'function' ? wrap(value) : value

      return acc
    }, {})
  }
}
