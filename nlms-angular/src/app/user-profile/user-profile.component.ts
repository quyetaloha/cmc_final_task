import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ApiService} from '../services/api.service';
import { HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient, private storageService: StorageService,private apiService:ApiService) { }
  listUser: User[];
  urlGetCourseListData = this.apiService.domain+"user";
  urlUpdateUser = this.apiService.domain+"updateUser";
  key = 'value';
  value: any = null;
  user;
  token;
  userId: any ;
 
  // token2 = "Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoaWV1NCIsImlkIjoxMDYsIlJvbGUiOltdLCJpYXQiOjE1NjU1NzY2MDQsImV4cCI6MTU2NTU5NDYwNH0.7MtpGRFdUCPNL5Ovrn3rT8PmNY-Tn5eZ4Vvj-dSb_u62LoU17w6rjzbXUT-TkMymbCd8PWmVdXTQA610qwGBKg";
  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem(this.key));
    // this.token = "Token " + this.user.user.data[1];
    // this.userId = this.user.user.data[0].id;
    // console.log("user id :" + typeof this.userId, this.userId);
    this.storageService.localStorage.getItem("user").subscribe((data: User) => {
      if(data != null)
      {
        this.userId = data.id;
        this.storageService.localStorage.getItem("token").subscribe((data: string) => {
          if(data != null)
          {
            this.token = data;
            console.log("token: " + this.token);
            this.doGetData();
          }
          return;
        });
        return;
      }
    })
    

  }

  email;
  phone;
  fullname;
  avatarUrl;
  passWord;
  currentPass;
  newPass;
  confirmPass;

  doGetSourseData() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Authorization': "Token " + this.token,
      }),

      params: {id: this.userId}

    }
    // console.log("data2", this.data2);
    return this.http.get(this.urlGetCourseListData, httpOptions);

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

    }, (error: HttpErrorResponse) => {
      console.log(error);
      // alert("username or password is incorrect")
    })
  }

  changeResponse() {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Authorization': this.token
      }),
    }
    var newuser = {

      "id": 5,
      "password": this.newPass,

    }
    console.log("sending password");
    return this.http.put(this.urlUpdateUser, newuser, httpOptions);


  }
  changepass2() {
    if (this.newPass == this.confirmPass) {
      console.log("new pass ", this.newPass);
      console.log("new pass ", this.confirmPass);
      this.changeResponse().subscribe((response: HttpResponse<any>) => {
        console.log("change password suscess");
        console.log("respone", response);
      });
      alert("change pass sussces");
    }
    else {
      alert("confirm password not valid");
    }
  }
}
