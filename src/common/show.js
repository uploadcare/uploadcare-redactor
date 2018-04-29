import done from './done'
import wrappers from '../wrappers'

export default function show() {
  var dialog = uploadcare.openDialog({}, this.ucOpts)

  wrappers.getSelection.call(this).save()
  wrappers.broadcast.call(this, 'uploadcareShow', dialog, this.ucOpts)

  dialog.fail(
    function() {
      wrappers.getSelection.call(this).restore
      wrappers.broadcast.apply(this, 'uploadcareCancel', Array.prototype.slice.call(arguments))
    }.bind(this)
  )

  dialog.done(done.bind(this))
}
