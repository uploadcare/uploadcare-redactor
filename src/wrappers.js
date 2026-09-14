import * as redactor5 from './redactor5/index'
import * as redactorX from './redactorX/index'
import * as redactor3 from './redactor3/index'
import * as redactor2 from './redactor2/index'

var wrappers = redactor5.getVersion() ? redactor5 : (redactorX.getVersion() ? redactorX : (redactor3.getVersion() ? redactor3 : redactor2))

export default wrappers
