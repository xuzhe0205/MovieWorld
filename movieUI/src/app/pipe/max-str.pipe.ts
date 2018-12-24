import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxStr'
})
export class MaxStrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return ''
    }


    if (value.length < 10) {
      return value
    } else {
      try {
        return `${value.substring(0, 10)} ...`
      } catch (error) {
        return value
      }
    }
  }

}
