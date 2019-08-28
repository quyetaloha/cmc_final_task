import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringshortening'
})
export class StringshorteningPipe implements PipeTransform {
  transform(value: string, maxlength: number): string {
    if(value.length <= maxlength)
        return value;
    return value.substr(0, maxlength) + "...";
  }
}
