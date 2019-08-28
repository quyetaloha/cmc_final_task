import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { Role } from '../module/role';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  api=this.Api.domain;
  domain: string=`http://localhost:8080/`;
  dataArr: any;
  dataArr1: any;
  dataArr2: any;
  key = 'value';
  roles:string;
    value: any = null;
    item = JSON.parse(localStorage.getItem(this.key));
    temp ='Token '+ this.item.token.data[1];
    url =this.api+`roles`;
    url1;
    body;
    body1;
    body2;
    number;
    date = new Date();
    submitted = false;
    role = new Role(this.number,"","","","","","");
    onSubmit() { this.submitted = true;}
     httpOptions = {
  headers: new HttpHeaders({
   
    'Content-Type':  'application/json',
    'Authorization': this.temp,
  })
  };
  constructor(private http: HttpClient,private Api:ApiserviceService) { 
    console.log(this.url);
  this.http.get(this.url,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr = d.data;
  	  console.log(res)},
      err => console.log(err)
    	);}
  ngOnInit() {
  }
  onBack()
  {
    this.submitted = false;
    //location.reload();
  }
  onDelete(role:Role)
  {
    this.url1= this.api+`roles/`+role.id;
    this.http.delete(this.url1,this.httpOptions).subscribe(
      res =>{var d : any = res;
        this.dataArr = this.dataArr.filter((value) => {
          return value != role;
        });
    },
      err => console.log(err)
      );
  }
  onSetting(role:Role)
  {
    this.submitted = true;
    this.role = new Role(role.id,role.created_by,role.created_date,role.last_modified_by,role.last_modified_date,role.name,role.description);
    console.log(role);
  }
  onClick(role: Role)
  {
    console.log("aaaaa");
    if(!role.id)
    {
      console.log("thêm");
     this.body1 =
    {
      "name": role.name,
      "description":role.description,
      //"created_date":post.created_date
    }
    this.http.post(this.api+`add-role/`,this.body1,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr.push(d.data)},
      err => console.log(err)
      );
    }
    else{
      console.log("sửa");
      this.body2 =
    {
      "id":role.id,
      "name": role.name,
      "desciption":role.description,
      //"created_date":post.created_date
    }
      this.http.put(this.api+`roles`+role.id,this.body2,this.httpOptions).subscribe
      (res =>{console.log(res);},
      
      err => console.log(err)
      );
    }
  }
   

}
