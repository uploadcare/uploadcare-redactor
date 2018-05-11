import checkRedactor from './checkRedactor'
import wrappers from './wrappers'
import done from './common/done'
import show from './common/show'

checkRedactor() &&
wrappers.addPlugin({
  init: wrappers.init,
  start: wrappers.start,
  show: show,
  done: done,
})
