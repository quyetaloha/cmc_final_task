import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterstatus'
})
export class FilterstatusPipe implements PipeTransform {

  transform(list: any[], searchName:string): any {
    //return item.filter (item =>item.quantity != search )
    if(!list || !searchName )
    {
    	return list;
    }
	return list.filter(list => list.status.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
   }

}
