import $R from 'Redactor'
import getFileUrl from '../common/getFileUrl'
import loadWidget from './loadWidget'

var ICON = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M11.3 3.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1-1.4 1.4L13 6.4V16a1 1 0 1 1-2 0V6.4L7.7 9.7a1 1 0 0 1-1.4-1.4l5-5zM4 16a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a1 1 0 1 1 2 0v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1z"/>' +
  '</svg>'

// 1. Redactor 5 calls this once per editor, passing the `uploadcare: {...}` options
function UploadcarePlugin(app, options) {
  this.app = app
  this.ucOpts = Object.assign({}, options)

  if (!this.ucOpts.crop) {
    this.ucOpts.crop = ''
  }
  if (!this.ucOpts.version) {
    this.ucOpts.version = '$_WIDGET_VERSION'
  }

  this.ucOpts.integration = 'Redactor/' + $R.version + '; Uploadcare-Redactor/$_VERSION'
}

// 2. Called when the editor UI is ready: loading the widget and adding the toolbar button
UploadcarePlugin.prototype.start = function() {
  loadWidget(this.ucOpts.version)

  var buttonIcon = this.ucOpts.buttonIcon || ICON
  var button = {
    title: this.ucOpts.buttonLabel || 'Uploadcare',
    // the Redactor 5 toolbar shows icons only, so a button always gets one
    icon: buttonIcon.indexOf('<svg') === -1 ? '<i class="' + buttonIcon + '"></i>' : buttonIcon,
    command: 'uploadcare.show',
  }

  if (this.ucOpts.buttonBefore) {
    button.position = {before: this.ucOpts.buttonBefore}
  }

  this.app[this.ucOpts.buttonBar || 'toolbar'].add('uploadcare', button)
}

// 3. Button clicked: remembering the cursor, open the popup, insert results when done
UploadcarePlugin.prototype.show = function() {
  var plugin = this

  if (typeof window.uploadcare === 'undefined') {
    /* eslint-disable no-console */
    console.warn('Uploadcare: widget is not loaded yet.')
    /* eslint-enable no-console */

    return
  }

  var selection = this.app.getService('selection')
  var saved = selection.saveSelection()
  var dialog = window.uploadcare.openDialog(null, this.ucOpts)

  this.app.emit('uploadcare:show', {dialog: dialog, options: this.ucOpts})

  dialog.fail(function() {
    selection.restoreSelection(saved)
    plugin.app.emit('uploadcare:cancel')
  })

  dialog.done(function(result) {
    var files = plugin.ucOpts.multiple ? result.files() : [result]

    Promise.all(files.map(toPromise)).then(function(fileInfos) {
      selection.restoreSelection(saved)

      fileInfos.forEach(function(fileInfo) {
        if (typeof plugin.ucOpts.uploadCompleteCallback === 'function') {
          plugin.ucOpts.uploadCompleteCallback.call(plugin, fileInfo)
        }
        else {
          plugin.insert(fileInfo)
        }
      })

      plugin.app.emit('uploadcare:done', {files: fileInfos})
    })
  })
}

// 4. Images become an image block; other files become a link
UploadcarePlugin.prototype.insert = function(fileInfo) {
  var fileUrl = getFileUrl(fileInfo)

  if (fileInfo.isImage) {
    this.app.image.insert({src: fileUrl, alt: fileInfo.name}, 'upload')
  }
  else {
    // building the link with the DOM so a file name cannot inject markup
    var link = document.createElement('a')

    link.href = fileUrl
    link.setAttribute('data-file', fileInfo.uuid)
    link.textContent = fileInfo.name

    this.app.getService('inserter').insertHtml(link.outerHTML)
  }
}

// the widget returns jQuery-style deferreds; turn each file into a native Promise
function toPromise(file) {
  return new Promise(function(resolve, reject) {
    file.done(resolve).fail(reject)
  })
}

export default UploadcarePlugin
