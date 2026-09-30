import {redactor5} from './redactor5/index'
import {redactorX} from './redactorX/index'
import {redactor3} from './redactor3/index'
import {redactor2} from './redactor2/index'

// version-specific code for the Redactor found on the page, undefined if there is none
export var adapter

if (redactor5.getVersion()) {
  adapter = redactor5
}
else if (redactorX.getVersion()) {
  adapter = redactorX
}
else if (redactor3.getVersion()) {
  adapter = redactor3
}
else if (redactor2.getVersion()) {
  adapter = redactor2
}

