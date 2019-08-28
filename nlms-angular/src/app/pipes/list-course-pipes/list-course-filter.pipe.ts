import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listCourseFilter'
})
export class ListCourseFilterPipe implements PipeTransform {

  transform(items: any[], filterQuery: any,selectedCategoryID:any,categorys:any): any[] {
    if (!filterQuery&&!selectedCategoryID ) return items;
    else if(filterQuery) return items.filter(item => item.briefInfo.toLowerCase().includes(filterQuery.toLowerCase()));
    else if(selectedCategoryID){
      let courses=items.filter(course=>{
        let esxist=false;
        course.listCategory.forEach(category=>{
          if(category.id===selectedCategoryID){
            esxist=true;
          }
          else{
            categorys.forEach(e=>{
              if(e.id===selectedCategoryID){
                e.subCategories.forEach(element => {
                  if(element.id===category.id){
                    esxist=true;
                  }
                });
              }
            })
            
          }
        });
        return esxist;
      });
      return courses;
    }
  }

}
