import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  date: Date = new Date();
  urlGetPostData:string=this.apiService.domain+"post";
  urlGetRecentPostData:string=this.apiService.domain+"recentposts";
  post:Post=new Post();
  recentPosts:Post[];
  user;
  token;
  body;
  post_id: number = 0;
  recentPostNumber:any={
    number:4
  }
  constructor(private http: HttpClient, 
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe((params) => {
      this.post_id = this.route.snapshot.params.id;
    });
    this.user=JSON.parse(localStorage.getItem("token"));

    //console.log("user",this.user.user.data[1]);
   // this.token="Token "+this.user.token.data[1];
    this.dogetPostData();
    this.dogetRecentPostData()
    this.doClick()
  
  }
  doClick()
  {
    console.log("running");
    this.body=
    {
      "id":this.post_id,
    }
    return this.http.put(this.apiService.domain+'updateClickCount',this.body).subscribe(
      data=>{console.log(data);}
    );
  }
  doGetPost() {
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': "application/json"
        }),
        params: new HttpParams().append("id", this.post_id.toString())
    }
    return this.http.get(this.urlGetPostData,httpOptions);
  }
  dogetPostData(){
    let obs: any=this.doGetPost();
    obs.subscribe((response: any) => {
      this.post=response.data;
      console.log("post",this.post);
      this.spinner.hide();

    }, (error: any) => {
      //console.log("error",error);
    })
  }
  
  doGetRecentPost() {
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': "application/json"
        }),
        params:this.recentPostNumber
    }
    return this.http.get(this.urlGetRecentPostData,httpOptions);
  }
  dogetRecentPostData(){
    let obs: any=this.doGetRecentPost();
    obs.subscribe((response: any) => {
      this.recentPosts=response.data;
      console.log("recentPosts",this.recentPosts);

    }, (error: any) => {
      //console.log("error",error);
    })
  }
}
