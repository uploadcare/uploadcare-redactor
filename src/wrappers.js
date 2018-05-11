import * as redactor3 from './redactor3/index'
import * as redactor2 from './redactor2/index'

var wrappers = redactor3.getVersion() ? redactor3 : redactor2

export default wrappers
