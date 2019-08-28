import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { Group } from '../module/group';
import { User } from '../module/user'
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  dataArr: any;
	key = 'value';
    value: any = null;
    item = JSON.parse(localStorage.getItem(this.key));
    temp ='Token '+ this.item.token.data[1];
    api=this.Api.domain;
    //domain: string=`http://localhost:8080/`;
    url =this.api+`groups`;
    url1;
    body;
    body1;
    body2;
    number;
    date = new Date();
    submitted = false;
    group = new Group(this.number,"","","","","","",[]);
    

  onSubmit() { this.submitted = true;

  console.log("aa"); }
   httpOptions = {
  headers: new HttpHeaders({
   
    'Content-Type':  'application/json',
    'Authorization': this.temp,
  })
  };  
    constructor(private http: HttpClient,private Api:ApiserviceService) { 
  
   this.http.get(this.url,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr=d.data;
    console.log(this.dataArr)},
      err => console.log(err)
    	);}
  ngOnInit() {
  }
    onClick(group: Group)
  {
    console.log("aaaaa");
    if(!group.id)
    {
     this.body1 =
    {
      "name": group.name,
      "type":group.type,
    
      //"created_date":post.created_date
    }
    this.http.post(this.api+`group`,this.body1,this.httpOptions).subscribe(
      res =>{var d : any = res;
      this.dataArr.push(d.data)},
      err => console.log(err)
      );
    }
    else{
      console.log("sửa");
      this.body2 =
    {
      "id":group.id,
      "name": group.name,
      "type":group.type,
   
      //"created_date":post.created_date
    }
      this.http.put(this.api+`groups`,this.body2,this.httpOptions).subscribe
      (res =>{console.log(res);},
      
      err => console.log(err)
      );
    }
  }
   onBack()
   {
     this.submitted = false;
   } 
   onDelete(group:Group)
  {
    console.log("aaa")
    console.log(group.id)
    this.url1= this.api+`groups?id=`+group.id;
    this.http.delete(this.url1,this.httpOptions).subscribe(
      res =>{var d : any = res;
        this.dataArr = this.dataArr.filter((value) => {
          return value != group;
        });
      },
      err => console.log(err)
      );
  }
  onSetting(group:Group)
  {
    this.submitted = true;
    this.group = new Group(group.id,group.created_by,group.created_date,group.last_modified_by,group.last_modified_date,group.name,group.type,group.listUser);
    console.log(group);
  }
}
