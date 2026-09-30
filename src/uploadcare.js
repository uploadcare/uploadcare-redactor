import {adapter} from './adapter'
import {done} from './common/done'
import {show} from './common/show'

if (adapter) {
  adapter.addPlugin({
    init: adapter.init,
    start: adapter.start,
    show: show,
    done: done,
  })
}
else {
  /* eslint-disable no-console */
  console.error('Uploadcare: Redactor not found.')
  /* eslint-enable no-console */
}
