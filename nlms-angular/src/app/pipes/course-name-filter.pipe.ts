import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../model/course';

@Pipe({
  name: 'courseNameFilter'
})
export class CourseNameFilterPipe implements PipeTransform {

  transform(value: Course[], name: string): Course[] {
    if(typeof(name)=="undefined" || name.length == 0)
    {
      return value;
    }
      
    name = name.toLowerCase();
    return value.filter((item, index, items) => {
      var temp: string = item.name.toLowerCase();
      return temp.indexOf(name) >= 0;
    });
  }

}
