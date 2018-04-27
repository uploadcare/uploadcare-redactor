export default function loadWidget() {
  if (typeof window.uploadcare === 'undefined') {
    var widgetUrl = 'https://ucarecdn.com/libs/widget/' + this.ucOpts.version + '/uploadcare.min.js'

    $.getScript(widgetUrl)
  }
}
