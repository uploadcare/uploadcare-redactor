import getRedactorVersion from './getRedactorVersion'
import * as redactor3 from './redactor3/index'
import * as redactor2 from './redactor2/index'

var redactorVersion = getRedactorVersion()
var wrappers = redactorVersion === 3 ? redactor3 : redactor2

export default wrappers
