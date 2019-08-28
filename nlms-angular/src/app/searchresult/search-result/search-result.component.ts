import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/course';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/model/post';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  query: string = "";
  listCourse: Course[] = [];
  posts:Post[]=[];


  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router) { }
  urlPost="http://localhost:8080/posts"

  ngOnInit() {
    //get params
    this.spinner.show();
    this.route.paramMap.subscribe((params) => {
      this.query = this.route.snapshot.params.query;
    });
    //get courses
    this.apiService.getAllCoursesRequest().subscribe((response: HttpResponse<any>) => {
      var r : any = response;
      this.listCourse = r.data;
    }, (error: HttpErrorResponse) => {
      alert("An error has occured while loading data, please try again later :(");
    });
    this.dogetPostData();
  }
  doGetPost() {
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': "application/json"
        })
    }
    return this.http.get(this.urlPost,httpOptions);
  }
  dogetPostData(){
    let searchKey=this.query;
    let tmpPost=[];
    let obs: any=this.doGetPost();
    obs.subscribe((response: any) => {
      this.spinner.hide();
      
      response.data.forEach(element => {
        if(element.title.toLowerCase().includes(searchKey.toLowerCase())){
          tmpPost.push(element);
        }
      });
      this.posts=tmpPost;
      console.log("posts data",this.posts);

    }, (error: any) => {
      //console.log("error",error);
    })
  }

}
