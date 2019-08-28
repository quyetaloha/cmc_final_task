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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataArr: any;
  dataArr1: any;
  dataArr2: any;
  dataArr3: any;
	key = 'value';
    value: any = null;
    item = JSON.parse(localStorage.getItem(this.key));
    temp ='Token '+ this.item.token.data[1];
    avatar=this.item.token.data[0].avatarUrl;
    name=this.item.token.data[0].fullName;
    role=this.item.token.data[0].role[0].name;
    //domain: string=`http://localhost:8080/`;
    constructor(private http: HttpClient,private router: Router,private Api: ApiserviceService) { 

      this.http.get(this.url,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr = d.data;
      this.length1= this.dataArr.length

  	  console.log(length)},
      err => console.log(err)
      );
      this.http.get(this.url1,this.httpOptions).subscribe(

        res =>{var d : any = res;
      this.dataArr1 = d.data;
      this.length2= this.dataArr1.length

  	  console.log(length)},
      err => console.log(err)
      );
      this.http.get(this.url2,this.httpOptions).subscribe(

        res =>{var d : any = res;
      this.dataArr2 = d.data;
      this.length3= this.dataArr2.length

  	  console.log(this.length3)},
      err => console.log(err)
      );
      this.http.get(this.url3,this.httpOptions).subscribe(

        res =>{var d : any = res;
      this.dataArr3 = d.data;
      this.length4= this.dataArr3.length

  	  console.log(this.length4)},
      err => console.log(err)
      );

    
    }
    api=this.Api.domain;
    url =this.api+`userCourses`;
    url1= this.api+`users`;
    url2=this.api+`contacts`;
    url3=this.api+`courses`;
    length1 : number;
    length2 :number;
    length3 : number;
    length4 : number;
    body;
    body1;
    body2;
    user:User;
    course:Course;
    date = new Date();
    submitted = false;
    Usercourse = new UserCourse(1,this.user,this.course,this.date,this.date);
  state = "dashboard";
  httpOptions = {
    headers: new HttpHeaders({
     
      'Content-Type':  'application/json',
      'Authorization': this.temp,
    })
    };
  // state1 = "dashboard1";
  // key = 'value';
  // value: any = null;
  // item = JSON.parse(localStorage.getItem(this.key));
  //name=this.item.token.data[0].username;


  ngOnInit() {
  }

  onClick(state: string)
  {
    this.state = state;
  }
  // onClick1(state1: string)
  // {
  //   this.state1 = state1;
  // }
  log()
  {
    localStorage.clear();
    //window.location.reload();
    this.router.navigate(['/']);
    
  }

}
