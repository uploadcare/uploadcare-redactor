import {$} from '../globals'
import {adapter} from '../adapter'

export function done(data) {
  var $this = this
  var files = this.ucOpts.multiple ? data.files() : [data]

  adapter.getSelection.call(this).restore()
  $.when.apply(null, files).done(function() {
    var resolvedFiles = Array.prototype.slice.call(arguments)

    $.each(resolvedFiles, function() {
      if ($.isFunction($this.ucOpts.uploadCompleteCallback)) {
        $this.ucOpts.uploadCompleteCallback.call($this, this)
      }
      else {
        adapter.insertHtml($this, this)
      }
    })
    adapter.broadcast.call($this, 'uploadcareDone', resolvedFiles)
  })
}
