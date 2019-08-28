import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { ApiService } from 'src/app/services/api.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listpost',
  templateUrl: './listpost.component.html',
  styleUrls: ['./listpost.component.css']
})
export class ListpostComponent implements OnInit {
  // @Input() active:string ="active";
  featuredPost: Post[] = [];
  pinnedPost: Post = new Post();
  recentPost: Post[] = [];
  popularPost: Post[] = [];
  listImgUrl: String[] = [];
  // test: string= "url(https://i.udemycdn.com/course/240x135/913448_e6e2.jpg)";
  constructor(private apiService: ApiService, 
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.spinner.show();
    this.loadPosts();
  }

  loadPosts() {
    var obs = this.apiService.getAllPostRequest();
    obs.subscribe((response: HttpResponse<any>) => {
      this.spinner.hide();
      var r : any = response;
      //console.log(r.data[0].clickCount);
      var listPost = r.data;
      // if(listPost.clickCount )
      this.pinnedPost = listPost[0];
      var max = listPost[0].clickCount;
      for (var i=1;i<listPost.length;i++)
      {
        if(listPost[i].clickCount > max ) 
         {
          max = listPost[i].clickCount;
           this.pinnedPost = listPost[i];
           console.log(this.pinnedPost);
         }
      }
      //this.pinnedPost = listPost[Math.floor(Math.random()*listPost.length)];

      //get featured posts
      //sort featured posts
     
      for(var i = 0; i < 5; i++)
      {
        var value = Math.floor(Math.random()*listPost.length);
        var temp = listPost[value];
        this.featuredPost.push(temp);
        listPost = listPost.filter((post: Post, index, arr) => {
          return post != temp;
        })
      }

      var listPost = r.data;
      //get popular posts
      listPost.sort(function(a,b)
      {
        return b.clickCount - a.clickCount;
      });
      console.log("Sx",listPost);
      for(var i = 0; i < 3; i++)
      {
        //var value = Math.floor(Math.random()*listPost.length);
        var temp = listPost[i];
        this.popularPost.push(temp);
        // listPost = listPost.filter((post: Post, index, arr) => {
        //   return post != temp;
        // })
        
      }


      this.popularPost.forEach((item) => {
        var imgurl: string = "url(" + item.imgUrl + ")";
        this.listImgUrl.push(imgurl);
      });

    }, (error: HttpErrorResponse) => {;
      alert("An error has occured while loading data, please try again later :(");
    })

    var obs1 = this.apiService.getRecentPostRequest(3);
    obs1.subscribe((response: HttpResponse<any>) => {
      var r : any = response;
      this.recentPost = r.data;;
    }, (error: HttpErrorResponse) => {
      alert("An error has occured while loading data, please try again later :(");
    })
  }

}
