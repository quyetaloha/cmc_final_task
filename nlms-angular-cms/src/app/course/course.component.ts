import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../module/user';
import { Course} from '../module/course';
import { Lessons} from '../module/lessons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class CourseComponent implements OnInit {
  dataArr = [];
  dataArr1: any;
  dataArr2: any;
	key = 'value';
    value: any = null;
    key2 = 'value2';
    value2: any = null;
    item = JSON.parse(localStorage.getItem(this.key));
    temp ='Token '+ this.item.token.data[1];
    api = this.Api.domain;
    //domain: string=`http://localhost:8080/`;
    url =this.api+`courses`;
    url1;
    body;
    searchName;
    body1;
    body2;
    number;
    user:User;
    lessons:Lessons[];
    closeResult: string;

    //course:Course;
    date = new Date();
    submitted = false;
    course = new Course(this.number,"","",0,0,"","",0,0,this.user,this.user,"",this.lessons);
    onSubmit() { this.submitted = true;}
     httpOptions = {
  headers: new HttpHeaders({
   
    'Content-Type':  'application/json',
    'Authorization': this.temp,
  })
  };
  constructor(private http: HttpClient,config: NgbModalConfig, private modalService: NgbModal,private Api: ApiserviceService) { 
    console.log(this.temp);
    config.backdrop = 'static';
    config.keyboard = false;
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
    this.course = new Course(1,"","",0,0,"","",0,0,this.user,this.user,"",this.lessons);
  }
  onDelete(course:Course)
  {
    console.log(course.id);
    this.url1= this.api+`course?id=`+course.id;
    this.http.delete(this.url1,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr = this.dataArr.filter((value) => {
        return value != course;
      });
      //this.dataArr = d.data;
     //location.reload()
      ;},
      err => console.log(err)
      );
  }
  onSetting(course:Course)
  {
    this.submitted = true;
    this.course = new Course(course.id,course.name,course.briefInfo,course.originPrice,course.salePrice,
      course.requirement,course.description,course.courselength,course.numberOfLecture,course.createdBy,course.trainer,
      course.imgUrl,course.listLesson);
    console.log(this.course);
  }
  onSend(id:Number)
  {
    console.log(id);
    // let sub= {ID : id};
     localStorage.setItem(this.key2, JSON.stringify(id));
  }
  onClick(course: Course)
  {
    console.log("aaaaa");
    if(!course.id)
    {
      console.log("thêm");
     this.body1 =
    {
      "name": course.name,
      "briefInfo":course.briefInfo,
      "requirement":course.requirement,
      "originPrice":course.originPrice,
      "salePrice":course.salePrice,
      "courselength":course.courselength,
      "numberOfLecture":course.numberOfLecture,
      "imgUrl":course.imgUrl,
      "description":course.description
      //
      //"created_date":post.created_date
    }
    this.http.post(this.api+`course/trainer?id=2`,this.body1,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr.push(d.data)},
      err => console.log(err)
      );
    }
    else{
      console.log("sửa");
      this.body2 =
    {
      "id":course.id,
      "name": course.name,
      "briefInfo":course.briefInfo,
      "requirement":course.requirement,
      "originPrice":course.originPrice,
      "salePrice":course.salePrice,
      "courselength":course.courselength,
      "numberOfLecture":course.numberOfLecture,
      "imgUrl":course.imgUrl,
      "description":course.description
    }
      this.http.put(this.api+`course/trainer?id=2`,this.body2,this.httpOptions).subscribe
      (res =>{console.log(res);},
      
      err => console.log(err)
      );
      for (var i = 0; i < this.dataArr.length; i++) {
        if (this.dataArr[i].id === course.id) {
          this.dataArr[i].id =course.id;
          this.dataArr[i].name=course.name;
          this.dataArr[i].requirement =course.requirement;
          this.dataArr[i].originPrice =course.originPrice;
          this.dataArr[i].salePrice =course.salePrice;
          this.dataArr[i].courselength=course.courselength;
          this.dataArr[i].numberOfLecture =course.numberOfLecture;
          this.dataArr[i].imgUrl=course.imgUrl;
          this.dataArr[i].description=course.description;
          break;
        }
      }
    }
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
   

}
