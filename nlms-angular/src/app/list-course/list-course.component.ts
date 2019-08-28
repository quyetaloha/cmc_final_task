import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpHeaders, HttpResponse ,HttpErrorResponse} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/model/course';
import { Category } from '../model/category';
import { User } from '../model/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
      @Output() active: string;
      constructor(private apiService:ApiService,private http: HttpClient,
        private spinner: NgxSpinnerService) {}
      urlGetCourseListData=this.apiService.domain+"courses";
      urlGetCategoryListData=this.apiService.domain+"categorys";
      token:string;
      courses: Course[];
      user:any;
      categorys: Category[];
      selectedCategoryID:string;
      keySearch:any=null;
      tmpKeySearch:any=null;

      currentPage=1;
      totalPage=0;
      amountRecordOfEachPage=4;
      page;
      currentCoursePageData:Course[];
      onPage(event=null,newPage,data){
        if(event)
          event.preventDefault();
        let tmpcourse=data.map(obj => ({...obj}));
        let tmp=tmpcourse.slice((newPage-1)*this.amountRecordOfEachPage,newPage*this.amountRecordOfEachPage);
        this.currentCoursePageData=tmp;
        console.log("tmpcourse",this.courses)
        this.currentPage=newPage;
      }
      onPreviousPage(event,courses){
        if(event)
          event.preventDefault();
        if(this.currentPage>1)
          this.onPage(null,this.currentPage-1,courses);
      }
      onNextPage(event,courses){
        if(event)
          event.preventDefault();
        if(this.currentPage<this.totalPage)
          this.onPage(null,this.currentPage+1,courses);
      }

      ngOnInit() {
        this.spinner.show();
        this.doCourseData();
        this.doCategoryData();
      }

      onSearch(){
        this.keySearch=this.tmpKeySearch;
        console.log(this.keySearch)
      }
      onSelectCategory(event,id){
        event.preventDefault();
        this.selectedCategoryID=id;
        console.log(id)
        
      }

      doGetCourseListData() {
        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': "application/json",
              // 'Authorization':this.token
            })
        }
        return this.http.get(this.urlGetCourseListData,httpOptions);
      }
      doCourseData(){
        let obs: any=this.doGetCourseListData();
        let tmpTotal;
        obs.subscribe((response: any) => {
          this.spinner.hide();
          this.courses=response.data;
          console.log("courses",this.courses);
          tmpTotal=Object.keys(this.courses).length/this.amountRecordOfEachPage;
          this.totalPage=Math.ceil(tmpTotal);
          this.page = Array.from(Array(this.totalPage).keys());
          this.onPage(null,1,this.courses);
        }, (error: any) => {
          console.log("error",error);
        })
      }
      doGetCategoryListData() {
        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': "application/json",
              // 'Authorization':this.token
            })
        }
        return this.http.get(this.urlGetCategoryListData,httpOptions);
      }
      doCategoryData(){
        let obs: any=this.doGetCategoryListData();
        obs.subscribe((response: any) => {
          this.categorys=response.data;
          console.log("courses",this.categorys);


        }, (error: any) => {
          console.log("error",error);
        });
      }
}
