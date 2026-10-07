import {$} from '../globals'
import {adapter} from '../adapter'

export function done(data) {
  var $this = this
  var files = this.ucOpts.multiple ? data.files() : [data]

  adapter.getSelection.call(this).restore()
  $.when.apply(null, files).done(function() {
    var resolvedFiles = Array.prototype.slice.call(arguments)

    if ($.isFunction($this.ucOpts.uploadCompleteCallback)) {
      $.each(resolvedFiles, function() {
        $this.ucOpts.uploadCompleteCallback.call($this, this)
      })
    }
    else {
      adapter.insertFiles($this, resolvedFiles)
    }
    adapter.broadcast.call($this, 'uploadcareDone', resolvedFiles)
  })
}
