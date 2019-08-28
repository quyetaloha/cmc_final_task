import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lengthMinuteToTimeFormat'
})
export class LengthMinuteToTimeFormatPipe implements PipeTransform {

  transform(value: any): any {
    let hour=0;
    if(value<60){
      return "0 hours - "+value+ "minutes";
    }
    else{
      hour=Math.floor(value/60);
      let minute=Math.round(value%60);
      if(minute.toString() != '0')
        return hour+" hours - "+minute+ " minutes";
      else
        return hour+" hours";
    }
  }

}
