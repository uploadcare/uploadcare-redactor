export default function loadWidget(version) {
  if (typeof window.uploadcare !== 'undefined' || document.querySelector('script[data-uploadcare-widget]')) {
    return
  }

  // Redactor 5 does not use jQuery, so load the widget build that bundles its own copy
  var script = document.createElement('script')

  script.src = 'https://ucarecdn.com/libs/widget/' + version + '/uploadcare.full.min.js'
  script.setAttribute('data-uploadcare-widget', '')
  document.head.appendChild(script)
}
