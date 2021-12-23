import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poids'
})
export class PoidsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return value / 2.2046;
  }

}
