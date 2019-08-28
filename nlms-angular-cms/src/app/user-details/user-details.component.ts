import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { Group } from '../module/group';
import { User } from '../module/user';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  dataArr: any;
	key = 'value';
    value: any = null;
    item = JSON.parse(localStorage.getItem(this.key));
    temp ='Token '+ this.item.token.data[1];
    api = this.Api.domain;
    domain: string=`http://localhost:8080/`;
    url =this.api+`users`;
    url1;
    body;
    body1;
    body2;
    number;
    date = new Date();
    submitted = false;
    user = new User(this.number,""," "," "," "," "," ");
    

  onSubmit() { this.submitted = true;

  console.log("aa"); }
   httpOptions = {
  headers: new HttpHeaders({
   
    'Content-Type':  'application/json',
    'Authorization': this.temp,
  })
  };  
    constructor(private http: HttpClient,config: NgbModalConfig, private modalService: NgbModal,private Api:ApiserviceService) { 
      config.backdrop = 'static';
      config.keyboard = false;
   this.http.get(this.url,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr = d.data;
    console.log(res)},
      err => console.log(err)
    	);}
  ngOnInit() {
  }

    onClick(user: User)
  {

      
      this.body2 =
    {
      "id":user.id,
      "username": user.username,
      "fullName":user.fullName,
      "phone":user.phone,
      "email":user.email,
      "avatarUrl":user.avatar_Url,
   
      //"created_date":post.created_date
    }
      this.http.put(this.api+`updateUserWithoutPassword`,this.body2,this.httpOptions).subscribe
      (res =>{console.log(res);},
      
      err => console.log(err)
      );
      for (var i = 0; i < this.dataArr.length; i++) {
        if (this.dataArr[i].id === user.id) {
          this.dataArr[i].id =user.id;
          this.dataArr[i].username=user.username;
          this.dataArr[i].fullName =user.fullName;
          this.dataArr[i].phone =user.phone;
          this.dataArr[i].email =user.email;
          this.dataArr[i].avatarUrl=user.avatar_Url;
          break;
        }
      }
    }
   onBack()
   {

     this.submitted = false;
     //location.reload();
   } 
   onDelete(user:User)
  {
    this.url1= this.api+`user?id=`+user.id;
    this.http.delete(this.url1,this.httpOptions).subscribe(
      res =>{var d : any = res;
        this.dataArr = this.dataArr.filter((value) => {
          return value != user;
        });},
      err => console.log(err)
      );
  }
  onSetting(user:User)
  {
    this.submitted = true;
    this.user = new User(user.id,user.fullName,user.username,user.email,user.password,user.avatar_Url,user.phone);
    console.log(user);
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}