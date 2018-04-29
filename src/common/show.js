import done from './done'
import wrappers from '../wrappers'

export default function show() {
  var $this = this
  var dialog = uploadcare.openDialog({}, this.ucOpts)

  wrappers.selection.save.call(this)
  wrappers.broadcast.call(this, 'uploadcareShow', dialog, this.ucOpts)

  dialog.fail(function() {
    wrappers.selection.restore.call($this)
    wrappers.broadcast.apply($this, 'uploadcareCancel', Array.prototype.slice.call(arguments))
  })

  dialog.done(done.bind(this))
}
