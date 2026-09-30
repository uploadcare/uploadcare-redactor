import {done} from './done'
import {adapter} from '../adapter'

export function show() {
  var dialog = uploadcare.openDialog({}, this.ucOpts)

  adapter.getSelection.call(this).save()
  adapter.broadcast.call(this, 'uploadcareShow', dialog, this.ucOpts)

  dialog.fail(
    function() {
      adapter.getSelection.call(this).restore()
      adapter.broadcast.call(this, 'uploadcareCancel')
    }.bind(this)
  )

  dialog.done(done.bind(this))
}
