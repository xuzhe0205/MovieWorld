import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }


  isString(o) { //Whether string
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  }

  isNumber(o) { //Whether number
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  }

  isBoolean(o) { //Whether boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  }

  isFunction(o) { //Whether function
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  }

  isNull(o) { //Whether null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
  }

  isUndefined(o) { //Whether undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
  }

  isObj(o) { //Whether object
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  }

  isArray(o) { //Whether array
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  }

  isDate(o) { //Whether date
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
  }

  isRegExp(o) { //Whether regexp
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
  }

  isError(o) { //Whether error
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
  }

  isSymbol(o) { //Whether symbol object
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
  }

  isPromise(o) { //Whether promise object
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
  }

  isSet(o) { //Whether set object
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
  }

}
