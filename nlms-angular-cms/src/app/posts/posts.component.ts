import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';
import { Post } from '../module/post';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostComponent implements OnInit {

  dataArr: any;
  key = 'value';
  value: any = null;
  item = JSON.parse(localStorage.getItem(this.key));
  temp = 'Token ' + this.item.token.data[1];
  api = this.Api.domain;
  //domain: string=`http://localhost:8080/`;
  url = this.api + `posts`;
  url1;
  body;
  body1;
  body2;
  number;
  searchName;
  date = new Date();
  submitted = false;
  post = new Post(this.number, "", "", "", "", "", "", "", "", "");
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': this.temp,
    })
  };

  onSubmit() {
    this.submitted = true;
    console.log("aa");
  }
  
  constructor(private http: HttpClient, private Api: ApiserviceService) {

    this.http.get(this.api + `posts`, this.httpOptions).subscribe(
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
  
  onClick(post: Post) {
    console.log("Thêm");
    if (!post.id) {
      console.log(post.id)
      this.body1 =
        {
          "briefInfo": post.briefInfo,
          "content": post.content,
          "imgUrl": post.imgUrl,
          "title": post.title,
          "status": "Pending",
          //"created_date":post.created_date
        }
      this.http.post(this.api + `post`, this.body1, this.httpOptions).toPromise().then(
        res => {
          console.log(res);
          var d: any = res;
          this.dataArr.push(d.data)
          console.log(this.dataArr)
        }
      );
    }
    else {
      console.log("Sửa" + post.id);
      this.body2 =
        {
          "id": post.id,
          "title": post.title,
          "content": post.content,
          "imgUrl": post.imgUrl,
          "briefInfo": post.briefInfo,
          "status": "Active",
          //"created_date":post.created_date
        }
      this.http.put(this.api + `posts`, this.body2, this.httpOptions).toPromise().then(
        res => {
          console.log(res);
        }
      );
      for (var i = 0; i < this.dataArr.length; i++) {
        if (this.dataArr[i].id === post.id) {
          this.dataArr[i].id = post.id;
          this.dataArr[i].created_by = post.created_by;
          this.dataArr[i].title = post.title;
          this.dataArr[i].content = post.content;
          this.dataArr[i].imgUrl = post.imgUrl;
          this.dataArr[i].briefInfo = post.briefInfo;
          this.dataArr[i].status = "Active";
          break;
        }
      }
    }
  }
  onBack() {

    this.submitted = false;
    //this.post = new Post(1,"","","","","","","","","");
    //location.reload();
  }
  onDelete(post: Post) {
    this.url1 = this.api + `posts?id=` + post.id;
    this.http.delete(this.url1, this.httpOptions).subscribe(
      res => {
        var d: any = res;
        this.dataArr = this.dataArr.filter((value) => {
          return value != post;
        });
      },
      err => console.log(err)
    );
  }
  onSetting(post: Post) {
    this.submitted = true;
    this.post = new Post(post.id, post.created_by, post.created_date, post.last_modified_by, post.last_modified_date, post.title, post.briefInfo, post.content, post.imgUrl, post.status);
    console.log(post);
  }
}

