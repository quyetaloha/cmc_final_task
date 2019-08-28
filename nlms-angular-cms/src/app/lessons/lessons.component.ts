import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../module/user';
import { Course } from '../module/course';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../service/apiservice.service';
import { Lessons } from '../module/lessons'
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  dataArr = [];
  dataArr1: any;
  dataArr2: any;
  key = 'value';
  value: any = null;
  item = JSON.parse(localStorage.getItem(this.key));
  temp = 'Token ' + this.item.token.data[1];
  api = this.Api.domain;
  //domain: string=`http://localhost:8080/`;
  url = this.api + `lessons`;
  url1;
  body;
  searchName;
  body1;
  body2;
  number;
  user: User;
  closeResult: string;
  lessons: Lessons[];
  //course:Course;
  date = new Date();
  submitted = false;
  course = new Course(this.number, "", "", 0, 0, "", "", 0, 0, this.user, this.user, "", this.lessons);

  onSubmit() { this.submitted = true; }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.temp,
    })
  };
  constructor(private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private Api: ApiserviceService) {
    console.log(this.temp);
    config.backdrop = 'static';
    config.keyboard = false;
    this.http.get(this.url, this.httpOptions).subscribe(
      res => {
        var d: any = res;
        this.dataArr = d.data;
        console.log(this.dataArr)
      },
      err => console.log(err)
    );
  }


  ngOnInit() {
  }

}
