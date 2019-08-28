import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { Slider } from '../module/slider';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {
  dataArr: any;
  dataArr1: any;
  dataArr2: any;
	key = 'value';
    value: any = null;
    item = JSON.parse(localStorage.getItem(this.key));
    temp ='Token '+ this.item.token.data[1];
    //domain: string=`http://localhost:8080/`;
    api=this.Api.domain;
    url =this.api+`sliders`;
    url1;
    body;
    body1;
    searchName;
    body2;
    number;
    date = new Date();
    submitted = false;
    slider = new Slider(this.number,"","","","","","","","");
    onSubmit() { this.submitted = true;}
     httpOptions = {
  headers: new HttpHeaders({
   
    'Content-Type':  'application/json',
    'Authorization': this.temp,
  })
  };
  constructor(private http: HttpClient,private Api:ApiserviceService) { 
    console.log(this.temp);
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
  onDelete(slider:Slider)
  {
    this.url1= this.api+`sliders?id=`+slider.id;
    this.http.delete(this.url1,this.httpOptions).subscribe(
      res =>{var d : any = res;
        this.dataArr = this.dataArr.filter((value) => {
          return value != slider;
        });
      },
      err => console.log(err)
      );
  }
  onSetting(slider:Slider)
  {
    this.submitted = true;
    this.slider = new Slider(slider.id,slider.created_by,slider.created_date,slider.last_modified_by,slider.last_modified_date,slider.title,slider.text,slider.imgUrl,slider.status);
    console.log(slider);
  }
  onClick(slider: Slider)
  {
    if(!slider.id)
    {
      console.log("thêm");
     this.body1 =
    {
      "title": slider.title,
      "text":slider.text,
      "imgUrl":slider.imgUrl,
      "status":"Pending",
      //"created_date":post.created_date
    }
    this.http.post(this.api+`slider`,this.body1,this.httpOptions).subscribe(
      res =>{var d : any = res;
        //this.dataArr = d.data;
      this.dataArr.push(d.data)
      console.log(this.dataArr)},
      
      err => console.log(err)
      );
    }
    else{
      console.log("sửa");
      this.body2 =
    {
      "id":slider.id,
      "title": slider.title,
      "text":slider.text,
      "imgUrl":slider.imgUrl,
      "status":"Active",
      //"created_date":post.created_date
    }
      this.http.put(this.api+`sliders`,this.body2,this.httpOptions).subscribe(
        res =>{console.log(res);
        // var d : any = res;
        // this.dataArr.push(d.data)
      
      },
      
      err => console.log(err)
      );
      for (var i = 0; i < this.dataArr.length; i++) {
        if (this.dataArr[i].id === slider.id) {
          this.dataArr[i].id =slider.id;
          this.dataArr[i].title =slider.title;
          this.dataArr[i].text =slider.text;
          this.dataArr[i].imgUrl =slider.imgUrl;
          this.dataArr[i].status ="Active";
          break;
        }
      }
    }
  }
   

}
