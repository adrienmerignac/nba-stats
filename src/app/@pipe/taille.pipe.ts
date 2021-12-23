import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taille'
})
export class TaillePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return value / 39.37;
  }

}
