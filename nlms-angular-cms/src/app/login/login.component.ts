import { Component, OnInit } from '@angular/core';
import { User } from '../module/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../service/apiservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private Api: ApiserviceService)
{
 // localStorage.clear();
}
ngOnInit() {
}
user = new User(1,""," "," "," "," "," ");
postData ;
dataArray :any;
key = 'value';
  value: any = null;
  api=this.Api.domain;
  //domain: string=`http://localhost:8080/`;
url =this.api+`authenticate`; 
//alert(url);  
onClick(user: User)
{
  this.postData =
  {
      username :user.username,
      password: user.password,

  }
  this.http.post(this.url, this.postData).subscribe(
    data=> {
      console.log(data);
      var d : any = data;
      console.log(d.data[0].role[0].name)
      if(d.data[0].role[0].name =='admin')
      {
        let myObj= {token : d};
        console.log(myObj);
        localStorage.setItem(this.key, JSON.stringify(myObj));
        this.router.navigate(['admin']);
      }
      else
        {
          alert("Can't Login");

        }
      
       //console.log(localStorage.setItem(this.key, JSON.stringify(myObj)));
    },
    err =>{
        alert("Wrong Username or Password")
      }
    
    

 

    );
  
  
  
  //console.log(this.arrAdd);
   //alert("Đăng nhập thành công");
     

}

}

