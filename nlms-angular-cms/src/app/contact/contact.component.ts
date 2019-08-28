import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { Contact} from '../module/contact';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  dataArr: any;
	key = 'value';
    value: any = null;
    item = JSON.parse(localStorage.getItem(this.key));
    temp ='Token '+ this.item.token.data[1];
    api = this.Api.domain;
    //domain: string=`http://localhost:8080/`;
    url =this.api+`contacts`;
    url1;
    body;
    body1;
    body2;
    number;
    searchName;
    date = new Date();
    submitted = false;
    contact = new Contact(this.number,"","","","","","","","");
    countries = [
      {id: 1, name: "Pending"},
      {id: 2, name: "Close"},
      {id: 3, name: "In-Progess"},
    ];
   selectedValue = null;

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
   onDelete(contact:Contact)
  {
    this.url1= this.api+`contacts/`+contact.id;
    this.http.delete(this.url1,this.httpOptions).subscribe(
      res =>{var d : any = res;
        this.dataArr = this.dataArr.filter((value) => {
          return value != contact;
        });
     },
      err => console.log(err)
      );
  }
  onChange(newValue) {
    console.log(newValue);
    this.selectedValue = newValue;
    // ... do other stuff here ...
  }
  onClick(contact: Contact)
  {
    console.log("aaaaa");
  
      this.body2 =
    {
      "id":contact.id,
      "status":  this.selectedValue
      
   
      //"created_date":post.created_date
    }
      this.http.put(this.api+`contacts/`+contact.id,this.body2,this.httpOptions).subscribe
      (res =>{console.log(res);},
      
      err => console.log(err)
      );
      for (var i = 0; i < this.dataArr.length; i++) {
        if (this.dataArr[i].id === contact.id) {
          this.dataArr[i].id =contact.id;
          this.dataArr[i].status =this.selectedValue;
          break;
        }
      }
    }
  
  onSetting(contact:Contact)
  {
    this.submitted = true;
    this.contact = new Contact(contact.id,contact.created_by,contact.created_date,contact.last_modified_by,contact.last_modified_date,contact.name,contact.email,contact.message,contact.status);
    console.log(contact);
  }
}

