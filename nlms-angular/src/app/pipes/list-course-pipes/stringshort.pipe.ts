import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringshortpipe'
})
export class StringShortPipe implements PipeTransform {

  transform(value: string, maxlength: number): string {
    if(value.length <= maxlength)
      {
        let l=maxlength-value.length;
        for(let i=0;i<l;i++){
          value+=" \xa0";
        }
        return value;
      }
    return value.substr(0, maxlength) + "...";
  }


}
