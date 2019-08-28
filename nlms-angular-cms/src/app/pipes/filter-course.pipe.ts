import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourse'
})
export class FilterCoursePipe implements PipeTransform {

  transform(list: any[], searchName:string): any {
    //return item.filter (item =>item.quantity != search )
    if(!list || !searchName )
    {
    	return list;
    }
	return list.filter(list => list.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
   }

}
