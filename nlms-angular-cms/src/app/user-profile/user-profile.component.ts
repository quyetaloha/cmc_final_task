import { Component, OnInit } from '@angular/core';
import { User } from '../module/user';
import { HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  api=this.Api.domain;
  //domain: string=`http://localhost:8080/`;
  dataArr: any;
  dataArr1: any;
  dataArr2: any;
  key = 'value';
  roles:string;
  value: any = null;
  item = JSON.parse(localStorage.getItem(this.key));
  temp ='Token '+ this.item.token.data[1];
  id = this.item.token.data[0].id;
  url1;
  body;
  body1;
  body2;
  date = new Date();
  constructor(private http: HttpClient,private Api:ApiserviceService) { }
  listUser: User[];
  //id: any = 2;
  ngOnInit() {
    this.doGetData();
   
  }
  params: any;
  data2 = {
    id: this.id
  };
  email;
  phone;
  fullname;
  avatarUrl;
  passWord;
  currentPass;
  newPass;
  username;

  doGetSourseData() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Authorization': this.temp
      }),
      params: this.data2

    }
    return this.http.get(this.api+`user`, httpOptions);

  }
  doGetData() {
    // let tokenID = localStorage.getItem("tokenID");
    let tmplistUser: User[] = [];
    let obs: any = this.doGetSourseData();
    obs.subscribe((response: any) => {
      let data: any = response;
      console.log("response", data);
      //console.log("name", data.data.email);
      this.email = data.data.email;
      this.phone = data.data.phone;
      this.fullname = data.data.fullName;
      this.avatarUrl = data.data.avatarUrl;
      this.passWord = data.data.passWord;
      this.username= data.data.username;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      // alert("username or password is incorrect")
    })
  }

  changeResponse() {
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Authorization': this.temp
      }),
    }
    var newuser = {
      "id":this.id,
      "username":this.username,
      "password":this.newPass,
      "email":this.email,
      "fullName":this.fullname,
      "avatarUrl":this.avatarUrl,
      "phone":this.phone,
    }
    console.log("sending password");
    return this.http.put(this.api+`updateUser`, newuser, httpOptions);


  }
  changepass2(){
    this.changeResponse().subscribe((response: HttpResponse<any>) => {
      console.log("change password suscess");
      console.log("respone",response);
    });
  }
}

