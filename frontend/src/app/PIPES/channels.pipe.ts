import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'channels'
})
export class ChannelsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const separated = value.split(' ');
    const word = separated.map((name) => name[0]).join('');
    return word;
  }

}
