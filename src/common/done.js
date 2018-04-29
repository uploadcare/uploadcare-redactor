import wrappers from '../wrappers'

export default function done(data) {
  var $this = this
  var files = this.ucOpts.multiple ? data.files() : [data]

  wrappers.selection.restore.call(this)
  $.when.apply(null, files).done(function() {
    var resolvedFiles = Array.prototype.slice.call(arguments)

    $.each(resolvedFiles, function() {
      if ($.isFunction($this.ucOpts.uploadCompleteCallback)) {
        $this.ucOpts.uploadCompleteCallback.call($this, this)
      }
      else {
        wrappers.insertHtml($this, this)
      }
    })
    wrappers.broadcast.call($this, 'uploadcareDone', resolvedFiles)
  })
}
