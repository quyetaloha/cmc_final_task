import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse ,HttpErrorResponse} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/model/course';
@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {

  constructor(private http: HttpClient) {}
  urlGetCourseListData="http://8abd4599.ngrok.io/courses";
  token="Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdXlldGhvY25ndSIsImlkIjoxOSwiUm9sZSI6W10sImlhdCI6MTU2NTIyODk4MSwiZXhwIjoxNTY1MjQ2OTgxfQ.NRuec6ZEP_CFEoKLUJZ63HAg6eGfStKFbUdNCxx9v7n_v4W7SmOf9TMWPRiUdq7eMPI1t9-b_wB-4bUxGNC4dw"
  courses: Course[]
  ngOnInit() {
    this.doCourseData();
  }

  doGetCourseListData() {
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Authorization':this.token
        })
    }
    return this.http.get(this.urlGetCourseListData,httpOptions);
  }
  doCourseData(){
    let obs: any=this.doGetCourseListData();
    obs.subscribe((response: any) => {
      this.courses=response.data;
      console.log("courses",this.courses);

    }, (error: any) => {
      console.log("error",error);
    })
  }
}
