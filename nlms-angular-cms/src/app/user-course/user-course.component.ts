import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { UserCourse } from '../module/user-course';
import { User } from '../module/user';
import { Course} from '../module/course';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.css']
})
export class UserCourseComponent implements OnInit {
  dataArr: any;
  dataArr1: any;
  dataArr2: any;
	key = 'value';
    value: any = null;
    item = JSON.parse(localStorage.getItem(this.key));
    temp ='Token '+ this.item.token.data[1];
    api=this.Api.domain;
    domain: string=`http://localhost:8080/`;
    url =this.api+`userCourses`;
    url1;
    body;
    body1;
    body2;
    user:User;
    course:Course;
    date = new Date();
    submitted = false;
    Usercourse = new UserCourse(1,this.user,this.course,this.date,this.date);
    onSubmit() { this.submitted = true;}
     httpOptions = {
  headers: new HttpHeaders({
   
    'Content-Type':  'application/json',
    'Authorization': this.temp,
  })
  };
  constructor(private http: HttpClient,private Api:ApiserviceService) { 
    console.log(this.temp);
  this.http.get(this.url,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr = d.data;
  	  console.log(this.dataArr)},
      err => console.log(err)
    	);}
  ngOnInit() {
  }
  onBack()
  {
    this.submitted = false;
    //location.reload();
  }
  onDelete(UserCourse:UserCourse)
  {
    console.log(UserCourse.id);
    this.url1= this.api+`userCourse?id=`+UserCourse.id;
    this.http.delete(this.url1,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr2 = d.data;
     //location.reload()
      ;},
      err => console.log(err)
      );
  }
  // onSetting(slider:Slider)
  // {
  //   this.submitted = true;
  //   this.slider = new Slider(slider.id,slider.created_by,slider.created_date,slider.last_modified_by,slider.last_modified_date,slider.title,slider.text,slider.imgUrl,slider.status);
  //   console.log(slider);
  // }
  // onclick(slider: Slider)
  // {
  //   console.log("aaaaa");
  //   if(!slider.id)
  //   {
  //     console.log("thêm");
  //    this.body1 =
  //   {
  //     "title": slider.title,
  //     "text":slider.text,
  //     "imgUrl":slider.imgUrl,
  //     "status":"Pending",
  //     //"created_date":post.created_date
  //   }
  //   this.http.post(this.domain+`slider`,this.body1,this.httpOptions).subscribe(
  //     res =>{var d : any = res;
  //     this.dataArr1 = d.data;},
  //     err => console.log(err)
  //     );
  //   }
  //   else{
  //     console.log("sửa");
  //     this.body2 =
  //   {
  //     "id":slider.id,
  //     "title": slider.title,
  //     "text":slider.text,
  //     "imgUrl":slider.imgUrl,
  //     "status":"Active",
  //     //"created_date":post.created_date
  //   }
  //     this.http.put(this.domain+`sliders`,this.body2,this.httpOptions).subscribe
  //     (res =>{console.log(res);},
      
  //     err => console.log(err)
  //     );
  //   }
  // }
   

}

